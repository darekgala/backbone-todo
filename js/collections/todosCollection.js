import { Collection, history } from 'backbone';
import { LocalStorage } from 'backbone.localstorage';
import TodosList from '../models/todosListModel'

const TodosLists = Collection.extend({
  url: '/todos-lists',
  localStorage: new LocalStorage('todos-backbone'),
  model: TodosList
});

export default new TodosLists();
