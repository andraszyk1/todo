let TODO_INPUT;
let ALERT_INFO;
let ADD_BTN;
let UL_LIST;
let NEW_TASK;
let ALL_TASKS;
let ID_NUMBER = 0;
let POPUP;
let POPUP_INFO;
let EDITED_TODO;
let POPUP_INPUT;
let ADD_POPUP_BTN;
let CLOSE_TODO_BTN;

const main = () => {
    prepareDOMElements();
    prepereDOMEvents();
}

const prepareDOMElements = () => {
    TODO_INPUT = document.querySelector('.todo-input');
    ALERT_INFO = document.querySelector('.alert-info');
    ADD_BTN = document.querySelector('.add-btn');
    UL_LIST = document.querySelector('.todo-list ul');
    ALL_TASKS = document.getElementsByTagName('li');
    POPUP = document.querySelector('.popup');
    POPUP_INFO = document.querySelector('.popup-info');
    POPUP_INPUT = document.querySelector('.popup-input');
    ADD_POPUP_BTN = document.querySelector('.accept');
    CLOSE_TODO_BTN = document.querySelector('.cancel');
}

const prepereDOMEvents = () => {
    ADD_BTN.addEventListener('click', addNewTask);
    TODO_INPUT.addEventListener('keyup', enterCheck);
    UL_LIST.addEventListener('click', checkClick);
    CLOSE_TODO_BTN.addEventListener('click', closePopup);
    ADD_POPUP_BTN.addEventListener('click', changeTodo);
}
const addNewTask = () => {
    if (TODO_INPUT.value !== '') {
        ID_NUMBER++;
        NEW_TASK = document.createElement('li');
        NEW_TASK.innerText = TODO_INPUT.value;
        NEW_TASK.setAttribute('id', `todo-${ID_NUMBER}`);
        UL_LIST.appendChild(NEW_TASK);
        TODO_INPUT.value = "";
        ALERT_INFO.innerText = "";
        createToolsArea();
    } else {
        ALERT_INFO.innerText = "Wpisz treść zadania";
    }
}
const enterCheck = () => {
    console.log(event)
    if (event.keyCode === 13) {
        addNewTask();
    }
}

const checkClick = e => {
    if (e.target.classList.value !== '') {
        if (e.target.closest('button').classList.contains('complete')) {
            e.target.closest('li').classList.toggle('completed');
            e.target.closest('button').classList.toggle('completed');
        }
        else if (e.target.closest('button').classList.contains('edit')) {
            editTask(e);
        }
        else if (e.target.closest('button').classList.contains('delete')) {
            deleteTask(e);
        }

    }
}
const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    NEW_TASK.appendChild(toolsPanel);
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = "Completed";
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML = "Edit";
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = "Delete";
    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
    // <div class="tools">
    //     <button class="complete">Completed</button>
    //     <button class="edit">Edit</button>
    //     <button class="delete">Delete</button>
    // </div>

}
const closePopup = () => {
    POPUP.style.display = 'none';
}

const deleteTask = e => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();
    console.log(ALL_TASKS)
    if (ALL_TASKS.length === 0) {
        ALERT_INFO.innerText = "Tasks list empty";
    }
}

const editTask = e => {
    const oldTodo = e.target.closest('li').id;
    EDITED_TODO = document.getElementById(oldTodo);
    POPUP.style.display = 'flex';
    POPUP_INPUT.value = EDITED_TODO.firstChild.textContent;
}

const changeTodo = () => {
    if (POPUP_INPUT.value !== '') {
        EDITED_TODO.firstChild.textContent = POPUP_INPUT.value;
        closePopup();
    } else {
        POPUP_INFO.innerHTML = "Write new name of task";
    }
}
document.addEventListener('DOMContentLoaded', main);
