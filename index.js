const core = require('@actions/core');
const github = require('@actions/github');
const glob = require("glob");
const path = require('path');
const fs = require('fs');

try {

    let sourceDir = core.getInput('source-dir');
    if(!sourceDir) {
        sourceDir = '.';
    }

    var getDirectories = function (src, callback) {
        glob(src + '/**/*', callback);
    };
    getDirectories(sourceDir, function (err, res) {
        if (err) {
            throw(err);
        } else {
            let foundDumps = false;
            for(let i = 0; i < res.length; i++) {
                let extension = path.extname(res[i]);
                if(extension == '.twig') {
                    let re = /{{[ ]*dump\([^)]*\)[ ]*}}/gm;
                    const data = fs.readFileSync(res[i], 'utf8')
                    var myArray = data.match(re);
                    if (myArray) {
                        foundDumps = true;
                        let errorMessage = "Found " + myArray.length + " dumps in " + res[i] + " : " + myArray.join(', ');
                        core.setFailed(errorMessage);
                    }
                }
            }
            if(!foundDumps) {
                core.setOutput('No dumps found in twig files');
            }
        }
    });

    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
