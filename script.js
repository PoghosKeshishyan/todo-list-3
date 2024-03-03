// SELECTORS
const todoInput = document.querySelector('.main form input[type=text]');
const addTodoBtn = document.querySelector('.main form button');
const selectTodo = document.querySelector('.main form select');
const todo = document.querySelector('.todo');
const removeSel = document.querySelector('.remove-selected');
const removeAll = document.querySelector('.main .deleted .remove-all');
const color1 = ['aqua', 'seagreen', 'steelblue', 'springgreen', 'darkblue', 'deeppink'];
const color2 = ['salmon', 'white', 'rosybrown', 'tan', 'tomato', 'yellow', 'palegreen', 'paleturquoise', 'palevioletred', 'pink'];

// EVENT LISTENERS
addTodoBtn.addEventListener('click', addTodo);
todo.addEventListener('click', checkTodo);
removeSel.addEventListener('click', removeTodo);
removeAll.addEventListener('click', removeTodos);
selectTodo.addEventListener('click', todoSelect);
document.addEventListener('DOMContentLoaded', startTodo);

// FUNCTIONS
function addTodo(e) {
    let backColor = colorTwo();
    let leftColor = colorOne();

    e.preventDefault();

    todoInput.focus();

    if(!todoInput.value.trim()) return;

    const todoList = document.createElement('div');
    todoList.classList.add('todo-list');
    todoList.style.background = backColor;

    const text = document.createElement('div');
    text.classList.add('text');
    text.innerText = todoInput.value;
    todoList.appendChild(text);    

    const color = document.createElement('div');
    color.classList.add('color');
    color.style.background = leftColor;
    text.appendChild(color);

    const icons = document.createElement('div');
    icons.classList.add('icons');
    icons.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    icons.innerHTML += '<i class="fa-solid fa-trash"></i>';
    todoList.appendChild(icons);

    const colorIcon = document.createElement('div');
    colorIcon.classList.add('color-icon');
    todoList.appendChild(colorIcon);

    todo.appendChild(todoList);
    saveInLocalStorage(todoInput.value);
    todoInput.value = '';
    removeAll.style.display = 'flex';
}

function checkTodo(e) {
    const parent = e.target.parentElement.parentElement;
    
    if(e.target.classList[1] == 'fa-circle-check'){
        parent.classList.toggle('active');
        removeSel.style.display = 'flex';  
    }

    if(e.target.classList[1] == 'fa-trash'){
        removeFromLocalStorage(parent.children[0].innerText);
        parent.remove(); 
        removeSel.style.display = 'none';  
    }

    const todos = document.querySelectorAll('.todo-list');
    if(!todos.length){
        removeAll.style.display = 'none';
    }
}

function removeTodo() {
    const todos = document.querySelectorAll('.todo-list');
    todos.forEach(todo=>{
        if(todo.classList.contains('active')){
            todo.remove();
            removeFromLocalStorage(todo.children[0].innerText);
            removeSel.style.display = 'none';
        }
    })
}

function removeTodos() {
    const todos = document.querySelectorAll('.todo-list');
    todos.forEach(todo=>{
        todo.remove();
        removeFromLocalStorage(todo.children[0].innerText);
        removeSel.style.display = 'none';
        removeAll.style.display = 'none';
    })
}

function todoSelect(e) {
    const todos = document.querySelectorAll('.todo-list');

    todos.forEach(todo=>{
        switch(e.target.value){
            case 'all': todo.style.display = 'flex'; break;
            case 'selected': if(todo.classList.contains('active')){
                todo.style.display = 'flex';
                } else{
                    todo.style.display = 'none';
                }; break;
            case 'unfinished': if(!todo.classList.contains('active')){
                todo.style.display = 'flex';
                } else{
                    todo.style.display = 'none';
                }; break; 
        }; 
    })
}

// FUNCTIONS >> Colors
function colorOne() {
    let index = Math.round( Math.random()*(color1.length-1) );
    return color1[index];
}

function colorTwo() {
    let index = Math.round( Math.random()*(color2.length-1) );
    return color2[index];
}

// Local Storage
function saveInLocalStorage(text) {
    let todos = [];
    
    if(localStorage.getItem('todos')) todos = JSON.parse(localStorage.getItem('todos'));

    todos.push(text);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeFromLocalStorage(text) {
    let todos = JSON.parse(localStorage.getItem('todos'));

    let index = todos.indexOf(text);
    todos.splice(index, 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}

function startTodo() {
    let todos = JSON.parse(localStorage.getItem('todos'));

    todos.forEach(el=>{
        let backColor = colorTwo();
        let leftColor = colorOne();
        const todoList = document.createElement('div');
        todoList.classList.add('todo-list');
        todoList.style.background = backColor;

        const text = document.createElement('div');
        text.classList.add('text');
        text.innerText = el;
        todoList.appendChild(text);    

        const color = document.createElement('div');
        color.classList.add('color');
        color.style.background = leftColor;
        text.appendChild(color);

        const icons = document.createElement('div');
        icons.classList.add('icons');
        icons.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        icons.innerHTML += '<i class="fa-solid fa-trash"></i>';
        todoList.appendChild(icons);

        const colorIcon = document.createElement('div');
        colorIcon.classList.add('color-icon');
        todoList.appendChild(colorIcon);

        todo.appendChild(todoList);
        removeAll.style.display = 'flex';    
    })
}
