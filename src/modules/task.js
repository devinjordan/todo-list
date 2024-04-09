import { format } from 'date-fns';

const createTask = (description, dueDate = new Date(), priority = 0, status = false) => {
  const time = '18:00:00.000';
  let task = {
    description,
    // TODO: Fix date issue. Format API being called multiple times when creating more than one task. Apparently a time is required when creating a new Date object.
    dueDate: format(dueDate, 'MM/dd/yyyy'),
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
        task.dueDate = format(newDueDate, 'MM/dd/yyyy');
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
