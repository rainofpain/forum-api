import productService from "../services/post.js";

class Handler {
    constructor(){
        this.service = new productService();
    }
    
    getAll = (req, res) => {
        const {category, take} = req.query;
        try{
            const allPosts = this.service.getAll(category, take);
            return res.status(200).json(allPosts);
        }
        catch(error){
            return res.status(422).json({
                message: error.message
            });
        }
    }

    getById = (req, res) => {
        const {id} = req.params;
        try{
            const post = this.service.getById(id);
            return res.status(200).json(post);
        }
        catch(error){
            return res.status(error.status).json({
                message: error.message
            });
        }
    }

    addPost = async (req, res) => {
        try{
            const createdPost = await this.service.addPost(req.body);
            return res.status(201).json(createdPost);
        }
        catch(error){
            return res.status(422).json({
                message: error.message
            });
        }
    }

}

export default Handler;