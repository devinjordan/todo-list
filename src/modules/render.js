import createTask from "./task";
import { createList, lists } from "./list";
import { format } from "date-fns";

export const renderLists = (listsDiv, title, lists) => {
  listsDiv.innerHTML = '';

  for (let i = 0; i < lists.length; i++) {
    const list = lists[i];
    const listButton = document.createElement('button');
    listButton.classList.add('list-button');
    listButton.textContent = list.name;
    listButton.dataset.index = i;
    listButton.addEventListener('click', () => {
      title.textContent = list.name;
      for (let button of listsDiv.children) {
        button.classList.remove('active');
      };
      listButton.classList.add('active');
      renderTasks(list, list.taskList);
    });
    listsDiv.appendChild(listButton);
  };
};

export const renderTasks = (list, taskList) => {
  const tasksDiv = document.getElementById('tasks');
  tasksDiv.innerHTML = '';

  let addTaskButton = document.getElementById('add-task-button');
  addTaskButton.style.visibility = 'visible';

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
      const currentList = getCurrentList();
      task.modify.status();
      // TODO (optional): functionality to move to 'completed tasks'
      if (task.status) {
        let index = currentList.taskList.indexOf(task);
        if (index > -1) {
          currentList.taskList.splice(index, 1);
          currentList.completedTasks.push(task);
        } else {
          index = currentList.completedTasks.indexOf(task);
          currentList.completedTasks.splice(index, 1);
          currentList.taskList.push(task);
        };
      };

      renderTasks(currentList, currentList.taskList);
    });

    removeTask.textContent = '❌';
    removeTask.addEventListener('click', () => {
      const currentList = getCurrentList();
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

  for (let task of list.completedTasks) {
    const completedTaskContainer = document.createElement('div');

    const completedTaskTitle = document.createElement('h3');
    const completedTaskDueDate = document.createElement('p');
    const completedTaskStatus = document.createElement('p');
    const undoButton = document.createElement('button');

    completedTaskTitle.textContent = task.description;
    completedTaskDueDate.textContent = task.dueDate;
    completedTaskStatus.textContent = task.status;
    undoButton.textContent = 'Undo';

    undoButton.addEventListener('click', () => {
      const currentList = getCurrentList();
      task.modify.status();
      let index = currentList.completedTasks.indexOf(task);
      currentList.completedTasks.splice(index, 1);
      currentList.taskList.push(task);
      renderTasks(currentList, currentList.taskList);
    });

    completedTaskContainer.appendChild(completedTaskTitle);
    completedTaskContainer.appendChild(completedTaskDueDate);
    completedTaskContainer.appendChild(completedTaskStatus);
    completedTaskContainer.appendChild(undoButton);

    tasksDiv.appendChild(completedTaskContainer);
  };
};

export const addListners = (lists) => {
  const addListButton = document.getElementById('add-list-button');
  const addTaskButton = document.getElementById('add-task-button');
  const submitTaskButton = document.getElementById('submit-task');

  const addTaskDialog = document.getElementById('add-task-dialog');
  const taskForm = document.getElementById('task-form');

  addListButton.addEventListener('click', () => {
    const listName = prompt('Enter the name of the new list:');
    const listsDiv = document.getElementById('lists');
    const title = document.getElementById('title');

    createList(listName);
    renderLists(listsDiv, title, lists);
  });

  addTaskButton.addEventListener('click', () => {
    addTaskDialog.showModal();
  });

  submitTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    const currentList = getCurrentList();
    const taskDescription = document.getElementById('task-description').value;
    const taskDueDate = document.getElementById('task-due-date').value;
    const taskPriority = document.getElementById('task-priority').value;
    const newTask = createTask(taskDescription, new Date(taskDueDate), taskPriority);
    currentList.addTask(newTask);
    renderTasks(currentList, currentList.taskList);
    taskForm.reset();
    addTaskDialog.close();
  });
};

const getCurrentList = () => {
  const listsDiv = document.getElementById('lists');
  const activeList = listsDiv.querySelector('.active');
  const index = activeList.dataset.index;
  return lists[index];
}