class Task {
  constructor(content, dueDate = new Date(), priority = 0, status = false) {
    this.content = content;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
  };

  changeContent(newContent) {
    if (newContent === '') {
      throw Error('Content must not be a blank string.');
    }
    this.content = newContent;
  };

  changeFullDate(year, month, day) {
    const newDate = new Date(year, month - 1, day);
    if (newDate < Date.now()) {
      throw Error('Date may not be in the past');
    }
    this.dueDate = newDate;
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
}


const clean = new Task('Clean the house');
clean.status = false;

console.log(clean);

clean.markComplete();
clean.changeFullDate(2025, 2, 20);
clean.changeContent('Take out the trash');
clean.updatePriority(2);

console.log(clean);