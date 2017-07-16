import fetch from 'utils/fetch';

export function getQuota() {
  return fetch({
    url: '/api/quota',
    method: 'get'
  })
}

export function getUserQuota(user, groupUnit) {
  return fetch({
    url: '/api/quota/' + groupUnit.toLowerCase() + '/' + user,
    method: 'get'
  })
}

export function getAvailiability(user, groupUnit) {
  return fetch({
    url: '/api/availability',
    method: 'get'
  })
}

export function getUsage() {
  return fetch({
    url: '/api/usage',
    method: 'get'
  })
}

export function getUserUsage(user) {
  return fetch({
    url: '/api/usage/' + user,
    method: 'get'
  })
}
