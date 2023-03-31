import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import ReactGA from "react-ga";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Checkbox, Loader, Product, Radio } from "../components";
import { CONFIG } from "../config";
import {
  useApi,
  useFacebookPixel,
  useInfiniteScroll,
  useWindowDimension,
} from "../hooks";
import cmsService from "../services/cms.service";
const Campaign = () => {
  const { slug } = useParams();
  const { width } = useWindowDimension();
  const { loadMoreRef, skip, setSkip } = useInfiniteScroll();
  const getCampApi = useApi(cmsService.getCampaignDetail);
  const [mobile, setMobile] = useState(false);
  const [campaign, setCampaign] = useState({});
  const [campaignProduct, setCampaignProduct] = useState([]);
  const [price, setPrice] = useState("");
  const { pageView } = useFacebookPixel();
  let location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location);
  }, [location]);
  useEffect(() => {
    pageView();
  }, []);

  useEffect(() => {
    getCampaignList({ url: slug, limit: skip, salePrice: price });
  }, [slug, skip]);

  useEffect(() => {
    setSkip(0);
    getCampaignList({ url: slug, limit: skip, salePrice: price });
  }, [price]);

  useEffect(() => {
    if (getCampApi.data !== null) {
      document.title = getCampApi.data.title;

      setCampaign(getCampApi.data);
      setCampaignProduct(getCampApi.data.products);
    }
  }, [getCampApi.data]);

  useEffect(() => {
    if (width <= 528) {
      setMobile(true);
    }
    if (width > 528) {
      setMobile(false);
    }
  }, [width]);

  const getCampaignList = (query) => {
    getCampApi.request(query);
  };

  const handleFilter = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div>
      <div>
        <div
          style={{
            backgroundImage: `url(https://sss-dashboard.leanservices.work${
              mobile ? campaign.thumbnail : campaign.banner
            }.jpeg)`,
          }}
          className="portrait sm:banner"
        ></div>
      </div>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-4 p-4  sm:py-10 sm:px-20">
          <Radio
            id="filter_cam_1"
            label="Đặc biệt !!!"
            value="0,100000"
            hidden={true}
            name="filter_cam"
            labelClass={`px-4 py-2 border w-full text-center peer-checked:border-black `}
            onChange={handleFilter}
          />
          <Radio
            id="filter_cam_2"
            label="100k - 200k"
            value="100000,200000"
            name="filter_cam"
            hidden={true}
            labelClass={`px-4 py-2 border w-full text-center peer-checked:border-black `}
            onChange={handleFilter}
          />
          <Radio
            id="filter_cam_3"
            label="300k"
            value="300000"
            hidden={true}
            name="filter_cam"
            labelClass={`px-4 py-2 border w-full text-center peer-checked:border-black `}
            onChange={handleFilter}
          />
          <Radio
            id="filter_cam_4"
            label="400k >"
            value="400000"
            name="filter_cam"
            hidden={true}
            labelClass={`px-4 py-2 border w-full text-center peer-checked:border-black `}
            onChange={handleFilter}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:px-20 ">
        {(campaignProduct || []).map((product, index) => (
          <div key={index}>
            <Link to={`/p/${product.slug}`}>
              <div
                style={{
                  backgroundImage: `url(${CONFIG.DOMAIN_IMG_CDN}/${product.media.featured})`,
                }}
                className="portrait relative"
              >
                {product.salePrice && (
                  <span className="absolute top-8 left-0 p-1 bg-warning text-xs text-secondary">
                    {Math.floor(
                      100 - (product.salePrice / product.price) * 100
                    )}
                    %
                  </span>
                )}
              </div>
              <div className="py-2">
                <div className="flex items-center justify-between">
                  <h5 className="uppercase truncate w-2/3">{product.name}</h5>
                  <p
                    className={`text-xs ${
                      product.salePrice ? "line-through text-primary-300" : ""
                    }`}
                  >
                    <NumberFormat
                      value={product.price}
                      className="flex flex-end w-full"
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={false}
                      renderText={(value, props) => value}
                    />
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <small className="text-primary-300">
                    {product.color.length} Colors
                  </small>
                  {product.salePrice && (
                    <h4 className="text-warning">
                      {
                        <NumberFormat
                          value={product.salePrice}
                          className="flex flex-end w-full"
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={false}
                          renderText={(value, props) => value}
                        />
                      }
                    </h4>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
        <div ref={loadMoreRef}>{getCampApi.loading && <Loader />}</div>
      </div>
    </div>
  );
};

export default Campaign;
