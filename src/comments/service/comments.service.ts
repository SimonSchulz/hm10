import { Comment } from "../types/comment";
import { WithId } from "mongodb";
import { CommentInputDto } from "../dto/comment.input-dto";
import { commentsRepository } from "../repositories/comment.repo";
import { RequestDataEntity } from "../../core/types/request-data.entity";
import { commentsQueryRepository } from "../repositories/comment.query.repo";
import { CommentQueryInput } from "../types/comment-query.input";

export const commentsService = {
  async findByIdOrFail(id: string) {
    return commentsRepository.findByIdOrFail(id);
  },
  async findCommentsByPostId(
    postId: string,
    queryDto: CommentQueryInput,
  ): Promise<{ items: WithId<Comment>[]; totalCount: number }> {
    return commentsQueryRepository.findCommentsByPostId(postId, queryDto);
  },
  async create(dto: CommentInputDto, info: RequestDataEntity, postId: string) {
    console.log(info);
    const userInfo = {
      userId: info.userId,
      userLogin: info.userLogin,
    };
    let newComment: Comment = {
      content: dto.content,
      commentatorInfo: userInfo,
      createdAt: new Date().toISOString(),
      postId: postId,
    };
    return commentsRepository.create(newComment);
  },
  async update(id: string, dto: CommentInputDto): Promise<void> {
    await commentsRepository.update(id, dto);
    return;
  },

  async delete(id: string): Promise<void> {
    await commentsRepository.delete(id);
    return;
  },
};
