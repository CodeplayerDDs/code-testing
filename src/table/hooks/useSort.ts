/*
 * @Author: your name
 * @Date: 2021-11-03 20:50:53
 * @LastEditTime: 2021-11-03 21:07:54
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

    let aVal, bVal
    const sortingFn = (b: TRecord, a: TRecord) => {
      if (sortColCfg.sortFn) {
        return sortColCfg.sortFn(b, a)
      }

      bVal = b[sortKey]
      aVal = a[sortKey]

      return bVal === aVal ? 0 : bVal > aVal ? 1 : -1
    }

    switch (sortStatus.sortDir) {
      case SortDir.none:
				debugger
        showedData.value = sortStatus.unsortedData
        break
      case SortDir.desc:
        showedData.value.sort((b, a) => sortingFn(b, a))
        break
      case SortDir.asc:
        showedData.value.sort((b, a) => sortingFn(a, b))
        break

      default:
        console.error(`Invalide sort dirction: ${sortStatus.sortDir}`)
    }
  }

  return {
    sortStatus,
    handleSort,
  }
}
