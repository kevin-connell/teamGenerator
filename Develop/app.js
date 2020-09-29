const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// intial message
console.log("Please build your team!");

function createTeam() {
    inquirer.prompt(
        [
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "No more team members"
                ]
            }
        ]
    ).then(function(answer) {
        switch (answer.memberChoice) {
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
            default:
                createOutput();
                break;
        }
    });
}

function addEngineer() {
    //ask the question

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your engineer's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is their employee ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is their email address?",
        },
        {
            type: "input",
            name: "github",
            message: "What is their GitHub username?",
        },
    ])

    //handle the promise 
    .then(function(answer){

        //create new engineer obj
        const engineer = new Engineer (answer.name, answer.id, answer.email, answer.github);

        //push to emplyee array
        employees.push(engineer)

        //invoke createTeam function
        createTeam()

    })
};

function addIntern() {
    //ask the intern question

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is their employee ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is their email address?",
        },
        {
            type: "input",
            name: "school",
            message: "What school do they go to?",
        },
    ])

    //handle the promise 
    .then(function(answer){

        //create new engineer obj
        const intern = new Intern (answer.name, answer.id, answer.email, answer.school);

        //push to emplyee array
        employees.push(intern)

        //invoke createTeam function
        createTeam()
    })
};

function createOutput() {
    //check if output folder exists, if not create it
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    //write the data into the team.html
    const data = render(employees);
    fs.writeFileSync(outputPath,data,"utf-8");
}

inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your manager's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is their employee ID number?",
    },
    {
        type: "input",
        name: "email",
        message: "What is their email address?",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is their office number?",
    },
])
    .then(function(mAnswers) {
        const manager = new Manager (mAnswers.name, mAnswers.id, mAnswers.email, mAnswers.officeNumber);

        employees.push(manager);

        createTeam();

    });
