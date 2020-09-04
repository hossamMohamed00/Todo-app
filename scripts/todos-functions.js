'use strict'
// * Get saved todos from the localStoarge
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos');
    // Data validation
    try {
        // check if todosJSON exists or not
        return todosJSON  ? JSON.parse(todosJSON) :  []
    } catch (error) {
        return []
    }
}

// * Save todos in the local storage
const saveTodos = (todos) => {
    localStorage.setItem('todos' , JSON.stringify(todos));
}

// * Render Todos 
const renderTodos = (todos , filters) => {
    const todoEl =  document.querySelector('#todos')
    let filteredTodos = todos.filter( (todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
        return searchTextMatch && hideCompletedMatch;
    });
    
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed )

    todoEl.innerHTML = '' // wipe all data before render the new data.

    todoEl.appendChild(generateSummaryDOM(incompleteTodos)) // Print Summary msg

    if(filteredTodos.length > 0) {
        //Render app data on the browser
        filteredTodos.forEach((todo) => {
            todoEl.appendChild( generateTodoDOM(todo))
        });
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No to-do to show'
        todoEl.appendChild(emptyMessage)

    }
}

// * Remove a todo from the list
const removeTodo =  (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1){
        todos.splice(todoIndex , 1);
    }
}

// * Toggle the completed value for a given todo
const ToggleTodo = (id) => {
    const todoIndex = todos.findIndex( (todo) => todo.id === id)

    if(todoIndex > -1){
        todos[todoIndex].completed = !todos[todoIndex].completed; 
    }
}

// * Generate the DOM structure for a todo
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label');
    const containerEl =document.createElement('div')
    const checkBox = document.createElement('input');
    const TextEl = document.createElement('span');
    const removeButton = document.createElement('button');

    // Setup the checkbox before todo text
    checkBox.setAttribute('type' , 'checkbox');
    containerEl.appendChild(checkBox);
    checkBox.checked = todo.completed 
    checkBox.addEventListener('change' ,() => {
        ToggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos , filters)
    })
     

    // Setup todo text
    TextEl.textContent = todo.text;
    containerEl.appendChild(TextEl);

     // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the button after todo text 
    removeButton.textContent = 'remove';
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton);
    removeButton.addEventListener('click' ,() => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos , filters);
    })

    return todoEl;
}

// * Generatethe DOM structure for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h4') 
    const plural  = incompleteTodos.length === 1 ? '' : 's'
    summary.classList.add('list-title');
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left!`;
    return summary;
} 

