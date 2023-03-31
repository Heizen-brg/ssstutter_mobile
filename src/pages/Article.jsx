import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../hooks";
import Editor from "../plugin/Editor";
import cmsService from "../services/cms.service";

const Article = () => {
  const { slug } = useParams();
  const getArticleApi = useApi(cmsService.getBlogDetail);
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticleApi.request({ slug });
  }, [slug]);

  useEffect(() => {
    if (getArticleApi.data) {
      setArticle(getArticleApi.data);
    }
  }, [getArticleApi.data]);

  return (
    <div className="p-4 sm:p-20">
      <h1 className="uppercase sm:text-2xl">{article.title}</h1>
      <div className="flex sm:flex-row gap-4 justify-center items-center sm:my-10">
        <div className={`${article.description ? "basis-1/2" : "basis-full"}`}>
          <div
            style={{
              backgroundImage: `url(https://sss-dashboard.leanservices.work${article.thumbnail}.jpeg)`,
            }}
            className="landscape relative"
          ></div>
        </div>
        {article.description && (
          <div className="basis-1/2">
            <p>{article.description}</p>
          </div>
        )}
      </div>
      <div>
        <Editor content={article.content} id="blog_content" />
      </div>
    </div>
  );
};

export default Article;
