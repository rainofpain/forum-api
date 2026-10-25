import { Router } from 'express'
import type { UserHandler } from '../handlers/user.js'

export function createUserRouter(userHandlers: UserHandler) {
    const router = Router();
    router.post('/register', userHandlers.register);
    return router;
}