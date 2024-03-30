const modifyTask = (list, index, task) => {
  return {
    ...task,
    description(newDescription) {
      this.description = newDescription;
    },
  };
};

export default modifyTask;