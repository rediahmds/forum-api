class DeleteCommentUseCase {
  constructor({
    commentRepository,
    threadRepository,
    authenticationRepository,
    authenticationTokenManager,
  }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCaseParam, userIdFromAccessToken) {
    const { threadId, commentId } = useCaseParam;

    await this._threadRepository.verifyExistingThread(threadId);
    await this._commentRepository.verifyExistingComment(commentId);
    await this._commentRepository.verifyCommentPublisher(
      commentId,
      userIdFromAccessToken
    );

    return this._commentRepository.deleteCommentById(commentId);
  }
}

module.exports = DeleteCommentUseCase;
