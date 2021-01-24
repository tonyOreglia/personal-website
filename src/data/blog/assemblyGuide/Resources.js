import * as _ from "lodash";
import { data } from "../index";
export const postInfo = _.omit(
  data.find((post) => post.id === 1),
  "blogIcon"
);
export const resources = `
# Resources
## Tutorials
##### NASM
* [NASM Tutorial](http://cs.lmu.edu/~ray/notes/nasmtutorial/)
* [NASM tutorial](http://cs.lmu.edu/~ray/notes/nasmtutorial/)
* [Running Assembly on OS X](https://lord.io/blog/2014/assembly-on-osx/)
##### GDB
* [GDB on OS X](https://lord.io/blog/2014/gdb-on-osx/)
##### ASSEMBLY
* [Say Hello to Assembly (Linux x64)](https://github.com/0xAX/asm)
* [Assembly - Basic Syntax](https://www.tutorialspoint.com/assembly_programming/assembly_basic_syntax.htm)
* [x86-64 Assembly](http://ian.seyler.me/easy_x86-64/)
* [Intro to x64 by Intel](https://software.intel.com/en-us/articles/introduction-to-x64-assembly)
* [Video Series on x86_64 Linux Assembly](https://www.youtube.com/watch?v=VQAKkuLL31g)
#### DOCKER
* [Why and How to Use Docker for Development](https://medium.com/travis-on-docker/why-and-how-to-use-docker-for-development-a156c1de3b24)

# References
#### NASM
* [x86_64 NASM Assembly Quick Reference](https://www.cs.uaf.edu/2009/fall/cs301/support/x86_64/index.html)
#### LD LINKER
* [ld Linker Man Page](https://github.com/kellyi/nasm-gcc-container)
#### ASSEMBLY
* [X86-64 Assembly Programming](https://www.engr.mun.ca/~anderson/teaching/8894/reference/x86-assembly/)
* [X86-64 w/ Ubuntu](http://www.egr.unlv.edu/~ed/assembly64.pdf)
* Intel® 64 and IA-32 Architectures Software Developer’s Manual [Part 1](https://www.cs.uaf.edu/2009/fall/cs301/support/x86_64/instructionsAM.pdf), [Part 2](https://www.cs.uaf.edu/2009/fall/cs301/support/x86_64/instructionsNZ.pdf)
* [Calling Conventions](https://en.wikipedia.org/wiki/X86_calling_conventions)
* [Linux System Call Table](http://blog.rchapman.org/posts/Linux_System_Call_Table_for_x86_64/)
#### CALL STACK
* [Wikipedia](https://en.wikipedia.org/wiki/Call_stack)

# Utilities
#### Docker
* [Docker container configured for writing NASM x86 Assembly & C](https://github.com/kellyi/nasm-gcc-container)
`;
