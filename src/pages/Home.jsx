import { useEffect, useState } from "react";
import { Container, PostCard } from "../Components/index.js";
import appwriteService from "../appwrite/config.js";
import authService from "../appwrite/auth.js";

function Home() {
    const [posts, setPosts] = useState([]);
    const isAuth = async () => {
        return await authService.getCurrentUser();
    };

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return isAuth ? (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/2">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    ) : (
        "Show post List"
    );
}

export default Home;
