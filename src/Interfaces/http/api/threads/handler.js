const autoBind = require('auto-bind');
const ThreadUseCase = require('../../../../Applications/use_case/ThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postThreadHandler(request, h) {
    const { id } = request.auth.credentials;

    const threadUseCase = this._container.getInstance(ThreadUseCase.name);
    const addedThread = await threadUseCase.addThread(request.payload, id);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });

    response.code(201);

    return response;
  }

  async getThreadHandler(request, h) {
    const { threadId } = request.params;

    const useCaseParam = { threadId };

    const threadUseCase = this._container.getInstance(ThreadUseCase.name);
    const thread = await threadUseCase.getThread(useCaseParam);

    const response = h.response({
      status: 'success',
      data: {
        thread,
      },
    });

    response.code(200);

    return response;
  }
}

module.exports = ThreadsHandler;
