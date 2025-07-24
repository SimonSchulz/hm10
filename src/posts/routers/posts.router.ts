import { Router } from "express";
import { authMiddleware } from "../../auth/middlewares/auth-middleware";
import {
  idValidation,
  postIdValidation,
} from "../../core/utils/params-id.validation";
import { inputValidationResultMiddleware } from "../../core/utils/input-validtion-result.middleware";
import { postInputDtoValidation } from "../validation/post.input-dto.validation";
import { getPostHandler } from "./handlers/get-post.handler";
import { getPostsHandler } from "./handlers/get-posts.handler";
import { createPostHandler } from "./handlers/create-post.handler";
import { updatePostHandler } from "./handlers/update-post.handler";
import { deletePostHandler } from "./handlers/delete-post.handler";
import { contentValidation } from "../../comments/validation/comment.input-dto.validation";
import { createCommentByPostIdHandler } from "./handlers/create-comment.handler";
import { getCommentsByPostIdHandler } from "./handlers/get-comments.handler";
import container from "../../core/container/container";
import TYPES from "../../core/container/types";
import { AccessTokenGuard } from "../../auth/routers/guards/access.token.guard";

export const postsRouter = Router({});
const accessTokenGuard = container.get<AccessTokenGuard>(
  TYPES.AccessTokenGuard,
);
postsRouter
  .get("", getPostsHandler)

  .get("/:id", idValidation, inputValidationResultMiddleware, getPostHandler)
  .get(
    "/:postId/comments",
    postIdValidation,
    inputValidationResultMiddleware,
    getCommentsByPostIdHandler,
  )

  .post(
    "",
    authMiddleware,
    postInputDtoValidation,
    inputValidationResultMiddleware,
    createPostHandler,
  )
  .post(
    "/:postId/comments",
    accessTokenGuard.handle,
    postIdValidation,
    contentValidation,
    inputValidationResultMiddleware,
    createCommentByPostIdHandler,
  )

  .put(
    "/:id",
    authMiddleware,
    idValidation,
    postInputDtoValidation,
    inputValidationResultMiddleware,
    updatePostHandler,
  )

  .delete(
    "/:id",
    authMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deletePostHandler,
  );
