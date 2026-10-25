import express from 'express';
import { createPostRepository } from './repositories/post.js';
import { createPostService } from './services/post.js';
import { createPostHandler } from './transport/handlers/post.js';
import { createPostRouter } from './transport/routers/post.js';
import { createUserRepository } from './repositories/user.js';
import { createUserService } from './services/user.js'; 
import { createUserHandler } from './transport/handlers/user.js'; 
import { createUserRouter } from './transport/routers/user.js';
import { passwordHasher } from './lib/password.js'
import { db } from './prisma/db.js';

const postRepository = createPostRepository(db);
const postService = createPostService(postRepository);
const postHandler = createPostHandler(postService);
const postRouter = createPostRouter(postHandler);
const userRepository = createUserRepository(db)
const userService = createUserService(userRepository, passwordHasher)
const userHandlers = createUserHandler(userService)
const userRouter = createUserRouter(userHandlers)

const app = express();
app.use(express.json());
app.use('/posts', postRouter);
app.use('/', userRouter);

const HOST = '127.0.0.1';
const PORT = 8000;

app.listen(
    PORT, HOST, () => {
        console.log(`http://${HOST}:${PORT}`);
    }
);