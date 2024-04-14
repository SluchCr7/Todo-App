let theme = document.getElementById("theme");

let body = document.querySelector("body");
let AppTop = document.getElementById("App_top")

const isdark = localStorage.getItem('isdarkMode') === 'enabled';

if (isdark) {
    darkMode();
}

function darkMode() {
    body.classList.toggle("dark_mode");
    localStorage.setItem("isdarkMode", "enabled");
}
function lightMode() {
    body.classList.toggle("light_theme");
    localStorage.setItem("isdarkMode", null);
}

theme.addEventListener("click", () => {
    if (!isdark) {
        darkMode();
        theme.classList.toggle("fa-sun");
    } else {
        lightMode();
        theme.classList.toggle("fa-moon");
    }
})




// =========================

let input = document.getElementById("Task");
let tasks = document.getElementById("tasks");
let end = document.getElementById("end");
let add = document.getElementById("add");


let arr = [];


if (localStorage.getItem("task")) { 
    arr = JSON.parse(localStorage.getItem("task"));
}
document.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        if (input.value) {
            arrayTasks(input.value);
            input.value = "";
            addtasktotasks(arr)
        }
    }
})

const arrayTasks = (value) => {
    const task = {
        id: Date.now(),
        text: value,
        completed: false
    }
    arr.push(task);
    console.log(arr);
    addtasktotasks(arr);
    addTasktolocalstor(arr)
}

const addtasktotasks = (arr) => {
    tasks.innerHTML = "";
    arr.forEach((el) => {
        tasks.innerHTML += `
        <div class="Task">  
            <div class="TaskContent_left">
                <i class="material-icons checkicon" id="check">radio_button_unchecked</i>
                <span class="text" id="text">${el.text}</span>
            </div>
            <i class="fa-solid fa-trash-can icon" id="delete" onclick="deleteTask(${task.id})"></i>
        </div>
        `
    })
}

const addTasktolocalstor = (arr) =>{
    localStorage.setItem("task", JSON.stringify(arr));
}

const getTasksfromlocalstorage = () => {
    if (arr) {
        let task = JSON.parse(localStorage.getItem("task"));
        tasks.innerHTML = "";
        arr.forEach((task) => {
            tasks.innerHTML += `
            <div class="Task">  
            <div class="TaskContent_left">
                    <i class="material-icons checkicon" id="check">radio_button_unchecked</i>
                    <span class="text" id="text">${task.text}</span>
                    </div>
                    <i class="fa-solid fa-trash-can icon" id="delete" onclick="deleteTask(${task.id})"></i>
                    </div>
            
            `
        })

    }
}

getTasksfromlocalstorage()

// =========================

let check = document.getElementById("check");
let text = document.getElementById("text");


// ==========================

console.log(arr.length)

let links = document.querySelectorAll(".filter span");

links.forEach((el) => {
    el.addEventListener("click", (e) => {
        links.forEach((el) => {
            el.classList.remove("active");
        })
        e.target.classList.add("active");
    })
})


// ==========================

let checkicon = document.querySelectorAll(".checkicon");
let task = document.querySelectorAll(".Task")

let clear = document.getElementById("clear")



let arrayactive = []

// Save complete task and save it in local storage
document.addEventListener('DOMContentLoaded', function () {
    const todo = document.querySelectorAll(".Task")
    const todoItems = document.querySelectorAll('.Task .text');
    const todoCheck = document.querySelectorAll('.Task .checkicon');
  // Load todo item states from local storage
    loadTodoItemStates();

  // Add click event listeners to todo items
    todo.forEach(function(todo) {
    todo.addEventListener('click', function () {
        // Toggle completed class
        todo.children[0].children[1].classList.toggle("line")
        todo.children[0].children[0].innerHTML = "check_circle"
        arrayactive.push(todo)
        // todo.classList.toggle('line');
        // todoCheck.innerHTML = "check_circle";
        // Save updated todo item states to local storage
        saveTodoItemStates();
        // delete todo item from from length element
        console.log(arrayactive.length)
        console.log(arr.length)
        });
    
});

  // Function to load todo item states from local storage
function loadTodoItemStates() {
    todo.forEach(function(todo) {
        const isCompleted = JSON.parse(localStorage.getItem(todo.children[0].children[1].textContent));
        const isactive  = JSON.parse(localStorage.getItem(todo.children[0].children[0].innerHTML))
        if (isCompleted || isactive) {
            todo.children[0].children[1].classList.add('line');
            todo.children[0].children[0].innerHTML = "check_circle";
        }
    });
}

  // Function to save todo item states to local storage
function saveTodoItemStates() {
    todo.forEach(function(todo) {
        const isCompleted = todo.children[0].children[1].classList.contains('line');
        const isactive = todo.children[0].children[0].innerHTML === "check_circle"
        localStorage.setItem(todo.children[0].children[1].textContent, JSON.stringify(isCompleted));
        localStorage.setItem(todo.children[0].children[0].innerHTML, JSON.stringify(isactive));
        });
    }
});



// ==============================



clear.addEventListener("click", () => {
    tasks.innerHTML = ""
    arr = []
    localStorage.clear()
    arrayactive = []
    document.getElementById("length").textContent = `0 items left`
})

// remove task

const deleteTask = (id) => {
    const index = arr.findIndex((el) => el.id == id);
    console.log(index)
    arrayactive.splice(index, 1);
    arr.splice(index, 1);
    tasks.innerHTML = "";
    addtasktotasks(arr);
    addTasktolocalstor(arr);
    getTasksfromlocalstorage(); 
}


// ==================================

setInterval(() => {
    if (arrayactive.length > 0) {
        document.getElementById("length").textContent = `${arr.length - arrayactive.length} items left`
        if (arr.length - arrayactive.length == 0) {
            document.getElementById("clear").textContent = "Clear completed"
            arrayactive = []
            arr = []
            localStorage.clear()
        }
        else {
            document.getElementById("clear").textContent = "Clear All"
        }
    }
    else{
        document.getElementById("length").textContent = `${arr.length} items left` 
    }
}, 500)

