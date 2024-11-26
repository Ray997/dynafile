const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const {Terminal,Current,Changes,EnvChange} = require('./classes/index');

class Directory {
    constructor(projectPath) {
        this.directoryPath = projectPath || path.dirname(require.main.filename)

        this.terminal = (new Terminal()).terminal;
        this.current = (new Current(this.directoryPath)).current;
        this.change = (new Changes(this.directoryPath)).change;
        this.changeSync = (new Changes(this.directoryPath)).changeSync;
        this.envChange = (new EnvChange(this.directoryPath)).envChange;
    }


    
}

const dynaF = new Directory();
(async function test(){
    console.log(dynaF.current(path.join(__dirname,'./classes')));
    console.log("---")
    console.log(dynaF.current());
})()


module.exports = Directory;