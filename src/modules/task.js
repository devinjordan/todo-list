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
        let currentDate = Date.now();
        if (newDueDate < currentDate) {
          throw Error('Due date cannot be in the past.');
        };
        task.dueDate = newDueDate;
      },
      priority(newPriority) {
        task.priority = newPriority;
      },
      status(newStatus) {
        task.status = newStatus;
      },
    },
  };

  return task;
};

export default createTask;
