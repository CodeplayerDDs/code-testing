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
                        :colunm-cfg="col">
              <slot v-if="!col.type" :name="`head-${col.dataIndex}`" :colunm-cfg="col">
                {{ col.title || '-' }}
              </slot>
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
                      :record="rowData">
            <slot v-if="!col.type"
                  :name="`cell-${col.dataIndex}`"
                  :column-cfg="col"
                  :value="rowData[col.dataIndex]"
                  :record="rowData">
              {{ rowData[col.dataIndex] }}
            </slot>
          </table-cell>
        </table-row>
      </tbody>

      <!-- 底部分页 -->
      <slot name="pager" v-if="enableLocalPaging">
        <pager :paging-status="pagingStatus" />
      </slot>
    </table>
  </div>
</template>

<script lang="ts">
/**
 * Created by uedc on 2021/10/11.
 */

import type { Column, PagingCfg, PagingStatus } from './types'

import type { Ref } from '@vue/composition-api'

import { computed, defineComponent, ref, toRef, watch } from '@vue/composition-api'
import { tableProps } from './types'

import TableRow from './table_row/index.vue'
import TableCell from './table_cell/index.vue'
import Pager from './pager/index.vue'

// const cloneDeep = require('lodash/cloneDeep')

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
    const showedData = ref(data)

    const { tableColumns } = useColumns(props.columns)

    if (props.enableLocalPaging) {
      const pagingStatus = usePager(props.pagingCfg, showedData, data)
      paging = { pagingStatus }
    }

    // const sortProp = ref(''),
    //     sortType = ref('0')

    // 不支持跨页选中
    // const checkedList = ref<any[]>([])

    return {
      showedData,
      tableColumns,
      ...paging,
    }
  },
})

function useColumns(columnsCfg: Column[]) {
  const tableColumns = ref(computed(() => Array.from(columnsCfg)))
  // function registryColumn(column) {
  //   tableColumns.value.push(column)
  // }

  return {
    tableColumns,
    // registryColumn,
  }
}

/** 应用分页功能 */
function usePager<TRecord>(pagingCfg: PagingCfg, showedData: Ref<TRecord[]>, data: Ref<TRecord[]>): Ref<PagingStatus> {
  const pagingStatus = ref({
    curPage: 0,
    totalPage: 0,
    pageSize: pagingCfg.pageSize || 20,
    startInd: 0,
  })

  watch(data, newV => {
    handlePaging(pagingCfg, pagingStatus, showedData, newV)
  })

  // 当前页变化后，需要重新计算index的开始值，并刷新展示的数据
  watch(() => pagingStatus.value.curPage, () => {
    pagingStatus.value.startInd = (pagingStatus.value.curPage - 1) * pagingStatus.value.pageSize
    const endInd = Math.min(pagingStatus.value.startInd + pagingStatus.value.pageSize, data.value.length)
    showedData.value = data.value.slice(pagingStatus.value.startInd, endInd)
  }, {
    immediate: true,
    deep: true,
  })

  handlePaging(pagingCfg, pagingStatus, showedData, data.value)

  return pagingStatus
}

/** 当数据变化，需要重新计算分页的总数 */
function handlePaging<TRecord>(pagingCfg: PagingCfg, pagingStatus: Ref<PagingStatus>, showedData: Ref<TRecord[]>, data: TRecord[]) {
  if (!data || !data.length) {
    pagingStatus.value.totalPage = 0
    pagingStatus.value.curPage = 0
    return
  }

  const isMore = data.length % pagingCfg.pageSize > 0
  pagingStatus.value.totalPage = Math.floor(data.length / pagingCfg.pageSize) + (isMore ? 1 : 0)
  pagingStatus.value.curPage === 0 && (pagingStatus.value.curPage = 1)
}

</script>
