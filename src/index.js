import { format } from "date-fns";
import createList from "./modules/list.js"; 
import createTask from "./modules/task.js";

// TODO: DOM manipulation
const contentDiv = document.getElementById('content');
const addTaskButton = document.createElement('button');
addTaskButton.textContent = '+';
addTaskButton.classList.add('add-task-button');
addTaskButton.addEventListener('click', () => {
  let description = prompt('Enter task description:');
  let dueDate = prompt('Enter due date (YYYY-MM-DD):');
  let priority = prompt('Set priority (0-2):');

  const newTask = createTask(description, new Date(dueDate), priority);
  defaultList.addTask(newTask);

  const taskChild = document.createElement('p');
  taskChild.textContent = newTask.description;
  contentDiv.appendChild(taskChild);
  
  const table = document.createElement('table');
  const tableRow = document.createElement('tr');
  const descriptionCell = document.createElement('td');
  const dueDateCell = document.createElement('td');
  const priorityCell = document.createElement('td');
  const statusCell = document.createElement('td');
  const statusButton = document.createElement('button');

  descriptionCell.textContent = newTask.description;
  dueDateCell.textContent = newTask.dueDate;
  priorityCell.textContent = newTask.priority;
  statusCell.textContent = newTask.status;

  tableRow.appendChild(descriptionCell);
  tableRow.appendChild(dueDateCell);
  tableRow.appendChild(priorityCell);
  tableRow.appendChild(statusCell);

  table.appendChild(tableRow);

  contentDiv.appendChild(table);
});
contentDiv.appendChild(addTaskButton);

const defaultList = createList('My List');
const newList = createList('New List');

const work = createTask('Work', new Date(2026, 5, 21), 1);
const play = createTask('Play', new Date(2026, 5, 21), 1);
const due = createTask('Due', new Date(2026, 5, 21), 1);
const today = createTask('Today', new Date(2026, 5, 21), 1);

const item = createTask('Item', new Date(2026, 5, 21), 1);
const object = createTask('Object', new Date(2026, 5, 21), 1);
const thing = createTask('Thing', new Date(2026, 5, 21), 1);
const stuff = createTask('Stuff', new Date(2026, 5, 21), 1);

defaultList.addTask(work);
defaultList.addTask(play);
defaultList.addTask(due);
defaultList.addTask(today);

newList.addTask(item);
newList.addTask(object);
newList.addTask(thing);
newList.addTask(stuff);

work.modify.description('Work on project');
play.modify.dueDate(new Date(2026, 8, 22));
due.modify.priority(2);
today.modify.status(true);

newList.removeTask(0);
defaultList.removeTask(2);

console.table(defaultList.taskList);
console.table(newList.taskList);