const NewThread = require('../../Domains/threads/entities/NewThread');

class ThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async addThread(useCasePayload, userIdFromAccessToken) {
    const newThread = new NewThread(useCasePayload);

    return this._threadRepository.addThread(newThread, userIdFromAccessToken);
  }

  async getThread({ threadId }) {
    const [threadResult] = await this._threadRepository.getThreadById(threadId);
    const commentsResult = await this._commentRepository.getCommentsByThreadId(
      threadId
    );

    const comments = commentsResult.map(
      ({ id, username, date, is_delete, content }) => ({
        id,
        username,
        date,
        content: is_delete ? '**komentar telah dihapus**' : content,
      })
    );

    const thread = {
      ...threadResult,
      comments: [...comments],
    };

    return thread;
  }
}

module.exports = ThreadUseCase;
