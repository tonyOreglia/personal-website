export const gettingStarted = `
# Getting Started with Writing Assembly Code
Getting prepared to write assembly language can be a bit confusing. There are a number of tools that can compile 
and link assembly. It may not be obvious right away which tool works on your particular operating system, supports compiling to a machine binary that is compatible with your processor, and is compatible with a debugger. 

I tried a number of options around compiling, linking and debugging before finding a solution that worked well
* [gcc](http://gcc.gnu.org/onlinedocs/gcc/Invoking-GCC.html)
* [g++](https://linux.die.net/man/1/g++)
* [nasm](https://www.nasm.us/doc/)
* [yasm](http://yasm.tortall.net/releases/Release1.3.0.html)
* [ld](https://www.google.com.au/search?q=ld+linker+command+line&oq=ld+linker+command+line+&aqs=chrome..69i57j69i60l5.3435j1j7&sourceid=chrome&ie=UTF-8)
* [gdb](https://www.gnu.org/software/gdb/)
* [clang](https://clang.llvm.org/get_started.html)

I started with clang but had trouble getting the the linked executable to run. 

Next I tried a combination of \`nasm\` to compile and \`ld\` for linking. For example, 
\`\`\`
nasm -f macho64 -o hello_world.o hello_world.asm
ld hello_world.o -o hw
./hw
\`\`\`
This works well on a Mac until you need to debug. \`gdb\` is not able to step through a file linked from a macho64 object file. This blog post details a similar ordeal [here](https://lord.io/blog/2014/gdb-on-osx/). \`nasm\` does not support the macho debug format yet.

The blog linked above suggested using a virtual machine to run Linux whose supported assembly language formats have support for debugging via \`nasm\`. However, I did not want to run a heavy VM when a lighter docker container could do the job. 

I am going to use this example image for guidance [here](https://github.com/kellyi/nasm-gcc-container).

My goal is to use a live docker container to step through the assembly code. Update on how I go with that soon ... 

## [Next Page >>](/guidegdb)
`;
