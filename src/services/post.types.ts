import type { Post } from "../domain/post/entity.js";

type PostBody = Omit<Post, "id">;

export interface PostService{
    getAll(category?:string, take?: string):Promise<Post[]>
    getById(id: string): Promise<Post | null>
    addPost(body: PostBody): Promise<Post>
}