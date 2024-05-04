import createTask from "./task";
import { createList, lists } from "./list";

export const renderLists = (listsDiv, title, lists) => {
  listsDiv.innerHTML = '';

  for (let i = 0; i < lists.length; i++) {
    const list = lists[i];
    const listButton = document.createElement('button');
    const headers = document.querySelector('.headers');

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

  const table = document.createElement('table');

  const headers = document.createElement('tr');
  headers.classList.add('headers');
  const taskHeader = document.createElement('th');
  const dueDateHeader = document.createElement('th');
  const priorityHeader = document.createElement('th');
  const actionsHeader = document.createElement('th');
  actionsHeader.colSpan = 2;

  taskHeader.textContent = 'Task';
  dueDateHeader.textContent = 'Due Date';
  priorityHeader.textContent = 'Priority';
  actionsHeader.textContent = 'Actions';

  headers.appendChild(taskHeader);
  headers.appendChild(dueDateHeader);
  headers.appendChild(priorityHeader);
  headers.appendChild(actionsHeader);

  table.appendChild(headers);

  tasksDiv.appendChild(table);

  for (let task of taskList) {
    const taskRow = document.createElement('tr');
    taskRow.classList.add('task');

    const taskTitle = document.createElement('td');
    const taskDueDate = document.createElement('td');
    const taskPriority = document.createElement('td');

    // Actions
    const taskStatusCell = document.createElement('td');
    const taskStatus = document.createElement('button');
    const removeTaskCell = document.createElement('td');
    const removeTask = document.createElement('button');

    // Task information
    // If a task is done, it will be displayed with a line-through
    taskTitle.textContent = task.description;
    taskDueDate.textContent = task.dueDate;
    taskPriority.textContent = task.priority;

    taskStatus.textContent = 'Mark Complete';
    taskStatus.addEventListener('click', () => {
      const currentList = getCurrentList();
      task.modify.status();
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

    removeTask.textContent = 'Remove';
    removeTask.addEventListener('click', () => {
      const currentList = getCurrentList();
      list.removeTask(task);
      renderTasks(currentList, currentList.taskList);
    });

    taskStatusCell.appendChild(taskStatus);
    removeTaskCell.appendChild(removeTask);

    taskRow.appendChild(taskTitle);
    taskRow.appendChild(taskDueDate);
    taskRow.appendChild(taskPriority);
    taskRow.appendChild(taskStatusCell);
    taskRow.appendChild(removeTaskCell);

    table.appendChild(taskRow);
  };

  for (let task of list.completedTasks) {
    const completedTaskContainer = document.createElement('div');
    completedTaskContainer.classList.add('complete-tasks');

    const completedTaskTitle = document.createElement('h3');
    const completedTaskDueDate = document.createElement('p');
    const undoButton = document.createElement('button');

    completedTaskTitle.textContent = task.description;
    completedTaskDueDate.textContent = task.dueDate;
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