/*
 * @Author: your name
 * @Date: 2021-11-03 20:45:42
 * @LastEditTime: 2021-11-03 23:09:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code-testing\src\table\hooks\useColumns.ts
 */

import type { Column } from '../types'
import { computed } from '@vue/composition-api'
// import { cloneDeep } from 'lodash-es'

/** 应用表格列，生成表格列配置 */
export function useColumns(columnsCfg: Column[]) {
  const tableColumns = computed(() => [...columnsCfg])
  return {
    tableColumns,
  }
}
