import { lists } from "./modules/list.js"; 
import createTask from "./modules/task.js";
import { renderLists, renderTasks, addListners, menuAction } from "./modules/render.js";
import './style.css';

const listsDiv = document.getElementById('lists');
const title = document.getElementById('title');


renderLists(listsDiv, title, lists);
addListners(lists);
menuAction();
