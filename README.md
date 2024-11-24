
# DynaFile

DynaFile allows you to make **synchronous** and **asynchronous** changes to your files, execute terminal commands asynchronously, and manage environment variables.

---

## Installation

To install DynaFile, use the following command:

```bash
npm install dynafile
```

---

## Features

- Perform **synchronous** and **asynchronous** file modifications.
- Execute **terminal commands asynchronously**.
- Easily interact with the current working directory.
- Manage and update **environment variables**.

---

## Usage

### Reading the Current Directory

To list the files in the current directory, you can use the `current` method.  
If no path is provided, it defaults to the current working directory.  
You can also specify a directory path.

**Default Directory Example**:

```javascript
const DynaFile = require('dynafile');
const dynaF = new DynaFile();

const currentFiles = dynaF.current();
console.log(currentFiles);
```

**Custom Directory Example**:

```javascript
const path = require('path');
const DynaFile = require('dynafile');

const dynaF = new DynaFile(path.join(__dirname, "/src"));

const currentFiles = dynaF.current();
console.log(currentFiles);
```

---

### Modifying a File

DynaFile provides two methods for modifying files:
- **Asynchronous**: `change`
- **Synchronous**: `changeSync`

#### Asynchronous Example

```javascript
const DynaFile = require('dynafile');
const dynaF = new DynaFile();

dynaF.change('test.txt', 'hello me', 'hello world', () => {
    console.log('File changed');
});
```

#### Synchronous Example

```javascript
const DynaFile = require('dynafile');
const dynaF = new DynaFile();

dynaF.changeSync('test.txt', 'hello me', 'hello world');
console.log('File changed synchronously');
```

---

### Executing Terminal Commands Asynchronously

You can run terminal commands asynchronously using the `terminal` method:

```javascript
const DynaFile = require('dynafile');
const dynaF = new DynaFile();

(async () => {
    const ls = await dynaF.terminal("ls");
    console.log(ls);
})();
```

---

### Managing Environment Variables

DynaFile provides the `envChange` method to update or add environment variables to a `.env` file.  

- If a key exists, its value will be updated.  
- If a key does not exist, it will be added to the file.  
- By default, the `.env` file in the current directory will be used unless a specific file name is provided.

#### Example 1: Default `.env` File

```javascript
const DynaFile = require('dynafile');
const dynaF = new DynaFile();

dynaF.envChange({
    'PORT': 3000,
    'DB_HOST': 'localhost'
});
```

#### Example 2: Custom `.env` File

```javascript
const DynaFile = require('dynafile');
const dynaF = new DynaFile();

dynaF.envChange({
    'PORT': 3000,
    'DB_HOST': 'localhost'
}, 'custom.env');
```

---

## License

This project is licensed under the MIT License.
