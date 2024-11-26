const { exec } = require('child_process');

class Terminal {
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
}

module.exports = Terminal;