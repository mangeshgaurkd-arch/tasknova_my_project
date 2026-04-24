let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Add Task
function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value.trim();

  if (text === "") {
    alert("Enter task!");
    return;
  }

  tasks.push({
    text: text,
    completed: false,
    time: new Date()
  });

  input.value = "";
  renderTasks();
}

// Render Tasks
function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  let completedCount = 0;

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = task.text;

    let diff = (new Date() - new Date(task.time)) / 1000;

    if (task.completed) {
      span.classList.add("completed");
      completedCount++;
    } else if (diff > 60) {
      span.classList.add("pending");
    }

    span.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    };

    let btnGroup = document.createElement("div");

    // Edit
    let editBtn = document.createElement("button");
    editBtn.innerText = "✏️";
    editBtn.classList.add("edit-btn");

    editBtn.onclick = () => {
      let newTask = prompt("Edit task:", task.text);
      if (newTask && newTask.trim() !== "") {
        tasks[index].text = newTask;
        renderTasks();
      }
    };

    // Delete
    let delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.classList.add("delete-btn");

    delBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);

    list.appendChild(li);
  });

  document.getElementById("total").innerText = tasks.length;
  document.getElementById("completed").innerText = completedCount;

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Search
function searchTask() {
  let value = document.getElementById("search").value.toLowerCase();
  let items = document.querySelectorAll("li");

  items.forEach(li => {
    li.style.display = li.innerText.toLowerCase().includes(value)
      ? "flex"
      : "none";
  });
}

// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Start
renderTasks();