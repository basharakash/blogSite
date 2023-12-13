import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appwriteservice from "../appwrite/config.js";

function PostCard({ $id, title, featuredImage }) {
    const [image, setImage] = useState(null);
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageSrc = await appwriteservice.getFilePreview(
                    featuredImage
                );
                setImage(imageSrc);
            } catch (error) {
                console.log("there is imageFetching", error);
            }
        };
        fetchImage();
    }, [featuredImage]);
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={image} alt={title} className="rounded-xl" />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
