import fetch from 'utils/fetch';

const KONG_ADMIN_URL = "http://gw.qingmang.me:8001"
const KONG_API_URL = "http://gw-test.qingmang.me"

export function getApiList() {
  return fetch({
    url: KONG_ADMIN_URL + '/api',
    method: 'get'
  });
}

export function getApi(id) {
  return fetch({
    url: KONG_ADMIN_URL + '/api/' + id,
    method: 'get'
  });
}

export function getStats(user) {
  if (user) {
    return fetch ({
      url: KONG_API_URL + '/api/stats/' + user,
      method: 'get'
    })
  } else {
    return fetch ({
      url: KONG_API_URL + '/api/stats',
      method: 'get'
    })
  }
}
