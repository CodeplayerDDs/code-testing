<!--
 * @Author: your name
 * @Date: 2021-11-01 13:47:44
 * @LastEditTime: 2021-11-04 11:53:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code-testing\src\table\table_cell\index.vue
-->
<template>
  <td class="table-cell" rowspan="1" colspan="1">
    <slot>
      <template v-if="type === 'bodyCell'">
        {{ value || '-' }}
      </template>


      <template v-else>
        <span class="dsy-test-head"></span>
        {{ columnCfg.title || '-' }}
        <template v-if="columnCfg.enableSort">
          <span class="dsy-test" :class="curSortCls" @click="handleSort">{{ curSortText }}</span>
        </template>
      </template>
      <span class="dsy-test-default"></span>
    </slot>
  </td>
</template>

<script lang="ts">
/**
 * Created by uedc on 2021/10/11.
 */

import { computed, defineComponent, toRefs } from '@vue/composition-api'
import { SortDirClsMap, cellProps } from './types'
import { SortDir, SortDirTextMap } from '../types'

export default defineComponent({
  name: 'TableRow',
  props: cellProps,
  emits: ['sort'],
  setup(props, { emit }) {
    const { columnCfg, type, record, value, sortStatus } = toRefs(props)

    let res = {}

    if (type.value === 'bodyCell') {
      res = {
        value,
        record,
        columnCfg,
      }
    } else {
      res = {
        columnCfg,
      }

      // 当前列开启排序功能
      if (columnCfg.value.enableSort) {
        /** 正在以当前列排序 */
        const isSorting = computed(() => sortStatus!.value!.sortKey === columnCfg.value.dataIndex)

        const curSortText = computed(() => isSorting.value ? SortDirTextMap[sortStatus!.value!.sortDir] : SortDirTextMap[SortDir.none])

        const curSortCls = computed(() => isSorting.value ? SortDirClsMap[sortStatus!.value!.sortDir] : SortDirClsMap[SortDir.none])

        const handleSort = () => {
          // 如果已经是在当前列排序,切换排序方式
          if (isSorting.value) {
            sortStatus!.value!.sortDir = SortDir[SortDir[(sortStatus!.value!.sortDir + 1) % 3]]
            emit('sort')
            return
          }

          // 否则排序列改为当前列，并使用正序排序
          sortStatus!.value!.sortKey = columnCfg.value.dataIndex
          sortStatus!.value!.sortDir = SortDir.desc

          emit('sort')
        }

        res = {
          ...res,
          curSortText,
          handleSort,
          curSortCls,
        }
      }
    }

    return {
      ...res,
    }
  },
})
</script>
