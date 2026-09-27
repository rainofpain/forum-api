import { Router } from "express";
import postHandler from "../handlers/post.js"

const router = Router();
const handler = new postHandler();

router.get('/',  handler.getAll);
router.get('/:id', handler.getById);
router.post('/', handler.addPost);

export default router;