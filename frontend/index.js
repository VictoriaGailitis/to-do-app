axios.defaults.headers.post['Content-Type'] = 'application/json';

let to_do_container = document.querySelector(`.to-do-tasks`);
let in_progress_container = document.querySelector(`.in-progress-tasks`);
let done_container = document.querySelector(`.done-tasks`);

let TO_DO_ITEMS = [];
let IN_PROGRESS_ITEMS = [];
let DONE_ITEMS = [];

const API_URL = "http://178.253.55.46:8000/api/tasks/"


loadTasks();

async function loadTasks() {
    server_response = await axios.get(API_URL)
    all_items = server_response.data
    console.log(all_items)
    TO_DO_ITEMS = all_items.filter(item => item.status == "todo")
    IN_PROGRESS_ITEMS = all_items.filter(item => item.status == "in_progress")
    DONE_ITEMS = all_items.filter(item => item.status == "done")
    renderTasks();
    activateFormsAdd("#add-todo", TO_DO_ITEMS)
    activateFormsAdd("#add-in_progress", IN_PROGRESS_ITEMS)
    activateFormsAdd("#add-done", DONE_ITEMS)   
}

function renderTasks() {
    renderItems(".to-do-tasks", TO_DO_ITEMS, "todo")
    renderItems(".in-progress-tasks", IN_PROGRESS_ITEMS, "in_progress")
    renderItems(".done-tasks", DONE_ITEMS, "done")

    activateButtons()
    activateForms()
}

function renderItems(containerSelector, itemsArray, status) {
    const container = document.querySelector(containerSelector);
    container.innerHTML = '';
    itemsArray.forEach(item => {
        container.innerHTML += `
                                        <div class="task card mb-2">
                                    <div class="card-body">
                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><img src="icons/${item.status}.svg" height="20px" width="20px"></button>
                                        <ul class="dropdown-menu">
                                            <li><button class="dropdown-item ${item.status}-todo"><img src="icons/todo.svg" height="20px" width="20px"></button></li>
                                            <li><button class="dropdown-item ${item.status}-in_progress"><img src="icons/in_progress.svg" height="20px" width="20px"></button></li>
                                            <li><button class="dropdown-item ${item.status}-done"><img src="icons/done.svg" height="20px" width="20px"></button></li>
                                        </ul>
                                        <a class="task-title" data-bs-toggle="collapse" href="#${item.id}" aria-expanded="false" aria-controls="${item.id}">
                                            ${item.title}
                                            <p class="task-description text-secondary">${item.description}</p>
                                        </a>
                                        <button class="btn btn-outline-danger btn-delete-${item.status}">X</button>
                                    </div>
                                    <div class="collapse" id="${item.id}">
                                        <form id="update-${item.status}" class="${item.id}">
                                            <div class="input-group">
                                                <input type="text" class="form-control" value="${item.title}" name="title" required>
                                                <input type="text" class="form-control" value="${item.description}" name="description" required>
                                                <button class="btn btn-outline-secondary">✓</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>`;
    });
}

function activateButtons() {
    activateDeleteButtons(TO_DO_ITEMS, "todo")
    activateDeleteButtons(IN_PROGRESS_ITEMS, "in_progress")
    activateDeleteButtons(DONE_ITEMS, "done")

    activateStatusButtons(TO_DO_ITEMS, IN_PROGRESS_ITEMS, "todo", "in_progress")
    activateStatusButtons(TO_DO_ITEMS, DONE_ITEMS, "todo", "done")
    activateStatusButtons(IN_PROGRESS_ITEMS, TO_DO_ITEMS, "in_progress", "todo")
    activateStatusButtons(IN_PROGRESS_ITEMS, DONE_ITEMS, "in_progress", "done")
    activateStatusButtons(DONE_ITEMS, TO_DO_ITEMS, "done", "todo")
    activateStatusButtons(DONE_ITEMS, IN_PROGRESS_ITEMS, "done", "in_progress")
}

function activateForms() {
    activateFormsUpdate("#update-todo", TO_DO_ITEMS)
    activateFormsUpdate("#update-in_progress", IN_PROGRESS_ITEMS)
    activateFormsUpdate("#update-done", DONE_ITEMS)
}

function activateDeleteButtons(itemsArray, status) {
    const deleteButtons = document.querySelectorAll(`.btn-delete-${status}`);
    deleteButtons.forEach((button, index) => {
        button.addEventListener('click', async () => {
            const task = itemsArray[index];
            await axios.delete(`${API_URL}${task.id}`);
            itemsArray.splice(index, 1);
            renderTasks();
        });
    });
}

function activateStatusButtons(itemsArrayChangeFrom, itemsArrayChangeTo, statusChangeFrom, statusChangeTo) {
    const toggleButtons = document.querySelectorAll(`.${statusChangeFrom}-${statusChangeTo}`)
    toggleButtons.forEach((button, index) => {
        button.addEventListener('click', async () => {
            const task = itemsArrayChangeFrom[index];
            await axios.put(`${API_URL}${task.id}`, {status: statusChangeTo});
            task["status"] = statusChangeTo
            itemsArrayChangeFrom.splice(index, 1);
            itemsArrayChangeTo.push(task)
            renderTasks();
        });
    });
}

function activateFormsAdd(formSelector, itemsArray) {
    const form = document.querySelector(formSelector);
    form.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const response = await axios.post(API_URL, form);
        const task = response.data;
        itemsArray.push(task);
        renderTasks();
        form.reset();
    });
}

function activateFormsUpdate(formSelector, itemsArray) {
    const forms = document.querySelectorAll(formSelector);
    forms.forEach((form, index) => {
        form.addEventListener('submit', async (evt) => {
            evt.preventDefault();
            const data = {
                title: form['title'].value,
                description: form['description'].value
            };
            const oldTask = itemsArray[index];
            const response = await axios.put(`${API_URL}${oldTask.id}`, data);
            const updatedTask = response.data;
            itemsArray.splice(index, 1);
            itemsArray.push(updatedTask)
            renderTasks();
            form.reset();
        });
    });
}