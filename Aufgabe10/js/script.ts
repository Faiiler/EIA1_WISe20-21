interface Task {
    text: string;
    checked: boolean;
}

const todos: Task[] = [];

declare var Artyom: any;

let inputDOMElement: HTMLInputElement;
let addButtonDOMElement: HTMLElement;
let todosDOMElement: HTMLElement;
let counterDOMElement: HTMLElement;

window.addEventListener("load", function (): void {

    inputDOMElement = document.querySelector("#inputTodo");
    addButtonDOMElement = document.querySelector("#addButton");
    todosDOMElement = document.querySelector("#todos");
    counterDOMElement = document.querySelector("#counter");

    addButtonDOMElement.addEventListener("click", addTodoFromInput);

    drawListToDOM();

    // Voice Recognition Stuff

    const artyom: any = new Artyom();

    artyom.addCommands({
        indexes: ["erstelle Aufgabe *"],
        smart: true,
        action: function (i: any, wildcard: string): void {
            addTodo(wildcard);
        }
    });

    function startContinuousArtyom(): void {
        artyom.fatality();

        setTimeout(
            function (): void {
                artyom.initialize({
                    lang: "de-DE",
                    continuous: true,
                    listen: true,
                    interimResults: true,
                    debug: true
                }).then(function (): void {
                    console.log("Ready!");
                });
            },
            250);
    }

    startContinuousArtyom();
});

function drawListToDOM(): void {
    todosDOMElement.innerHTML = "";

    for (let index: number = 0; index < todos.length; index++) {


        let todo: HTMLElement = document.createElement("div");
        todo.classList.add("todo");


        todo.innerHTML = "<span class='check " + todos[index].checked + "'><i class='fas fa-check'></i></span>"
            + todos[index].text +
            "<span class='trash fas fa-trash-alt'></span>";


        todo.querySelector(".check").addEventListener("click", function (): void {
            toggleCheckState(index);
        });
        todo.querySelector(".trash").addEventListener("click", function (): void {
            deleteTodo(index);
        });

        todosDOMElement.appendChild(todo);
    }

    updateCounter();
}

function updateCounter(): void {
    let closed = 0;
    let open = 0;
    for (let task of todos) {
        if (task.checked) {
            closed++;
        } else {
            open++;
        }
    }

    counterDOMElement.innerHTML = `${todos.length} total, ${closed} closed, ${open} open`;
    // todos.length+" total, "+closed+" closed, "+open+" open";
}


function addTodoFromInput(): void {

    if (inputDOMElement.value != "") {
        addTodo(inputDOMElement.value);

        inputDOMElement.value = "";
    }
}

function addTodo(text: string): void {
    let newTask: Task = {
        text: text,
        checked: false,
    };
    todos.unshift(newTask);

    drawListToDOM();
}

function toggleCheckState(index: number): void {

    let task = todos[index];
    task.checked = !task.checked;

    drawListToDOM();
}

function deleteTodo(index: number): void {

    todos.splice(index, 1);

    drawListToDOM();
}
