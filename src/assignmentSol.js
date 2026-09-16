// 1. School Level
function School(name) {
    this.name = name;
}

School.prototype.getName = function() {
    console.log(`name = ${this.name}`);
}

function Employee(name, schoolName) {
    School.call(this, name);
    this.schoolName = schoolName;
}

Employee.prototype = Object.create(School.prototype);
Employee.prototype.constructor = Employee; 

Employee.prototype.getSchoolName = function() {
    console.log(`school name = ${this.schoolName}`);
}


function Teacher(name, schoolName, designation) {
    Employee.call(this, name, schoolName);
    this.designation = designation;
}

Teacher.prototype = Object.create(Employee.prototype);
Teacher.prototype.constructor = Teacher;

Teacher.prototype.getDesignation = function() {
    console.log(`designation = ${this.designation}`);
}


const myTeacher = new Teacher("Div", "KV", "Head");

myTeacher.getName();         // Output: name = Div
myTeacher.getSchoolName();   // Output: school name = KV
myTeacher.getDesignation();  // Output: designation = Head

