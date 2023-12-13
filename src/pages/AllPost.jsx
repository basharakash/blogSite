import React, { useEffect, useState } from "react";
import AppwriteService from "../appwrite/config.js";
import { Container, PostCard } from "../Components/index.js";

function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const post = await AppwriteService.getPosts([]);
                console.log(post);
                if (post) {
                    setPosts(post.documents);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts?.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
