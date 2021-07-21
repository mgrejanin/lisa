const exec = require('child_process').exec;

exec('node replace-tokens.js', (error, stdout, stderr) => {
    if (stdout) {
        console.log(`${stdout}`);
    }

    if (stderr) {
        console.log(`${stderr}`);
    }
    if (error !== null) {
        console.error(`${error}`);
    }
});
