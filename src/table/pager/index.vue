<template>
  <div class="table-paging-bar">
    <span :class="['paging-btn', {disabled: !enablePre}]" @click="onClickPre">{{ 上一页 }}</span>
    <div class="paging-item_wrapper">
      <span :v-for="(v, ind) in new Array(totalPage).fill(0)"
            :class="['paging-item', {activated: curPage === ind + 1}]">{{ ind + 1 }}</span>
    </div>
    <span :class="['paging-btn', {disabled: !enableNext}]" @click="onClickNext">{{ 下一页 }}</span>
  </div>
</template>

<script lang="ts">
/**
 * Created by uedc on 2021/10/11.
 */

import { computed, defineComponent } from '@vue/composition-api'
import { pagingProps } from './types'

export default defineComponent({
  name: 'Pager',
  props: pagingProps,
  setup(props) {
    const pagingStatus = props.pagingStatus!
    const enablePre = computed(() => pagingStatus.value.curPage > 1)
    const enableNext = computed(() => pagingStatus.value.curPage < pagingStatus.value.totalPage)
    const curPage = computed(() => pagingStatus.value.curPage || 0)
    const totalPage = computed(() => pagingStatus.value.totalPage || 0)

    const onClickPre = () => {
      enablePre && pagingStatus.value.curPage--
    }

    const onClickNext = () => {
      enableNext && pagingStatus.value.curPage++
    }
    return {
      totalPage,
      curPage,
      enablePre,
      enableNext,
      onClickPre,
      onClickNext,
    }
  },
})

</script>
