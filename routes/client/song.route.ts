import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controller/client/song.controller"

router.get("/favorite", controller.favorite);

router.get("/:slugTopic", controller.list);

router.get("/detail/:slugSong", controller.detail);

// router.get("/like/yes/:idSong", controller.like);

router.patch("/like/:status/:songId", controller.like);

router.patch("/favorite/:status/:songId", controller.favoritePatch);

router.patch("/listen/:songId", controller.listenPatch);

export const songRoutes: Router = router;