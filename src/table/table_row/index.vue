<!--
 * @Author: your name
 * @Date: 2021-11-01 13:47:44
 * @LastEditTime: 2021-11-03 21:04:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code-testing\src\table\table_row\index.vue
-->
<template>
  <tr class="table-row">
      <slot></slot>
  </tr>
</template>

<script lang="ts">
/**
 * Created by uedc on 2021/10/11.
 */

import { defineComponent } from '@vue/composition-api'

import { rowProps } from './types'

export default defineComponent({
  name: 'TableRow',
  props: rowProps,
})
</script>
