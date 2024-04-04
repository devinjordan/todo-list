const createTask = (description, dueDate = new Date(), priority = 0, status = false) => {
  let task = {
    description,
    dueDate,
    priority,
    status,
    modify: {
      description(newDescription) {
        if (newDescription === '' || newDescription === null) {
          return;
        };
        task.description = newDescription;
      },
      dueDate(newDueDate) {
        task.dueDate = newDueDate;
      },
      priority(newPriority) {
        task.priority = newPriority;
      },
      status() {
        task.status = !task.status;
      },
    },
  };

  return task;
};

export default createTask;
