const renderLists = () => {

  const listsDiv = document.getElementById('lists');
  const tasksDiv = document.getElementById('tasks');
  const title = document.getElementById('title');

  // Populate default list (may need to move to a different function)
  createList('Default List');
  const newTask = createTask('Groceries', new Date(2021, 8, 1), 1);
  lists[0].addTask(newTask);

  listsDiv.innerHTML = '';

  const addListButton = document.createElement('button');
  addListButton.textContent = '+ Add List';
  addListButton.id = 'add-list-button';
  listsDiv.appendChild(addListButton);


  for (let list of lists) {
    const listButton = document.createElement('button');
    listButton.classList.add('list-button');
    listButton.textContent = list.name;
    listButton.addEventListener('click', () => {
      title.textContent = list.name;
      // TODO: Render tasks
      tasksDiv.innerHTML = '';
      for (let task of list.taskList) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const taskTitle = document.createElement('h3');
        const taskDueDate = document.createElement('p');
        const taskPriority = document.createElement('p');

        // Actions
        const taskStatus = document.createElement('button');
        const removeTask = document.createElement('button');

        // Task information
        // If a task is done, it will be displayed with a line-through
        taskTitle.textContent = task.status ? strike(task.description) : task.description;
        taskDueDate.textContent = format(task.dueDate, 'MM/dd/yyyy');
        switch (task.priority) {
          case 0:
            taskPriority.textContent =  'Low';
            break;
          case 1:
            taskPriority.textContent =  'Medium';
            break;
          case 2:
            taskPriority.textContent =  'High';
            break;
        };

        taskStatus.textContent = task.status ? 'Undo' : 'Done';
        taskStatus.addEventListener('click', () => {
          task.modify.status();
          renderTasks();
        });

        tasksDiv.appendChild(taskDiv);
      }
    });
    listsDiv.appendChild(listButton);
  };

  addListButton.addEventListener('click', () => {
    const listName = prompt('Enter the name of the new list:');
    createList(listName);
    renderLists();
  });

};