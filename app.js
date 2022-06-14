const express = require("express");
const axios = require("axios");
const app = express();
const sass = require("sass");
const client_view = require("./render_client.js");
// sass.renderSync({
//   file: "./assets/scss/styles.scss",
//   sourceMap: "./assets/css/styles.css.map",
//   outFile: "./assets/css/styles.css",
// });

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
      title: "SSSTUTTER - REFINED LIFE",
    })
  );
});

app.get("/services/sitemap.xml", async (reg, res, next) => {
  let path_url = "https://ssstutter.com";
  let xml = "";
  let data_source;
  try {
    data_source = await axios.get(`http://localhost:5000/pd/filter/web?webStock=0&showAll=true&media=true`, {
      headers: {
        Authorization: `by_passs`,
      },
    });
  } catch (error) {
    res.setHeader("Content-Type", "text/html");
    res.status(404).send(client_view.error_404({}));
    console.log(err.message);
    return;
  }
  data_source.data.data.forEach((item) => {
    xml += `
       <item>
          <g:id>${item.id}</g:id>
          <g:title>${item.name.toUpperCase()}</g:title>
          <g:description>${item.description ? item.description : item.name.toLowerCase()}</g:description>
          <g:link>${path_url + "/p/" + item.slug}</g:link>
          <g:image_link>https://api.leanservices.work/product/static/${item.extensions.media.featured}</g:image_link>
          <g:brand>SSSTUTTER</g:brand>
          <g:condition>new</g:condition>
          <g:availability>in stock</g:availability>
          <g:price>${item.price} VND</g:price>
          <g:sale_price>${!item.salePrice ? "" : item.salePrice + " VND"}</g:sale_price>
          ${item.salePrice ? "<g:pattern>sale</g:pattern>" : ""}
          <g:color>${item.color.map(i => i.name).join(", ")}</g:color>
          <g:size>${item.size}</g:size>
          <g:gender>${item.catId.join(',').includes('3vvRIM') ? 'male' : 'female'}</g:gender>
          <g:google_product_category>${item.catId.join(',').includes('3vvRIM') ? 'For him' : 'For her'}</g:google_product_category>
          <g:fb_product_category>${item.catId.join(',').includes('3vvRIM') ? 'For him' : 'For her'}</g:fb_product_category>
        </item>
      `;

  });
  res.set("Content-Type", "application/xml");
  return res.send(
    `<?xml version="1.0" encoding="UTF-8"?>
		<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
			<channel>
				<title>SSSTUTTER</title>
				<link>https://ssstutter.com</link>
				<description>Redefined from Inside</description>
				${xml}
			 </channel>
		</rss>
	`.replace(/(\r\n|\n|\r)/gm, "")
  );
});

app.get("/c/:slug", async (req, res, next) => {
  let { slug } = req.params;
  let cat_data;
  try {
    cat_data = await axios.get(`http://localhost:5000/pd/attribute/category/search?slug=${slug}`, {
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
        title: `SSSTUTTER - ${info.name ? info.name.replace("-", "") : "SSSTUTTER - REFINED LIFE"}`,
        command: `var category_detail = ${JSON.stringify(info)}`,
      })
    );
  }
});
app.get("/parisienne", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "PARISIENNE - SSSTUTTER",
      command: "",
    })
  );
});
app.get("/new-arrivals", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "NEW ARRIVALS - SSSTUTTER",
      command: "",
    })
  );
});
app.get("/p/:slug", async (req, res, next) => {
  let { slug } = req.params;
  let product_data;
  try {
    product_data = await axios.get(`http://localhost:5000/pd/filter/web?webStock=true&slug=${slug}&media=true`, {
      headers: {
        Authorization: `by_passs`,
      },
    });
  } catch (err) {
    res.setHeader("Content-Type", "text/html");
    res.status(404).send(client_view.error_404({
      title : "Không có thông tin sản phẩm",
      message: "Không có thông tin sản phẩm"
    }));
    console.log(err.message);
    return;
  }
  res.setHeader("Authorization", "by_passs");
  res.setHeader("Content-Type", "text/html");
  let info = product_data.data.data;
  if (!info || !info.length) {
    res.status(404).send(client_view.error_404({ message: "Sản phẩm không tồn tại hoặc đã hết hàng." }));
  } else {
    res.send(
      client_view.html({
        title: info[0].name,
        command: `var product_master_detail = ${JSON.stringify(info[0])}`,
      })
    );
  }
});


app.get("/campaign/:slug", async (req, res, next) => {
  let { slug } = req.params;
  let campaign_data;
  try {
    campaign_data = await axios.get(`http://103.124.94.179:5336/w/campaign/detail?url=${slug}`, {
      headers: {
        Authorization: `by_passs`,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.setHeader("Content-Type", "text/html");
    res.status(404).send(client_view.error_404({
      message : "Sự kiện này đã kết thúc, hẹn bạn trong sự kiện tiếp theo của SSSTUTTER !"
    }));
    return console.log("line 175", err.message);
  }
  let campaign_detail = campaign_data.data;
  res.setHeader("Content-Type", "text/html");
  if (campaign_detail.data.status == "inActive") {
    res.status(404).send(client_view.error_404({
      message : "Sự kiện này đã kết thúc, hẹn bạn trong sự kiện tiếp theo của SSSTUTTER !"
    }));
  } else {
    res.send(
      client_view.html({
        title: campaign_detail.data.title,
        command: `var campaign_detail = ${JSON.stringify(campaign_detail)}`,
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

app.get("/history", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "SSSTUTTER - ĐÃ XEM GẦN ĐÂY",
      command: "",
    })
  );
});

app.get("/loyalty", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "LOYALTY",
      command: "",
    })
  );
});

app.get("/login", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "SSSTUTTER - LOGIN",
      command: "",
    })
  );
});

app.get("/register", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "SSSTUTTER - ĐĂNG KÝ",
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

app.get("/blog/category/:slug", async(req, res, next) => {
  let { slug } = req.params;
  let article_data;
  try {
    article_data = await axios.get(`https://sss-dashboard.leanservices.work/w/post/get?slug=${slug}`, {
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
      title: "SSSTORY",
      command: `var blog_category = ${JSON.stringify(blog_detail)}`,
    })
  );
});

app.get("/blog/article/:slug", async (req, res, next) => {
  let { slug } = req.params;
  let article_data;
  try {
    article_data = await axios.get(`http://103.124.94.179:5336/w/post/detail?slug=${slug}`, {
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
      title: `SSSTORY - ${blog_detail.data.title.toUpperCase()}`,
      command: `var blog_detail = ${JSON.stringify(blog_detail)}`,
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
    search_data = await axios.get(`http://localhost:5000/pd/filter/web?name=${query.name}&media=true&webStock=true`, {
      headers: {
        Authorization: `by_passs`,
      },
    });
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
      command: `var search_result = ${JSON.stringify(data)} `,
    })
  );
});

app.get("/editorial/:slug", async (req, res, next) => {
  let {slug} = req.params;
  let page_data;
  try {
    page_data = await axios.get(`https://sss-dashboard.leanservices.work/w/pages/detail?slug=${slug}`, {
      headers: {
        Authorization: `by_passs`,
      },
    });
  } catch (err) {
    res.setHeader("Content-Type", "text/html");
    res.status(404).send(client_view.error_404({}));
    return;
  }
  let data = page_data.data;
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: data.data.title.toUpperCase(),
      command: `var page_detail = ${JSON.stringify(data)} `,
    })
  );
});


// app.get("/editorial", (req, res, next) => {
//   res.setHeader("Content-Type", "text/html");
//   res.send(
//     client_view.html({
//       title: "WARM YOUR DAY UP SSSTUTTER",
//       command: "",
//     })
//   );
// });

app.get("/self-portrait", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "SELF PORTRAIT",
      command: "",
    })
  );
});
app.get("/sale-nua-gia", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    client_view.html({
      title: "MUA HÀNG THEO SIZE, GIẢM NGAY NỬA GIA",
      command: "",
    })
  );
});

app.get("/self-portrait/product/:slug", async (req, res, next) => {
  let { slug } = req.params;
  let product_data;
  try {
    product_data = await axios.get(`http://localhost:5000/pd/filter/web?&slug=${slug}&stock=0`, {
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
        command: `var product_sefl_portrait_detail = ${JSON.stringify(info[0])}`,
      })
    );
  }
});

// app.get("/flash-sale", (req, res, next) => {
//   res.setHeader("Content-Type", "text/html");
//   res.send(
//     client_view.html({
//       title: "Flash sale",
//       command: "",
//     })
//   );
// });

app.use((req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.status(404).send(client_view.error_404({}));
});

app.listen(process.env.PORT, () => console.log("Web view started!"));
