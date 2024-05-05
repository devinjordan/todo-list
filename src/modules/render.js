import createTask from "./task";
import { createList, lists } from "./list";

export const menuAction = () => {
  const menu = document.getElementById('menu');
  menu.addEventListener('click', () => {
    const listsDiv = document.querySelector('.lists-container');
    listsDiv.classList.toggle('hidden');

    const main = document.querySelector('main');
    main.classList.toggle('lists-minimized');
  });
};

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

  const table = document.createElement('table');

  const headers = document.createElement('tr');
  headers.classList.add('headers');

  const completedHeaders = document.createElement('tr');
  completedHeaders.classList.add('headers');

  const taskHeader = document.createElement('th');
  const dueDateHeader = document.createElement('th');
  const priorityHeader = document.createElement('th');
  const actionsHeader = document.createElement('th');
  actionsHeader.colSpan = 2;

  const completeActionsHeader = document.createElement('th');

  taskHeader.textContent = 'Task';
  dueDateHeader.textContent = 'Due Date';
  priorityHeader.textContent = 'Priority';
  actionsHeader.textContent = 'Actions';
  completeActionsHeader.textContent = 'Actions';

  headers.appendChild(taskHeader);
  headers.appendChild(dueDateHeader);
  headers.appendChild(priorityHeader);
  headers.appendChild(actionsHeader);

  completedHeaders.appendChild(taskHeader.cloneNode(true));
  completedHeaders.appendChild(dueDateHeader.cloneNode(true));
  completedHeaders.appendChild(completeActionsHeader);

  if (list.taskList.length > 0) {
    table.appendChild(headers);
  };

  const completedTable = document.createElement('table');
  completedTable.appendChild(completedHeaders);

  const completedTableTitle = document.createElement('h2');
  completedTableTitle.textContent = 'Completed Tasks';
  completedTableTitle.style.visibility = 'hidden';

  if (list.completedTasks.length > 0) {
    completedTableTitle.style.visibility = 'visible';
  };

  tasksDiv.appendChild(table);
  tasksDiv.appendChild(completedTableTitle);

  table.appendChild(headers);

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
      localStorage.setItem('lists', JSON.stringify(lists));
      renderTasks(currentList, currentList.taskList);
    });

    removeTask.textContent = 'Remove';
    removeTask.addEventListener('click', () => {
      const currentList = getCurrentList();
      list.removeTask(task);
      localStorage.setItem('lists', JSON.stringify(lists));
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
    const completedTask = document.createElement('tr');
    completedTask.classList.add('completed-task');

    const completedTaskTitle = document.createElement('td');
    const completedTaskDueDate = document.createElement('td');
    const undoButtonCell = document.createElement('td');
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
      localStorage.setItem('lists', JSON.stringify(lists));
      renderTasks(currentList, currentList.taskList);
    });

    undoButtonCell.appendChild(undoButton);

    completedTask.appendChild(completedTaskTitle);
    completedTask.appendChild(completedTaskDueDate);
    completedTask.appendChild(undoButtonCell);

    completedTable.appendChild(completedTask);

    tasksDiv.appendChild(completedTable);
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
    localStorage.setItem('lists', JSON.stringify(lists));

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
    localStorage.setItem('lists', JSON.stringify(lists));
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
};