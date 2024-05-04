import { lists, createList } from "./modules/list.js"; 
import createTask from "./modules/task.js";
import { renderLists, renderTasks, addListners } from "./modules/render.js";
import './style.css';

// TODO: DOM manipulation
const listsDiv = document.getElementById('lists');
const title = document.getElementById('title');

createList('Default List');
const groceriesDemoTask = createTask('Groceries', new Date(2021, 8, 1), 'Low');

const trashDemoTask = createTask('Take out the trash', new Date(2021, 8, 2), 'Medium');

const billsDemoTask = createTask('Pay bills', new Date(2021, 8, 3), 'High');

lists[0].addTask(groceriesDemoTask);
lists[0].addTask(trashDemoTask);
lists[0].addTask(billsDemoTask);

renderLists(listsDiv, title, lists);
addListners(lists);