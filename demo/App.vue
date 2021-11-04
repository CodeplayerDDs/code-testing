<!--
 * @Author: your name
 * @Date: 2021-11-01 13:47:44
 * @LastEditTime: 2021-11-04 02:00:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code-testing\demo\App.vue
-->
<template>
  <div>
    <TestTable class="dsy-test-table" :pagingCfg="pagingCfg" enable-local-paging :columns="columns" :data="data">
      <template slot="cell-name" slot-scope="{value}">
        v-slot{{ value }}
      </template>
    </TestTable>
  </div>
</template>

<script lang="ts">
import TestTable from '../src/table/Table.vue'
import { defineComponent, ref } from '@vue/composition-api'

import { getData } from './mock'

export default defineComponent({
  name: 'App',
  components: {
    TestTable,
  },
  setup() {
    const test = ref(true)

    return { test }
  },
  data () {
    return {
      columns: [/*{
        type: 'index',
      }, */{
          title: '日期',
          dataIndex: 'date',
          enableSort: true,
        }, {
          title: '姓名',
          dataIndex: 'name',
        }, {
          title: '地址',
          dataIndex: 'address',
          enableSort: true,
        }],
      data: getData(320),
      pagingCfg: {
        pageSize: 40,
      },
    }
  },
})
</script>

<style lang="less">
.dsy-test-table {
  padding: 80px;
}
</style>
