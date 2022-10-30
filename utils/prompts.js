const consoleTable = require('console.table')
const inquirer = require('inquirer')
const db = require('../db/connection');
const sqlQueries  = require('./sqlQueries')
const {sqlViewAllEmployees, sqlViewAllRoles, sqlViewAllDepartments} = sqlQueries

function wantToExit () {
    inquirer
    .prompt([
      {
        name: "moreQuery",
        type: "confirm",
        message: "Are you sure you would like to exit?",
      },
    ])
    .then((answer) => {
      if (answer.moreQuery) return process.exit();
      promptRequest()
    });
}

function queryDatabase(console, sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, res) => {
            if(err) throw err
            if(console){
                console.table(res);
            }
            resolve(res)
        })
    })
    
}

async function processQuery (sql, params) {
    const result = await queryDatabase(true, sql, params);
    promptRequest();
}

async function processEmployeeAdd() {
    const roles = await queryDatabase(false, sqlViewAllRoles)
    let choiceArr1 = []
    for(i = 0; i < roles.length; i++) {
        choiceArr1.push(roles[i].title)
    }
    console.log(choiceArr1)
    const managers = await queryDatabase(false, sqlViewAllEmployees)
    let choiceArr2 = []
    for(i = 0; i < managers.length; i++) {
        choiceArr2.push(`${managers[i].first_name} ${managers[i].last_name}`)
    }
    console.log(choiceArr2)
    promptAddEmployee(choiceArr1, choiceArr2)
}

function promptAddEmployee(choiceArr1, choiceArr2) {
    inquirer.prompt([
        {
            name: 'firstname',
            type: 'input',
            message: 'Please enter employee first name'
        },
        {
            name: 'lastname',
            type: 'input',
            message: 'Please enter employee last name'
        },
        {
            name: 'role',
            type: 'list',
            message: 'Please choose employee role',
            choices: choiceArr1
        },
        {
            name: 'manager',
            type: 'list',
            message: 'Please choose employee manager',
            choices: choiceArr2
        },
    ])
}

function promptRequest() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: [
                'View All Employees',
                'View All Roles',
                'View All Departments',
                'Add Employee',
                'Add Role',
                'Update Employee Role',
                'Quit'
            ]
        }
    ]).then(function (selection) {
        switch (selection.choice) {
            case 'View All Employees':
                processQuery(sqlViewAllEmployees)
                break;
            case 'Add Employee':
                processEmployeeAdd()
                break;
            case 'Update Employee Role':
                viewEmployees()
                break;
            case 'View All Roles':
                processQuery(sqlViewAllRoles)
                break;
            case 'Add Role':
                viewEmployees()
                break;
            case 'View All Departments':
                processQuery(sqlViewAllDepartments)
                break;
            case 'Quit':
                wantToExit()
                break;
        }
    })
}



module.exports =  { promptRequest }