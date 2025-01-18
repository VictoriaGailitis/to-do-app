axios.defaults.headers.post['Content-Type'] = 'application/json';

let to_do_container = document.querySelector(`.to-do-tasks`);
let in_progress_container = document.querySelector(`.in-progress-tasks`);
let done_container = document.querySelector(`.done-tasks`);

let TO_DO_ITEMS = [];
let IN_PROGRESS_ITEMS = [];
let DONE_ITEMS = [];

loadTasks();

async function loadTasks() {
    server_response = await axios.get('http://178.253.55.46:8000/api/tasks')
    all_items = server_response.data
    console.log(all_items)
    TO_DO_ITEMS = all_items.filter(item => item.status == "todo")
    IN_PROGRESS_ITEMS = all_items.filter(item => item.status == "in_progress")
    DONE_ITEMS = all_items.filter(item => item.status == "done")
    renderTasks();
}

function renderTasks() {
    to_do_container.innerHTML = ``;
    in_progress_container.innerHTML = ``;
    done_container.innerHTML = ``;

    for (let i = 0; i < TO_DO_ITEMS.length; i++) {
        let to_do_item = TO_DO_ITEMS[i];

        to_do_container.innerHTML += `
                                        <div class="task card mb-2">
                                    <div class="card-body">
                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">👉</button>
                                        <ul class="dropdown-menu">
                                            <li><button class="dropdown-item in-progress-for-to-do">⏳</button></li>
                                            <li><button class="dropdown-item done-for-to-do">✅</button></li>
                                        </ul>
                                        <a class="task-title" data-bs-toggle="collapse" href="#to_do_${to_do_item.id}" aria-expanded="false" aria-controls="to_do_${to_do_item.id}">
                                            ${to_do_item.title}
                                            <p class="task-description text-secondary">${to_do_item.description}</p>
                                        </a>
                                        <button class="btn btn-outline-danger btn-delete-to-do">X</button>
                                    </div>
                                    <div class="collapse" id="to_do_${to_do_item.id}">
                                        <form id="update-to-do" class="${to_do_item.id}">
                                            <div class="input-group">
                                                <input type="text" class="form-control" value="${to_do_item.title}" name="title" required>
                                                <input type="text" class="form-control" value="${to_do_item.description}" name="description" required>
                                                <button class="btn btn-outline-secondary">✓</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
        `;
    }

    for (let i = 0; i < IN_PROGRESS_ITEMS.length; i++) {
        let in_progress_item = IN_PROGRESS_ITEMS[i];

        in_progress_container.innerHTML += `
                                        <div class="task card mb-2">
                                    <div class="card-body">
                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">⏳</button>
                                        <ul class="dropdown-menu">
                                            <li><button class="dropdown-item to-do-for-in-progress">👉</button></li>
                                            <li><button class="dropdown-item done-for-in-progress">✅</button></li>
                                        </ul>
                                        <a class="task-title" data-bs-toggle="collapse" href="#in_progress_${in_progress_item.id}" aria-expanded="false" aria-controls="in_progress_${in_progress_item.id}">
                                            ${in_progress_item.title}
                                            <p class="task-description text-secondary">${in_progress_item.description}</p>
                                        </a>
                                        <button class="btn btn-outline-danger btn-delete-in-progress">X</button>
                                    </div>
                                    <div class="collapse" id="in_progress_${in_progress_item.id}">
                                        <form id="update-in-progress">
                                            <div class="input-group">
                                                <input type="text" class="form-control" value="${in_progress_item.title}" name="title" required>
                                                <input type="text" class="form-control" value="${in_progress_item.description}" name="description" required>
                                                <button class="btn btn-outline-secondary">✓</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
        `;
    }

    for (let i = 0; i < DONE_ITEMS.length; i++) {
        let done_item = DONE_ITEMS[i];

        done_container.innerHTML += `
                                        <div class="task card mb-2">
                                    <div class="card-body">
                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">✅</button>
                                        <ul class="dropdown-menu">
                                            <li><button class="dropdown-item to-do-for-done">👉</button></li>
                                            <li><button class="dropdown-item in-progress-for-done">⏳</button></li>
                                        </ul>
                                        <a class="task-title" data-bs-toggle="collapse" href="#done_${done_item.id}" aria-expanded="false" aria-controls="done_${done_item.id}">
                                            ${done_item.title}
                                            <p class="task-description text-secondary">${done_item.description}</p>
                                        </a>
                                        <button class="btn btn-outline-danger btn-delete-done">X</button>
                                    </div>
                                    <div class="collapse" id="done_${done_item.id}">
                                        <form id="update-done">
                                            <div class="input-group">
                                                <input type="text" class="form-control" value="${done_item.title}" name="title" required>
                                                <input type="text" class="form-control" value="${done_item.description}" name="description" required>
                                                <button class="btn btn-outline-secondary">✓</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
        `;
    }
    activateButtonsToDo()
    activateButtonsInProgress()
    activateButtonsDone()

    activateFormsToDo()
    activateFormsInProgress()
    activateFormsDone()
}

function activateButtonsToDo() {
    let deleteButtons = document.querySelectorAll(".btn-delete-to-do")
    for (let i = 0; i < deleteButtons.length; i++) {
        let button = deleteButtons[i];
        let task = TO_DO_ITEMS[i]

        button.addEventListener('click', async function() {
            let response = axios.delete(`http://178.253.55.46:8000/api/tasks/${task.id}`)
            TO_DO_ITEMS.splice(i, 1)
            renderTasks()
        })
    }

    let toggleInProgressButtons = document.querySelectorAll(".in-progress-for-to-do")
    for (let i = 0; i < toggleInProgressButtons.length; i++) {
        let button = toggleInProgressButtons[i];
        let task = TO_DO_ITEMS[i]

        button.addEventListener('click', async function() {
            let response = axios.put(`http://178.253.55.46:8000/api/tasks/${task.id}`, {"status": "in_progress"})
            TO_DO_ITEMS.splice(i, 1)
            IN_PROGRESS_ITEMS.push(task)
            renderTasks()
        })
    }

    let toggleDoneButtons = document.querySelectorAll(".done-for-to-do")
    for (let i = 0; i < toggleDoneButtons.length; i++) {
        let button = toggleDoneButtons[i];
        let task = TO_DO_ITEMS[i]

        button.addEventListener('click', async function() {
            let response = axios.put(`http://178.253.55.46:8000/api/tasks/${task.id}`, {"status": "done"})
            TO_DO_ITEMS.splice(i, 1)
            DONE_ITEMS.push(task)
            renderTasks()
        })
    }
}

function activateButtonsInProgress() {
    let deleteButtons = document.querySelectorAll(".btn-delete-in-progress")
    for (let i = 0; i < deleteButtons.length; i++) {
        let button = deleteButtons[i];
        let task = IN_PROGRESS_ITEMS[i]

        button.addEventListener('click', async function() {
            let response = axios.delete(`http://178.253.55.46:8000/api/tasks/${task.id}`)
            IN_PROGRESS_ITEMS.splice(i, 1)
            renderTasks()
        })
    }

    let toggleToDoButtons = document.querySelectorAll(".to-do-for-in-progress")
    for (let i = 0; i < toggleToDoButtons.length; i++) {
        let button = toggleToDoButtons[i];
        let task = IN_PROGRESS_ITEMS[i]

        button.addEventListener('click', async function() {
            let response = axios.put(`http://178.253.55.46:8000/api/tasks/${task.id}`, {"status": "todo"})
            IN_PROGRESS_ITEMS.splice(i, 1)
            TO_DO_ITEMS.push(task)
            renderTasks()
        })
    }

    let toggleDoneButtons = document.querySelectorAll(".done-for-in-progress")
    for (let i = 0; i < toggleDoneButtons.length; i++) {
        let button = toggleDoneButtons[i];
        let task = IN_PROGRESS_ITEMS[i]

        button.addEventListener('click', async function() {
            let response = axios.put(`http://178.253.55.46:8000/api/tasks/${task.id}`, {"status": "done"})
            IN_PROGRESS_ITEMS.splice(i, 1)
            DONE_ITEMS.push(task)
            renderTasks()
        })
    }
}


function activateButtonsDone() {
    let deleteButtons = document.querySelectorAll(".btn-delete-done")
    for (let i = 0; i < deleteButtons.length; i++) {
        let button = deleteButtons[i];
        let task = DONE_ITEMS[i]

        button.addEventListener('click', async function() {
            let response = axios.delete(`http://178.253.55.46:8000/api/tasks/${task.id}`)
            DONE_ITEMS.splice(i, 1)
            renderTasks()
        })
    }

    let toggleToDoButtons = document.querySelectorAll(".to-do-for-done")
    for (let i = 0; i < toggleToDoButtons.length; i++) {
        let button = toggleToDoButtons[i];
        let task = DONE_ITEMS[i]

        button.addEventListener('click', async function() {
            let response = axios.put(`http://178.253.55.46:8000/api/tasks/${task.id}`, {"status": "todo"})
            DONE_ITEMS.splice(i, 1)
            TO_DO_ITEMS.push(task)
            renderTasks()
        })
    }

    let toggleInProgressButtons = document.querySelectorAll(".in-progress-for-done")
    for (let i = 0; i < toggleInProgressButtons.length; i++) {
        let button = toggleInProgressButtons[i];
        let task = DONE_ITEMS[i]

        button.addEventListener('click', async function() {
            let response = axios.put(`http://178.253.55.46:8000/api/tasks/${task.id}`, {"status": "in_progress"})
            DONE_ITEMS.splice(i, 1)
            IN_PROGRESS_ITEMS.push(task)
            renderTasks()
        })
    }
}

function activateFormsToDo() {
    let add_form = document.querySelector("#add-to-do")
    add_form.addEventListener('submit', async function(evt) {
        evt.preventDefault()
        let response = await axios.post("http://178.253.55.46:8000/api/tasks", add_form)
        let task = response.data
        TO_DO_ITEMS.push(task)
        renderTasks()
        add_form.reset()
    })

    let update_forms = document.querySelectorAll("#update-to-do")
    for (let i = 0; i < update_forms.length; i++) {
        let update_form = update_forms[i]
        let old_task = TO_DO_ITEMS[i]
        update_form.addEventListener('submit', async function(evt) {
            evt.preventDefault()
            const update_data = {title: update_form["title"].value, description: update_form["description"].value}
            let response = await axios.put(`http://178.253.55.46:8000/api/tasks/${old_task.id}`, update_data)
            let new_task = response.data
            TO_DO_ITEMS.splice(i, 1)
            TO_DO_ITEMS.push(new_task)
            renderTasks()
            update_form.reset()
        })
    }
}

function activateFormsInProgress() {
    let add_form = document.querySelector("#add-in-progress")
    add_form.addEventListener('submit', async function(evt) {
        evt.preventDefault()
        let response = await axios.post("http://178.253.55.46:8000/api/tasks", add_form)
        let task = response.data
        IN_PROGRESS_ITEMS.push(task)
        renderTasks()
        add_form.reset()
    })

    let update_forms = document.querySelectorAll("#update-in-progress")
    for (let i = 0; i < update_forms.length; i++) {
        let update_form = update_forms[i]
        let old_task = IN_PROGRESS_ITEMS[i]
        update_form.addEventListener('submit', async function(evt) {
            evt.preventDefault()
            const update_data = {title: update_form["title"].value, description: update_form["description"].value}
            let response = await axios.put(`http://178.253.55.46:8000/api/tasks/${old_task.id}`, update_data)
            let new_task = response.data
            IN_PROGRESS_ITEMS.splice(i, 1)
            IN_PROGRESS_ITEMS.push(new_task)
            renderTasks()
            update_form.reset()
        })
    }
}

function activateFormsDone() {
    let add_form = document.querySelector("#add-done")
    add_form.addEventListener('submit', async function(evt) {
        evt.preventDefault()
        let response = await axios.post("http://178.253.55.46:8000/api/tasks", add_form)
        let task = response.data
        DONE_ITEMS.push(task)
        renderTasks()
        add_form.reset()
    })

    let update_forms = document.querySelectorAll("#update-done")
    for (let i = 0; i < update_forms.length; i++) {
        let update_form = update_forms[i]
        let old_task = DONE_ITEMS[i]
        update_form.addEventListener('submit', async function(evt) {
            evt.preventDefault()
            const update_data = {title: update_form["title"].value, description: update_form["description"].value}
            let response = await axios.put(`http://178.253.55.46:8000/api/tasks/${old_task.id}`, update_data)
            let new_task = response.data
            DONE_ITEMS.splice(i, 1)
            DONE_ITEMS.push(new_task)
            renderTasks()
            update_form.reset()
        })
    }
}