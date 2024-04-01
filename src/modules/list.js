let lists = [];

const createList = (name = 'New List') => {
  
  let taskList = [];
  const addTask = (task) => {
    taskList.push(task);
  };

  const removeTask = (index) => {
    taskList.splice(index, 1);
  };

  lists.push({ name, taskList, addTask, removeTask});
};

export { createList, lists };
