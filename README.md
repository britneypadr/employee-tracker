# Employee Tracker

## Description

Employee Tracker is a command-line application that allows business owners to manage their company's employee database. With this application, users can view and manage departments, roles, and employees. The application is built using Node.js, Inquirer, and MySQL2.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Features](#features)
- [Video Walkthrough](#video-walkthrough)
- [License](#license)
- [Questions](#questions)

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/employee-tracker.git
    cd employee-tracker
    ```

2. **Install dependencies:**

    ```sh
    npm install inquirer@8.2.4 mysql2
    ```

3. **Set up the MySQL database:**

    - Ensure MySQL is installed on your machine.
    - Open your terminal and run the following commands to set up the database and seed initial data:

    ```sh
    mysql -u root -p < db/schema.sql
    mysql -u root -p < db/seeds.sql
    ```

4. **Create a `.env` file to store your MySQL credentials:**

    ```sh
    touch .env
    ```

    Inside the `.env` file, add your MySQL credentials:

    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=employee_tracker
    ```

## Usage

1. **Start the application:**

    ```sh
    node index.js
    ```

2. **Follow the prompts to manage the employee database:**

    - View all departments
    - View all roles
    - View all employees
    - Add a department
    - Add a role
    - Add an employee
    - Update an employee role

## Database Schema

The database schema includes three tables: `department`, `role`, and `employee`.

- **Department Table:**
    - `id`: INT PRIMARY KEY
    - `name`: VARCHAR(30) to hold department name

- **Role Table:**
    - `id`: INT PRIMARY KEY
    - `title`: VARCHAR(30) to hold role title
    - `salary`: DECIMAL to hold role salary
    - `department_id`: INT to hold reference to department role belongs to

- **Employee Table:**
    - `id`: INT PRIMARY KEY
    - `first_name`: VARCHAR(30) to hold employee first name
    - `last_name`: VARCHAR(30) to hold employee last name
    - `role_id`: INT to hold reference to employee role
    - `manager_id`: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)

## Features

- **View All Departments:**
    - Displays a formatted table showing department names and department ids.

- **View All Roles:**
    - Displays the job title, role id, the department that role belongs to, and the salary for that role.

- **View All Employees:**
    - Displays a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.

- **Add a Department:**
    - Prompts to enter the name of the department and adds it to the database.

- **Add a Role:**
    - Prompts to enter the name, salary, and department for the role and adds it to the database.

- **Add an Employee:**
    - Prompts to enter the employee’s first name, last name, role, and manager, and adds the employee to the database.

- **Update an Employee Role:**
    - Prompts to select an employee to update and their new role, and updates this information in the database.

## Video Walkthrough


## License

This project is licensed under the MIT License.

## Questions

If you have any questions, please feel free to contact me:

- GitHub: [britneypadr](https://github.com/britneypadr)
- Email: britneypadr@gmail.com
