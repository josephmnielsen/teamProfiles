const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { prompt } = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const employees = []

const finish = () => {
  fs.writeFile(outputPath, render(employees), err => {
    if (err) { console.log(err) }
  })
}



const role = () => {
  
  
  prompt ({
    type: 'list',
    name: 'roles',
    message: 'What is the role of the employee?',
    choices: ['Manager', 'Engineer', 'Intern']
  })
  .then (({ roles }) => {
    if (roles === 'Manager') {
      mRole()
    } else if (roles === 'Engineer') {
      eRole()
    } else {
      iRole()
    }
  })
  .catch(err => console.log(err))
  
}

const eRole = () => {
  prompt ([{
    type: 'input',
    name: 'name',
    message: 'Enter the employee name:'
   }, {
    type: 'input',
    name: 'id',
    message: 'Enter employee id:'
   }, {
    type: 'input',
    name: 'email',
    message: 'Enter the employee email:'
   }, {
    type: 'input',
    name: 'github',
    message: 'Enter employee github username:'
   }, {
    type: 'confirm',
    name: 'another',
    message: 'Would you like to enter another employee?'
   }
  ])

  .then(res => {
    let name = res.name
    let id = res.id
    let email = res.email
    let github = res.github
    
    if (res.another) {
      employees.push(new Engineer(name, id, email, github))
      role()
    } else {
      employees.push(new Engineer(name, id, email, github))
      finish()
    }
  })
  .catch(err => console.log(err))
}

const iRole = () => {
  prompt([
    {
    type: 'input',
    name: 'name',
    message: 'Enter the employee name:'
   }, {
    type: 'input',
    name: 'id',
    message: 'Enter employee id:'
   }, {
    type: 'input',
    name: 'email',
    message: 'Enter the employee email:'
   }, {
    type: 'input',
    name: 'school',
    message: 'Enter employee school:'
   }, {
    type: 'confirm',
    name: 'another',
    message: 'Would you like to enter another employee?'
   }
  ])
  .then(res1 => {
    let name = res1.name
    let id = res1.id
    let email = res1.email
    let school = res1.school
    if (res1.another) {
      employees.push(new Intern(name, id, email, school))
      role()
    } else {
      employees.push(new Intern(name, id, email, school))
      finish()
    }
  })
  .catch(err => console.log(err))
}

const mRole = () => {
  prompt([
    {
    type: 'input',
    name: 'name',
    message: 'Enter the employee name:'
   }, {
    type: 'input',
    name: 'id',
    message: 'Enter employee id:'
   }, {
    type: 'input',
    name: 'email',
    message: 'Enter the employee email:'
   }, {
    type: 'input',
    name: 'office',
    message: 'Enter employee office number:'
   }, {
    type: 'confirm',
    name: 'another',
    message: 'Would you like to enter another employee?'
   }
  ])
  .then(res2 => {
    let name = res2.name
    let id = res2.id
    let email = res2.email
    let office = res2.office
   if (res2.another) {
     employees.push(new Manager(name, id, email, office))
      role()
    }else {
     employees.push(new Manager(name, id, email, office))
      finish()
    }
  })
  .catch(err => console.log(err))
}

role()



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
