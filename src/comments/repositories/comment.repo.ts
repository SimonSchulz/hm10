import { CommentModel } from "../schemas/comment.schema"; // путь к твоей схеме комментария
import { CommentInputDto } from "../dto/comment.input-dto";
import { Types } from "mongoose";

export const commentsRepository = {
  async findByIdOrFail(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    return CommentModel.findById(id).lean();
  },

  async create(newComment: any) {
    const createdComment = await CommentModel.create(newComment);
    return createdComment.toObject();
  },

  async delete(id: string): Promise<void> {
    const result = await CommentModel.deleteOne({ _id: id });
    if (result.deletedCount < 1) {
      throw new Error("Comment not exist");
    }
  },

  async update(id: string, dto: CommentInputDto): Promise<void> {
    const result = await CommentModel.updateOne(
      { _id: id },
      { $set: { content: dto.content } },
    );

    if (result.matchedCount < 1) {
      throw new Error("Comment not exist");
    }
  },
};
