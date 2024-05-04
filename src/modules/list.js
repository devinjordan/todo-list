import createTask from './task.js';

const createList = (name = 'New List') => {
  
  let taskList = [];
  let completedTasks = [];
  
  const addTask = (task) => {
    taskList.push(task);
  };

  const removeTask = (index) => {
    taskList.splice(index, 1);
  };

  lists.push({ name, taskList, completedTasks, addTask, removeTask});
};

// Initialize lists
const lists = [];

// Load lists from local storage, if they exist
const listsJSON = localStorage.getItem('lists');
if (listsJSON) {
  const listsData = JSON.parse(listsJSON);
  listsData.forEach(list => {
    createList(list.name);
    list.taskList.forEach(task => {
      lists[lists.length - 1].addTask(createTask(task.description, new Date(task.dueDate), task.priority, task.status));
    });
    list.completedTasks.forEach(task => {
      lists[lists.length - 1].completedTasks.push(createTask(task.description, new Date(task.dueDate), task.priority, task.status));
    });
  });
};

// Create a default list if no lists exist in local storage
if (lists.length === 0) {
  createList('Default List');
  const groceriesDemoTask = createTask('Groceries', new Date(2021, 8, 1), 'Low');

  const trashDemoTask = createTask('Take out the trash', new Date(2021, 8, 2), 'Medium');

  const billsDemoTask = createTask('Pay bills', new Date(2021, 8, 3), 'High');

  lists[0].addTask(groceriesDemoTask);
  lists[0].addTask(trashDemoTask);
  lists[0].addTask(billsDemoTask);
};

export { createList, lists };
