const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const {Terminal,Current,Changes,EnvChange} = require('./classes/index');

class Directory {
    constructor(projectPath) {
        this.directoryPath = projectPath || path.dirname(require.main.filename)

        this.terminal = (new Terminal()).terminal;
        this.change = (new Changes(this.directoryPath)).change;
        this.current = (new Current(this.directoryPath,this.change)).current;
        this.changeSync = (new Changes(this.directoryPath)).changeSync;
        this.envChange = (new EnvChange(this.directoryPath)).envChange;
    }
}

module.exports = Directory;