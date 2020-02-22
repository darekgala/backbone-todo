import { View, Router, history } from 'backbone';
import todosListsCollection from '../collections/todosCollection';
import TodosListsView from '../views/todosListsView';
import SingleTodosListView from '../views/singleTodosListView';
import SingleTodosListPlaceholderView from '../views/singleTodosListPlaceholderView';

const App = Router.extend({
  routes: {
    '': 'render',
    'todos-lists/:id': 'handleSelectList'
  },
  start: function () {
    history.start({ pushState: true });
  },
  initialize: function () {
    this.listenTo(todosListsCollection, 'change:name', this.update);

    todosListsCollection.fetch();

    this.todosListsView = new TodosListsView({ collection: todosListsCollection });
  },
  render: function () {
    this.todosListsView.render();

    const placeholder = new SingleTodosListPlaceholderView();

    placeholder.render();
  },
  update: function () {
    this.todosListsView.render(this.selectedTodoListId);
  },
  handleSelectList: function (id) {
    this.selectedTodoListId = id;
    this.todosListsView.render(id);

    const selectedTodoList = todosListsCollection.findWhere({id});

    if (this.singleTodosListView) {
      this.singleTodosListView.clear();
    }

    if (selectedTodoList) {
      this.singleTodosListView = new SingleTodosListView({ model: selectedTodoList });
      this.singleTodosListView.render();
    }
  }
});

export default new App();
