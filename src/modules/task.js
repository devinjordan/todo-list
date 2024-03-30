const createTask = (description, dueDate = new Date(), priority = 0, status = false) => {
  return {
    description,
    dueDate,
    priority,
    status,
  };
};

export default createTask;
