<template>
  <tr class="table-row">
      <slot></slot>
  </tr>
</template>

<script lang="ts">
/**
 * Created by uedc on 2021/10/11.
 */

import { computed, defineComponent, watch, toRef, ref } from '@vue/composition-api'

import { rowProps } from './types'

export default defineComponent({
  name: 'TableRow',
  props: rowProps,
  //   setup(props) {

//     return {
//       showedData,
//       tableColumns,
//     }
//   },
})

</script>
