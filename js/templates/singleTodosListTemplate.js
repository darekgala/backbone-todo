export const getSingleTodosListTemplate = listName => `
  <div class="container py-3 px-5">
    <div class="row mb-4">
      <div class="offset-3 col-6 text-center todo-hidden">
        <h3 class="single-todos-list-name">${listName}</h3>
      </div>

      <div class="col-3 text-right todo-hidden">
        <div class="d-flex align-items-center justify-content-center">
          <div class="todo-list__icon mx-2 single-todos-list-edit-button">
            <i class="fas fa-pencil-alt fa-lg"></i>
          </div>

          <div class="todo-list__icon mx-2 single-todos-list-remove-button">
            <i class="far fa-trash-alt fa-lg"></i>
          </div>
        </div>
      </div>

      <div class="col-9 input-group todo-hidden d-none">
        <input
          name="listName"
          value="${listName}"
          class="form-control single-todos-list-input"
        />
      </div>

      <div class="col-3 todo-hidden d-none">
        <button class="btn btn-primary text-uppercase single-todos-list-save-button">
          Zapisz
        </button>
      </div>
    </div>

    <ul class="single-todos-list list-group list-group-flush">
    </ul>

    <div class="mt-3">
      <form class="row todo-form">
        <div class="col-9">
          <input class="form-control todo-input" name="todo" placeholder="Nazwa zadania" />
        </div>

        <div class="col-3 d-flex justify-content-center">
          <button class="btn btn-primary text-uppercase" submit>&#43;</button>
        </div>
      </form>
    </div>
  </div>
`;
