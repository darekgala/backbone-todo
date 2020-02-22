import { Model } from 'backbone';

export default Model.extend({
  url: '/todos-lists',
  defaults: function () {
    return {
      name: null,
      items: []
    }
  },
  setTodoListName: function (name) {
    this.set('name', name);
  },
  addTodo: function (todoName) {
    const todos = this.get('items');
    const newTodo = { name: todoName, completed: false };

    this.set('items', [...todos, newTodo]);
  },
  completeTodo: function (todo) {
    const index = todo.get('index');
    const todos = this.get('items');

    todos[index] = {...todos[index], completed: todo.get('completed')}
    this.set('items', todos);
  },
  removeTodo: function (todo) {
    const index = todo.get('index');
    const items = this.get('items');
    const newItems = [...items];

    newItems.splice(index, 1);
    this.set('items', newItems);
  }
});
