import PostRepository from "../repositories/post.js"; 
import {type NewPost} from "../transport/dto/post.js";

class Service {

    repository: PostRepository;

    constructor(){
        this.repository = new PostRepository();
    }

    getAll(category?: string, take?: string){
        const numberTake = Number(take);
        if (take && (numberTake <= 0 || !Number.isInteger(numberTake))){
            throw new Error("take param must be integer and greater than zero");
        }
        if(category && (typeof category != "string" || category.trim() === "")){
            throw new Error("Invalid category value");
        }
        return this.repository.getAll(category, numberTake);
    }

    getById(id: string){
        const numberId = Number(id);
        if (id && (numberId <= 0 || !Number.isInteger(numberId))){
            const error = Object.assign(new Error("Invalid id value"), { status: 422 })
            throw error;
        }
        const post = this.repository.getById(numberId);
        if(!post){
            const error = Object.assign(new Error("Not found"), { status: 422 });
            throw error;
        }
        return post;
    }

    async addPost(body: NewPost){
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

        const createdPost = await this.repository.addPost(newPost);

        return createdPost;
    }
}

export default Service;