const sqlQueries = {
    sqlViewAllEmployees : 
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(e.first_name, ' ' ,e.last_name) AS manager
    FROM employee
    INNER JOIN role 
    ON role.id = employee.role_id
    INNER JOIN department
    ON department.id = role.department_id
    LEFT JOIN employee e
    ON  employee.manager_id = e.id;`,
    sqlViewAllRoles : 
    `SELECT role.title, role.id, department.name AS department, role.salary 
    FROM role
    INNER JOIN department
    ON department.id = role.department_id;`,
    sqlViewAllDepartments :
    `SELECT department.name, department.id
    FROM department;`,
    sqlGetEmployeeId : 
    `SELECT id 
     FROM employee
     WHERE first_name = ?
     AND last_name = ?;`,
    sqlInsertEmployee : 
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
     VALUES (?,?,?,?);`,
    sqlGetRoleId : 
    `SELECT id 
     FROM role
     WHERE title = ?;`,
    sqlGetDepId : 
    `SELECT id 
     FROM department
     WHERE name = ?;`,
    sqlInsertRole : 
    `INSERT INTO role (title, salary, department_id) 
     VALUES (?,?,?);`,
    sqlUpdateRole :
    `UPDATE employee SET role_id = ? WHERE id = ?;`,
    sqlInsertDepartment : 
    `INSERT INTO department (name) 
     VALUES (?);`,
}

module.exports = sqlQueries
