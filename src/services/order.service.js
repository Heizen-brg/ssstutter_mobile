import { webApi } from '../http-common';

class OrderService {
  checkShipping(body) {
    return webApi.post(`order/shipping/fee/web`,body)
  }
  checkUser(body) {
    return webApi.post(`order/voucher/customer-voucher`,body)
  }
  checkStock(query) {
    return webApi.get(`pd/v2/child/check-stock`,{
      params: query
    })
  }
  confirmOrder(body) {
    return webApi.post(`order/order/web/create`,body)
  }
}

export default new OrderService();