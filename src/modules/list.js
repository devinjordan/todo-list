let lists = [];

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

export { createList, lists };
