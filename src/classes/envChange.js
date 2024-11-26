const fs = require('fs');
const path = require('path');

class EnvChange {
    constructor(directoryPath,change) {
        this.directoryPath = directoryPath;
        this.change = change;
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

module.exports = EnvChange;