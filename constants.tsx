
import { Topic } from './types';

export const C_TOPICS: Topic[] = [
  {
    id: 'history',
    category: 'Environment',
    title: 'History & Role of C',
    summary: 'From Bell Labs to modern Operating Systems.',
    content: `C was created by Dennis Ritchie at Bell Labs in the early 1970s. It was designed to build the Unix operating system, replacing assembly language with something more portable yet just as powerful.

Role of C today:
- **Operating Systems**: Windows, macOS, and Linux kernels are written almost entirely in C.
- **Embedded Systems**: Most microcontrollers (in cars, appliances, etc.) are programmed in C.
- **Performance Critical**: Game engines and high-frequency trading platforms use C for its raw speed.

C Standards:
- **K&R C**: The original 1978 version.
- **C89/C90 (ANSI C)**: The first standardized version.
- **C99**: Introduced variable-length arrays and 'long long' types.
- **C11/C17**: Modern versions focusing on safety and multi-threading.`,
    codeExample: `/* C code is the bridge between humans and hardware */
#include <stdio.h>

int main() {
    printf("The C language has powered the world for 50+ years.\\n");
    return 0;
}`
  },
  {
    id: 'compilation',
    category: 'Environment',
    title: 'Program Structure & Compilation',
    summary: 'How C code turns into machine-executable software.',
    content: `A C program isn't just one file; it's a series of transformations.

1. **Preprocessing**: Handled by the Preprocessor. It expands macros and includes header files (#include).
2. **Compilation**: The compiler translates C code into Assembly code.
3. **Assembly**: The assembler translates assembly into Object Code (machine code).
4. **Linking**: The linker combines object files and library functions (like printf) into a final .exe or .out file.

Program Structure:
- **Headers**: Link to external functions.
- **Main()**: The entry point. Every C program must have exactly one.
- **Body**: Statements and logic inside curly braces.`,
    codeExample: `#include <stdio.h> // Header inclusion

// Entry point of the program
int main() {
    // Statement inside the body
    printf("Compiling... Linking... Running!\\n");
    
    return 0; // Return code to OS (0 = Success)
}`
  },
  {
    id: 'tokens',
    category: 'Basics',
    title: 'Tokens, Keywords & Identifiers',
    summary: 'The building blocks of C source code.',
    content: `In C, every piece of code is a **Token**. There are six types:
1. **Keywords**: Reserved words (e.g., int, return, if) that have special meanings.
2. **Identifiers**: Names you give to variables or functions. They must start with a letter or underscore.
3. **Constants**: Values that don't change (e.g., 5, 3.14).
4. **Strings**: Sequences of characters (e.g., "Hello").
5. **Special Symbols**: [], (), {}, ,, ;, etc.
6. **Operators**: +, -, *, /, etc.

Rules for Identifiers:
- Cannot be a keyword.
- No special characters except underscore (_).
- Cannot start with a digit.`,
    codeExample: `int main() {
    int _myVar = 10; // Valid identifier
    int 1var = 5;    // INVALID (Starts with digit)
    int int = 2;     // INVALID (Keyword)
    
    return 0;
}`
  },
  {
    id: 'data-types-limits',
    category: 'Basics',
    title: 'Data Types & limits.h',
    summary: 'Understanding storage capacity and precision.',
    content: `C is strictly typed. You must declare the size and type of data before using it.

Primary Types:
- **int**: Typically 4 bytes. Used for whole numbers.
- **char**: 1 byte. Used for characters or small integers.
- **float/double**: Used for decimals. Double has higher precision.
- **_Bool**: Boolean values (true/false).
- **void**: Represents the absence of a value.

The header <limits.h> defines the minimum and maximum values for your system. For example, INT_MAX tells you the largest number an integer can hold.`,
    codeExample: `#include <stdio.h>
#include <limits.h>

int main() {
    printf("Max Integer: %d\\n", INT_MAX);
    printf("Min Integer: %d\\n", INT_MIN);
    printf("Size of char: %zu byte\\n", sizeof(char));
    
    return 0;
}`
  },
  {
    id: 'io-pitfalls',
    category: 'Basics',
    title: 'Input/Output Pitfalls',
    summary: 'Mastering scanf and printf formatting.',
    content: `Standard I/O uses format specifiers:
- %d (integer)
- %f (float)
- %c (character)
- %s (string)

**Common Pitfalls:**
- **Missing &**: In scanf, you must pass the address of the variable: \`scanf("%d", &var)\`.
- **Buffer Overflow**: %s in scanf doesn't check length. It can overwrite memory.
- **Newline issues**: Reading a char after a number often fails because scanf leaves the '\\n' in the input buffer.`,
    codeExample: `#include <stdio.h>

int main() {
    int age;
    char grade;

    printf("Enter age: ");
    scanf("%d", &age); // Need '&' for scanf!

    // Buffer clearing tip: ' ' before %c skips whitespace/newlines
    printf("Enter grade: ");
    scanf(" %c", &grade); 

    printf("Age: %d, Grade: %c\\n", age, grade);
    return 0;
}`
  },
  {
    id: 'precedence',
    category: 'Control Flow',
    title: 'Precedence & Associativity',
    summary: 'Solving the math puzzle in your expressions.',
    content: `When you have multiple operators in one line, C uses a hierarchy to decide what happens first.

1. **Parentheses**: () always goes first.
2. **Postfix**: x++, x--
3. **Prefix/Unary**: ++x, --x, !, (type) cast, sizeof
4. **Multiplicative**: *, /, %
5. **Additive**: +, -
6. **Relational**: <, >, <=, >=
7. **Equality**: ==, !=
8. **Logical**: && before ||
9. **Assignment**: = (lowest, moves right-to-left)

**Associativity**: If operators have the same level (like + and -), they follow a direction (usually Left-to-Right).`,
    codeExample: `#include <stdio.h>

int main() {
    int result = 10 + 5 * 2;   // 20, not 30 (Multiplication first)
    int nested = (10 + 5) * 2; // 30 (Parentheses first)
    
    int a = 1, b = 2, c = 3;
    // Assignment is Right-to-Left
    a = b = c; 
    printf("a: %d, b: %d, c: %d\\n", a, b, c); // All are 3
    
    return 0;
}`
  },
  {
    id: 'storage-classes',
    category: 'Functions',
    title: 'Storage Classes',
    summary: 'Defining variable scope, visibility, and lifetime.',
    content: `Storage classes tell C where to store a variable and how long it should live.

1. **auto**: The default for local variables. Stored on the stack.
2. **register**: A hint to the compiler to store the variable in a CPU register for speed (rarely used now).
3. **static**:
   - Inside function: Retains its value between function calls.
   - Outside function: Restricts variable visibility to just that file.
4. **extern**: Used to access a global variable defined in another file.`,
    codeExample: `#include <stdio.h>

void counter() {
    static int count = 0; // Initialized once
    count++;
    printf("Count: %d\\n", count);
}

int main() {
    counter(); // Count: 1
    counter(); // Count: 2
    counter(); // Count: 3
    return 0;
}`
  },
  {
    id: 'pointer-arithmetic',
    category: 'Advanced',
    title: 'Pointer Arithmetic',
    summary: 'Moving through memory blocks manually.',
    content: `A pointer is just a memory address (a number). In C, you can do math with these numbers.

- **ptr + 1**: Doesn't add 1 byte; it adds the size of the data type (e.g., 4 bytes for int).
- **ptr++**: Moves the pointer to the next element in an array.
- **ptr1 - ptr2**: Tells you how many elements are between two pointers.

This is why arrays and pointers are so closely linked. \`arr[i]\` is actually converted to \`*(arr + i)\` by the compiler.`,
    codeExample: `#include <stdio.h>

int main() {
    int arr[3] = {10, 20, 30};
    int *ptr = arr; // points to 10

    printf("Value: %d, Address: %p\\n", *ptr, ptr);
    
    ptr++; // Moves by 4 bytes (size of int)
    printf("Value: %d, Address: %p\\n", *ptr, ptr);

    // Pointer subtraction
    int *last = &arr[2];
    printf("Elements away: %ld\\n", last - arr); // 2
    
    return 0;
}`
  },
  {
    id: 'struct-padding',
    category: 'Data Structures',
    title: 'Struct Padding & Alignment',
    summary: 'The hidden spaces inside your data structures.',
    content: `CPUs read memory in blocks (usually 4 or 8 bytes). To make reading faster, C "aligns" data. 

If you put a \`char\` (1 byte) followed by an \`int\` (4 bytes), C might insert 3 "garbage" bytes between them so the integer starts at a 4-byte boundary.

**Pitfall**: Struct size is often larger than the sum of its parts.
**Tip**: Sort your struct members from largest to smallest to minimize wasted space.`,
    codeExample: `#include <stdio.h>

struct Wasted {
    char a;   // 1 byte
    // 3 bytes padding here
    int b;    // 4 bytes
    char c;   // 1 byte
    // 3 bytes padding here
}; // Total: 12 bytes!

struct Optimized {
    int b;    // 4 bytes
    char a;   // 1 byte
    char c;   // 1 byte
    // 2 bytes padding here
}; // Total: 8 bytes!

int main() {
    printf("Size Wasted: %zu\\n", sizeof(struct Wasted));
    printf("Size Optimized: %zu\\n", sizeof(struct Optimized));
    return 0;
}`
  },
  {
    id: 'bitwise-low-level',
    category: 'Advanced',
    title: 'Bitwise & Low-Level',
    summary: 'Manipulating individual bits for hardware control.',
    content: `Bitwise operators work on binary bits of integers.
- **& (AND)**: 1 if both bits are 1.
- **| (OR)**: 1 if either bit is 1.
- **^ (XOR)**: 1 if bits are different.
- **~ (NOT)**: Flips all bits.
- **<< (Shift Left)**: Multiplies by 2.
- **>> (Shift Right)**: Divides by 2.

**Bitfields**: C allows you to define struct members that use exactly a certain number of bits, perfect for interacting with hardware registers.`,
    codeExample: `#include <stdio.h>

struct Register {
    unsigned int status : 1; // Only 1 bit!
    unsigned int error  : 1;
    unsigned int data   : 6;
};

int main() {
    int a = 5; // 0101
    int b = 9; // 1001
    
    printf("a & b: %d\\n", a & b); // 0001 = 1
    printf("a << 1: %d\\n", a << 1); // 1010 = 10
    
    struct Register r = {1, 0, 42};
    printf("Register data: %u\\n", r.data);
    
    return 0;
}`
  },
  {
    id: 'memory-model',
    category: 'Advanced',
    title: 'C Memory Model',
    summary: 'Stack vs Heap vs Data vs Code.',
    content: `Your program's memory is divided into segments:
1. **Text (Code)**: Stores the instructions (Read-only).
2. **Data**: Stores initialized global and static variables.
3. **BSS**: Stores uninitialized global and static variables (set to 0 by OS).
4. **Stack**: Stores local variables and function call info. Grows and shrinks automatically (Last-In-First-Out).
5. **Heap**: Dynamic memory you request via \`malloc\`. Managed manually by you.

**Memory Leaks**: Occur when you allocate on the Heap but forget to free, eventually filling up RAM.`,
    codeExample: `#include <stdio.h>
#include <stdlib.h>

int global_var = 10; // Data Segment

int main() {
    int stack_var = 5; // Stack
    int *heap_var = malloc(sizeof(int)); // Heap
    
    *heap_var = 20;
    
    printf("Stack: %p\\n", &stack_var);
    printf("Heap:  %p\\n", heap_var);
    printf("Data:  %p\\n", &global_var);
    
    free(heap_var); // Crucial for heap!
    return 0;
}`
  },
  {
    id: 'error-handling',
    category: 'Standard Library',
    title: 'Error Handling & <errno.h>',
    summary: 'Handling crashes and failures gracefully.',
    content: `C doesn't have "Exceptions" like Java (try/catch). It uses return values and global error codes.

- **Return Codes**: Functions usually return -1 or NULL on failure.
- **errno**: A global variable that holds a code indicating *why* the last function failed.
- **perror()**: Prints a human-readable message for the current errno.
- **assert()**: Used during development to crash the program if a condition isn't met (checks for logic errors).`,
    codeExample: `#include <stdio.h>
#include <errno.h>
#include <string.h>
#include <assert.h>

int main() {
    FILE *f = fopen("nonexistent.txt", "r");
    
    if (f == NULL) {
        printf("Error code: %d\\n", errno);
        printf("Message: %s\\n", strerror(errno));
        perror("File Open Failed");
    }

    int x = 5;
    assert(x == 5); // If x was 4, program would abort here
    
    return 0;
}`
  },
  {
    id: 'tooling-debuggers',
    category: 'Environment',
    title: 'Tooling & Debugging (GDB)',
    summary: 'Finding the bugs before they find you.',
    content: `Writing code is only 50% of the job. Tooling helps with the rest.

- **Makefiles**: Automate the build process for large projects.
- **GDB (GNU Debugger)**: Allows you to stop your program in the middle, look at variable values, and step through line by line.
- **Valgrind**: A tool for detecting memory leaks and illegal memory access.
- **Static Analysis**: Tools like 'cppcheck' look at your code for errors without running it.

Key GDB commands:
- \`run\`: Start program.
- \`break main\`: Stop at main.
- \`print var\`: Show value.
- \`next\`: Go to next line.`,
    codeExample: `/* To debug, compile with -g flag: 
   gcc -g main.c -o program
   Then run: gdb ./program
*/
#include <stdio.h>

int main() {
    int x = 10;
    int y = 0;
    
    // Imagine debugging this crash in GDB
    // int z = x / y; 
    
    printf("Hello GDB!\\n");
    return 0;
}`
  },
  {
    id: 'macros-advanced',
    category: 'Advanced',
    title: 'Advanced Macros (# and ##)',
    summary: 'Code generation and stringification.',
    content: `Macros can do more than just replace numbers.
- **Stringification (#)**: Converts a macro argument into a string constant.
- **Token Pasting (##)**: Joins two tokens together to create a new identifier name.

**Pitfalls**: 
- Macros don't check types.
- Side effects: \`SQUARE(x++)\` will increment x twice!
- Always wrap macro arguments in parentheses: \`#define MULT(a, b) ((a) * (b))\`.`,
    codeExample: `#include <stdio.h>

// Stringification
#define PRINT_VAR(x) printf(#x " is %d\\n", x)

// Token Pasting
#define MAKE_VAR(n) int var_##n = n

int main() {
    int age = 25;
    PRINT_VAR(age); // prints "age is 25"
    
    MAKE_VAR(100); // creates "int var_100 = 100"
    printf("var_100: %d\\n", var_100);
    
    return 0;
}`
  }
];
