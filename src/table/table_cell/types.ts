/*
 * @Author: your name
 * @Date: 2021-10-30 22:29:24
 * @LastEditTime: 2021-11-04 08:26:46
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \code-testing\src\table\table_cell\types.ts
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PropType } from 'vue-types/dist/types'

export type CellType = 'bodyCell' | 'headCell';

import type { Column, SortStatus } from '../types'

import { SortDir } from '../types'

export const SortDirClsMap = {
  [SortDir.none]: 'table-cell_sort-item--none',
  [SortDir.desc]: 'table-cell_sort-item--desc',
  [SortDir.asc]: 'table-cell_sort-item--asc',
}

// Props 定义在这里
export const cellProps = {
  dataIndex: {
    type: String,
    default: '',
  },
  value: {
    default: '',
  },
  record: {
    type: Object,
    default: (): any => ({}),
  },
  type: {
    type: String as PropType<CellType>,
    default: 'bodyCell',
  },
  columnCfg: {
    type: Object as PropType<Column<any>>,
    default: (): Column<any> => ({}),
  },
  sortStatus: {
    type: Object as PropType<SortStatus>,
  },
}



