"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
const BrochureDownloadForm = dynamic(() => import("@/components/BrochureDownloadForm"));
import blogIllus from "@/images/blog-illus.png";
import Image from "next/image";
import api from "@/helpers/api";
const ResourcesSidebar = dynamic(() => import("@/components/Blogs/ResourcesSidebar"));
const ResourceCard = dynamic(() => import("@/components/ResourceCard"));

const page = () => {
  const [resources, setResources] = useState([]);
  const [totalresources, setTotalResources] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  console.log("setFilteredBlogs_setFilteredBlogs", filteredBlogs)
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState(null)
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (selectedTypes?.value) {
      params.append("resource_type", selectedTypes.value);
    }

    if (selectedTag?.value) {
      params.append("tag", selectedTag.value);
    }

    if (selectedLocation?.value) {
      params.append("location", selectedLocation.value);
    }

    if (selectedOption?.value) {
      params.append("related_to", selectedOption.value);
    }

    // ✅ ALWAYS paginate (even with filters)
    params.append("page", page);
    params.append("limit", limit);

    return params.toString();
  };
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [selectedTag, selectedLocation, selectedTypes, selectedOption]);

  const fetchResources = async () => {
    try {
      setLoading(true);

      const query = buildQueryParams();
      const res = await api.get(`/resources?${query}`);

      const newData = res?.data?.data || [];
      const meta = res?.data?.meta;
      setTotalResources(meta?.total)
      if (page === 1) {
        // ✅ first load OR filter change
        setResources(newData);
        setFilteredBlogs(newData);
      } else {
        // ✅ load more
        setResources((prev) => [...prev, ...newData]);
        setFilteredBlogs((prev) => [...prev, ...newData]);
      }

      // ✅ IMPORTANT: this controls Load More button
      if (meta) {
        setHasMore(page < meta.total_pages);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [page, search, selectedTag, selectedLocation, selectedTypes, selectedOption]);


  useEffect(() => {
    let filtered = [...resources]; // ✅ use ORIGINAL data
    const searchValue = search.toLowerCase();
    if (search) {
      filtered = filtered.filter((item) => {
        return (
          (item?.name || "").toLowerCase().includes(searchValue) ||
          (item?.title || "").toLowerCase().includes(searchValue)
        );
      });
    }

    // sorting
    if (sort === "latest") {
      filtered.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
    }

    if (sort === "oldest") {
      filtered.sort((a, b) => new Date(a?.createdAt) - new Date(b?.createdAt));
    }

    if (sort === "popular") {
      filtered.sort((a, b) => (b?.views || 0) - (a?.views || 0));
    }

    setFilteredBlogs(filtered);
  }, [search, sort, resources]); // ✅ NO filteredBlogs here

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
    setSearch(e.target.value);
  }, 500);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="getresourcelist-page pt-80 blogs-page">
      <div className="container">
        <div className="row text-center">
          <div className="col-12">
            <h3 className="sec-head medium">
              Resources to <span>Plan Celebrations</span>
            </h3>
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-lg-3 col-6">
            <ResourcesSidebar
              searchRef={searchRef}
              totalResources={totalresources}
              handleSortChange={handleSortChange}
              handleSearchChange={handleSearchChange}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              selectedTag={selectedTag}
              setSelectedTypes={setSelectedTypes}
              selectedTypes={selectedTypes}
              setSelectedTag={setSelectedTag}
            />
          </div>
          <div className="col-lg-9 col-6 col-blog-card">
            <div className="row box-row">
              {filteredBlogs?.length > 0 ? (
                filteredBlogs?.map((blog, index) => {
                  console.log("Rendering blog:", blog);

                  return (
                    <div className="col-lg-4 col-12" key={index}>
                      <ResourceCard
                        blog={blog}
                        slug={blog.slug}
                        link={blog?.link}
                        blog_id={blog?.blog_id}
                        blog_type={blog?.type}
                        blog_name={blog?.name}
                      />
                    </div>
                  );
                })
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
                      No getresourcelist found
                    </h3>
                  </div>
                </div>
              )}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="row text-center mt-5">
                <div className="col-load-more-getresourcelist">
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
        <BrochureDownloadForm className="pb-0"
         page_name="resources_blogs"
         page_type="resources_page"
          blog_slug={resources} />
        <Image src={blogIllus} alt="black-gr" className="illus-image" />
      </div>
    </div>
  );
};

export default page;
