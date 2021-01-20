export const printing = `
# Writing an x86-64 Assembly Language Programm
### Part 1: Printing Command Line Arguments
My objective is to write an assembly program that counts the number of unique words in a text file whose name is provided as an argument. 

As a first step towards that goal, the program would need to access command line arguments. This first program is all about understanding how to access command line arguments using x86_64 Linux assembly. 

If you are new to assembly programming, I suggest this guide as a starting point to get up to scratch: [https://github.com/0xAX/asm](https://github.com/0xAX/asm). I won't be reviewing assembly language concepts here, but will rather be describing how I've built simple programs in x86_64 assembly. 

### What is a command line argument
Command line arguments are textual inputs the program users includes on the command line while executing a program. For example, if there is an executable program named \`a.out\`, it can be run on a Linux system from the command line with the command
\`\`\`
$ ./a.out
\`\`\`
Further to that, "command line arguments" can be included after the executable name. For example, 
\`\`\`
$ ./a.out 1 2 3
\`\`\`
In this case, there are three arguments: 1, 2 and 3.

### The Call Stack
First off, it will help to have an understanding of the call stack as this is where command line arguments are stored when a program begins executing. 

If you are not familiar, [the stack](https://en.wikipedia.org/wiki/Call_stack) is a Last In First Out (LIFO) data structure that resides in the computers RAM. The stack pointer keeps track of the "top" of the stack. In x86_64, the stack pointer is the register \`$rpi\`. \`$rpi\` is a pointer to the "Last In" memory address of the stack. The stack pointer can be used to access the stack, or two build in commands can be used: 
\`push\` and \`pop\`. \`push\` can be used to add a value to the stack, and update \`$rpi\` to point to this newly added value. \`pop\` can be used to get the "Last In" value from the stack, and update \`$rpi\` to point to the next value on the stack. The format of these commands is:
\`\`\`Assembly
   push   rcx  ; add the value of $rcx to the stack
   pop    rbx  ; pop the "Last In" stack value into $rbx. In this case, the value of $rcx
\`\`\`
Note that a semicolon is used to denote comments in Assembly language. Anything after \`;\` is ignored by the compiler.

### Accessing Command Line Arguments in x86-64 Assembly Language 
When a program begins execution, any command line arguments are stored on the stack. The top of the stack will hold the number of arguments. If you've programmed in \`c\` or \`c++\` this is referred to as \`argc\` in \`main()\` meaning argument count.

The second value on the stack is the function name. This is considered the first argument and is included in the argument count. In other words, if you provide no arguments when executing a program \`argc\` will be equal to one. 

If there were any arguments provided, these will be the next values on the stack. As an example, if you executed a program with the command
\`\`\`
./a.out arg1 arg2 arg3
\`\`\`

the stack would look as follows
#### The Stack
| THE STACK |
| --------- | 
| 4 | 
| a.out | 
| arg3 |
| arg2 | 
| arg1 |

The Stack Pointer ($rpi) would be pointing to the top of the stack, i.e. the memory address of the the \`argc\` value, 4. Of course, these values would all be encoded in binary. 

This program prints out \`argc\` and the program name with a newline inbetween: 
\`\`\`Assembly
section .data

section .text
    global _start
_start:
  call .printNumberOfArgs
  call .printNewline
  call .printArg
  call .printNewline
  call .exit

.printNumberOfArgs:
  pop rbx         ; this is the address of the calling fxn. Remove it from the stack for a moment so I can get to the argc
  pop rcx         ; get argc from stack
  add rcx, 48     ; convert number of args to ascii (only works if < 10)
  push rcx        ; push the ascii converted argc to stack
  mov rsi, rsp    ; store value of rsp, i.e. pointer to ascii argc to param2 of sys_write fxn
  mov rdx, 8      ; param3 of sys_write fxn is the number of bits to print
  push rbx        ; return the address of the calling fxn to top of stack.
  call .print
  ; clean up the newline character pushed onto the stack. Retaining the return address currently on top of stack
  pop rbx
  pop rcx
  push rbx
  ret

.printArg:
  pop rcx         ; this is the address of the calling fxn. Remove it from the stack for a moment so I can get to the argc       
  mov rsi, [rsp]  ; contents of memory address of stack pointer
  mov rdx, 7      ; how long is the message?
  push rcx        ; push return address back onto stack where it is expected
  jmp .print

.printNewline:
  pop rbx         ; this is the address of the calling fxn. Remove it from the stack for a moment so I can get to the argc
  push 10         ; ascii newline character
  mov rsi, rsp    ; rsp points to top of stack. Newline has been pushed to top of stack. rsi is where 2nd param of sys_write is stored
  push rbx        ; return the address of the calling fxn to top of stack.
  call .print
  ; clean up the newline character pushed onto the stack. Retaining the return address currently on top of stack
  pop rbx
  pop rcx
  push rbx
  ret
  
.print:           ; print expects the calling location to be at the top of the stack
  mov rax, 1
  mov rdi, 1
  syscall
  ret             ; return to location pointed to at top of stack

.exit:
  mov rax, 60
  mov rdi, 0
  syscall
\`\`\`

Note the use of push and pop to pull \`argc\` and the program name off the stack. 

Also important is the use of the \`call\` command. The is how one can call a funtion in assembly while saving the address of the line following the line that called the funtion. Then the \`ret\` command can be used to return to that line at any point. The pointer to the memory location of the line to return to is stored on the stack. Notice that this value is removed from the stack at time to enable access to the "buried" values, then it is pushed back onto the stack because that is where the \`ret\` command expects the memory address to be. 
## [Next Page >>](/guidefunctionparams)
`;
