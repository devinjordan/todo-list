import { add, format } from "date-fns";
import { lists, createList } from "./modules/list.js"; 
import createTask from "./modules/task.js";
import './style.css';

// TODO: DOM manipulation
const listsDiv = document.getElementById('lists');
const tasksDiv = document.getElementById('tasks');
const title = document.getElementById('title');

createList('Default List');
const newTask = createTask('Groceries', new Date(2021, 8, 1), 1);
lists[0].addTask(newTask);

const renderLists = () => {
  listsDiv.innerHTML = '';

  const addListButton = document.createElement('button');
  addListButton.textContent = '+ Add List';
  addListButton.id = 'add-list-button';
  listsDiv.appendChild(addListButton);


  for (let list of lists) {
    const listButton = document.createElement('button');
    listButton.classList.add('list-button');
    listButton.textContent = list.name;
    listButton.addEventListener('click', () => {
      title.textContent = list.name;
      // TODO: Render tasks
      tasksDiv.innerHTML = '';
      for (let task of list.taskList) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        
        tasksDiv.appendChild(taskDiv);
      }
    });
    listsDiv.appendChild(listButton);
  };

  addListButton.addEventListener('click', () => {
    const listName = prompt('Enter the name of the new list:');
    createList(listName);
    renderLists();
  });

};

renderLists();