import { Router } from "express";
import { destroy, index, save, update } from "../controllers/post.controller";
import { protect } from "../middleware/auth.middleware";
import fileUpload from "../middleware/fileUpload.middleware";
import { show } from "./../controllers/post.controller";

const router: Router = Router();

router.route("/").get(index).post(protect, fileUpload("posts"), save);
router
  .route("/:id")
  .get(show)
  .put(protect, fileUpload("posts"), update)
  .delete(protect, destroy);

export { router as postRoutes };
