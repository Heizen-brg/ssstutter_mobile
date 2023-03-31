import { cacheApi, webApi, attributesApi } from '../http-common';
class ProductService {
  getProductList(query) {
    // const {ids,slug,catId,price,color,size} = query;
    return cacheApi.get(`website/search`,{
      params: query
    })
  }

  getProductDetail(query) {
    return webApi.get(`pd/v2/parent/website/detail`, {
      params: query
    })
  }

  getProductListByAttr(query,param) {
    return attributesApi.get(`${param}`,{
      params: query
    })
  }

  getSaleProduct(query) {
    return webApi.get(`/pd/v2/parent/cross-items`,{
      params:query
    })
  }
  getColorList() {
    return attributesApi.get('color')
  }
  getSizeList() {
    return attributesApi.get('size')
  }

}
export default new ProductService();
