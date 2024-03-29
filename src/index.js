class Task {
  constructor(description, dueDate = new Date(), priority = 0, status = false) {
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
  };

  changeDescription(newDescription) {
    Validation.validateDescription(newDescription);
    this.description = newDescription;
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

class TodoList {
  constructor() {
    this.tasks = [];
  };

  addTask(description, dueDate, priority) {
    const newTask = new Task(description, dueDate, priority);
    this.tasks.push(newTask);
  };

  removeTask(index) {
    this.tasks.splice(index, 1);
  };

  listTasks() {
    let taskList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      taskList.push(this.tasks[i]);
    };

    return taskList;
  };
};

const myList = new TodoList();

const work = myList.addTask('Do stuff', new Date(2026, 5, 21), 1);
const play = myList.addTask('Do stuff', new Date(2026, 5, 21), 1);
const due = myList.addTask('Do stuff', new Date(2026, 5, 21), 1);
const today = myList.addTask('Do stuff', new Date(2026, 5, 21), 1);

console.table(myList.listTasks());
