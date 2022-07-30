import { Router } from "../deps.ts";

import * as UserController from "../controllers/user.controller.ts";

const router: Router = new Router();

router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUser);
router.post("/users", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export { router };
