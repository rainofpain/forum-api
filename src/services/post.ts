import type { PostRepository } from '../domain/post/repository.js';
import type { PostService } from './post.types.js'

export function createPostService(repository: PostRepository): PostService{

    return{
        async getAll(category, take){
            const numberTake = Number(take);
            if (take && (numberTake <= 0 || !Number.isInteger(numberTake))){
                throw new Error("take param must be integer and greater than zero");
            }
            if(category && (typeof category != "string" || category.trim() === "")){
                throw new Error("Invalid category value");
            }
            return await repository.getAll(category, numberTake);
        },

        async getById(id){
            const numberId = Number(id);
            if (id && (numberId <= 0 || !Number.isInteger(numberId))){
                const error = Object.assign(new Error("Invalid id value"), { status: 422 })
                throw error;
            }
            const post = await repository.getById(numberId);
            if(!post){
                const error = Object.assign(new Error("Not found"), { status: 422 });
                throw error;
            }
            return post;
        },

        async addPost(body){
            const { title, author, category, content } = body || {};
    
            const requiredFields = [title, author, category, content];

            const hasInvalidField = requiredFields.some(fieldValue => {
                return typeof fieldValue !== 'string' || fieldValue.trim() === '';
            });

            if (hasInvalidField) {
                throw new Error("Invalid post input data");
            }

            const newPost = {
                title: title.trim(),
                content: content.trim(),
                author: author.trim(),
                category: category.trim()
            };

            const createdPost = await repository.addPost(newPost);

            return createdPost;
        }
    }

    
}