import * as _ from "lodash";
import { data } from "../index";
export const postInfo = _.omit(
  data.find((post) => post.id === 1),
  "blogIcon"
);
export const debugWithDocker = `
# Using Docker to Compile, Link, Run and Debug Assembly Language Code
### tldr; 
See the [Makefile](https://github.com/tonyOreglia/unique-word-counter/blob/master/Makefile) for commands that compile, link, run and debug assembly code on a Docker container. Copied below for convenience: 


##### **build and link assembly** 
\`docker run --rm -v $(current_dir):/app -w /app linux-assembly sh -c "nasm -f elf64 -F dwarf -g $(asm).asm && ld -m elf_x86_64 $(asm).o"\`

##### **run executable** 
\`docker run --rm -v "$(current_dir)":/app -w /app linux-assembly sh -c "./a.out"\`

##### **debug** 
\`docker run --rm -it --cap-add=SYS_PTRACE --security-opt seccomp=unconfined -v "$(current_dir)":/app -w /app linux-assembly sh -c "gdb a.out"\`


### Figuring Out an Efficient Development Cycle
Now that I've figured out how to get GDB working properly within Docker, I need to understand what my development cycle is going to look like. 

I prefer to develop using [VS Code](https://code.visualstudio.com/) rather than something like \`vim\` within a Docker container. The question is how can I develop locally and quickly compile, link, run and debug the code on the docker container that is now set up? 

The answer came from this helpful [blog post](https://medium.com/travis-on-docker/why-and-how-to-use-docker-for-development-a156c1de3b24). This blog post provides a useful starting point regarding how to leverage an image to build an executable, then run another container to run the executable. Although it does not cover assembly language, it is exactly the sort of workflow we need to use. 

The blog post suggests a command like this to handle the build or compiling step (in the case of the blog installing node dependencies):  
\`\`\`
docker run --rm -v "$(pwd)":/app -w /app iron/node:dev sh -c 'npm install'
\`\`\`
But the post does not do a good job of describing what each of these options does, so let's break it down for those of use that are not proficient with Docker: 
#### [—rm](https://docs.docker.com/engine/reference/run/#clean-up---rm) 
This is just a build step. We do not need the container up and running once it's been used to prepare the executable. This flag tells Docker to tear down the container once it's finished. 


#### [-v](https://docs.docker.com/engine/reference/run/#volume-shared-filesystems) "$(pwd)":/app
We want to persist the product of the build step. This creates a Docker volume which persists in our local directory after the Docker container is torn down. 


#### [-w](https://docs.docker.com/engine/reference/run/#workdir) /app
Override the working directory that is defined in the base image. 

#### iron/ruby 
Base Docker image to use for the build

#### sh -c 'npm install'
Override command from Docker image. This is the build step in the example. 


### Applying this Approach to Compiling, Linking, Running and Debugging Assembly Code on Docker
After building an image named \`linux-assembly\` with by running the following from the directory containing our [Dockerfile](https://github.com/tonyOreglia/unique-word-counter/blob/master/Dockerfile): 
\`\`\`
docker build -t linux-assembly .
\`\`\` 

We can compile and link the assembly code program using with: 
\`\`\`
docker run --rm -v "$(pwd)":/app -w /app linux-assembly sh -c "nasm -f elf64 -F dwarf -g hellow.asm && ld -m elf_x86_64 -o hw hellow.o"
\`\`\`

This produces an executable file (\`hw\`) in my local directory. Note that this executable is in elf64 format which will not run on a Mac operating system. We can run the executable on the same Docker image with the command: 
\`\`\`
docker run --rm -v "$(pwd)":/app -w /app linux-assembly sh -c "./hw"
\`\`\`

Lastly, we can debug on the Docker container with the command: 
\`\`\`
docker run --rm -it --cap-add=SYS_PTRACE -v "$(pwd)":/app -w /app linux-assembly sh -c "gdb hw"
\`\`\`

Now I am able to develop locally using VSCode and quickly run the program on the Docker container or debug using GDB on Docker if needed.
## [Next Page >>](/guideprinting)
`;
