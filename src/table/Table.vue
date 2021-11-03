<template>
  <div>
    <table class="test-table">
      <!-- 表头 -->
      <thead>
        <tr>
          <slot name="table-head">
            <table-cell v-for="(col, key) in tableColumns"
                        :key="`table-thead-th-${key}`"
                        type="headCell"
                        :sortCfg="col.sortCfg"
                        :sortStatus="sortStatus"
                        :columnCfg="col"
                        @sort="handleSort"
            >
              <!-- <slot v-if="!col.type"
                    :name="`head-${col.dataIndex}`"
                    :colunm-cfg="col">
                {{ col.title || '-' }}
              </slot> -->
            </table-cell>
          </slot>
        </tr>
      </thead>

      <!-- 表格主体 -->
      <tbody>
        <table-row v-for="(rowData, rowKey) in showedData" :key="`table-row-${rowKey}`">
          <table-cell v-for="(col, cellKey) in tableColumns"
                      :key="`table-cell-${cellKey}`"
                      :column-cfg="col"
                      :value="rowData[col.dataIndex]"
                      :record="rowData"
          >
            <!-- 给个客户数据的表格体都支持插槽 -->
            <slot v-if="!col.type"
                  :name="`cell-${col.dataIndex}`"
                  :column-cfg="col"
                  :value="rowData[col.dataIndex]"
                  :record="rowData"
            >
              {{ rowData[col.dataIndex] || '-' }}
            </slot>
          </table-cell>
        </table-row>
      </tbody>

      <!-- 底部分页 -->
      <slot v-if="enableLocalPaging"
            name="pager"
            :paging-status="pagingStatus"
      >
        <pager :paging-status="pagingStatus" />
      </slot>
    </table>
  </div>
</template>

<script lang="ts">
/**
 * Created by uedc on 2021/10/11.
 */

import type { PagingStatus } from './types'

import { computed, defineComponent, ref, toRef, toRefs } from '@vue/composition-api'
import { tableProps } from './types'

import TableRow from './table_row/index.vue'
import TableCell from './table_cell/index.vue'
import Pager from './pager/index.vue'

// import { cloneDeep } from 'lodash-es'

import { useColumns } from './hooks/useColumns'
import { usePager } from './hooks/usePaging'
import { useSort } from './hooks/useSort'

import './table.less'

export default defineComponent({
  name: 'Table',
  components: {
    TableRow,
    TableCell,
    Pager,
  },
  props: tableProps,
  setup(props) {
    let paging = {}

    const data = toRef(props, 'data')

    /** 用于显示的数据 */
    const showedData = ref([])

    const { tableColumns } = useColumns(props.columns)

    /** 分页状态 */
    let pagingStatus: PagingStatus
    if (props.enableLocalPaging) {
      pagingStatus = usePager(props.pagingCfg, showedData, data)
      paging = { pagingStatus }
    }

    /** 显示数据的备份，如果有分页根据分页状态来获取 */
    const showedDataBak = computed(() => {
      if (!props.enableLocalPaging) {
        return [...data.value]
      }

      return [...data.value.slice(pagingStatus.startInd, pagingStatus.startInd + pagingStatus.pageSize)]
    })

    // 开启排序功能
    const { sortCfg, columns } = toRefs(props)
    const sorting = useSort(sortCfg, columns, showedData, showedDataBak)

    return {
      showedData,
      tableColumns,
      ...paging,
      ...sorting,
    }
  },
})
</script>
