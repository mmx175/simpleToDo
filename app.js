const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
];

(function (arrOfTasks) {
  //Создание объекта объектов задач
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // Elements UI
  const listContainer = document.querySelector(".list-group");
  const form = document.forms["addTask"];
  const inputTitle = form["title"];
  const inputBody = form["body"];

  // Events

  renderAllTasks(objOfTasks);
  form.addEventListener("submit", onFormSubmitHandler);
  listContainer.addEventListener("click", onDeleteHandler);

  // Добавление всех задач
  function renderAllTasks(taskList) {
    //Проверка на адеквата taskList
    if (!taskList) {
      console.error("taskList не передан");
      return;
    }
    const fragment = document.createDocumentFragment();
    Object.values(taskList).forEach((task) => {
      // Отправляемся в создание DOM-разметки и получаем разметку-----------
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  // создание DOM-разметки для каждого li
  function listItemTemplate({ _id, title, body } = {}) {
    // Сoздание li
    let li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2"
    );
    li.setAttribute("data-task-id", _id);
    // Создание внутренностей li
    const span = document.createElement("span");
    span.textContent = title;
    span.classList.add("task-title");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "ml-auto", "task-delete-btn");
    const taskText = document.createElement("p");
    taskText.textContent = body;
    taskText.classList.add("mt-2", "w-100", "task-text");
    // Присоединение созданных внутренностий к li
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(taskText);
    return li;
  }
  
  // Получение данных из формы и добавление новой задачи
  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    if (!titleValue || !bodyValue) {
      alert("Пожалуйста введите название и описание задачи");
      return;
    }
    const task = addNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement("afterbegin", listItem);
    form.reset();
  }

  //Создание объекта новой задачи
  function addNewTask(title, body) {
    const newTask = {
      _id: `task-${Math.random()}`,
      title,
      body,
      completed: false,
    };
    objOfTasks[newTask._id] = newTask;
    return newTask;
  }

  // получение ID удаляемой задачи
  function onDeleteHandler(e) {
    if (e.target.classList.contains("task-delete-btn")) {
      const parent = e.target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      console.log(confirmed);
      deleteTaskFromHtml(confirmed, parent);
    }
  }

  // Подтверждаем удаление и удаляем из DOM
  function deleteTask(id) {
    deletedTask = objOfTasks[id];
    const isConfirmed = confirm(`Удалить задачу "${deletedTask.title}"?`);
    if (!isConfirmed) return isConfirmed;
    delete objOfTasks[id];
    return isConfirmed;
  }

  function deleteTaskFromHtml(confirmed, taskLi) {
    if (!confirmed) return
    taskLi.remove();
  }
})(tasks);
