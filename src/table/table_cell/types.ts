/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PropType } from 'vue-types/dist/types'

export type CellType = 'bodyCell' | 'headCell';

import type { Column, SortStatus } from '../types'

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



