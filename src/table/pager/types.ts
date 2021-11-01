/*
 * @Author: your name
 * @Date: 2021-11-01 13:47:44
 * @LastEditTime: 2021-11-01 19:15:30
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \code-testing\src\table\pager\types.ts
 */

import type { PropType } from 'vue-types/dist/types'

import type { PagingStatus } from '../types'

// Props 定义在这里
export const pagingProps = {
  pagingStatus: {
    type: Object as PropType<PagingStatus>,
    required: true,
  },
}
