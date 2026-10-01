import type { Post } from "../domain/post/entity.js";


export interface PostService{
    getAll(category?:string, take?: string): Post[]
    getById(id: string): Post | undefined
    addPost(body: Post): Promise<Post>
}