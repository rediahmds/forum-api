const NewThread = require('../../../Domains/threads/entities/NewThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const DetailThread = require('../../../Domains/threads/entities/DetailThread');
const DetailComment = require('../../../Domains/comments/entities/DetailComment');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const ThreadUseCase = require('../ThreadUseCase');

describe('ThreadUseCase', () => {
  describe('addThread', () => {
    it('should orchestrate the add thread action correctly', async () => {
      // Arrange
      const useCasePayload = {
        title: 'a thread',
        body: 'a thread body',
      };

      const userIdFromAccessToken = 'user-123';

      const expectedAddedThread = new AddedThread({
        id: 'thread-123',
        title: useCasePayload.title,
        owner: userIdFromAccessToken,
      });

      // Mocking
      const mockThreadRepository = new ThreadRepository();

      mockThreadRepository.addThread = jest.fn(() =>
        Promise.resolve(
          new AddedThread({
            id: 'thread-123',
            title: useCasePayload.title,
            owner: userIdFromAccessToken,
          })
        )
      );

      const threadUseCase = new ThreadUseCase({
        threadRepository: mockThreadRepository,
        commentRepository: jest.fn(),
      });

      // Action
      const addedThread = await threadUseCase.addThread(
        useCasePayload,
        userIdFromAccessToken
      );

      // Assert
      expect(addedThread).toEqual(expectedAddedThread);
      expect(mockThreadRepository.addThread).toHaveBeenCalledWith(
        new NewThread(useCasePayload),
        userIdFromAccessToken
      );
    });
  });

  describe('getThread', () => {
    it('should orchestrate the get thread action correctly', async () => {
      // Arrange
      const useCaseParam = {
        threadId: 'thread-123',
      };

      const retrievedThread = [
        new DetailThread({
          id: 'thread-123',
          title: 'a thread',
          body: 'a thread body',
          date: '2023',
          username: 'user-123',
          comments: [],
        }),
      ];

      const retrievedComments = [
        new DetailComment({
          id: 'comment-123',
          username: 'user A',
          date: '2023',
          content: 'a comment A',
          is_delete: true,
        }),
        new DetailComment({
          id: 'comment-234',
          username: 'user B',
          date: '2023',
          content: 'a comment B',
          is_delete: false,
        }),
      ];

      const detailComments = retrievedComments.map((comment) => ({
        ...comment,
        content: comment.is_delete
          ? '**komentar telah dihapus**'
          : comment.content,
      }));

      const expectedDetailThread = {
        ...retrievedThread[0],
        comments: detailComments.map(
          ({ is_delete, ...filteredComment }) => filteredComment
        ),
      };

      // Mocking
      const mockThreadRepository = {
        getThreadById: jest.fn().mockResolvedValue(retrievedThread),
      };

      const mockCommentRepository = {
        getCommentsByThreadId: jest.fn().mockResolvedValue(detailComments),
      };

      const threadUseCase = new ThreadUseCase({
        threadRepository: mockThreadRepository,
        commentRepository: mockCommentRepository,
      });

      // Action
      const useCaseResult = await threadUseCase.getThread(useCaseParam);

      // Assert
      expect(useCaseResult).toEqual(expectedDetailThread);
      expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith(
        useCaseParam.threadId
      );
      expect(mockCommentRepository.getCommentsByThreadId).toHaveBeenCalledWith(
        useCaseParam.threadId
      );
    });
  });
});
