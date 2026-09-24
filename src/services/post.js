import PostRepository from "../repositories/post.js"; 

class Service {
    constructor(){
        this.repository = new PostRepository();
    }

    getAll(category, take){
        const numberTake = Number(take);
        if (take && (numberTake <= 0 || !Number.isInteger(numberTake))){
            throw new Error("take param must be integer and greater than zero");
        }
        if(category && (typeof category != "string" || category.trim() === "")){
            throw new Error("Invalid category value");
        }
        return this.repository.getAll(category, numberTake);
    }

    getById(id){
        const numberId = Number(id);
        if (id && (numberId <= 0 || !Number.isInteger(numberId))){
            const error = new Error("Invalid id value");
            error.status = 422;
            throw error;
        }
        const post = this.repository.getById(numberId);
        if(!post){
            const error = new Error("Not found");
            error.status = 404;
            throw error;
        }
        return post;
    }

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

        const createdPost = await this.repository.addPost(newPost);

        return createdPost;
    }
}

export default Service;