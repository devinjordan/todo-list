const createList = (name = 'New List') => {
  
  let taskList = [];
  const addTask = (task) => {
    taskList.push(task);
  };

  const removeTask = (index) => {
    taskList.splice(index, 1);
  };

  return {
    name,
    taskList,
    addTask,
    removeTask,
  };
};

export { createList };
