/*
 * @Author: your name
 * @Date: 2021-11-01 13:47:44
 * @LastEditTime: 2021-11-03 23:36:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code-testing\src\__tests__\table.spec.tsx
 */
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import { TestTable } from '../table'
import { getData } from '../../demo/mock'

const columnsCfg = [{
  title: '日期',
  dataIndex: 'date',
  enableSort: true,
}, {
  title: '姓名',
  dataIndex: 'name',
}, {
  title: '地址',
  dataIndex: 'address',
  enableSort: true,
}]

describe('Table', () => {
  const TableMount = options => mount(TestTable, options)

  test('test base render', () => {
    const wrapper = TableMount({
      columns: columnsCfg,
      data: getData(20),
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.vm.$destroy()
    }).not.toThrow()
  })

  // test('test props', () => {
  //   const wrapper = TableMount({
  //     propsData: {
  //       test: true,
  //     },
  //   })

  //   expect(wrapper.find('.test-class').exists()).toBeTruthy()
  // })

  test('test sorting', async () => {
    const wrapper = TableMount({
      columns: columnsCfg,
      data: getData(20),
      enableLocalPaging: true,
    })

    await Vue.nextTick()
    // 出现分页条
    const PagingBar = wrapper.findAll('.table-paging-bar')
    expect(PagingBar).toBeTruthy()

    // 只有一页
    const allPagingItem = wrapper.findAll('.paging-item')
    expect(allPagingItem).toHaveLength(1)
  })
  // await firstWrapper.trigger('click')

})
