import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteservice from "../appwrite/config.js";
import { Button, Container } from "../Components/index.js";
import parse from "html-react-parser";

function Post({$id}) {
    const [post, setPost] = useState(null);
    const [postImage, setpostImage] = useState(null);
    const navigate = useNavigate();
    const { slug } = useParams();

    const userData = useSelector((state) => state.auth.user);
    const isAuthor = post && userData ? post.$id === userData.$id : false;

    useEffect(() => {
        const postSlug = async () => {
            if (slug) {
                return await appwriteservice.getPost(slug).then((post) => {
                    if (post) {
                        setPost(post);
                    } else {
                        navigate("/");
                    }
                });
            }
        };
        const fetchimage = async () => {
            try {
                await appwriteservice
                    .getFilePreview(post?.featuredImage)
                    .then((image) => {
                        setpostImage(image);
                        console.log(image);
                    });
            } catch (error) {
                console.log("there is imageFetching", error);
            }
        };
        postSlug();
        fetchimage();
        // console.log("Featured Image Path:", appwriteservice.getFilePreview(post.featuredImage));
    }, [slug, navigate, post?.featuredImage]);

    const deletePost = async () => {
        return await appwriteservice.deletePost(post?.$id).then((status) => {
            if (status) {
                appwriteservice.deleteFile(post?.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={postImage}
                        alt={post?.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id} `}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                bgColor="bg-red-500"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post?.title}</h1>
                </div>
                <div className="browser-css">{parse(post?.content)}</div>
            </Container>
        </div>
    ) : null;
}

export default Post;
