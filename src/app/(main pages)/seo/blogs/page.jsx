"use client";
import React, { useState, useEffect, useRef } from "react";
import BlogCard from "@/components/BlogCard";
import Sidebar from "@/components/Blogs/Sidebar";
import BrochureDownloadForm from "@/components/BrochureDownloadForm";
import blogIllus from "@/images/blog-illus.png";
import Image from "next/image";
import api from "@/helpers/api";
const page = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  console.log("setFilteredBlogs_setFilteredBlogs",filteredBlogs)
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await api.get("/blogs");
        const res2 = await api.get("/birthday-blog");
        setBlogs([...res.data.data, ...res2.data.data]);
        setFilteredBlogs([...res.data.data, ...res2.data.data]);
        // setBlogs([...res.data.data]);
        // setFilteredBlogs([...res.data.data]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    // if (search || sort) {
    if (blogs.length > 0) {
      console.log("search", search);
      if (search === "") {
        setFilteredBlogs(blogs);
      } else {
        const filtered = blogs.filter((blog) => {
          return blog.title.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredBlogs(filtered);
      }
      if (sort) {
        if (sort === "latest") {
          const sorted = blogs.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setFilteredBlogs(sorted);
        }
        if (sort === "oldest") {
          const sorted = blogs.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
          });
          setFilteredBlogs(sorted);
        }
        if (sort === "popular") {
          const sorted = blogs.sort((a, b) => {
            return b.views - a.views;
          });
          setFilteredBlogs(sorted);
        }
        if (sort === "az") {
          const sorted = blogs.sort((a, b) => {
            return a.title.localeCompare(b.title);
          });
          setFilteredBlogs(sorted);
        }
        if (sort === "za") {
          const sorted = blogs.sort((a, b) => {
            return b.title.localeCompare(a.title);
          });
          setFilteredBlogs(sorted);
        }
      }
    }
    // }
  }, [search, sort]);

  // Debounced search handler

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const searchRef = useRef();

  const handleSearchChange = debounce((e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  }, 500);

  const handleSortChange = (e) => {
    console.log(e.target.value);
    setSort(e.target.value);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <div className="blogs-page section-padding">
      <div className="container">
        <div className="row text-center pb-5">
          <div className="col-12">
            <h3 className="sec-head medium">
              Blog to <span>Plan Celebrations</span>
            </h3>
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-lg-3 col-12">
            <Sidebar
              handleSearchChange={handleSearchChange}
              totalResources={filteredBlogs.length}
              handleSortChange={handleSortChange}
              searchRef={searchRef}
            />
          </div>
          <div className="col-lg-9 col-12">
            <div className="row row-gap-25">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.slice(0, visibleCount).map((blog, index) => (
                  <div className="col-lg-4 col-12" key={index}>
                    <BlogCard blog={blog} />
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div
                    style={{
                      height: "50vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h3 className="sec-head medium-20 sm-head text-center">
                      No blogs found
                    </h3>
                  </div>
                </div>
              )}
            </div>

            {visibleCount < filteredBlogs.length && (
              <div className="row text-center mt-5">
                <div className="col-12">
                  <button
                    className="main-btn dark-btn center"
                    onClick={handleLoadMore}
                  >
                    <span>Load More</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="black-gr-div">
        {/* <BrochureDownloadForm page_name="seo_blogs"/> */}
        <Image src={blogIllus} alt="black-gr" className="illus-image" />
      </div>
    </div>
  );
};

export default page;
