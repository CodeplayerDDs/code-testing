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
                        @sort="handleSort"
                        :columnCfg="col">
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
                      :record="rowData">
            <!-- 给个客户数据的表格体都支持插槽 -->
            <slot v-if="!col.type"
                  :name="`cell-${col.dataIndex}`"
                  :column-cfg="col"
                  :value="rowData[col.dataIndex]"
                  :record="rowData">
              {{ rowData[col.dataIndex] || '-' }}
            </slot>
          </table-cell>
        </table-row>
      </tbody>

      <!-- 底部分页 -->
      <slot v-if="enableLocalPaging"
            name="pager"
            :paging-status="pagingStatus">
        <pager :paging-status="pagingStatus" />
      </slot>
    </table>
  </div>
</template>

<script lang="ts">
/**
 * Created by uedc on 2021/10/11.
 */

import type {
  Column,
  PagingCfg, PagingStatus,
  SortCfg, SortStatus,
} from './types'

import type { Ref } from '@vue/composition-api'

import { computed, defineComponent, ref, toRef, toRefs, watch, watchEffect, reactive } from '@vue/composition-api'
import { SortDir, tableProps } from './types'

import TableRow from './table_row/index.vue'
import TableCell from './table_cell/index.vue'
import Pager from './pager/index.vue'

import cloneDeep from 'lodash-es/cloneDeep'

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
        return cloneDeep(data.value)
      }

      return cloneDeep(data.value.slice(pagingStatus.startInd, pagingStatus.startInd + pagingStatus.pageSize))
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

/** 应用表格列，生成表格列配置 */
function useColumns(columnsCfg: Column[]) {
  const tableColumns = computed(() => cloneDeep(columnsCfg))

  // TODO 需要处理一些内置列
  // function registryColumn(column) {
  //   tableColumns.value.push(column)
  // }

  return {
    tableColumns,
    // registryColumn,
  }
}

/** 应用分页功能 */
function usePager<TRecord>(pagingCfg: PagingCfg, showedData: Ref<TRecord[]>, data: Ref<TRecord[]>): PagingStatus {
  const pagingStatus = reactive({
    curPage: 0,
    totalPage: 0,
    pageSize: pagingCfg.pageSize || 20,
    startInd: 0,
  })

  watch(data, () => {
    handlePaging(pagingCfg, pagingStatus, showedData, data)
  })

  // 当前页变化后，需要重新计算index的开始值，并刷新展示的数据
  watch(() => pagingStatus.curPage, () => {
    pagingStatus.startInd = (pagingStatus.curPage - 1) * pagingStatus.pageSize
    const endInd = Math.min(pagingStatus.startInd + pagingStatus.pageSize, data.value.length)
    showedData.value = data.value.slice(pagingStatus.startInd, endInd)
  })

  handlePaging(pagingCfg, pagingStatus, showedData, data)

  return pagingStatus
}

/** 当数据变化，需要重新计算分页的总数 */
function handlePaging<TRecord>(pagingCfg: PagingCfg, pagingStatus: PagingStatus, showedData: Ref<TRecord[]>, data: Ref<TRecord[]>) {
  if (!data.value || !data.value.length) {
    pagingStatus.totalPage = 0
    pagingStatus.curPage = 0
    return
  }

  const isMore = data.value.length % pagingCfg.pageSize > 0
  pagingStatus.totalPage = Math.floor(data.value.length / pagingCfg.pageSize) + (isMore ? 1 : 0)
  pagingStatus.curPage === 0 && (pagingStatus.curPage = 1)
}

/** 开启排序功能 */
function useSort<TRecord> (sortCfg: Ref<SortCfg>, columns: Ref<Column<TRecord>[]>, showedData: Ref<TRecord[]>, showedDataBak: Ref<TRecord[]>) {
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
      aVal= a[sortKey]

      return bVal === aVal ? 0 : bVal > aVal ? 1 : -1
    }

    switch(sortStatus.sortDir) {
      case SortDir.none:
        showedData.value = sortStatus.unsortedData!
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

</script>
