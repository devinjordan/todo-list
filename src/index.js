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
      renderTasks(list, list.taskList);
    });
    listsDiv.appendChild(listButton);
  };

  addListButton.addEventListener('click', () => {
    const listName = prompt('Enter the name of the new list:');
    createList(listName);
    renderLists();
  });

};

const renderTasks = (list, taskList) => {
  tasksDiv.innerHTML = '';
  for (let task of taskList) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    const taskTitle = document.createElement('h3');
    const taskDueDate = document.createElement('p');
    const taskPriority = document.createElement('p');

    // Actions
    const taskStatus = document.createElement('button');
    const removeTask = document.createElement('button');

    // Task information
    // If a task is done, it will be displayed with a line-through
    taskTitle.textContent = task.status ? strike(task.description) : task.description;
    taskDueDate.textContent = format(task.dueDate, 'MM/dd/yyyy');
    switch (task.priority) {
      case 0:
        taskPriority.textContent =  'Low';
        break;
      case 1:
        taskPriority.textContent =  'Medium';
        break;
      case 2:
        taskPriority.textContent =  'High';
        break;
    };

    taskStatus.textContent = task.status ? 'Undo' : 'Done';
    taskStatus.addEventListener('click', () => {
      task.modify.status();
      // TODO (optional): functionality to move to 'completed tasks'
      renderTasks();
    });

    removeTask.textContent = '❌';
    removeTask.addEventListener('click', () => {
      list.removeTask(task);
      renderTasks();
    });

    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDueDate);
    taskDiv.appendChild(taskPriority);
    taskDiv.appendChild(taskStatus);
    taskDiv.appendChild(removeTask);

    tasksDiv.appendChild(taskDiv);
  };
};

renderLists();