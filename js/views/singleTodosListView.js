import { View, history } from 'backbone';
import TodoModel from '../models/todoModel';
import TodoView from './todoView';
import { getSingleTodosListTemplate } from '../templates/singleTodosListTemplate';

const invalidClass = 'is-invalid';
const hiddenClass = 'd-none';

export default View.extend({
  el: '.single-todos-list',
  events: {
    'focus .todo-input': 'handleInputFocus',
    'submit .todo-form': 'handleAddTodo',
    'change .single-todos-list-input': 'handleListNameInputChange',
    'click .single-todos-list-remove-button': 'handleRemoveTodoList',
    'click .single-todos-list-edit-button': 'handleEditTodoList',
    'click .single-todos-list-save-button': 'handleSaveTodoList'
  },
  initialize: function () {
    this.initializeElements();
    this.initalizeListeners();
  },
  initializeElements: function () {
    const name = this.model.get('name');

    this.$el.html(getSingleTodosListTemplate(name));
    this.$singleTodosListName = this.$('.single-todos-list-name');
    this.$singleTodosListInput = this.$('.single-todos-list-input')[0];
    this.$singleTodosList = this.$('.single-todos-list');
    this.$todoInput = this.$('.todo-input')[0];
    this.$todoHidden = this.$('.todo-hidden')
  },
  initalizeListeners: function () {
    this.listenTo(this.model, 'change:items', this.render);
    this.listenTo(this.model, 'change:name', this.updateListName);
  },
  render: function () {
    this.$singleTodosList.html('');

    const items = this.model.get('items');

    items.forEach(this.renderTodo.bind(this));
  },
  clear: function () {
    this.undelegateEvents();
    this.$el.off();
    this.$el.children().remove();
    this.stopListening(this.model);
    this.stopListening();
  },
  updateListName: function () {
    this.$singleTodosListName.html(this.model.get('name'));
    this.$todoHidden.toggleClass(hiddenClass);
  },
  renderTodo: function ({ name, completed }, index) {
    const todoModel = new TodoModel({ name, completed, index });
    const todoView = new TodoView({ model: todoModel });

    this.listenTo(todoModel, 'destroy', this.handleRemoveTodo);
    this.listenTo(todoModel, 'change:completed', this.handleCompleteTodo);
    todoView.render();
    this.$singleTodosList.append(todoView.el);
  },
  handleListNameInputChange: function ({ target }) {
    this.$singleTodosListInput.setAttribute('value', target.value);
  },
  handleInputFocus: function () {
    this.$todoInput.classList.remove(invalidClass);
  },
  handleEditTodoList: function () {
    this.$todoHidden.toggleClass(hiddenClass);
  },
  handleSaveTodoList: function () {
    const currentListName = this.model.get('name');
    const newListName = this.$singleTodosListInput.getAttribute('value');

    if (currentListName !== newListName) {
      this.model.setTodoListName(newListName);
      this.model.save();
    } else {
      this.$todoHidden.toggleClass(hiddenClass);
    }
  },
  handleRemoveTodoList: function () {
    const confirmed = confirm('Czy na pewno chcesz usunąc tą listę?');

    if (confirmed) {
      this.clear();
      this.model.destroy();

      window.history.pushState({}, `Backbone TODO List`, '/');
      history.checkUrl();
    }
  },
  handleAddTodo: function (event) {
    event.preventDefault();

    const todoName = this.$todoInput.value;

    if (todoName) {
      this.$todoInput.value = null;
      this.model.addTodo(todoName);
      this.model.save();
    } else {
      this.$todoInput.classList.add(invalidClass);
    }
  },
  handleRemoveTodo: function (todo) {
    this.model.removeTodo(todo);
    this.model.save();
  },
  handleCompleteTodo: function (todo) {
    this.model.completeTodo(todo);
    this.model.save();
  }
});
