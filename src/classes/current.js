const fs = require('fs');

class Current {
    constructor(directoryPath) {
        this.directoryPath = directoryPath;
    }
    current(customPath) {
        customPath ??= this.directoryPath;
        try {
            const currentList = fs.readdirSync(customPath);
            return currentList;
        } catch (err) {
            console.error('Error when reading file path:', err);
            return [];
        }
    }
}

module.exports = Current;