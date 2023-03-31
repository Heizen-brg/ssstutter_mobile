import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Loader } from "../components";
import { useApi } from "../hooks";
import cmsService from "../services/cms.service";
const Blog = () => {
  const getBlogApi = useApi(cmsService.getBlogList);
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    getBlogApi.request();
  }, []);

  useEffect(() => {
    if (getBlogApi.data) {
      setBlogList(getBlogApi.data);
    }
  }, [getBlogApi.data]);

  return (
    <section className="p-4 sm:px-20">
      <div className="py-4 sm:p-16 flex items-center">
        <h1 className="uppercase font-medium sm:text-2xl">blog</h1>
        <hr className="w-1/3 sm:w-1/6 ml-5 bg-primary-500 border-primary-500" />
      </div>
      <div>
        {getBlogApi.loading && <Loader />}
        {(blogList || []).map((blog, index) => (
          <Link
            to={`/blog/${blog.slug}`}
            key={index}
            className="flex flex-col sm:flex-row my-2 gap-4 sm:mb-16 sm:even:flex-row-reverse"
          >
            <div className="basis-1/2">
              <div
                style={{
                  backgroundImage: `url(https://sss-dashboard.leanservices.work${blog.thumbnail}.jpeg)`,
                }}
                className="landscape relative"
              ></div>
            </div>
            <div className="p-4 basis-1/2">
              <h2 className="text-left uppercase line-clamp-2  text-md font-bold">
                {blog.title}
              </h2>
              <p className="text-justify line-clamp-2 sm:line-clamp-3 my-4 text-sm">
                {blog.description}
              </p>
              <div className="flex justify-start">
                <Button className="py-2 px-4 text-md font-light">
                  view more
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Blog;
