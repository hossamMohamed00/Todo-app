'use strict'
let todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos , filters);

// * Listen for new todo creation   
document.querySelector('#add-new-todo').addEventListener('submit' ,(e) => {
    e.preventDefault();
    
    let todoText = e.target.elements.newTodo.value.trim();
    if(todoText.length > 0) {
        // add the new item to the todos array
        todos.push({
            id: uuidv4(),
            text: todoText,
            completed: false
        });

        saveTodos(todos);

        renderTodos(todos , filters);
        e.target.elements.newTodo.value = '' //clear the input field value
    }
    
})

// * Listen for todos filteration
document.querySelector('#search-text').addEventListener('input' ,(e) => {
    filters.searchText = e.target.value;
    renderTodos(todos , filters);
})

// * Hide completed todos using checkboxes
document.querySelector('#hide-completed').addEventListener('change' , (e) => {
    
    filters.hideCompleted = e.target.checked; // true / false
    renderTodos(todos , filters);
})