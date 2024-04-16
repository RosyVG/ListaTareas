document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(allTasks));
    }

    function renderTasks(filter) {
        taskList.innerHTML = '';
        const filteredTasks = filterTasks(filter);
        filteredTasks.forEach(function(task, index) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button class="delete" data-index="${index}">Eliminar</button>
            `;
            li.querySelector('span').addEventListener('click', function() {
                task.completed = !task.completed;
                saveTasks();
                renderTasks(filter);
            });
            li.querySelector('.delete').addEventListener('click', function() {
                allTasks.splice(index, 1);
                saveTasks();
                renderTasks(filter);
            });

            taskList.appendChild(li);
        });
    }
    
    function filterTasks(filter) {
        switch (filter) {
            case 'active':
                return allTasks.filter(task => !task.completed);
            case 'completed':
                return allTasks.filter(task => task.completed);
            default:
                return allTasks;
        }
    }

    document.getElementById('all').addEventListener('click', function() {
        renderTasks('all');
    });

    document.getElementById('active').addEventListener('click', function() {
        renderTasks('active');
    });

    document.getElementById('completed').addEventListener('click', function() {
        renderTasks('completed');
    });

    document.getElementById('edit').addEventListener('click', function() {
        renderTasks('edit');
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) {
            const text = taskInput.value.trim();
            if (text !== '') {
                allTasks.push({ text: text, completed: false });
                saveTasks();
                renderTasks('all');
                taskInput.value = '';
            }
        }
    });

    renderTasks('all');
});