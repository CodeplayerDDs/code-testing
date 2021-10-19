<template>
  <div>
    <TestTable :test="test">
      <table-column title="姓名" prop="name"><template v-slot="{value}">{{value + 1}}</template></table-column>
      <table-column title="地址" prop="attr">test2</table-column>
      <table-column title="电话" prop="phone">test3</table-column>
      <TablColumn title="电话" prop="phone">test3</TablColumn>
      <span>11111</span>
    </TestTable>
    <table>
      <tr>
        <th>First name</th>
        <th>Last name</th>
      </tr>
      <tr>
        <td>John</td>
        <td>Doe</td>
      </tr>
      <tr>
        <td>Jane</td>
        <td>Doe</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { TableColumn, TestTable } from '../src/table'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'App',
  components: {
    TestTable,
    TableColumn
  },
  setup() {
    const test = ref(true)

    return { test }
  },
})
</script>
