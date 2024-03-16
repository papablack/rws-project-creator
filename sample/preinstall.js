const fs = require('fs');
const path = require('path');

const currentDir = __dirname;
const packageJsonPath = `${currentDir}/package.json`;

const package = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));


function removeDirectory(dirPath) {
    const absoluteDirPath = path.resolve(dirPath);

    fs.rmSync(absoluteDirPath, { recursive: true, force: true }, (err) => {
        if (err) {
        console.error("Error removing directory:", err);
        return;
        }
        console.log(`Directory removed: ${absoluteDirPath}`);
    });
}

function beforeInstall(){
    if(process.env.NO_RWS_LIFECYCLE === 'Yes' ){
        console.error('RWS setup ignoring preinstall');
        return;
    }
}

beforeInstall();