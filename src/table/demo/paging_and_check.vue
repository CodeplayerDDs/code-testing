<docs>
---
order: 0
title:
  zh-CN: 分页和选中行
---

## zh-CN

分页和选中行

</docs>

<template>
  <test-table :data="data" defaultSortKey="date"
              enable-local-paging
              enable-multi-check
              @pre-page="()=>console.log('pre page')"
              @next-page="()=>console.log('next page')"
              @head-check="()=>console.log('head checked!')"
              @row-check="()=>console.log('row checked!')"
  />
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
    const dFn = () => new Array(200).fill(0).map((v, ind) => ({
      date: new Date().toString() + ind,
      name: 'tom' + ind,
      address: 'No .' + ind,
    }))
    const data = ref<record[]>(dFn())

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
