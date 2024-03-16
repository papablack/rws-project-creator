const path = require('path');
const tools = require('rws-js-server/_tools');
const chalk = require('chalk');
const currentDir = __dirname;

async function afterInstall(){
    if(process.env.warlock_NO_LIFECYCLE === 'Yes' ){
        console.error('warlock ignoring postinstall');
        return;
    }

    await tools.runCommand("rws init", path.resolve(__dirname, 'backend'));
    await tools.runCommand("yarn build", path.resolve(__dirname, 'backend'));

    await tools.runCommand("rws-client init", path.resolve(__dirname, 'backend'));
    await tools.runCommand("yarn build", path.resolve(__dirname, 'frontend'));
}

afterInstall().then(() => {
    console.log(chalk.yellowBright('-----------------------------------------------------------'));
    console.log(chalk.green.bold('[RWS] has been installed, configured and built successfully. You\'re good to go!'));
    console.log(`To start server run ${chalk.red('"yarn dev"')} from ${chalk.blueBright('"' + path.resolve(__dirname, 'backend') + '"')}`);
});