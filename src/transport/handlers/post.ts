import type { PostService } from '../../services/post.types.js';
import type { PostRequest } from '../dto/post/requests.js';
import type { PostResponse } from '../dto/post/responses.js';
import type { PostError } from '../dto/post/errors.js';
import type { Request,  Response } from 'express';

export interface PostHandler{
    getAll(req: Request<{}, {}, {}, { category?: string, take?: string }>, res: Response<PostResponse[]| PostError>): Response
    getById(req: Request<{id:string},{},{},{}>, res: Response<PostResponse | PostError>): Response
    addPost(req: Request<{}, {}, PostRequest, {}>, res: Response<PostResponse | PostError>): Promise<Response>
}

export function createPostHandler(service: PostService): PostHandler{

    return{
        getAll(req, res){
            const {category, take} = req.query;
            try{
                const allPosts = service.getAll(category, take);
                return res.status(200).json(allPosts);
            }
            catch(error){
                const httpError = error as { message: string };
                return res.status(422).json({
                    message: httpError.message
                });
            }
        },

        getById(req, res){
            const {id} = req.params;
            try{
                const post = service.getById(String(id));
                return res.status(200).json(post);
            }
            catch(error){
                const httpError = error as { status: number; message: string };
                return res.status(httpError.status).json({
                    message: httpError.message
                });
            }
        },

        async addPost(req, res){
            try{
                const createdPost = await service.addPost(req.body);
                return res.status(201).json(createdPost);
            }
            catch(error){
                const httpError = error as { message: string };
                return res.status(422).json({
                    message: httpError.message
                });
            }
        }
    }
    
}
