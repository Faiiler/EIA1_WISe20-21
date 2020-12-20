const listsContainer: HTMLUListElement = document.querySelector("[data-lists]");
const newListForm: HTMLFormElement = document.querySelector("[data-new-list-form]");
const newListInput: HTMLInputElement = document.querySelector("[data-new-list-input]");
const delteListButton: HTMLButtonElement = document.querySelector("[data-delete-list-button]");
const listDisplayContainer: HTMLDivElement = document.querySelector("[data-list-display-container]");
const listTitleElement: HTMLElement = document.querySelector("[data-list-title]");
const listCountElement: HTMLElement = document.querySelector("[data-list-count]");
const taskContainer: HTMLDivElement = document.querySelector("[data-tasks]");
const taskTemplate: HTMLTemplateElement = document.getElementById("task-template") as HTMLTemplateElement;
const newTaskForm: HTMLFormElement = document.querySelector("[data-new-task-form]");
const newTaskInput: HTMLInputElement = document.querySelector("[data-new-task-input]");
const clearCompleteTasksButton: HTMLButtonElement = document.querySelector("[data-clear-complete-tasks-button]");

interface Task {
    id: string;
    name: string;
    complete: boolean;
}

interface TaskList {
    id: string;
    name: string;
    tasks: Task[];
}

const LOCAL_STORAGE_LIST_KEY: string = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY: string = "task.slectedListId";
let lists: TaskList[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId: string = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

listsContainer.addEventListener("click", e => { //e => = function (e)
    if (e.target instanceof HTMLElement) {
        let target: HTMLElement = e.target as HTMLElement;
        if (target.tagName.toLowerCase() === "li") {
            selectedListId = target.dataset.listId;
            saveAndRender();
        }
    }
});

taskContainer.addEventListener("click", e => {
    if (e.target instanceof HTMLInputElement) {
        let target: HTMLInputElement = e.target as HTMLInputElement;
        if (target.tagName.toLowerCase() === "input") {
            const selectedList: TaskList = lists.find(list => list.id === selectedListId);
            const selectedTask: Task = selectedList.tasks.find(task => task.id === target.id);
            selectedTask.complete = target.checked;
            save();
            renderTaskCount(selectedList);
        }
    }
});


clearCompleteTasksButton.addEventListener("click", e => {
    const selectedList: TaskList = lists.find(list => list.id === selectedListId);
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
    saveAndRender();
});

delteListButton.addEventListener("click", e => {
    lists = lists.filter(list => list.id !== selectedListId);
    selectedListId = null;
    saveAndRender();
});

newListForm.addEventListener("submit", e => {
    e.preventDefault();
    const listName: string = newListInput.value;
    if (listName == null || listName === "") return;
    const list: TaskList = createList(listName);
    newListInput.value = null;
    lists.push(list);
    saveAndRender();
});

newTaskForm.addEventListener("submit", e => {
    e.preventDefault();
    const taskName: string = newTaskInput.value;
    if (taskName == null || taskName === "") return;
    const task: Task = createTask(taskName);
    newTaskInput.value = null;
    const selectedList: TaskList = lists.find(list => list.id === selectedListId);
    selectedList.tasks.push(task);
    saveAndRender();
});

function createList(name: string): TaskList {
    return { id: Date.now().toString(), name: name, tasks: [] };

}

function createTask(name: string): Task {
    return { id: Date.now().toString(), name: name, complete: false };
}

function saveAndRender(): void {
    save();
    render();
}

function save(): void {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function render(): void {
    clearElement(listsContainer);
    renderLists();
    const selectedList: TaskList = lists.find(list => list.id === selectedListId);
    if (selectedListId == null) {
        listDisplayContainer.style.display = "none";
    } else {
        listDisplayContainer.style.display = "";
        listTitleElement.innerText = selectedList.name;
        renderTaskCount(selectedList);
        clearElement(taskContainer);
        renderTasks(selectedList);
    }
}
function renderTasks(selectedList: TaskList): void {
    selectedList.tasks.forEach(task => {
        const taskElement: DocumentFragment = document.importNode(taskTemplate.content, true) as DocumentFragment; //true to render everything thats inside the template
        const checkbox: HTMLInputElement = taskElement.querySelector("input");
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        const label: HTMLLabelElement = taskElement.querySelector("label");
        label.htmlFor = task.id;
        label.append(task.name);
        taskContainer.appendChild(taskElement);
    });
}

function renderTaskCount(selectedList: TaskList): void {
    const incompleteTaskCount: number = selectedList.tasks.filter(task => !task.complete).length;
    const taskString: string = incompleteTaskCount === 1 ? "task" : "tasks"; // if incompleted Tasks = 1 use task, else use tasks
    listCountElement.innerText = `${incompleteTaskCount} ${taskString}
    remaining`;

}

function renderLists(): void {
    lists.forEach(list => {
        const listElement: HTMLLIElement = document.createElement("li");
        listElement.dataset.listId = list.id;
        listElement.classList.add("list-name");
        listElement.innerText = list.name;
        if (list.id === selectedListId) {
            listElement.classList.add("active-list");
        }
        listsContainer.appendChild(listElement);
    });
}

function clearElement(element: Element): void {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

render();