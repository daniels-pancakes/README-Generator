// Include packages needed for this application
const { exec } = require('child_process');
const fs = require('fs');
const inquirer = require('inquirer');


// Create an array of questions for user input
const questions = [{
    type: 'input',
    name: 'title',
    message: 'Project Title: ',
    validate: (input) => input.length > 0 || 'Please enter some text.'
},     {
    type: 'input',
    name: 'desc',
    message: 'Description: ',
    validate: (input) => input.length > 0 || 'Please enter some text.'
},
{
    type: 'input',
    name: 'install',
    message: 'Installation Instructions: ',
    validate: (input) => input.length > 0 || 'Please enter some text.'
},
{
    type: 'input',
    name: 'usage',
    message: 'Usage Information: ',
    validate: (input) => input.length > 0 || 'Please enter some text.'
},
{
    type: 'input',
    name: 'cont',
    message: 'Contribution Guidelines: ',
    validate: (input) => input.length > 0 || 'Please enter some text.'
},
{
    type: 'input',
    name: 'test',
    message: 'Test Instructions: ',
    validate: (input) => input.length > 0 || 'Please enter some text.'
},
{
    type: 'list',
    name: 'lic',
    message: 'License: ',
    choices: ['Apache', 'GNU v3.0', 'MIT', 'BSD 2', 'BSD 3', 'Boost', 'Creative Commons', 'Eclipse', 'GNU Affero', 'GNU v2.0', 'GNU Lesser', 'Mozilla', 'Unlicense']
},
{
    type: 'input',
    name: 'ghusername',
    message: 'GitHub Username: ',
    validate: (input) => input.length > 0 || 'Please enter some text.'
},
{
    type: 'input',
    name: 'email',
    message: 'Email: ',
    validate: (input) => input.length > 0 || 'Please enter some text.'
}];

// Create a function to write README file
function writeToFile(filename, data) {
    fs.writeFile('README.MD', data, (err) => err ? console.log(err) : console.log('Success!'));
}

function getLicenseBadge(license) {
    switch (license) {
        case 'Apache':
            return '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
        case 'GNU v3.0':
            return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
        case 'MIT':
            return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        case 'BSD 2':
            return '[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](https://opensource.org/licenses/BSD-2-Clause)';
        case 'BSD 3':
            return '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
        case 'Boost':
            return '[![License](https://img.shields.io/badge/License-Boost%201.0-blue.svg)](https://www.boost.org/LICENSE_1_0.txt)';
        case 'Creative Commons':
            return '[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](https://creativecommons.org/publicdomain/zero/1.0/)';
        case 'Eclipse':
            return '[![License](https://img.shields.io/badge/License-EPL%201.0-blue.svg)](https://opensource.org/licenses/EPL-1.0)';
        case 'GNU Affero':
            return '[![License: GNU Affero General Public License v3.0](https://img.shields.io/badge/License-AGPL_3-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/agpl-3.0.txt)';
        case 'GNU v2.0':            
            return '[![License: GNU General Public License v2.0](https://img.shields.io/badge/License-GPL_2-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)';
        case 'GNU Lesser':
            return '[![License: GNU Lesser General Public License v3.0](https://img.shields.io/badge/License-LGPL_3-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/lgpl-3.0.txt)';
        case 'Mozilla':
            return '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-FF7139.svg?style=for-the-badge)](https://opensource.org/licenses/MPL-2.0)';
        case 'Unlicense':
            return '[![License: Unlicense](https://img.shields.io/badge/License-Unlicense-blue.svg)](http://unlicense.org/)';
    }
}

function getLicenseLink(license) {
    switch (license) {
        case 'Apache':
            return '[The License Webpage](https://opensource.org/licenses/Apache-2.0)';
        case 'GNU v3.0':
            return '[The License Webpage](https://www.gnu.org/licenses/gpl-3.0)';
        case 'MIT':
            return '[The License Webpage](https://opensource.org/licenses/MIT)';
        case 'BSD 2':
            return '[The License Webpage](https://opensource.org/licenses/BSD-2-Clause)';
        case 'BSD 3':
            return '[The License Webpage](https://opensource.org/licenses/BSD-3-Clause)';
        case 'Boost':
            return '[The License Webpage](https://www.boost.org/LICENSE_1_0.txt)';
        case 'Creative Commons':
            return '[The License Webpage](https://creativecommons.org/publicdomain/zero/1.0/)';
        case 'Eclipse':
            return '[The License Webpage](https://opensource.org/licenses/EPL-1.0)';
        case 'GNU Affero':
            return '[The License Webpage](https://www.gnu.org/licenses/agpl-3.0.txt)';
        case 'GNU v2.0':            
            return '[The License Webpage](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)';
        case 'GNU Lesser':
            return '[The License Webpage](https://www.gnu.org/licenses/lgpl-3.0.txt)';
        case 'Mozilla':
            return '[The License Webpage](https://opensource.org/licenses/MPL-2.0)';
        case 'Unlicense':
            return '[The License Webpage](http://unlicense.org/)';
    }
}

// Create a function to initialize app
function init() {

inquirer.prompt(questions)
    .then((response) => {
        console.clear();
        const readmeOutput = 
`# ${response.title}\n
${getLicenseBadge(response.lic)}

## Description
${response.desc}

## Table of Contents
* [Installation Instructions](#installation-instructions)
* [Usage Information](#usage-information)
* [License](#license)
* [Contribution Guidelines](#contribution-guidelines)
* [Test Instructions](#test-instructions)
* [Questions](#questions)

## Installation Instructions
${response.install}

## Usage Information
${response.usage}

## License
This project is licensed under The ${response.lic} License. For more details visit ${getLicenseLink(response.lic)}
 

## Contribution Guidelines
${response.cont}

## Test Instructions
${response.test}

## Questions
https://github.com/${response.ghusername}\n
${response.email}`;
console.log(`Written to file: 'README.MD'\n${readmeOutput}`);
    writeToFile('README.md', readmeOutput);
    exec('code -r ./README.md');
    })
}
// Function call to initialize app
init();
