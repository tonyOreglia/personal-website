import * as _ from "lodash";
import { data } from "../index";
export const postInfo = _.omit(
  data.find((post) => post.id === 1),
  "blogIcon"
);
export const quickReference = `
# Quick Reference

### Registers

General-purpose registers - there are 16 general-purpose registers - rax, rbx, rcx, rdx, rbp, rsp, rsi, rdi, r8, r9, r10, r11, r12, r13, r14, r15


*   \`data\`- section is used for declaring initialized data or constants
*   \`bss\`- section is used for declaring non initialized variables
*   \`text\`- section is used for code



*   \`rdi\`- first argument
*   \`rsi\`- second argument
*   \`rdx\`- third argument
*   \`rcx\`- fourth argument
*   \`r8\`- fifth argument
*   \`r9\`- sixth

The first six integer or pointer arguments are passed in registers RDI, RSI, RDX, RCX, R8, R9 (R10 is used as a static chain pointer in case of nested functions.

RAX is used as the return value from a funtion.

Preserved registers 
RBX, RBP, and R12–R15

All other registers must be saved by the caller if it wishes to preserve their values

## Operations 

*   \`ADD\`- integer add
*   \`SUB\`- substract
*   \`MUL\`- unsigned multiply
*   \`IMUL\`- signed multiply
*   \`DIV\`- unsigned divide
*   \`IDIV\`- signed divide
*   \`INC\`- increment
*   \`DEC\`- decrement
*   \`NEG\`- negate

The initial number must be stored in rax. rax can be multiplied by a value in any of the other registers. The result will be stored in rdx:rax.

## Control Flow 
\`JE\` - if equal
\`JZ\` - if zero
\`JNE\` - if not equal
\`JNZ\` - if not zero
\`JG\` - if first operand is greater than second
\`JGE\` - if first operand is greater or equal to second
\`JA\` - the same that JG, but performs unsigned comparison
\`JAE\` - the same that JGE, but performs unsigned comparison

## Data Types

The fundamental data types are bytes, words, doublewords, quadwords, and double quadwords. 
* \`byte\` is eight bits
* \`word\` is 2 bytes
* \`doubleword\` is 4 bytes
* \`quadword\` is 8 bytes
* \`double quadword\` is 16 bytes (128 bits).

# .data section 

### syntax
[variable-name] define-directive initial-value

There are five basic forms of the define directive −

|Directive|	Purpose|	Storage Space|
|-----|-----|-----
|DB|	Define Byte	|allocates 1 byte
|DW|	Define Word	|allocates 2 bytes
|DD|	Define Doubleword|	allocates 4 bytes
|DQ|	Define Quadword|allocates 8 bytes
|DT|	Define Ten Bytes	|allocates 10 bytes

for example
\`\`\`
choice		DB	'y'
number		DW	12345
\`\`\`

# GDB 
Display the value of ECX register which is a char pointer, e.g. print the string referred to: 
\`\`\`
display (char *) $ecx
\`\`\`
Note, this will display the value at every break of the program execution, including each step if you are stepping through. To stop the behaviour: 
\`\`\`
undisplay 1
\`\`\`
Note that the number may be 2, 3 or something else if you have multiple variables on display mode. 
`;
