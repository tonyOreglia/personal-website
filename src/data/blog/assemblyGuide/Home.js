import { data } from "../index";
export const postInfo = data.find((post) => post.id === 1);
export const home = `
### Getting Started
1. [Getting Started with Writing Assembly on Mac](/guidegettingstarted)
2. [Enabling GDB to work within Docker](/guidegdb)
3. [Using Docker to Compile, Link, Run and Debug Assembly Language Code](/guidedebugwithdocker)
### Writing an x86-64 Assembly Language Programm
- [Part 1: Printing Command Line Arguments](/guideprinting)
- [Part 2: Sending Function Arguments and Receiving a Return Value](/guidefunctionparams)
- [Part 3: Conditionals, Jumping & How to Loop](/guideconditions)
- [Part 4: How to Calculate String Length](/guidestringlength)
### General Information 
 - [Quick Reference](/guidequickreference)
 - [Resources](/guideresources)
 - [Code from this guide](https://github.com/tonyOreglia/argument-counter)
 `;
