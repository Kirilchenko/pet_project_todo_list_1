// Массив объектов для задач
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let EditToDoId = -1;
let form = document.querySelector('#todoform');
let todoInput = document.querySelector('#newtodo');
let todosListElement = document.querySelector('#todos-list');
showNewTask();

form.addEventListener('submit', function(event) {
    event.preventDefault();
    saveToDo(); // Сохранение задачи
    showNewTask(); // Показать новую задачу
    localStorage.setItem('todos', JSON.stringify(todos));
});

// Сохранение новой задачи и редактирование задач
function saveToDo() {
    let todoValue = todoInput.value; 
    if(todoValue === ''){ // Запрет ввода задачи без описания
        alert('Введите задачу.');
    }
    else {
            if(EditToDoId >= 0){
                todos = todos.map((todo, index) => ({
                    ...todo,
                    value: index === EditToDoId ? todoValue : todo.value,
                }));
                EditToDoId = -1;
            }
            else {
                todos.push({
                    value: todoValue,
                    checked: false,
                });
            }

    todoInput.value = '';
};
};

// Вывод на экран новой задачи
function showNewTask() {
    todosListElement.innerHTML = ''; 
    todos.forEach((todoObj, index) => {
        todosListElement.innerHTML += `
        <div class="todo" id=${index}>
            <i 
            class="bi ${todoObj.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
            data-action="check"
            ></i>
            <p class="${todoObj.checked ? 'checked' : ''}" data-action="check">${todoObj.value}</p>
            <i class="bi bi-pencil" data-action="edit"></i>
            <i class="bi bi-trash3" data-action="delete"></i>
        </div>`
    })
};

// Определение зоны нажатия
todosListElement.addEventListener('click', function(event){
    let target = event.target;
    let parentElement = target.parentNode;
    if (parentElement.className !== 'todo') {return} // Если Элемент запустивший событие не имеет класс todo - то сброс 
    else {
        let todo = parentElement; // Элемент запустивший событие
        let todoObjId = Number(todo.id); // Его id
        let action = target.dataset.action; // Читаем кастомный атрибут action
        // Запуск действия
        if(action === 'check'){checkToDo(todoObjId);}
        if(action === 'edit'){editToDo(todoObjId);}
        if(action === 'delete'){deleteToDo(todoObjId);}

    };
})

// Выделение задачи
function checkToDo(todoObjId) {
    todos = todos.map((todo, index) => {
        if(index === todoObjId) {
            return {
                value: todo.value,
                checked: !todo.checked,
            }
        }
        else {
            return {
            value: todo.value,
            checked: todo.checked,
        }
    }
    });
    showNewTask();
        localStorage.setItem('todos', JSON.stringify(todos));
};

// Редактирование задачи
function editToDo(todoObjId){
    todoInput.value = todos[todoObjId].value;
    EditToDoId = todoObjId;
    console.log(EditToDoId)
};

//Удаление задачи
function deleteToDo(todoObjId) {
    todos = todos.filter((todo, index) => index !== todoObjId);
    showNewTask();
    localStorage.setItem('todos', JSON.stringify(todos));
}
