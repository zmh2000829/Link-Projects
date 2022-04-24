import http from '@/http/http'
import md5 from 'js-md5'
import store from '@/store'
let path = 'base'
let luckDraw = async () => {
  let url = path + '/luckDraw'
  let result = await http.post(url)
  return result
}
let addWinner = async (data) => {
  let url = path + '/addWinner'
  let d = {
    'name': data.name,
    'studentID': data.studentID,
    'phoneNumber': data.phoneNumber,
    'giftType': data.giftType
  }
  let result = await http.post(url, d)
  return result
}
export default{
  addWinner,
  luckDraw
}