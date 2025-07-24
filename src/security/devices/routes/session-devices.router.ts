import { Router } from "express";

import { DeviceSessionController } from "../controller/device-session.controller";
import container from "../../../core/container/container";
import { RefreshTokenGuard } from "../../../auth/routers/guards/refresh.token.guard";
import TYPES from "../../../core/container/types";

const router = Router();
const controller = container.get(DeviceSessionController);
const refreshTokenGuard = container.get<RefreshTokenGuard>(
  TYPES.RefreshTokenGuard,
);
router.get(
  "/",
  refreshTokenGuard.handle,
  controller.getAllSessions.bind(controller),
);
router.delete(
  "/",
  refreshTokenGuard.handle,
  controller.deleteOtherSessions.bind(controller),
);
router.delete(
  "/:deviceId",
  refreshTokenGuard.handle,
  controller.deleteDevicesById.bind(controller),
);

export { router as sessionDevicesRouter };
