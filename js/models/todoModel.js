import { Model } from 'backbone';

export default Model.extend({
  defaults: function() {
    return {
      name: null,
      completed: false
    }
  },
  toggleCompleted: function () {
    const completed = this.get('completed');

    this.set('completed', !completed);
  }
});
