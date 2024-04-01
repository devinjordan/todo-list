import { format } from "date-fns";
import { lists, createList } from "./modules/list.js"; 
import createTask from "./modules/task.js";
import './style.css';

// TODO: DOM manipulation
const listsDiv = document.getElementById('lists');
const tasksDiv = document.getElementById('tasks');

createList('Default List');
const newTask = createTask('Groceries', new Date(2021, 8, 1), 1);
lists[0].addTask(newTask);
console.log(lists[0]);
