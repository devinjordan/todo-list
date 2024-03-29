class Task {
  constructor(content, dueDate = new Date(), priority = 0, status = false) {
    this.content = content;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
  };

  changeContent(newContent) {
    if (newContent == '') {
      throw Error('Content must not be a blank string.');
    }
    this.content = newContent;
  };

  changeDate(newDate) {
    this.dueDate.setDate(newDate);
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
clean.dueDate = 'Tomorrow';
clean.status = false;

console.log(clean);

clean.markComplete();

console.log(clean);