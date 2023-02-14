import { Todo } from '../todos/models/todo-model'

const Filters = {
  All: 'all',
  Completed: 'Completed',
  Pending: 'Pending',
}

// state proporciona la info que quiero mostrar, Filter el aplicado
const state = {
  todos: [
    new Todo('Piedra del alma'),
    new Todo('Piedra del espacio'),
    new Todo('Piedra del tiempo'),
    new Todo('Piedra del poder'),
    new Todo('Piedra del realidad'),
  ],
  filter: Filters.All,
}

const initStore = () => {
  loadStore()
  console.log('InitStore 🥑')
}

const loadStore = () => {
  if (!localStorage.getItem('state')) return
  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem('state')
  )
  state.todos = todos
  state.filter = filter
}

const saveStateToLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(state))
}
/**
 *
 * @param {String} description
 */
const addTodo = description => {
  if (!description) throw new Error('Description is required')
  state.todos.push(new Todo(description))
  saveStateToLocalStorage()
}

const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos]
    case Filters.Completed:
      return state.todos.filter(todo => todo.done)
    case Filters.Pending:
      return state.todos.filter(todo => !todo.done)
    default:
      throw new Error(`Option ${filter} is not valid`)
  }
}

/**
 *
 * @param {String} todoId Todo identifier
 */
const toggleTodo = todoId => {
  state.todos = state.todos.map(todo => {
    if (todo.id === todoId) {
      todo.done = !todo.done
    }
    return todo
  })
  saveStateToLocalStorage()
}

/**
 *
 * @param {*} todoId
 */
const deleteTodo = todoId => {
  state.todos = state.todos.filter(todo => todo.id !== todoId)
  saveStateToLocalStorage()
}

const deleteCompleted = todoId => {
  state.todos = state.todos.filter(todo => todo.done)
  saveStateToLocalStorage()
}

/**
 *
 * @param {Filters} newFilter
 */
const setFilter = (newFilter = Filters.All) => {
  //Object.keys(Filters).
  state.filter = newFilter
  saveStateToLocalStorage()
}

const getCurrentFilter = () => {
  return state.filter
}

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
}
