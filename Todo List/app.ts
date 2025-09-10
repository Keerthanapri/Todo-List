interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input')! as HTMLInputElement;
    const addBtn = document.getElementById('add-btn')! as HTMLButtonElement;
    const todoList = document.getElementById('todo-list')! as HTMLUListElement;

    let todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
    let idCounter = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 0;

    renderTodos();

    addBtn.addEventListener('click', addTodo);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTodo(); });

    function addTodo() {
        const text = input.value.trim();
        if (!text) return;

        const newTodo: Todo = { id: idCounter++, text, completed: false };
        todos.push(newTodo);
        saveAndRender();
        input.value = '';
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            li.className = todo.completed ? 'completed' : '';

            li.addEventListener('click', () => {
                todo.completed = !todo.completed;
                saveAndRender();
            });

            const removeBtn = document.createElement('button');
            removeBtn.textContent = '❌';
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                todos = todos.filter(t => t.id !== todo.id);
                saveAndRender();
            });

            li.appendChild(removeBtn);
            todoList.appendChild(li);
        });
    }

    function saveAndRender() {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }
});
