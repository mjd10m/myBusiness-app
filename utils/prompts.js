const cTable = require('console.table')
const inquirer = require('inquirer')
const db = require('../db/connection');
const sqlQueries  = require('./sqlQueries')
const {sqlViewAllEmployees, sqlViewAllRoles, sqlViewAllDepartments, sqlGetEmployeeId, sqlGetRoleId, sqlInsertEmployee, sqlGetDepId, sqlInsertRole, sqlUpdateRole, sqlInsertDepartment } = sqlQueries

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

function queryDatabase(write, sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, res) => {
            if(err) throw err
            if(write){
                console.table(res);
            }
            resolve(res)
        })
    })
    
}

async function processQuery (write, sql, params) {
    const result = await queryDatabase(write, sql, params);
    promptRequest();
}

async function getRoleID(employeeRole) {
    let roleId
    if(employeeRole === 'None') {
        roleId = null
    } else{
        const roleParams = [employeeRole]
        const roleIdObj = await queryDatabase(false, sqlGetRoleId, roleParams)
        roleId = roleIdObj[0].id
    }
    return roleId
}

async function getDepartmentID(departmentName) {
    let depId
    if(departmentName === 'None') {
        roleId = null
    } else{
        const depParams = [departmentName]
        const depIdObj = await queryDatabase(false, sqlGetDepId, depParams)
        depId = depIdObj[0].id
    }
    return depId
}

async function getEmployeeID(employeeName) {
    let managerId
    if(employeeName === 'None') {
        managerId = null
    } else{
        const [first_name, last_name] = employeeName.split(' ')
        const nameParams = [first_name, last_name]
        const managerIdObj = await queryDatabase(false, sqlGetEmployeeId, nameParams)
        managerId = managerIdObj[0].id
    }
    return managerId
}

async function ProcessRoleAdd() {
    const department = await queryDatabase(false, sqlViewAllDepartments)
    let choiceArr1 = []
    for(i = 0; i < department.length; i++) {
        choiceArr1.push(department[i].name)
    }
    promptAddRole(choiceArr1)
}

async function insertRole(roleData) {
    const department_id = await getDepartmentID(roleData.department)
    const params = [roleData.title, roleData.salary, department_id]
    processQuery(false, sqlInsertRole,params)
}

function promptAddRole(choiceArr1) {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Please enter role title'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Please enter role salary'
        },
        {
            name: 'department',
            type: 'list',
            message: 'Please choose role department',
            choices: choiceArr1
        },

    ])
    .then((response) => {
        insertRole(response)
    })
}

async function processEmployeeAdd() {
    const roles = await queryDatabase(false, sqlViewAllRoles)
    let choiceArr1 = []
    for(i = 0; i < roles.length; i++) {
        choiceArr1.push(roles[i].title)
    }
    const managers = await queryDatabase(false, sqlViewAllEmployees)
    let choiceArr2 = ['None']
    for(i = 0; i < managers.length; i++) {
        choiceArr2.push(`${managers[i].first_name} ${managers[i].last_name}`)
    }
    promptAddEmployee(choiceArr1, choiceArr2)  
}

async function insertEmployee(employeeData) {
    const role_id = await getRoleID(employeeData.role)
    const employee_id = await getEmployeeID(employeeData.manager)
    const params = [employeeData.firstname, employeeData.lastname, role_id, employee_id]
    processQuery(false, sqlInsertEmployee,params)
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
    .then((response) => {
        insertEmployee(response)
    })
}

async function processUpdateEmployeeRole() {
    const roles = await queryDatabase(false, sqlViewAllRoles)
    let choiceArr2 = []
    for(i = 0; i < roles.length; i++) {
        choiceArr2.push(roles[i].title)
    }
    const employees = await queryDatabase(false, sqlViewAllEmployees)
    let choiceArr1 = ['None']
    for(i = 0; i < employees.length; i++) {
        choiceArr1.push(`${employees[i].first_name} ${employees[i].last_name}`)
    }
    promptUpdateEmployeeRole(choiceArr1, choiceArr2)  
}
async function updateEmployeeRole(employeeData) {
    const role_id = await getRoleID(employeeData.role)
    const employee_id = await getEmployeeID(employeeData.employee)
    const params = [role_id, employee_id]
    processQuery(false, sqlUpdateRole,params)
}

function promptUpdateEmployeeRole(choiceArr1,choiceArr2) {
    inquirer.prompt([
        {
            name: 'employee',
            type: 'list',
            message: 'Please select an employee to update',
            choices: choiceArr1
        },
        {
            name: 'role',
            type: 'list',
            message: 'Please select new role',
            choices: choiceArr2
        },
    ])
    .then((response) => {
        updateEmployeeRole(response)
    })
}


function processDepartmentAdd() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Please enter department name',
        }
    ])
    .then((response) => {
        processQuery(false, sqlInsertDepartment, response.name )
    })
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
                'Add Department',
                'Update Employee Role',
                'Quit'
            ]
        }
    ]).then(function (selection) {
        switch (selection.choice) {
            case 'View All Employees':
                processQuery(true, sqlViewAllEmployees)
                break;
            case 'Add Employee':
                processEmployeeAdd()
                break;
            case 'Update Employee Role':
                processUpdateEmployeeRole()
                break;
            case 'View All Roles':
                processQuery(true, sqlViewAllRoles)
                break;
            case 'Add Role':
                ProcessRoleAdd()
                break;
            case 'View All Departments':
                processQuery(true, sqlViewAllDepartments)
                break;
            case 'Add Department':
                processDepartmentAdd()
                break;
            case 'Quit':
                wantToExit()
                break;
        }
    })
}



module.exports =  { promptRequest }