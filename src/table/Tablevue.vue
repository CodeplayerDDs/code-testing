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
    </table>
  </div>
</template>

<script lang="ts">
/**
 * Created by uedc on 2021/10/11.
 */

import { computed, defineComponent, watch, toRef, ref } from '@vue/composition-api'
import { tableProps } from './types'

import TableRow from './table_row/index.vue'
import TableCell from './table_cell/index.vue'

// const cloneDeep = require('lodash/cloneDeep')

import './table.less'

export default defineComponent({
  name: 'Table',
  components: {
    TableRow,
    TableCell,
  },
  props: tableProps,
  setup(props) {
    // const table = getCurrentInstance()
    const data = toRef(props, 'data')
    // const curPage = ref(0),
    //   totalPage = ref(0),
    //   pageSize = ref(20),
    //   startInd = ref(0),
    const showedData = ref(data)

    const { tableColumns } = useColumns(props.columns)

    // const sortProp = ref(''),
    //     sortType = ref('0')

    // 不支持跨页选中
    // const checkedList = ref<any[]>([])

    return {
      showedData,
      tableColumns,
    }
  },
})

function useColumns(cfgColumns) {
  const tableColumns = ref(computed(() => Array.from(cfgColumns)))
  // function registryColumn(column) {
  //   tableColumns.value.push(column)
  // }

  return {
    tableColumns,
    // registryColumn,
  }
}

</script>
