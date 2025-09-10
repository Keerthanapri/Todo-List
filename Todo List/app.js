var input = document.getElementById('todo-input');
var addBtn = document.getElementById('add-btn');
var todoList = document.getElementById('todo-list');
var todos = [];
var idCounter = 0;
// Add todo
addBtn.addEventListener('click', function () {
    var text = input.value.trim();
    if (text !== "") {
        var newTodo = { id: idCounter++, text: text, completed: false };
        todos.push(newTodo);
        input.value = "";
        renderTodos();
    }
});
// Render todos
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach(function (todo) {
        var li = document.createElement('li');
        li.textContent = todo.text;
        li.className = todo.completed ? "completed" : "";
        // Toggle completion
        li.addEventListener('click', function () {
            todo.completed = !todo.completed;
            renderTodos();
        });
        // Remove button
        var removeBtn = document.createElement('button');
        removeBtn.textContent = "❌";
        removeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            todos = todos.filter(function (t) { return t.id !== todo.id; });
            renderTodos();
        });
        li.appendChild(removeBtn);
        todoList.appendChild(li);
    });
}
