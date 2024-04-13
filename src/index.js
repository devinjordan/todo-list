import { lists, createList } from "./modules/list.js"; 
import createTask from "./modules/task.js";
import { renderLists, renderTasks, addListners } from "./modules/render.js";
import './style.css';

// TODO: DOM manipulation
const listsDiv = document.getElementById('lists');
const title = document.getElementById('title');

createList('Default List');
const newTask = createTask('Groceries', new Date(2021, 8, 1), 'Low');
lists[0].addTask(newTask);

renderLists(listsDiv, title, lists);
addListners(lists);