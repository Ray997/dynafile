const fs = require('fs');
const path = require('path');

class Changes {
    constructor(directoryPath) {
        this.directoryPath = directoryPath;
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
}

module.exports = Changes;

