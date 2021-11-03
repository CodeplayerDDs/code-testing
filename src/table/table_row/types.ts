/*
 * @Author: your name
 * @Date: 2021-11-01 13:47:44
 * @LastEditTime: 2021-11-03 21:16:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code-testing\src\table\table_row\types.ts
 */
// Props 定义在这里
export const rowProps = {
  rowIndex: {
    type: Number,
    default: 0,
  },
  record: {
    type: Object,
    default: () => ({}),
  },
}
