/*
 * @Author: your name
 * @Date: 2021-11-03 22:54:44
 * @LastEditTime: 2021-11-04 08:05:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code-testing\demo\mock.js
 */

const oneDay = 1000 * 60 * 60 * 24
const baseDay = 1635984276398

export function getData(count: number) {
  const base = {
    date: new Date(baseDay),
    name: 'Tom',
    address: 'Adress No. ',
  }

  return new Array(count).fill(0).map((v, ind) => {
    return {
      date: new Date(base.date.getTime() - oneDay * ind).getTime(),
      name: base.name + (ind + 1),
      address: base.address + (ind + 1),
    }
  })
}
