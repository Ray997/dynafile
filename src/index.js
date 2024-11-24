const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');


class Directory {
    constructor(projectPath) {
        this.directoryPath = projectPath || path.dirname(require.main.filename)
    }

    terminal(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    reject(`Stderr: ${stderr}`);
                    return;
                }

                resolve(stdout.trim());
            });
        });
    }

    current() {
        try {
            const currentList = fs.readdirSync(this.directoryPath);
            return currentList;
        } catch (err) {
            console.error('Error when reading file path:', err);
            return [];
        }
    }

    change(fileName, currentContent, newContent, callback, filePath) {
        try {
            filePath = filePath || this.directoryPath;
            const fileFullPath = path.join(filePath, fileName);
            
            fs.readFile(fileFullPath, 'utf8', (err, data) => {
                if (err) {
                    return callback(err);
                }
                const result = data.replace(currentContent, newContent);

                fs.writeFile(fileFullPath, result, 'utf8', (err) => {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, 'File updated successfully.');
                });
            });
        } catch (error) {
            callback(error);
        }
    }

    changeSync(fileName, currentContent, newContent, callback, filePath) {
        return new Promise((resolve, reject) => {
            this.change(fileName, currentContent, newContent,(err, result) => {
                if(callback) callback(err, result);
                if (err) {
                    return reject(err);
                }
                resolve(result);
            }, filePath);
        });
    }

    envChange(vary, fileName) {
        try {
            fileName = fileName || '.env';
            const currentContent = fs.readFileSync(path.join(this.directoryPath, fileName), 'utf8');
            const values = {}

            currentContent.split('\n').forEach((line) => {
                const [key, value] = line.split('=');
                values[key] = value;
            });

            let newContent = {
                ...values,
                ...vary
            };
            newContent = Object.keys(newContent).map((key) => `${key}=${newContent[key]}`).join('\n');

            this.change(fileName, currentContent, newContent, (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(result);
            });

        } catch (error) {
            console.error('Error when reading file path:', error);
        }
        
    }

    
}


module.exports = Directory;