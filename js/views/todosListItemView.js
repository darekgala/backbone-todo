import { View, history } from 'backbone';
import TodosList from '../models/todosListModel';

export default View.extend({
  tagName: 'li',
  className: 'py-2 px-4 todos-lists__item',
  events: {
    'click': 'handleSelecteTodosList'
  },
  render: function (selected) {
    if (selected) {
      this.$el.addClass('todos-lists__item--selected');
    }

    this.$el.html(`${this.model.get('name')}`);
  },
  handleSelecteTodosList: function () {
    const {id} = this.model;

    window.history.pushState({}, `Backbone TODO List - ${id}`, `/todos-lists/${id}`);
    history.checkUrl();
  }
});
