<template>
  <td class="table-cell" rowspan="1" colspan="1">
    <slot />
  </td>
</template>

<script lang="ts">
/**
 * Created by uedc on 2021/10/11.
 */

import { computed, defineComponent, watch, toRef, ref } from '@vue/composition-api'
import { cellProps } from './types'

export default defineComponent({
  name: 'TableRow',
  props: cellProps,
//   setup(props) {

//     return {
//       showedData,
//       tableColumns,
//     }
//   },
})

</script>
