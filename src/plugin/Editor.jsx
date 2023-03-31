import React, { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";
const Editor = (props) => {
  const { content = {}, id } = props;

  useEffect(() => {
    new EditorJS({
      holder: id,
      readOnly: true,
      tools: {
        header: Header,
        list: List,
        image: SimpleImage,
      },
      data: {
        blocks: content.blocks,
      },
    });
  }, [content]);

  return <div id={id}></div>;
};

export default Editor;
