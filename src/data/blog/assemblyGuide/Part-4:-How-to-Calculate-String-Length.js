export const stringLength = `
# Writing an x86-64 Assembly Language Programm
### Part 4: How to Calculate String Length
In order to calculate the length of a string, we'll first need to know what determines the end of a given string. 

Strings in memory are represented as a pointer. The location pointed too is a byte of data representing a character followed by additional characters contiguous in memory. The important point is that this sequence of bytes is terminated by the byte \`0x00\`. This is called the zero-termination character. This is what determines the end of a string. 

For example, the string "HELLO WORLD!" might look like this in memory: 

| H | E | L | L | O | | W | O | R | L | D | ! | zero-termination character |
|----|----|----|----|----|----|----|----|----|----|----|----|----
| 0X48 | 0X45 | 0X4C | 0X4C | 0X4F | 0X20 | 0X57 | 0X4F | 0X52 | 0X4C |  0X44 | 0X21 | 0x00 |

So the length can be determined by looping through each byte of memory in a string until the zero-termination character is reached. Here is an example of how I implemented this: 

\`\`\`assembly
; expects * char array in $rdi
.strlen:
  mov rax, 1             ; initialize strlen counter
.loop:
  add rdi, 1              ; increment char * to next character
  add rax, 1              ; increment strlen counter
  cmp byte [rdi], 0x00    ; if value at [rdi] is 0x00 return
  jne .loop               ; loop if not at end of string
  ret
\`\`\`
## [Back to Home](/assembly)
`;
