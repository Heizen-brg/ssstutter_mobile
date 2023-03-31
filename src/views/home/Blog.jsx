import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Loader, Slick } from "../../components";
import { useApi, useWindowDimension } from "../../hooks";
import cmsServices from "../../services/cms.service";
const Blog = () => {
  const getBlogApi = useApi(cmsServices.getBlogList);
  const [blogList, setBlogList] = useState([]);
  const { width } = useWindowDimension();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    getBlogList();
    reponsive();
  }, []);
  const reponsive = () => {
    if (width < 528) {
      setMobile(true);
    }
  };
  const getBlogList = () => {
    getBlogApi.request();
    setBlogList(getBlogApi.data);
  };
  return (
    <section className="py-6 sm:my-5">
      <div className="py-4 px-4 sm:py-16 sm:px-28 flex items-center">
        <h1 className="uppercase font-medium sm:text-2xl">blog</h1>
        <hr className="w-1/3 sm:w-1/6 ml-5 bg-primary-500 border-primary-500" />
      </div>
      <Slick
        vertical={false}
        loop={true}
        isDot={false}
        perView={2}
        centerMode={!mobile}
        mobileView={1}
        autoPlay={true}
      >
        {getBlogApi.loading && <Loader />}
        {(getBlogApi.data || []).map((blog) => (
          <div key={blog.id}>
            <div className="p-1 sm:p-3">
              <div
                style={{
                  backgroundImage: `url(https://sss-dashboard.leanservices.work${blog.thumbnail}.jpeg)`,
                }}
                className="landscape relative"
              ></div>
              <div className="p-4">
                <h2 className="text-left uppercase line-clamp-2 text-md font-bold">
                  {blog.title}
                </h2>
                <p className="text-justify line-clamp-2 my-4 text-sm">
                  {blog.description}
                </p>
                <div className="flex justify-start">
                  <Link to={`/blog/${blog.slug}`}>
                    <Button className="py-2 px-4 text-lg">view more</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slick>
    </section>
  );
};

export default Blog;
