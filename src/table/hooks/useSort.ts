/*
 * @Author: your name
 * @Date: 2021-11-03 20:50:53
 * @LastEditTime: 2021-11-03 22:17:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code-testing\src\table\hooks\useSort.ts
 */

import type { Ref } from '@vue/composition-api'
import type { Column, SortCfg } from '../types'
import { reactive } from '@vue/composition-api'
import { SortDir } from '../types'

/** 开启排序功能 */
export function useSort<TRecord>(sortCfg: Ref<SortCfg>, columns: Ref<Column<TRecord>[]>, showedData: Ref<TRecord[]>, showedDataBak: Ref<TRecord[]>) {
  const sortStatus = reactive({
    sortKey: sortCfg.value.defaultSortKey,
    sortDir: sortCfg.value.defaultSortDir,
    unsortedData: showedDataBak,
  })

  const handleSort = () => {
    const sortKey = sortStatus.sortKey
    if (!sortKey) {
      return
    }

    const sortColCfg = columns.value.filter(col => col.dataIndex === sortKey)[0]
    if (!sortColCfg) {
      console.warn(`Has no column with an same dataIndex as sortKey: ${sortKey}`)
    }

    if (sortStatus.sortDir === SortDir.none) {
      showedData.value = sortStatus.unsortedData!
      return
    }

    const index = sortStatus.sortDir === SortDir.desc ? 1 : -1
    const sortFn = sortColCfg.sortFn ?? ((a, b) => index * String(a[sortKey]).localeCompare(String(b[sortKey])))
    showedData.value.sort(sortFn)
  }

  return {
    sortStatus,
    handleSort,
  }
}
