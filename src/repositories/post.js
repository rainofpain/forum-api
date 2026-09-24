class Repository {
    constructor() {
        this.posts = [
            {
                id: 1,
                title: "My Favorite Books",
                content: "Today I want to share a list of books that changed my life and helped me grow.",
                author: "Tom Wilson",
                category: "Hobbies"
            },
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
    }

    getAll(category, take){
        let postsList = [];

        if(!take && !category){
            postsList = [...this.posts];
        }
        else if(!take){
            postsList = [...this.posts.filter(post => post.category === category)];
        }
        else if(!category){
            postsList = [...this.posts.slice(0, take)];
        }
        else{
            postsList = [...this.posts.filter(post => post.category === category).slice(0, take)];
        }
        return postsList;
    }

    getById(id){
        const post = this.posts.find(post => post.id === id);
        return post;
    }

    addPost(newPost){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const nextId = this.posts.length > 0 ? this.posts[this.posts.length - 1].id + 1 : 1;
                
                const createdPost = {
                    id: nextId,
                    ...newPost
                };

                this.posts.push(createdPost);
                resolve(createdPost); 
            }, 200);
        });
    }
}

export default Repository;