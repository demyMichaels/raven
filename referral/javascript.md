<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Pointer Exercises - From C++ to JS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/11.1.1/marked.min.js"></script>
    <style>
        /* Dark mode support */
        .dark {
            color-scheme: dark;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-track {
            background: transparent;
        }

        ::-webkit-scrollbar-thumb {
            background: #5D5CDE;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #4B4AB8;
        }

        /* Code editor styling */
        .code-editor {
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 14px;
            line-height: 1.6;
            tab-size: 2;
        }

        /* Output area styling */
        .output-area {
            white-space: pre-wrap;
            word-wrap: break-word;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 13px;
        }

        /* Exercise card animation */
        .exercise-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .exercise-card:hover {
            transform: translateY(-2px);
        }

        /* Button pulse animation */
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.8;
            }
        }

        .btn-run {
            transition: all 0.2s ease;
        }

        .btn-run:hover {
            transform: scale(1.02);
        }

        .btn-run:active {
            transform: scale(0.98);
        }

        /* Syntax highlighting */
        .keyword { color: #5D5CDE; }
        .string { color: #0ea5e9; }
        .comment { color: #6b7280; font-style: italic; }
        .number { color: #f59e0b; }

        /* Toggle button styling */
        .toggle-btn {
            transition: all 0.3s ease;
        }

        .toggle-btn.active {
            background-color: #5D5CDE;
            color: white;
        }
    </style>
</head>
<body class="bg-white dark:bg-[#181818] text-gray-900 dark:text-gray-100 transition-colors duration-200">

    <!-- Header -->
    <header class="bg-gradient-to-r from-[#5D5CDE] to-[#7B7AEE] text-white shadow-lg">
        <div class="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <h1 class="text-3xl sm:text-4xl font-bold">JavaScript Reference Exercises</h1>
            <p class="mt-2 text-base sm:text-lg text-purple-100">Adapting C++ Pointer Concepts to JavaScript</p>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        <!-- Introduction -->
        <div class="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
            <h2 class="text-xl font-bold mb-3 text-blue-900 dark:text-blue-300">📚 About These Exercises</h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                These exercises are adapted from classic C++ pointer exercises. While JavaScript doesn't have
                pointers in the traditional sense, it has its own reference semantics for objects and arrays.
                These exercises will help you understand how JavaScript handles references, memory, and data types.
            </p>
        </div>

        <!-- Exercise 1 -->
        <div class="exercise-card mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                <h2 class="text-xl font-bold text-white">Exercise 1: Variable Declarations</h2>
                <p class="text-purple-100 mt-1">C++: Declare pointers, arrays, references, and constants</p>
            </div>
            <div class="p-6">
                <div class="mb-4 text-gray-700 dark:text-gray-300">
                    <h3 class="font-semibold text-lg mb-2">Original C++ Task:</h3>
                    <p class="mb-4">Declare: a pointer to a character, an array of 10 integers, a reference to an array of 10 integers,
                    a pointer to an array of character strings, a pointer to a pointer to a character, a constant integer,
                    a pointer to a constant integer, and a constant pointer to an integer.</p>

                    <h3 class="font-semibold text-lg mb-2 mt-6">JavaScript Equivalent:</h3>
                    <p class="mb-4">In JavaScript, we work with references for objects and arrays. Here's how we translate these concepts:</p>
                </div>

                <div class="mb-4">
                    <div class="flex gap-2 mb-3">
                        <button onclick="runExercise1()" class="btn-run px-6 py-2 bg-[#5D5CDE] text-white rounded-lg font-medium shadow-md hover:shadow-lg">
                            ▶ Run Solution
                        </button>
                        <button onclick="clearOutput('output1')" class="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500">
                            Clear
                        </button>
                    </div>

                    <textarea id="code1" class="code-editor w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-base focus:ring-2 focus:ring-[#5D5CDE] focus:border-transparent" rows="16" spellcheck="false">// JavaScript equivalents to C++ pointer declarations

// 1. Pointer to character → String or single character
let charRef = 'A';

// 2. Array of 10 integers
let intArray = new Array(10).fill(0);
// Or: let intArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// 3. Reference to array (objects are always passed by reference)
let arrayRef = intArray;

// 4. Array of strings (like pointer to array of char strings)
let stringArray = ["hello", "world", "javascript"];

// 5. Nested object reference (like pointer to pointer)
let nestedRef = { value: { char: 'B' } };

// 6. Constant value (can't reassign)
const constantInt = 42;

// 7. Object with constant property (like pointer to const)
const objWithConstProp = Object.freeze({ value: 100 });

// 8. Const reference to mutable object (like const pointer to int)
const constRefToObj = { value: 200 };
// constRefToObj = {}; // Error! Can't reassign
// constRefToObj.value = 300; // OK! Can modify properties

console.log("1. Character reference:", charRef);
console.log("2. Integer array:", intArray);
console.log("3. Array reference:", arrayRef);
console.log("4. String array:", stringArray);
console.log("5. Nested reference:", nestedRef);
console.log("6. Constant integer:", constantInt);
console.log("7. Frozen object:", objWithConstProp);
console.log("8. Const ref to mutable obj:", constRefToObj);</textarea>

                    <div class="mt-3 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600">
                        <div class="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">Output:</div>
                        <div id="output1" class="output-area text-gray-800 dark:text-gray-200 min-h-[60px]"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Exercise 2 -->
        <div class="exercise-card mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div class="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                <h2 class="text-xl font-bold text-white">Exercise 2: Type Restrictions & Memory Alignment</h2>
                <p class="text-green-100 mt-1">C++: Pointer alignment restrictions</p>
            </div>
            <div class="p-6">
                <div class="mb-4 text-gray-700 dark:text-gray-300">
                    <h3 class="font-semibold text-lg mb-2">Original C++ Task:</h3>
                    <p class="mb-4">What are the restrictions on pointer types char*, int*, and void*? (alignment, odd values, etc.)</p>

                    <h3 class="font-semibold text-lg mb-2 mt-6">JavaScript Equivalent:</h3>
                    <p class="mb-4">JavaScript abstracts memory management, but we can explore type restrictions and memory concepts using TypedArrays and ArrayBuffers:</p>
                </div>

                <div class="mb-4">
                    <div class="flex gap-2 mb-3">
                        <button onclick="runExercise2()" class="btn-run px-6 py-2 bg-[#5D5CDE] text-white rounded-lg font-medium shadow-md hover:shadow-lg">
                            ▶ Run Solution
                        </button>
                        <button onclick="clearOutput('output2')" class="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500">
                            Clear
                        </button>
                    </div>

                    <textarea id="code2" class="code-editor w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-base focus:ring-2 focus:ring-[#5D5CDE] focus:border-transparent" rows="20" spellcheck="false">// JavaScript type system and memory alignment

// JavaScript uses automatic memory management
// TypedArrays provide low-level access similar to C++ pointers

// 1. Create a buffer (raw memory)
const buffer = new ArrayBuffer(16); // 16 bytes

// 2. Different typed views (like different pointer types)
const int8View = new Int8Array(buffer);    // 8-bit integers
const int32View = new Int32Array(buffer);  // 32-bit integers
const float64View = new Float64Array(buffer); // 64-bit floats

console.log("Buffer size:", buffer.byteLength, "bytes");
console.log("Int8 array length:", int8View.length, "elements");
console.log("Int32 array length:", int32View.length, "elements");
console.log("Float64 array length:", float64View.length, "elements");

// 3. Alignment matters for TypedArrays
console.log("\n--- Alignment Requirements ---");
console.log("Int8Array: 1-byte alignment");
console.log("Int32Array: 4-byte alignment");
console.log("Float64Array: 8-byte alignment");

// 4. Type restrictions in JavaScript
console.log("\n--- Type System ---");
console.log("JavaScript is dynamically typed");
console.log("typeof 42:", typeof 42);
console.log("typeof 'hello':", typeof 'hello');
console.log("typeof {}:", typeof {});
console.log("typeof []:", typeof []);
console.log("typeof null:", typeof null, "(historical bug!)");

// 5. Number precision
console.log("\n--- Number Precision ---");
console.log("Max safe integer:", Number.MAX_SAFE_INTEGER);
console.log("Min safe integer:", Number.MIN_SAFE_INTEGER);
console.log("Can store: ±2^53 - 1 safely");

// 6. Memory and references
let obj1 = { value: 10 };
let obj2 = obj1; // Both reference the same object
obj2.value = 20;
console.log("\n--- Reference Behavior ---");
console.log("obj1.value:", obj1.value); // 20 (same reference!)</textarea>

                    <div class="mt-3 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600">
                        <div class="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">Output:</div>
                        <div id="output2" class="output-area text-gray-800 dark:text-gray-200 min-h-[60px]"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Exercise 3 -->
        <div class="exercise-card mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                <h2 class="text-xl font-bold text-white">Exercise 3: Type Definitions (typedef)</h2>
                <p class="text-orange-100 mt-1">C++: Using typedef for custom types</p>
            </div>
            <div class="p-6">
                <div class="mb-4 text-gray-700 dark:text-gray-300">
                    <h3 class="font-semibold text-lg mb-2">Original C++ Task:</h3>
                    <p class="mb-4">Use typedef to define various pointer and array types.</p>

                    <h3 class="font-semibold text-lg mb-2 mt-6">JavaScript Equivalent:</h3>
                    <p class="mb-4">JavaScript doesn't have typedef, but we can use JSDoc comments, factory functions, and type aliases for documentation:</p>
                </div>

                <div class="mb-4">
                    <div class="flex gap-2 mb-3">
                        <button onclick="runExercise3()" class="btn-run px-6 py-2 bg-[#5D5CDE] text-white rounded-lg font-medium shadow-md hover:shadow-lg">
                            ▶ Run Solution
                        </button>
                        <button onclick="clearOutput('output3')" class="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500">
                            Clear
                        </button>
                    </div>

                    <textarea id="code3" class="code-editor w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-base focus:ring-2 focus:ring-[#5D5CDE] focus:border-transparent" rows="22" spellcheck="false"></textarea>
                    <script>
                        // Initialize code3 textarea with content
                        document.getElementById('code3').value = `// JavaScript type definitions using JSDoc and factory functions

/**
 * @typedef {number} UnsignedChar - 8-bit unsigned integer (0-255)
 * @typedef {Readonly<number>} ConstUnsignedChar - Constant unsigned char
 * @typedef {Object} IntPointer - Reference to integer
 * @typedef {Object} CharPtrPtr - Nested reference (pointer to pointer)
 * @typedef {string[]} CharArrayPtr - Array of strings
 * @typedef {IntPointer[]} IntPtrArray7 - Array of 7 integer references
 * @typedef {IntPtrArray7[]} IntPtrArray8x7 - Array of 8 arrays
 */

// Factory functions to create typed structures
const createUnsignedChar = (value) => Math.max(0, Math.min(255, value));
const createIntPointer = (value) => ({ value });
const createCharPtrPtr = (char) => ({ ptr: { char } });

// Example usage
const byte = createUnsignedChar(200);
console.log("UnsignedChar:", byte);

const intPtr = createIntPointer(42);
console.log("IntPointer:", intPtr);

const charPtrPtr = createCharPtrPtr('X');
console.log("CharPtrPtr:", charPtrPtr);

// Array of strings (char array pointer)
const stringArray = ["hello", "world", "test"];
console.log("StringArray:", stringArray);

// Array of 7 integer references
const intPtrArray = Array(7).fill(null).map((_, i) => createIntPointer(i * 10));
console.log("IntPtrArray7:", intPtrArray);

// Array of 8 arrays of 7 integer references
const matrix = Array(8).fill(null).map((_, i) =>
    Array(7).fill(null).map((_, j) => createIntPointer(i * 10 + j))
);
console.log("IntPtrArray8x7 dimensions:", matrix.length, "x", matrix[0].length);
console.log("Sample value [3][4]:", matrix[3][4]);</textarea>

                    <div class="mt-3 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600">
                        <div class="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">Output:</div>
                        <div id="output3" class="output-area text-gray-800 dark:text-gray-200 min-h-[60px]"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Exercise 4 -->
        <div class="exercise-card mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div class="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                <h2 class="text-xl font-bold text-white">Exercise 4: Swap Function</h2>
                <p class="text-red-100 mt-1">C++: Pass by pointer vs pass by reference</p>
            </div>
            <div class="p-6">
                <div class="mb-4 text-gray-700 dark:text-gray-300">
                    <h3 class="font-semibold text-lg mb-2">Original C++ Task:</h3>
                    <p class="mb-4">Write a swap function using pointers (int*) and another using references (int&).</p>

                    <h3 class="font-semibold text-lg mb-2 mt-6">JavaScript Equivalent:</h3>
                    <p class="mb-4">JavaScript primitives are passed by value. To swap, we need to use objects, arrays, or return values:</p>
                </div>

                <div class="mb-4">
                    <div class="flex gap-2 mb-3">
                        <button onclick="runExercise4()" class="btn-run px-6 py-2 bg-[#5D5CDE] text-white rounded-lg font-medium shadow-md hover:shadow-lg">
                            ▶ Run Solution
                        </button>
                        <button onclick="clearOutput('output4')" class="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500">
                            Clear
                        </button>
                    </div>

                    <textarea id="code4" class="code-editor w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-base focus:ring-2 focus:ring-[#5D5CDE] focus:border-transparent" rows="24" spellcheck="false">// JavaScript swap implementations

// Method 1: Using objects (simulates pointers)
function swapWithObject(obj1, obj2, key = 'value') {
    const temp = obj1[key];
    obj1[key] = obj2[key];
    obj2[key] = temp;
}

// Method 2: Using array (simulates pointer arithmetic)
function swapInArray(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Method 3: Return tuple (destructuring)
function swapAndReturn(a, b) {
    return [b, a];
}

// Method 4: Modern ES6 array destructuring
function swapModern(a, b) {
    [a, b] = [b, a];
    return [a, b];
}

// Testing Method 1: Object swap
console.log("--- Method 1: Object Swap ---");
let num1 = { value: 10 };
let num2 = { value: 20 };
console.log("Before:", num1.value, num2.value);
swapWithObject(num1, num2);
console.log("After:", num1.value, num2.value);

// Testing Method 2: Array swap
console.log("\n--- Method 2: Array Swap ---");
let arr = [5, 15, 25];
console.log("Before:", arr);
swapInArray(arr, 0, 2);
console.log("After:", arr);

// Testing Method 3: Return tuple
console.log("\n--- Method 3: Return Values ---");
let x = 100, y = 200;
console.log("Before:", x, y);
[x, y] = swapAndReturn(x, y);
console.log("After:", x, y);

// Testing Method 4: Modern destructuring
console.log("\n--- Method 4: Destructuring ---");
let p = 7, q = 13;
console.log("Before:", p, q);
[p, q] = swapModern(p, q);
console.log("After:", p, q);</textarea>

                    <div class="mt-3 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600">
                        <div class="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">Output:</div>
                        <div id="output4" class="output-area text-gray-800 dark:text-gray-200 min-h-[60px]"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Exercise 5 -->
        <div class="exercise-card mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <h2 class="text-xl font-bold text-white">Exercise 5: Array Size vs String Length</h2>
                <p class="text-blue-100 mt-1">C++: Understanding sizeof vs strlen</p>
            </div>
            <div class="p-6">
                <div class="mb-4 text-gray-700 dark:text-gray-300">
                    <h3 class="font-semibold text-lg mb-2">Original C++ Task:</h3>
                    <p class="mb-4">What is the size of <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">char str[] = "a short string";</code>?
                    What is the length of the string "a short string"?</p>

                    <h3 class="font-semibold text-lg mb-2 mt-6">JavaScript Equivalent:</h3>
                    <p class="mb-4">In JavaScript, strings have a length property. Arrays also have length. Let's explore the differences:</p>
                </div>

                <div class="mb-4">
                    <div class="flex gap-2 mb-3">
                        <button onclick="runExercise5()" class="btn-run px-6 py-2 bg-[#5D5CDE] text-white rounded-lg font-medium shadow-md hover:shadow-lg">
                            ▶ Run Solution
                        </button>
                        <button onclick="clearOutput('output5')" class="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500">
                            Clear
                        </button>
                    </div>

                    <textarea id="code5" class="code-editor w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-base focus:ring-2 focus:ring-[#5D5CDE] focus:border-transparent" rows="24" spellcheck="false">// JavaScript string and array length

// String in JavaScript (like char[] in C++)
const str = "a short string";

console.log("--- String Analysis ---");
console.log("String:", str);
console.log("String length:", str.length);
console.log("String length includes: actual characters only");

// In C++: char str[] = "a short string";
// - sizeof(str) = 15 (14 chars + 1 null terminator '\0')
// - strlen(str) = 14 (excludes null terminator)

console.log("\n--- C++ Comparison ---");
console.log("C++ sizeof(str): 15 bytes (14 chars + null terminator)");
console.log("C++ strlen(str): 14 characters");
console.log("JavaScript str.length:", str.length, "(no null terminator)");

// Character array vs string
const charArray = Array.from(str);
console.log("\n--- Character Array ---");
console.log("Char array:", charArray);
console.log("Array length:", charArray.length);

// Memory representation
console.log("\n--- Memory Representation ---");
const encoder = new TextEncoder();
const utf8Bytes = encoder.encode(str);
console.log("UTF-8 bytes:", utf8Bytes);
console.log("Byte length:", utf8Bytes.length);

// Unicode considerations
const emoji = "Hello 👋 World";
console.log("\n--- Unicode String ---");
console.log("String with emoji:", emoji);
console.log("String length:", emoji.length, "(counts UTF-16 code units)");
console.log("Array.from length:", Array.from(emoji).length, "(actual characters)");
console.log("Byte length (UTF-8):", encoder.encode(emoji).length);

// Null character handling
const withNull = "test\0string";
console.log("\n--- Null Character ---");
console.log("String with \\0:", withNull);
console.log("Length:", withNull.length, "(includes null char in JS)");</textarea>

                    <div class="mt-3 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600">
                        <div class="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">Output:</div>
                        <div id="output5" class="output-area text-gray-800 dark:text-gray-200 min-h-[60px]"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Key Differences Section -->
        <div class="mb-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-lg">
            <h2 class="text-2xl font-bold mb-4 text-purple-900 dark:text-purple-300">🔑 Key Differences: C++ Pointers vs JavaScript References</h2>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
                    <h3 class="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">C++ Pointers</h3>
                    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                        <li class="flex items-start">
                            <span class="text-purple-500 mr-2">•</span>
                            <span>Direct memory addresses</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-purple-500 mr-2">•</span>
                            <span>Pointer arithmetic (ptr++)</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-purple-500 mr-2">•</span>
                            <span>Manual memory management</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-purple-500 mr-2">•</span>
                            <span>Type-specific alignment</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-purple-500 mr-2">•</span>
                            <span>Can be null/dangling</span>
                        </li>
                    </ul>
                </div>

                <div class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
                    <h3 class="font-bold text-lg mb-3 text-pink-700 dark:text-pink-400">JavaScript References</h3>
                    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                        <li class="flex items-start">
                            <span class="text-pink-500 mr-2">•</span>
                            <span>Abstract references (hidden)</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-pink-500 mr-2">•</span>
                            <span>No pointer arithmetic</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-pink-500 mr-2">•</span>
                            <span>Automatic garbage collection</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-pink-500 mr-2">•</span>
                            <span>Dynamic typing</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-pink-500 mr-2">•</span>
                            <span>Safer (no memory leaks)</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </main>

    <!-- Footer -->
    <footer class="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
        <div class="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
            <p>Interactive JavaScript Reference Exercises • Adapted from C++ Programming Concepts</p>
        </div>
    </footer>

    <script>
        // Dark mode detection and handling
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });

        // Console capture utility
        function captureConsole(callback) {
            const logs = [];
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;

            console.log = (...args) => {
                logs.push(args.map(arg =>
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' '));
                originalLog.apply(console, args);
            };

            console.error = (...args) => {
                logs.push('ERROR: ' + args.map(arg => String(arg)).join(' '));
                originalError.apply(console, args);
            };

            console.warn = (...args) => {
                logs.push('WARNING: ' + args.map(arg => String(arg)).join(' '));
                originalWarn.apply(console, args);
            };

            try {
                callback();
            } catch (error) {
                logs.push('ERROR: ' + error.message);
            }

            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;

            return logs.join('\n');
        }

        // Clear output function
        function clearOutput(outputId) {
            document.getElementById(outputId).textContent = '';
        }

        // Exercise 1
        function runExercise1() {
            const code = document.getElementById('code1').value;
            const output = captureConsole(() => {
                eval(code);
            });
            document.getElementById('output1').textContent = output;
        }

        // Exercise 2
        function runExercise2() {
            const code = document.getElementById('code2').value;
            const output = captureConsole(() => {
                eval(code);
            });
            document.getElementById('output2').textContent = output;
        }

        // Exercise 3
        function runExercise3() {
            const code = document.getElementById('code3').value;
            const output = captureConsole(() => {
                eval(code);
            });
            document.getElementById('output3').textContent = output;
        }

        // Exercise 4
        function runExercise4() {
            const code = document.getElementById('code4').value;
            const output = captureConsole(() => {
                eval(code);
            });
            document.getElementById('output4').textContent = output;
        }

        // Exercise 5
        function runExercise5() {
            const code = document.getElementById('code5').value;
            const output = captureConsole(() => {
                eval(code);
            });
            document.getElementById('output5').textContent = output;
        }

        // Auto-adjust textarea height
        document.querySelectorAll('textarea').forEach(textarea => {
            textarea.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            });
        });
    </script>
</body>
</html>