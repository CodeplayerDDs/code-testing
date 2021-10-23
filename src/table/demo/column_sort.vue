<docs>
---
order: 0
title:
  zh-CN: 表格排序用法。
---

## zh-CN

表格排序用法。

</docs>

<template>
  <test-table :data="data" defaultSortKey="date" />
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { TestTable } from '../index'


interface record {
    date: string
    name: string
    address: string
}

export default defineComponent({
  components: {
    TestTable,
  },
  setup() {
    const data = ref<record[]>([{
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles444',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles555',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles111',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles222',
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles333',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles123',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles122',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles132',
    }])

    return {
      data,
      columns: [{
        type: 'index', // 序列号
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
        sortFn: function (b: record, a: record) {
          const bAdd = b.address.split(',')[2]
          const aAdd = a.address.split(',')[2]

          if (bAdd === aAdd) {
            return 0
          }

          return bAdd > aAdd ? 1 : -1
        },
      }],
    }
  },
})
</script>
