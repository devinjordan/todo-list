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
  console.log(lists[0].taskList);
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
  let currentList = list;
  tasksDiv.innerHTML = '';

  let addTaskButton = document.createElement('button');
  addTaskButton.textContent = '+ Add Task';
  addTaskButton.id = 'add-task-button';
  tasksDiv.appendChild(addTaskButton);

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
    // taskDueDate.textContent = format(task.dueDate, 'MM/dd/yyyy');
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

    addTaskButton.addEventListener('click', () => {
      addTaskButton.style.visibility = 'hidden';

    // Create the form elements
      const taskForm = document.createElement('form');
      const taskDescriptionInput = document.createElement('input');
      const taskDueDateInput = document.createElement('input');
      const taskPrioritySelect = document.createElement('select');
      const priorityPlaceholder = document.createElement('option');
      const lowPriorityOption = document.createElement('option');
      const mediumPriorityOption = document.createElement('option');
      const highPriorityOption = document.createElement('option');
      const submitButton = document.createElement('button');

      // Set the input types and placeholders
      taskDescriptionInput.type = 'text';
      taskDescriptionInput.placeholder = 'Task description...';
      taskDueDateInput.type = 'date';
      taskDueDateInput.placeholder = 'Due date (MM/DD/YYYY)';
      taskPrioritySelect.name = 'priority';
      taskPrioritySelect.id = 'priority';
      priorityPlaceholder.value = '';
      priorityPlaceholder.textContent = 'Priority';
      lowPriorityOption.value = 0;
      lowPriorityOption.textContent = 'Low';
      mediumPriorityOption.value = 1;
      mediumPriorityOption.textContent = 'Medium';
      highPriorityOption.value = 2;
      highPriorityOption.textContent = 'High';
      submitButton.type = 'submit';
      submitButton.textContent = 'Add Task';

      // Append the inputs and button to the form
      taskForm.appendChild(taskDescriptionInput);
      taskForm.appendChild(taskDueDateInput);
      taskForm.appendChild(taskPrioritySelect);


      taskPrioritySelect.appendChild(priorityPlaceholder);
      taskPrioritySelect.appendChild(lowPriorityOption);
      taskPrioritySelect.appendChild(mediumPriorityOption);
      taskPrioritySelect.appendChild(highPriorityOption);
      taskPrioritySelect.addEventListener('click', () => {
        priorityPlaceholder.remove();
      });
      taskForm.appendChild(submitButton);
      tasksDiv.prepend(taskForm);

      // Listen for the form's submit event
      taskForm.addEventListener('submit', (event) => {
        // Prevent the form from submitting and the page from reloading
        event.preventDefault();

        // Get the input values
        const taskDescription = taskDescriptionInput.value;
        const taskDueDate = new Date(taskDueDateInput.value);
        const taskPriority = parseInt(taskPrioritySelect.value);

        // Create a new task and add it to the list
        const newTask = createTask(taskDescription, taskDueDate, taskPriority);
        list.addTask(newTask);

        // Update the UI
        renderTasks(currentList, currentList.taskList);

        // Clear the input fields
        taskDescriptionInput.value = '';
        taskDueDateInput.value = '';
        taskPrioritySelect.value = '';

        // Remove the form
        taskForm.remove();

        addTaskButton.style.visibility = 'visible';
      });
    });

    taskStatus.textContent = task.status ? 'Undo' : 'Done';
    taskStatus.addEventListener('click', () => {
      task.modify.status();
      // TODO (optional): functionality to move to 'completed tasks'
      renderTasks(currentList, currentList.taskList);
    });

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

renderLists(lists[0], lists[0].taskList);