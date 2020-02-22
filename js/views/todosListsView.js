import { View, history } from 'backbone';
import TodosListsItemView from '../views/todosListItemView';
import TodosListModel from '../models/todosListModel';
import { getTodosListsTemplate } from '../templates/todosListsTemplate';

export default View.extend({
  el: '.todos-lists',
  events: {
    'click button': 'addTodosList',
  },
  initialize: function (options) {
    this.initializeElements();
    this.initializeListeners();
  },
  initializeElements: function () {
    this.$el.html(getTodosListsTemplate());
    this.$list = this.$('ul');
  },
  initializeListeners: function () {
    this.listenTo(this.collection, 'add', this.renderTodosList);
  },
  render: function (selectedListId) {
    this.$list.html('');
    this.selectedListId = selectedListId;
    this.collection.forEach(this.renderTodosList, this);
  },
  renderTodosList: function (item) {
    const todosListItemView = new TodosListsItemView({ model: item });
    const todosListIsSelected = item.id === this.selectedListId;

    todosListItemView.render(todosListIsSelected);
    this.$list.append(todosListItemView.el);
  },
  addTodosList: function () {
    const name = prompt('Podaj nazwę listy');

    if (name) {
      const {id} = this.collection.create({ name });
      window.history.pushState({}, `Backbone TODO List - ${id}`, `/todos-lists/${id}`);
      history.checkUrl();
    }
  }
});
