import { idValidation } from "../../core/utils/params-id.validation";
import { inputValidationResultMiddleware } from "../../core/utils/input-validtion-result.middleware";
import { Router } from "express";
import { contentValidation } from "../validation/comment.input-dto.validation";
import { deleteCommentHandler } from "./handlers/delete-comment-handler";
import { updateCommentHandler } from "./handlers/update-comment-handler";
import { getCommentHandler } from "./handlers/get-comment-handler";
import container from "../../core/container/container";
import { AccessTokenGuard } from "../../auth/routers/guards/access.token.guard";
import TYPES from "../../core/container/types";

export const commentsRouter = Router({});
const accessTokenGuard = container.get<AccessTokenGuard>(
  TYPES.AccessTokenGuard,
);
commentsRouter
  .get("/:id", idValidation, inputValidationResultMiddleware, getCommentHandler)

  .put(
    "/:id",
    accessTokenGuard.handle,
    idValidation,
    contentValidation,
    inputValidationResultMiddleware,
    updateCommentHandler,
  )

  .delete(
    "/:id",
    accessTokenGuard.handle,
    idValidation,
    inputValidationResultMiddleware,
    deleteCommentHandler,
  );
