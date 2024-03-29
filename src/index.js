class Task {
  constructor(description, dueDate = new Date(), priority = 0, status = false) {
    this.Description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
  };

  changeDescription(newDescription) {
    Validation.validateDescription(newDescription);
    this.Description = newDescription;
  };

  changeFullDate(year, month, day) {
    Validation.validateDate(year, month, day);
    this.dueDate = new Date(year, month - 1, day);
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
  };

  markComplete() {
    this.status = true;
  };
  markIncomplete() {
    this.status = false;
  };
};

class Validation {
  static validateDescription(newDescription) {
    if (newDescription === '') {
      throw Error('Include a description in the task.');
    };
  };

  static validateDate(year, month, day) {
    const newDate = new Date(year, month - 1, day);
    if (newDate < Date.now()) {
      throw Error('Date may not be in the past.');
    };
  };
};


const clean = new Task('Clean the house');

console.log(clean);

clean.markComplete();
clean.changeFullDate(2025, 2, 20);
clean.changeDescription('Take out the trash');
clean.updatePriority(2);

console.log(clean);