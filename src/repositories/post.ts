import type { Post } from "../domain/post/entity.js";
import type { PostRepository } from "../domain/post/repository.js";
import { db } from '../prisma/db.js';

export type DatabaseType = typeof db;

export function createPostRepository(db: DatabaseType): PostRepository{
    let posts: Post[] = [
        {
            id: 2,
            title: "How to Cook Pancakes",
            content: "A simple and quick recipe for delicious homemade pancakes for your perfect morning.",
            author: "Anna Green",
            category: "Cooking"
        },
        {
            id: 3,
            title: "Morning Routine Tips",
            content: "Small habits like drinking water and stretching can make your whole day much better.",
            author: "Ben Taylor",
            category: "Lifestyle"
        }
    ];

    return{
        async getAll(category?: string, take?: number){
           
            let query = db.orm.public.Post;
            
            if(take){
                query = query.limit(take);
            }

            if(category){
                query = query.where({ category: category });
            }

            return await query.all();
        },

        async getById(id: number){
            return await db.orm.public.Post.where({ id }).first();
        },

        async addPost(newPost){
            return await db.orm.public.Post.create({
                title: newPost.title,
                content: newPost.content,
                category: newPost.category,
                author: newPost.author
            });
        }
    }
}