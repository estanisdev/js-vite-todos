import { renderTodos } from './use-cases'
import html from './app.html?raw'
import todoStore from '../store/todo.store'

const ElementIDs = {
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
}

/**
 *
 * @param {String} elementId
 */

export const App = elementId => {
  const displaytodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter())
    renderTodos(ElementIDs.TodoList, todos)
  }
  // Cuando la función App se llama
  ;(() => {
    const app = document.createElement('div')
    app.innerHTML = html
    document.querySelector(elementId).append(app)
    displaytodos()
  })()

  // Referencias HTML
  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput)
  const todoListUL = document.querySelector(ElementIDs.TodoList)

  // Listeners
  newDescriptionInput.addEventListener('keyup', event => {
    if (event.keyCode !== 13) return
    if (event.target.value.trim().length === 0) return

    todoStore.addTodo(event.target.value)
    displaytodos()
    event.target.value = ''
  })

  // TODO: arreglar el evento (no tacha las tareas)
  todoListUL.addEventListener('click', event => {
    const element = event.target.closest('[data-id]')
    console.log(event.target)
    todoStore.toggleTodo(element.getAttribute('data-id'))
    displaytodos()
  })
}
