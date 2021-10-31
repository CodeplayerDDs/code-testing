<template>
  <div>
    <TestTable class="dsy-test-table" enable-multi-check enable-local-paging :test="test" :columns="columns" :data="data">
      <template slot="cell-name" slot-scope="{value}">
        v-slot{{ value }}
      </template>
    </TestTable>
  </div>
</template>

<script lang="ts">
import { TestTable } from '../src/table'
import { defineComponent, ref } from '@vue/composition-api'

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
      columns: [{
        type: 'index',
      }, {
        title: '日期',
        dataIndex: 'date',
        enableSort: true,
      }, {
        title: '姓名',
        dataIndex: 'name',
        enableSort: true,
      }, {
        title: '地址',
        dataIndex: 'address',
        enableSort: true,
      }],
      data: getData(50),
    }
  },
})


function getData (count: number) {
  const oneDay = 1000*60*60*241
  const base = {
    date: new Date(),
    name: 'Tom',
    address: 'Adress No. ',
  }

  return new Array(count).fill(0).map((v, ind) => {
    return {
      date: new Date(base.date.getTime() - oneDay * ind).getTime(),
      name: base.name + (ind + 1),
      address: base.address + (ind + 1),
    }
  })
}
</script>

<style lang="less">
.dsy-test-table {
  padding: 80px;
}
</style>
