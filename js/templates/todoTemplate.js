export const getTodoTemplate = ({todoName, completed}) => `
  <div class="row">
    <div class="col-9 d-flex align-items-center">
      <div class="form-check pl-0 pt-1 mr-3">
        <input class="todo-checkbox" type="checkbox" ${completed ? 'checked' : ''}>
      </div>
      ${completed ? '<del>' : ''}
      ${todoName}
      ${completed ? '</del>' : ''}
    </div>
    <div class="col-3 d-flex justify-content-center">
      <button class="btn btn-danger btn-sm">Usuń</button>
    </div>
  </div>
`;
