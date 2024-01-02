const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');
const Svg = require("./lib/svg")

const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter a name up to three characters long:',
        validate: (input) => input.length <= 3,
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter your text color (CSS color keyword or haxadecimal number):',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Select a shape:',
        choices: ['circle', 'triangle', 'square'],
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter your shape color (CSS color keyword or haxadecimal number):',
    },
];

inquirer
    .prompt(questions)
    .then((response) => {
        let shape;
        switch(response.shape) {
            case 'triangle':
                shape = new Triangle();
                break;
            case 'square':
                shape = new Square();
                break;
            default:
                shape = new Circle();
        }

        shape.setColor(response.shapeColor);
        const svg = new Svg();
        svg.setShape(shape);
        svg.setText(response.text, response.textColor);

        fs.writeFile(`examples/logo-${response.text}.svg`, svg.render(), (err) => {
            if (err) console.log(err);
            console.log('You have successfully created your logo!');
        });
    })

    .catch((err) => {
        console.log(err.message);
    });