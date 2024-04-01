// import { format } from "date-fns";
import createList from "./modules/list.js"; 
import createTask from "./modules/task.js";

// TODO: DOM manipulation
const contentDiv = document.getElementById('content');
const addTaskButton = document.createElement('button');
addTaskButton.textContent = '+';
addTaskButton.classList.add('add-task-button');
addTaskButton.addEventListener('click', () => {
  const newTask = createTask('New Task');
  defaultList.addTask(newTask);

  const taskChild = document.createElement('p');
  taskChild.textContent = newTask.description;
  contentDiv.appendChild(taskChild);
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