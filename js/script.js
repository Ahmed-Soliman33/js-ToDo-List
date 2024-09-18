var taskInput = document.querySelector("#task-input")
var addTaskBtn = document.querySelector("#add-btn")
var taskList = document.querySelector("#task-list")

// Load tasks from localStorage on page load
window.onload = function() {
    drawtasks();
};

// Add event listener for adding tasks
addTaskBtn.addEventListener("click" , () => {
    let taskText = taskInput.value.trim() ;

    if (taskText !== '') {
        addTask(taskText)
        taskInput.value = '' ;
    }
    else {
        showNotification("Please Enter Your Task")
    }
})

// Function to add a task
const addTask = (taskText)=> {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.push({id: Date.now() , taskTitle : taskText , completed : false})
    localStorage.setItem('tasks' , JSON.stringify(tasks))
    drawtasks()
    showNotification("Task added successfully!")
}

// Function to render tasks in the DOM
const drawtasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
    taskList.innerHTML = ''
    tasks.forEach((task) => {
        const li = document.createElement('li')
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
        <span class="${task.completed ? 'spanThrough' : 'span'}" >${task.taskTitle}</span>
        <div class='div' >
                <button class="edit-btn" onclick="editTask(${task.id})"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn" onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash"></i></button>
                <input type="checkbox" onclick="toggleComplete(${task.id})" ${task.completed ? 'checked' : ''}>
        </div>
        `
        
        taskList.appendChild(li)
    })
}

// Function to toggle task completion
const toggleComplete = (id) => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
     tasks = tasks.map((task) => {
        if (task.id === id ) {
            task.completed = !task.completed
        }   
        return task
    })
    localStorage.setItem("tasks" , JSON.stringify(tasks))
    drawtasks()
    showNotification("Task is Completed")
}

// Function to delete a task
const deleteTask = (id) => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks = tasks.filter((task) => {
        return task.id !== id
    })
    localStorage.setItem("tasks" , JSON.stringify(tasks))
    drawtasks()
    showNotification("Task is Deleted")
}   

// Function to edit a task
const editTask = (id) => {
    let newEdit = prompt("Add modification :").trim()
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks = tasks.map((task) => {
        if (task.id === id && newEdit !== '' ) {
            task.taskTitle = newEdit
            showNotification("Task is Modified")
        }   
        return task
    })
    localStorage.setItem("tasks" , JSON.stringify(tasks))
    drawtasks()
}

// Function to show notifications
const showNotification = (notification) => {
    let divNote = document.createElement("div")
    divNote.className = "divNote"
    document.body.appendChild(divNote)
    divNote.innerHTML = ` <p class="pNote">${notification}</p> `
    setTimeout( () => {
        divNote.remove();
    } ,2000)
}