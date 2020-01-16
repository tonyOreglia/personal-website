export const conditionsAndLooping = `
## Conditionals and Looping
Looping is a specific application of jumping on a conditional. Essentially this post is about writing conditional statements to branch one of two ways depending on some condition. 

The core conditional operator is \`cmp\` for compare. The \`cmp\` operator compares two values and then sets a number of flags indicating the relation of those two values. Flags can be checked using a number of operators, namely: 
JE - jump if equal
JZ - jump if zero
JNE - jump if not equal
JNZ - jump if not zero
JG - jump if first operand is greater than second
JGE - jump if first operand is greater or equal to second
JA - JG, but performs unsigned comparison
JAE - JGE, but performs unsigned comparison

To loop, a function simply calls itself based on the outcome of a conditional statement. Of course, at some point the condition must break the loop to avoid an infinite cycle. 

Here is an example of a function used to print a list of arguments from the stack: 

\`\`\`Assembly
.printAllArgs:
  call .printNewline   ; fxn prints newline
  pop r11              ; pop address of the calling fxn. Remove temporarily
  mov rsi, [rsp]       ; stack pointer memory address. Holding argument to print. 
  mov rdx, 8           ; how long is the message. TO DO: calculate argument length
  push r11             ; push return address back onto the stack
  call .print
  pop r11              ; pop return address
  pop rcx              ; this is the already printed arg
  push r11             ; push return address back onto the stack
  sub rbx, 1           ; rbx is the argument count. Iterate down 1
  cmp rbx, 0           ; are there zero args left to print? 
  jne .printAllArgs    ; if more args to print, loop again
  call .printNewline   ; otherwise print Newline and return
  ret
\`\`\`
## [Next Page >>](/guidestringlength)
`
