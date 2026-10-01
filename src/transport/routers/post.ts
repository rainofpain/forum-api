import { Router } from "express"
import type { PostHandler } from "../handlers/post.js"

export function createPostRouter(handler: PostHandler){
    const router = Router();

    router.get('/',  handler.getAll);
    router.get('/:id', handler.getById);
    router.post('/', handler.addPost);

    return router;
}