import createTask from "./task";
import { createList } from "./list";
import { format } from "date-fns";

let listenersAdded = false;

export const renderLists = (listsDiv, title, lists) => {
  listsDiv.innerHTML = '';
  const addListButton = document.getElementById('add-list-button');

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
    renderLists(listsDiv, title, lists);
  });
};

export const renderTasks = (list, taskList) => {
  console.table(list.taskList);
  const tasksDiv = document.getElementById('tasks');
  let currentList = list;
  tasksDiv.innerHTML = '';

  const addTaskDialog = document.getElementById('add-task-dialog');
  let addTaskButton = document.getElementById('add-task-button');
  addTaskButton.style.visibility = 'visible';

  const taskForm = document.getElementById('task-form');
  const submitTaskButton = document.getElementById('submit-task');

  if (!listenersAdded) {
    addTaskButton.addEventListener('click', () => {
      addTaskDialog.showModal();
    });

    submitTaskButton.addEventListener('click', (event) => {
      event.preventDefault();
      const taskDescription = document.getElementById('task-description').value;
      const taskDueDate = document.getElementById('task-due-date').value;
      const taskPriority = document.getElementById('task-priority').value;
      const newTask = createTask(taskDescription, new Date(taskDueDate), taskPriority);
      list.addTask(newTask);
      renderTasks(currentList, currentList.taskList);
      console.log(taskDueDate);
      taskForm.reset();
      addTaskDialog.close();
    });
  };

  for (let task of taskList) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task');

    const taskTitle = document.createElement('h3');
    const taskDueDate = document.createElement('p');
    const taskPriority = document.createElement('p');

    // Actions
    const taskStatus = document.createElement('button');
    const removeTask = document.createElement('button');

    // Task information
    // If a task is done, it will be displayed with a line-through
    taskTitle.textContent = task.description;
    taskTitle.style.textDecoration = task.status ? 'line-through' : 'none';
    taskDueDate.textContent = task.dueDate;
    taskPriority.textContent = task.priority;

    taskStatus.textContent = task.status ? 'Undo' : 'Done';
    taskStatus.addEventListener('click', () => {
      task.modify.status();
      // TODO (optional): functionality to move to 'completed tasks'
      renderTasks(currentList, currentList.taskList);
    });

    // TODO: Not functioning properly
    removeTask.textContent = '❌';
    removeTask.addEventListener('click', () => {
      list.removeTask(task);
      renderTasks(currentList, currentList.taskList);
    });

    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskDueDate);
    taskContainer.appendChild(taskPriority);
    taskContainer.appendChild(taskStatus);
    taskContainer.appendChild(removeTask);

    tasksDiv.appendChild(taskContainer);
  };
};
