const express = require("express");
const axios = require("axios");
const app = express();
const sass = require("sass");
const client_view = require("./render_client.js");
sass.renderSync({
  file: "./assets/scss/styles.scss",
  sourceMap: "./assets/css/styles.css.map",
  outFile: "./assets/css/styles.css",
});

app.enable("trust proxy");
app.use(express.json());
app.use("/assets", express.static("assets"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Access, Origin, Content-Type, X-Auth-Token");
  if (req.method == "OPTIONS") {
    res.status(204);
    res.end();
  } else next();
});

app.set("etag", false);

app.get("/", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "SSSTUTTER - REFINED FROM INSIDE",
    })
  );
});

app.get("/c/:slug", async (req, res, next) => {
  let { slug } = req.params;
  let cat_data;
  try {
    cat_data = await axios.get(`https://api.leanservices.work/product/attribute/category/search?slug=${slug}`, {
      headers: {
        Authorization: `by_passs`,
      },
    });
  } catch (err) {
    res.setHeader("Content-Type", "text/html");
    res.status(404).send(client_view.error_404({}));
    console.log(err.message);
    return;
  }
  res.setHeader("Authorization", "by_passs");
  res.setHeader("Content-Type", "text/html");
  let info = cat_data.data.data;
  if (!info) {
    res.status(404).send(client_view.error_404({}));
  } else {
    res.send(
      client_view.html({
        title: `${info.name.replace("-", "")}`,
        command: `const category_detail = ${JSON.stringify(info)}`,
      })
    );
  }
});

app.get("/p/:slug", async (req, res, next) => {
  let { slug } = req.params;
  let product_data;
  try {
    product_data = await axios.get(`https://api.leanservices.work/product/filter/web?webStock=true&slug=${slug}`, {
      headers: {
        Authorization: `by_passs`,
      },
    });
  } catch (err) {
    res.setHeader("Content-Type", "text/html");
    res.status(404).send(client_view.error_404({}));
    console.log(err.message);
    return;
  }
  res.setHeader("Authorization", "by_passs");
  res.setHeader("Content-Type", "text/html");
  let info = product_data.data.data;
  if (!info || !info.length) {
    res.status(404).send(client_view.error_404({}));
  } else {
    res.send(
      client_view.html({
        title: info[0].name,
        command: `const product_master_detail = ${JSON.stringify(info[0])}`,
      })
    );
  }
});

app.get("/editorial/product/:slug", async (req, res, next) => {
  let { slug } = req.params;
  let product_data;
  try {
    product_data = await axios.get(`https://api.leanservices.work/product/filter/web?&slug=${slug}`, {
      headers: {
        Authorization: `by_passs`,
      },
    });
  } catch (err) {
    res.setHeader("Content-Type", "text/html");
    res.status(404).send(client_view.error_404({}));
    console.log(err.message);
    return;
  }
  res.setHeader("Authorization", "by_passs");
  res.setHeader("Content-Type", "text/html");
  let info = product_data.data.data;
  if (!info || !info.length) {
    res.status(404).send(client_view.error_404({}));
  } else {
    res.send(
      client_view.html({
        title: info[0].name,
        command: `const product_editorial_detail = ${JSON.stringify(info[0])}`,
      })
    );
  }
});

app.get("/campaign/:slug", async (req, res, next) => {
  let { slug } = req.params;
  let campaign_data;
  try {
    campaign_data = await axios.get(`https://sss-dashboard.leanservices.work/w/campaign/detail?url=${slug}`, {
      headers: {
        Authorization: `by_passs`,
      },
    });
  } catch (err) {
    res.setHeader("Content-Type", "text/html");
    res.status(404).send(client_view.error_404({}));
    return console.log(err.response.data);
  }
  let campaign_detail = campaign_data.data;
  console.log("campaign_detail: ", campaign_detail);
  res.setHeader("Content-Type", "text/html");
  if (campaign_detail.status == "inActive") {
    res.status(404).send(client_view.error_404({}));
  } else {
    res.send(
      client_view.html({
        title: campaign_detail.title,
        command: `const campaign_detail = ${JSON.stringify(campaign_detail)}`,
      })
    );
  }
});

app.get("/checkout", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "GIỎ HÀNG",
      command: "",
    })
  );
});
app.get("/order", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "XÁC NHẬN ĐƠN HÀNG",
      command: "",
    })
  );
});

app.get("/thankyou", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "ĐẶT HÀNG THÀNH CÔNG",
      command: "",
    })
  );
});
app.get("/canceled", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "ĐẶT HÀNG KHÔNG THÀNH CÔNG",
      command: "",
    })
  );
});

app.get("/blog", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "SSSTORY",
      command: "",
    })
  );
});
app.get("/blog/article/:slug", async (req, res, next) => {
  let { slug } = req.params;
  let article_data;
  try {
    article_data = await axios.get(`https://sss-dashboard.leanservices.work/w/post/detail?slug=${slug}`, {
      headers: {
        Authorization: `by_passs`,
      },
    });
  } catch (err) {
    res.setHeader("Content-Type", "text/html");
    res.status(404).send(client_view.error_404({}));
    return console.log(err.message);
  }
  let blog_detail = article_data.data;
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: blog_detail.title,
      command: `const blog_detail = ${JSON.stringify(blog_detail)}`,
    })
  );
});
app.get("/address", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "ĐỊA CHỈ CỬA HÀNG",
      command: "",
    })
  );
});
app.get("/search", async (req, res, next) => {
  let query = req.query;
  let search_data;
  try {
    search_data = await axios.get(
      `https://api.leanservices.work/product/filter/web?name=${query.name}&media=true&webStock=true`,
      {
        headers: {
          Authorization: `by_passs`,
        },
      }
    );
  } catch (err) {
    res.setHeader("Content-Type", "text/html");
    res.status(404).send(client_view.error_404({}));
    return;
  }
  let data = search_data.data;
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "TÌM KIẾM",
      command: `const search_result = ${JSON.stringify(data)} `,
    })
  );
});

app.get("/editorial", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "Chớm đông",
      command: "",
    })
  );
});

app.get("/flash-sale", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "Flash sale",
      command: "",
    })
  );
});

app.use((req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.status(404).send(client_view.error_404({}));
});

app.listen(process.env.PORT, () => console.log("Web view started!"));
