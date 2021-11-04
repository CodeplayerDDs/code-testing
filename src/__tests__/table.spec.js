/*
 * @Author: your name
 * @Date: 2021-11-01 13:47:44
 * @LastEditTime: 2021-11-04 16:25:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code-testing\src\__tests__\table.spec.tsx
 */
import { mount } from '@vue/test-utils'
import { TestTable } from '../table'
import { getData } from '../../demo/mock'

import { DEFAULT_PAGING_SIZE, SortDir } from '../table/types'

import { SortDirClsMap } from '../table/table_cell/types'

const columnsCfg = [{
  title: '日期',
  dataIndex: 'date',
}, {
  title: '姓名',
  dataIndex: 'name',
}, {
  title: '地址',
  dataIndex: 'address',
}]

function getPagingProps(cfg) {
  return {
    columns: columnsCfg,
    enableLocalPaging: true,
    ...cfg,
  }
}

function getSortItem (wrapper) {
  return {
    [SortDir.none]: wrapper.findAll('.' + SortDirClsMap[SortDir.none]),
    [SortDir.desc]: wrapper.findAll('.' + SortDirClsMap[SortDir.desc]),
    [SortDir.asc]: wrapper.findAll('.' + SortDirClsMap[SortDir.asc]),
  }
}

describe('Table', () => {
  const TableMount = options => mount(TestTable, options)

  test('test base render', () => {
    const wrapper = TableMount({
      propsData: {
        columns: columnsCfg,
        originData: getData(20),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.vm.$destroy()
    }).not.toThrow()
  })

  test('test paging empty', async () => {
    const wrapper = TableMount()

    /** 测空数据分数个数、基本分页功能 */
    const pageZero = 0
    const pageZeroProp = {
      originData: getData(pageZero),
      // pagingCfg 不重要
    }

    await wrapper.setProps(getPagingProps(pageZeroProp))

    // 出现分页条 basic
    const PagingBar = wrapper.findAll('.table-paging-bar')
    expect(PagingBar).toBeTruthy()

    // 空翻页
    const allPagingItem = wrapper.findAll('.paging-item')
    expect(allPagingItem).toHaveLength(pageZero)
  })

  test('test paging disable', async () => {

    /** 测空数据分数个数、基本分页功能 */
    const pageZero = 0
    const pageZeroProp = {
      originData: getData(pageZero),
      enableLocalPaging: false,
    }

    const wrapper = TableMount({
      propsData: getPagingProps(pageZeroProp),
    })

    // 出现分页条 basic
    const PagingBar = wrapper.findAll('.table-paging-bar')
    expect(PagingBar).toHaveLength(0)
  })

  test('test paging defalt size', async () => {

    /** 测默认页大小 */
    const pageDefault = 2
    const pageDefaultProp = {
      originData: getData(pageDefault * DEFAULT_PAGING_SIZE),
      // empty pagingCfg, using DEFAULT_PAGING_SIZE
    }

    const wrapper = TableMount({
      propsData: getPagingProps(pageDefaultProp),
    })

    // 默认页数是否正确
    const allPagingItem = wrapper.findAll('.paging-item')
    expect(allPagingItem).toHaveLength(pageDefault)
  })

  test('test paging page 8', async () => {
    /** 8页翻页 */
    const page8 = 8
    const pageSize40 = 40
    const page8Prop = {
      originData: getData(page8 * pageSize40),
      pagingCfg: {
        pageSize: pageSize40,
      },
    }

    const wrapper = TableMount({
      propsData: getPagingProps(page8Prop),
    })

    const allPagingItem = wrapper.findAll('.paging-item')
    expect(allPagingItem).toHaveLength(page8)
  })

  test('test sorting: no sort item', async () => {
    const wrapper = TableMount({
      propsData: {
        columns: columnsCfg,
        originData: getData(20),
      },
    })

    const sortItem = getSortItem(wrapper)

    expect(sortItem[SortDir.none]).toHaveLength(0)
    expect(sortItem[SortDir.desc]).toHaveLength(0)
    expect(sortItem[SortDir.asc]).toHaveLength(0)
  })

  test('test sorting: to sort item', async () => {
    const wrapper = TableMount({
      propsData: {
        columns: [{
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
        }],
        originData: getData(20),
      },
    })

    const sortItem = getSortItem(wrapper)

    expect(sortItem[SortDir.none]).toHaveLength(2)
    expect(sortItem[SortDir.desc]).toHaveLength(0)
    expect(sortItem[SortDir.asc]).toHaveLength(0)
  })

  test('test sorting: sort action', async () => {
    const wrapper = TableMount({
      propsData: {
        columns: [{
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
        }],
        originData: getData(20),
      },
    })

    const sortItem = getSortItem(wrapper)

    const aWrapper = sortItem[SortDir.none].wrappers[0]
    aWrapper.trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
    aWrapper.trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
    aWrapper.trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
    // aItem
  })
  // await firstWrapper.trigger('click')

})
