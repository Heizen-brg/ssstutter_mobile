import { cmsApi } from "../http-common";


class CmsService {

  getMenuList(query) {
    return cmsApi.get(`menu/get`, {params:query})
  }

  getBannerList(query) {
    return cmsApi.get(`banner/get`,{params:query})
  }
  
  getNewArrival(query) {
    return cmsApi.get(`section/detail`, {params:query})
  }

  getBlogList(query) {
    return cmsApi.get(`post/get`, {params:query})
  }

  getBlogDetail(query) {
    return cmsApi.get(`post/detail`, {params:query})
  }

  getCampaignDetail(query) {
    return cmsApi.get(`campaign/detail-web`,{params: query})
  }
}

export default new CmsService();