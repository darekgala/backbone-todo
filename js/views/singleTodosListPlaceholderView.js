import { View } from 'backbone';
import { getSingleTodosListPlaceholder } from '../templates/singleTodosListPlaceholderTemplate';

export default View.extend({
  el: '.single-todos-list',
  render: function () {
    this.$el.html(getSingleTodosListPlaceholder());
  }
});
