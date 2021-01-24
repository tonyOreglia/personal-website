import * as _ from "lodash";
import { data } from "../index";
export const postInfo = _.omit(
  data.find((post) => post.id === 1),
  "blogIcon"
);
export const functionParams = `
# Writing an x86-64 Assembly Language Programm
### Part 2: Sending Function Arguments and Recieving Values Back
In the [previous post](https://github.com/tonyOreglia/unique-word-counter/wiki/x86-64-Linux-Assembly-Part-1:-Printing-Command-Line-Arguments) we saw how to define and call functions in x86-64 Linux Assembly. 

Now I wanted to know how to provide arguments to a function and return values. In other words, when this is done in a higher level language, how is it translated at the Assembly code level? 

The answer is pretty straightforward. In x86-64 Assembly, there is a convention defining which registers are defined to be used for the first, second, third and so forth. 

|Argument number | Register |
| ------ | ------| 
|Arg 1 | $ rdi |
| Arg 2 | $ rsi | 
| Arg 3 | $ rdx | 
| Arg 4 | $ rcx |
| Arg 5 | $ r8 |
| Arg 6 | $ r9 |
| Arg 7 | stack |

All further arguments are also pushed on to the stack. 

Return values are expected to be stored on in register \`$rax\`. 

Here is an example of code that utilized the conventional registers to use return values and pass arguments to print out a programs command line arguments: 
\`\`\`Assembly
section .data

section .text
    global _start
_start:
  call .getNumberOfArgs   ; expects return value in $rax
  mov rdi, rax
  call .printNumberOfArgs ; expects value to be in 1st argument, i.e. $rdi
  call .exit

.getNumberOfArgs:
  pop rbx         ; this is the address of the calling fxn. Remove it from the stack for a moment
  pop rax         ; get argc from stack
  push rbx        ; return address of calling fxn to stack
  ret

; expects value to be in 1st argument, i.e. $rdi
.printNumberOfArgs:
  pop rbx         ; this is the address of the calling fxn. Remove it from the stack for a moment
  add rdi, 48     ; convert number of args to ascii (only works if < 10)
  push rdi        ; push the ascii converted argc to stack
  mov rsi, rsp    ; store value of rsp, i.e. pointer to ascii argc to param2 of sys_write fxn
  mov rdx, 8      ; param3 of sys_write fxn is the number of bits to print
  push rbx        ; return the address of the calling fxn to top of stack.
  call .print
  ; clean up the number that was pushed onto the stack. Retaining the return address currently on top of stack
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

There are some additional well-defined calling conventions are helpful to follow. See [here](https://en.wikipedia.org/wiki/X86_calling_conventions).
## [Next Page >>](/guideconditions)
`;
