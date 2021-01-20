export const howToUseGdb = `
# How to use GDB within a Docker Container
###tldr; 
This [Dockerfile](https://github.com/tonyOreglia/unique-word-counter/blob/master/Dockerfile) supports compiling x86-64 assembly code using \`nasm\`, linking with \`gcc\` (or \`ld\`) and debugging with \`gdb\`

The Docker container must be run with the options \`--cap-add=SYS_PTRACE\` and \`--security-opt seccomp=unconfined\` in order for \`gdb\` to be fully functional.
e.g.
\`\`\`shell
$ docker run --rm -it --cap-add=SYS_PTRACE --security-opt seccomp=unconfined -v "$(current_dir)":/app -w /app <DOCKER-IMAGE-NAME>
\`\`\`

### Pitfalls
As described in the [last post](https://github.com/tonyOreglia/unique-word-counter/wiki/Getting-Started), I decided to compile, link and debug the assembly code program within a Linux docker container to enable debugging options not supported on Mac OS. 

However, despite getting all of this set up, \`gdb\` was still failing to break during execution. It was reporting the following error: '
\`\`\`
warning: Error disabling address space randomization: Operation not permitted
\`\`\`
Sounds like \`gdb\` needs control over addressing space, but Docker is not permitting this control.

### How to Fix It
The suggestion found on [Stack Overflow](https://stackoverflow.com/questions/35860527/warning-error-disabling-address-space-randomization-operation-not-permitted) is to run Docker with option 
\`\`\`shell
docker run --cap-add=SYS_PTRACE --security-opt seccomp=unconfined
\`\`\`

Sure enough, including these options seemed to sort out \`gdb\`. Using these commands to run the Docker container shell, then using \`gdb\` enables \`gdb breakpoints\` to work: 
\`\`\`gdb
(gdb) disass _start
Dump of assembler code for function _start:
   0x00000000004000b0 <+0>:     mov    $0x1,%eax
   0x00000000004000b5 <+5>:     mov    $0x1,%edi
   0x00000000004000ba <+10>:    movabs $0x6000d8,%rsi
   0x00000000004000c4 <+20>:    mov    $0xe,%edx
   0x00000000004000c9 <+25>:    syscall
   0x00000000004000cb <+27>:    mov    $0x3c,%eax
   0x00000000004000d0 <+32>:    xor    %rdi,%rdi
   0x00000000004000d3 <+35>:    syscall
End of assembler dump.
(gdb) break *0x4000b0
Breakpoint 1 at 0x4000b0: file hellow.asm, line 8.
(gdb) run
Starting program: /app/hw
Breakpoint 1, _start () at hellow.asm:8
8         mov rax, 1
(gdb)
\`\`\`

Unfortunately, there still seemed to be a problem. When attempting to step through a program, I was getting strange behaviour: 
\`\`\`gdb
Breakpoint 1, 0x0000000000400110 in _start ()
(gdb) s
Single stepping until exit from function _start,
which has no line number information.
\`\`\`

I could not single step through the function _start.

After some digging, I found the reason for this strange behaviour. I found [here](https://docs.docker.com/engine/security/seccomp/) that \`seccomp\` profiles require \`seccomp 2.2.1\` which is not available on Ubuntu 14.04, Debian Wheezy, or Debian Jessie. Since my Docker base image at this time was using [Debian Jessie](https://github.com/tonyOreglia/unique-word-counter/blob/master/Dockerfile#L1) the \`seccomp\` option was having no effect. 

I was able to resolve this issue by switching my [base image](https://github.com/tonyOreglia/unique-word-counter/blob/master/Dockerfile) to Alpine Linux which supports seccomp 2.2.1. This worked great. See the Makefile [here](https://github.com/tonyOreglia/unique-word-counter/blob/master/Makefile) regarding how to build, run and debug within this type of Docker container.  


### Let's dig in a bit deeper, what are these options doing under the hood? 
\`\`\`shell
docker run --cap-add=SYS_PTRACE --security-opt seccomp=unconfined
\`\`\`
...What are \`cap-add\` and \`security-opt\` actually doing??

### cap-add
From [Docker Reference](https://docs.docker.com/engine/reference/run/#operator-exclusive-options), the \`--cap-add\` option allows the user to add Linux capabilities. The option \`SYS_PTRACE\` enables tracing arbitrary processes using ptrace(2). 

Finally, from the [Linux man page of ptrace](https://www.systutorials.com/docs/linux/man/2-ptrace/): 
\`\`\`
The ptrace() system call provides a means by which one process (the "tracer") may observe and control the execution of another process (the "tracee"), and examine and change the tracee's memory and registers. It is primarily used to implement breakpoint debugging and system call tracing.
\`\`\`

OK. This makes sense. GDB needs to use ptrace to set breakpoints, but by default, Docker doesn't allow the capability. 

### security-opt seccomp=unconfined
In regards to the other recommended option (\`--security-opt seccomp=unconfined\`), after a little digging, I found that you can override the default labelling scheme for each container by specifying the \`--security-opt\` flag. See [here](https://docs.docker.com/engine/reference/run/#security-configuration)

What is a labelling scheme in Docker? 

Docker labels are a mechanism for applying metadata to Docker objects, including:
* Images
* Containers
* Local daemons
* Volumes
* Networks
* Swarm nodes
* Swarm services


For more information about using GDB to debug assembly code, see [here](http://web.cecs.pdx.edu/~apt/cs491/gdb.pdf) and [here](https://www.cs.swarthmore.edu/~newhall/cs31/resources/ia32_gdb.php). Also [here](https://www.cs.umb.edu/~cheungr/cs341/Using_gdb_for_Assembly.pdf)
## [Next Page >>](/guidedebugwithdocker)
`;
