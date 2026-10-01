import type { Post } from "../domain/post/entity.js";
import type { PostRepository } from "../domain/post/repository.js";

export function createPostRepository(): PostRepository{
    let posts: Post[] = [
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

    return{
        getAll(category?: string, take?: number){
            let postsList = [];

            if(!take && !category){
                postsList = [...posts];
            }
            else if(!take){
                postsList = [...posts.filter(post => post.category === category)];
            }
            else if(!category){
                postsList = [...posts.slice(0, take)];
            }
            else{
                postsList = [...posts.filter(post => post.category === category).slice(0, take)];
            }
            return postsList;
        },

        getById(id: number){
            const post = posts.find(post => post.id === id);
            return post;
        },

        addPost(newPost){
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const nextId = (posts[posts.length - 1]?.id ?? 0) + 1;
                    
                    const createdPost = {
                        id: nextId,
                        ...newPost
                    };

                    posts.push(createdPost);
                    resolve(createdPost); 
                }, 200);
            });
        }
    }
}