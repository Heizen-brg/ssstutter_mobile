import { attributesApi } from '../http-common';

class LocationService {
  getLocationData(params,query) {
    return attributesApi.get(`${params}`, {
      params: query
    })
  }
}

export default new LocationService();