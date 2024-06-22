const inquirer = require('inquirer');
const connection = require('./db/connection');

const startApp = () => {
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ]
  }).then(answer => {
    switch (answer.action) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      default:
        connection.end();
    }
  });
};

const viewDepartments = () => {
  const query = 'SELECT * FROM department';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
};

const viewRoles = () => {
  const query = `
    SELECT role.id, role.title, role.salary, department.name AS department 
    FROM role 
    INNER JOIN department ON role.department_id = department.id`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
};

const viewEmployees = () => {
  const query = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id 
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
};

const addDepartment = () => {
  inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the department:'
  }).then(answer => {
    const query = 'INSERT INTO department (name) VALUES (?)';
    connection.query(query, answer.name, (err, res) => {
      if (err) throw err;
      console.log('Department added successfully!');
      startApp();
    });
  });
};

const addRole = () => {
  inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter the title of the role:'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the salary of the role:'
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'Enter the department ID of the role:'
    }
  ]).then(answer => {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    connection.query(query, [answer.title, answer.salary, answer.department_id], (err, res) => {
      if (err) throw err;
      console.log('Role added successfully!');
      startApp();
    });
  });
};

const addEmployee = () => {
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'Enter the first name of the employee:'
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'Enter the last name of the employee:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the role ID of the employee:'
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'Enter the manager ID of the employee (if any):'
    }
  ]).then(answer => {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id || null], (err, res) => {
      if (err) throw err;
      console.log('Employee added successfully!');
      startApp();
    });
  });
};

const updateEmployeeRole = () => {
  inquirer.prompt([
    {
      name: 'employee_id',
      type: 'input',
      message: 'Enter the ID of the employee to update:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the new role ID of the employee:'
    }
  ]).then(answer => {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    connection.query(query, [answer.role_id, answer.employee_id], (err, res) => {
      if (err) throw err;
      console.log('Employee role updated successfully!');
      startApp();
    });
  });
};

startApp();