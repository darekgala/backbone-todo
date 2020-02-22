import { View } from 'backbone';
import { getTodoTemplate } from '../templates/todoTemplate';

export default View.extend({
  tagName: 'li',
  className: 'list-group-item',
  events: {
    'click button': 'handleRemoveTodo',
    'click .todo-checkbox': 'handleToggleTodo',
  },
  initialize: function () {
    this.listenTo(this.model, 'change:completed', this.render);
  },
  render: function () {
    const todoName = this.model.get('name');
    const completed = this.model.get('completed');

    this.$el.html(getTodoTemplate({ todoName, completed }));
  },
  handleRemoveTodo: function (event) {
    this.model.destroy();
    this.remove();
  },
  handleToggleTodo: function (event) {
    event.preventDefault();
    this.model.toggleCompleted();
  }
});
