const autoBind = require('auto-bind');
const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');

class CommentsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postCommentHandler(request, h) {
    const { id } = request.auth.credentials;

    const addCommentUseCase = this._container.getInstance(
      AddCommentUseCase.name
    );

    const addedComment = await addCommentUseCase.execute(
      request.params,
      request.payload,
      id
    );

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });

    response.code(201);

    return response;
  }

  async deleteCommentHandler(request, h) {
    const { id } = request.auth.credentials;

    const deleteCommentUseCase = this._container.getInstance(
      DeleteCommentUseCase.name
    );

    await deleteCommentUseCase.execute(request.params, id);

    const response = h.response({
      status: 'success',
    });

    response.code(200);

    return response;
  }
}

module.exports = CommentsHandler;
