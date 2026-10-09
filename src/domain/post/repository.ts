import type { Post } from "./entity.js";

type PostBody = Omit<Post, "id">;


export interface PostRepository{
    getAll(category?:string, take?: number): Promise<Post[]>
    getById(id: number): Promise<Post | null>
    addPost(post:PostBody): Promise<Post>
}