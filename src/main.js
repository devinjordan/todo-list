import createList from "./modules/list.js"; 
import createTask from "./modules/task.js";

// TODO: DOM manipulation

const myList = createList('My List');

const work = createTask('Work', new Date(2026, 5, 21), 1);
const play = createTask('Play', new Date(2026, 5, 21), 1);
const due = createTask('Due', new Date(2026, 5, 21), 1);
const today = createTask('Today', new Date(2026, 5, 21), 1);


myList.addTask(work);
myList.addTask(play);
myList.addTask(due);
myList.addTask(today);

console.log(work.description);
work.modify.description('Work on project');
console.log(work.description);

console.log(myList.name);
console.table(myList.taskList);
