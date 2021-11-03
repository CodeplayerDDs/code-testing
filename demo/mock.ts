/*
 * @Author: your name
 * @Date: 2021-11-03 22:54:44
 * @LastEditTime: 2021-11-03 22:55:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code-testing\demo\mock.js
 */
export function getData(count: number) {
  const oneDay = 1000 * 60 * 60 * 24
  const base = {
    date: new Date(),
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
