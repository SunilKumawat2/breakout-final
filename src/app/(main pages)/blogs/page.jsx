"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
const BlogCard = dynamic(() => import("@/components/BlogCard"));
const Sidebar = dynamic(() => import("@/components/Blogs/Sidebar"));
import blogIllus from "@/images/blog-illus.png";
import Image from "next/image";
import api from "@/helpers/api";

const page = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalblogs, setTotalBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // keep fixed or dynamic
  const [hasMore, setHasMore] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (selectedTag) params.append("tag", selectedTag.value);
    if (selectedLocation) params.append("location", selectedLocation.value);
    if (selectedOption) params.append("related_to", selectedOption.value);

    // ✅ ONLY send pagination when page > 1 (Load More case)
    if (page > 1) {
      params.append("page", page);
      params.append("limit", limit);
    }

    return params.toString();
  };

  useEffect(() => {
    setPage(1);       // reset to first page
    setHasMore(true); // reset load more
  }, [search, selectedLocation, selectedOption, selectedTag]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const query = buildQuery();
        const res = await api.get(`/blogs?${query}`);
        const newData = res?.data?.data || [];
        const meta = res?.data?.meta;
        setTotalBlogs(meta?.total);
        if (page === 1) {
          setBlogs(newData);
          setFilteredBlogs(newData);
        }
        else {
          setBlogs((prev) => [...prev, ...newData]);
          setFilteredBlogs((prev) => [...prev, ...newData]);
        }
        if (meta && page >= meta.total_pages) {
          setHasMore(false);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page, search, selectedLocation, selectedOption, selectedTag]);

  useEffect(() => {
    console.log("Updated blogs:", blogs);
  }, [blogs]);

  useEffect(() => {
    setIsLoadMore(false); 
    setPage(1);
  }, [search, selectedLocation, selectedOption, selectedTag]);

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
    setIsLoadMore(true); // ✅ only here we allow pagination
    setPage((prev) => prev + 1);
  };

  return (
    <div className="blogs-page pt-80">
      <div className="container">
        <div className="row text-center m-0">
          <div className="col-12">
            <h3 className="sec-head medium mb-0">
              Blog to <span>Plan Celebrations</span>
            </h3>
          </div>
        </div>
        <div className="row pt-80 outer-row">
          <div className="col-lg-3 col-6">
            <Sidebar
              handleSearchChange={handleSearchChange}
              totalResources={totalblogs}
              handleSortChange={handleSortChange}
              searchRef={searchRef}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />
          </div>
          <div className="col-lg-9 col-6 col-blog-card">
            <div className="row box-row">
              {filteredBlogs?.length > 0 ? (
                filteredBlogs?.map((blog, index) => (
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

            {hasMore && (
              <div className="row text-center mt-5">
                <div className="col-load-more-blogs">
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
