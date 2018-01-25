const STORAGE_KEY = 'todos-react'
let uid = 0

export default {
  build(attrs = {}) {
    return {
      completed: false,
      ...attrs,
      __type: 'Todo',
      id: ++uid
    }
  },

  fetch() {
    const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const lastItem = items[items.length - 1]

    if (lastItem) {
      uid = lastItem.id
    }

    return items
  },

  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
