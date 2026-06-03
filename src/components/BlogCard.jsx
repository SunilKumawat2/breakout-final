import React from "react";
import Image from "next/image";
import blogImg from "@/images/blog-img.jpg";
import Link from "next/link";

const BlogCard = ({ blog}) => {
  if (!blog) return null;
  console.log("BlogCard-BlogCardBlogCard",blog)
  return (
    <Link href={`/blogs/${blog.slug}`} target="_blank" scroll={true}> 
      <article className="blog-card">
        <div className="blog-card-img">
          {blog.image && (
            <Image src={blog.image} width={700} height={700} alt="blog" />
          )}
        </div>
        <div className="blog-card-content">
          <p>{blog.title}</p>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;

