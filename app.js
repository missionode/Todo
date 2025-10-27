let tasksList = document.getElementById('tasksList');
let taskInput = document.getElementById('taskInput');

function addTask() {
  let taskText = taskInput.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement('li');
  li.textContent = taskText;
  li.addEventListener('click', function() {
    this.classList.toggle('done');
  });

  tasksList.appendChild(li);
  taskInput.value = '';
}

function deleteTask(task) {
  const index = tasksList.indexOf(task);
  if (index > -1) {
    tasksList.removeChild(task);
  } else {
    alert('This task does not exist!');
  }
}

tasksList.addEventListener('click', function(event) {
  const target = event.target;

  if (target.tagName === 'LI') {
    deleteTask(target);
  } else if (target.classList.contains('done')) {
    taskInput.value = target.textContent.replace(/(\s*\(.*\))\s*/, "");
    document.getElementById("tasksList").innerHTML = '';
  } else {
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.value = target.textContent;
    tasksList.insertBefore(textInput, target.nextSibling);

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit Task';
    editButton.addEventListener('click', function() {
      const editedTask = textInput.value;
      taskInput.value = editedTask;
      tasksList.insertBefore(document.createElement('li'), target);
      document.querySelector('li').textContent = editedTask;
    });

    tasksList.insertBefore(editButton, target);
  }
});
