import productService from "../../services/post.js";
import { type Request, type Response } from 'express';
import {type NewPost } from "../dto/post.js";

class Handler {

    service: productService;

    constructor(){
        this.service = new productService();
    }
    
    getAll = (req: Request<{}, {}, {}, { category?: string, take?: string }>, res: Response) => {
        const {category, take} = req.query;
        try{
            const allPosts = this.service.getAll(category, take);
            return res.status(200).json(allPosts);
        }
        catch(error: any){
            return res.status(422).json({
                message: error.message
            });
        }
    }

    getById = (req: Request<{id:string},{},{},{}>, res: Response) => {
        const {id} = req.params;
        try{
            const post = this.service.getById(String(id));
            return res.status(200).json(post);
        }
        catch(error: any){
            return res.status(error.status).json({
                message: error.message
            });
        }
    }

    addPost = async (req: Request<{}, {}, NewPost, {}>, res: Response) => {
        try{
            const createdPost = await this.service.addPost(req.body);
            return res.status(201).json(createdPost);
        }
        catch(error: any){
            return res.status(422).json({
                message: error.message
            });
        }
    }

}

export default Handler;