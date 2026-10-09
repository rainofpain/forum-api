import express from 'express';
import { createPostRepository } from './repositories/post.js';
import { createPostService } from './services/post.js';
import { createPostHandler } from './transport/handlers/post.js';
import { createPostRouter } from './transport/routers/post.js';
import { db } from './prisma/db.js';

const postRepository = createPostRepository(db);
const postService = createPostService(postRepository);
const postHandler = createPostHandler(postService);
const postRouter = createPostRouter(postHandler);

const app = express();
app.use(express.json());
app.use('/posts', postRouter);

const HOST = '127.0.0.1';
const PORT = 8000;

app.listen(
    PORT, HOST, () => {
        console.log(`http://${HOST}:${PORT}`);
    }
);