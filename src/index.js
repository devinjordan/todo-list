import { createList } from "./list"; 
import { createTask } from "./task";
import { modifyTask } from "./modify";

const myList = createList('My List');

const work = createTask('Do stuff', new Date(2026, 5, 21), 1);
const play = createTask('Do stuff', new Date(2026, 5, 21), 1);
const due = createTask('Do stuff', new Date(2026, 5, 21), 1);
const today = createTask('Do stuff', new Date(2026, 5, 21), 1);

myList.addTask(work);
myList.addTask(play);
myList.addTask(due);
myList.addTask(today);

work.updatePriority(2);


console.table(myList.populate());

// Class style orignial code

// class Task {
//   constructor(description, dueDate = new Date(), priority = 0, status = false) {
//     this.description = description;
//     this.dueDate = dueDate;
//     this.priority = priority;
//     this.status = status;
//   };

//   changeDescription(newDescription) {
//     Validation.validateDescription(newDescription);
//     this.description = newDescription;
//   };

//   changeFullDate(year, month, day) {
//     Validation.validateDate(year, month, day);
//     this.dueDate = new Date(year, month - 1, day);
//   }

//   updatePriority(newPriority) {
//     this.priority = newPriority;
//   };

//   toggleStatus() {
//     this.status = !this.status;
//   };
// };

// class Validation {
//   static validateDescription(newDescription) {
//     if (newDescription === '') {
//       throw Error('Include a description in the task.');
//     };
//   };

//   static validateDate(year, month, day) {
//     const newDate = new Date(year, month - 1, day);
//     if (newDate < Date.now()) {
//       throw Error('Date may not be in the past.');
//     };
//   };
// };

// class List {
//   constructor() {
//     this.tasks = [];
//   };

//   addTask(task) {
//     this.tasks.push(task);
//   };

//   removeTask(index) {
//     this.tasks.splice(index, 1);
//   };

//   populate() {
//     let taskList = [];
//     for (let i = 0; i < this.tasks.length; i++) {
//       taskList.push(this.tasks[i]);
//     };

//     return taskList;
//   };
// };
