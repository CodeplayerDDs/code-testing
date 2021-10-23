<docs>
---
order: 0
title:
  zh-CN: 基本用法
---

## zh-CN

最简单的用法。

</docs>

<template>
  <div>
    <test-table :data="data" @data-change="onDataChange" />
    <button @click="data.push({date: new Date, name: 'addByClick', address: '111'})">
      点击修改data
    </button>
  </div>
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
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    }])

    return {
      data,
      columns: [{
        type: 'index', // 序列号
      }, {
        title: '日期',
        dataIndex: 'date',
      }, {
        title: '姓名',
        dataIndex: 'name',
      }, {
        title: '地址',
        dataIndex: 'address',
      }],
      onDataChange (newData: record[]) {
        console.log('data is changed', new Date(), newData)
      },
    }
  },
})
</script>
