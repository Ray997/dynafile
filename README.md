DynaFile
DynaFile allows you to make synchronous and asynchronous changes to your files and execute terminal commands asynchronously.

Installation
bash
Kodu kopyala
npm install dynafile
Features
Perform synchronous and asynchronous file modifications.
Execute terminal commands asynchronously.
Easily interact with the current working directory.
Usage
Reading the Current Directory
To list the files in the current directory, you can use the current method:

```bash
const DynaFile = require('dynafile');
const dynaF = new DynaFile();

const currentFiles = dynaF.current();
console.log(currentFiles);
```
Modifying a File
You can use the change and changeSync methods to modify files asynchronously and synchronously, respectively.

Asynchronous Example:

```bash
const DynaFile = require('dynafile');
const dynaF = new DynaFile();

dynaF.change('test.txt', 'hello me', 'hello world', () => {
    console.log('File changed');
});
```
Synchronous Example:

```bash
const DynaFile = require('dynafile');
const dynaF = new DynaFile();

dynaF.changeSync('test.txt', 'hello me', 'hello world');
console.log('File changed synchronously');
```
Executing Terminal Commands Asynchronously
You can run terminal commands asynchronously using the terminal method:

```bash
const DynaFile = require('dynafile');
const dynaF = new DynaFile();

(async () => {
    const ls = await dynaF.terminal("ls");
    console.log(ls);
})();
```