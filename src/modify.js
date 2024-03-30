const modifyTask = {
  description: function (description) {
    if (description === '') {
      throw Error('Include a description in the task.');
    };
    return description;
  },
  date: function (year, month, day) {
    const date = new Date(year, month - 1, day);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (date < Date.now()) {
      throw Error('Date may not be in the past');
    };
  },
};

export { modifyTask };
