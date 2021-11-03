/*
 * @Author: your name
 * @Date: 2021-11-03 20:50:40
 * @LastEditTime: 2021-11-03 22:24:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code-testing\src\table\hooks\usePaging.ts
 */

import type { Ref } from '@vue/composition-api'
import type { PagingCfg, pagingStatus } from '../types'

import { reactive, watch } from '@vue/composition-api'

/** 应用分页功能 */
export function usePager<TRecord>(pagingCfg: PagingCfg, showedData: Ref<TRecord[]>, data: Ref<TRecord[]>): PagingStatus {
  const pagingStatus = reactive({
    curPage: 0,
    totalPage: 0,
    pageSize: pagingCfg.pageSize || 20,
    startInd: 0,
  })

  watch(data, () => {
    handlePaging(pagingCfg, pagingStatus, showedData, data)
  })

  // 当前页变化后，需要重新计算index的开始值，并刷新展示的数据
  watch(() => pagingStatus.curPage, () => {
    pagingStatus.startInd = (pagingStatus.curPage - 1) * pagingStatus.pageSize
    const endInd = Math.min(pagingStatus.startInd + pagingStatus.pageSize, data.value.length)
    showedData.value = data.value.slice(pagingStatus.startInd, endInd)
  })

  handlePaging(pagingCfg, pagingStatus, showedData, data)

  return pagingStatus
}

/** 当数据变化，需要重新计算分页的总数 */
export function handlePaging<TRecord>(pagingCfg: PagingCfg, pagingStatus: PagingStatus, showedData: Ref<TRecord[]>, data: Ref<TRecord[]>) {
  if (!data.value || !data.value.length) {
    pagingStatus.totalPage = 0
    pagingStatus.curPage = 0
    return
  }

  pagingStatus.totalPage = Math.ceil(data.value.length / pagingCfg.pageSize)
  pagingStatus.curPage === 0 && (pagingStatus.curPage = 1)
}
