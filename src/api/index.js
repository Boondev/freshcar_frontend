import request from '@/utils/request'

export function getGeneralData() {
  return request({
    url: '/getGeneral',
    method: 'get',
  })
}

export function getCarList(data) {
  return request({
    url: '/car/list',
    method: 'post',
    data
  })
}

export function addCar(data) {
  return request({
    url: '/car/add',
    method: 'post',
    data
  })
}

export function updateCar(data) {
  return request({
    url: '/car/update',
    method: 'post',
    data
  })
}

export function deleteCar(data) {
  return request({
    url: '/car/delete',
    method: 'post',
    data
  })
}