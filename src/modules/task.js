
const createTask = (description, dueDate = new Date(), priority = 0, status = false) => {
  let task = {
    description,
    dueDate,
    priority,
    status,
    modify: {
      description(newDescription) {
        task.description = newDescription;
      },
      dueDate(newDueDate) {
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
