<template>
  <div class="table-paging-bar">
    <span :class="['paging-btn', {disabled: !enablePre}]" @click="onClickPre">上一页</span>
    <div v-if="totalPageArr.length" class="paging-item_wrapper">
      <span v-for="(v, ind) in totalPageArr"
            :key="`paging-item_${ind}`"
            :class="['paging-item', {activated: curPage === ind + 1}]"
            @click="onClickItem(ind + 1)">
        {{ ind + 1 }}
      </span>
    </div>
    <span :class="['paging-btn', {disabled: !enableNext}]" @click="onClickNext">下一页</span>
  </div>
</template>

<script lang="ts">
/**
 * Created by uedc on 2021/10/11.
 */

import { computed, defineComponent, toRef } from '@vue/composition-api'
import { pagingProps } from './types'

export default defineComponent({
  name: 'Pager',
  props: pagingProps,
  setup(props) {
    const pagingStatus = toRef(props, 'pagingStatus')
    const enablePre = computed(() => pagingStatus.value.curPage > 1)
    const enableNext = computed(() => pagingStatus.value.curPage < pagingStatus.value.totalPage)
    const curPage = computed(() => pagingStatus.value.curPage || 0)
    const totalPageArr = computed(() => new Array(pagingStatus.value.totalPage || 0).fill(0))

    const onClickPre = () => {
      enablePre.value && pagingStatus.value.curPage--
    }

    const onClickNext = () => {
      enableNext.value && pagingStatus.value.curPage++
    }

    const onClickItem = (ind: number) => (pagingStatus.value!.curPage !== ind) && (pagingStatus.value!.curPage = ind)

    return {
      totalPageArr,
      curPage,
      enablePre,
      enableNext,
      onClickPre,
      onClickNext,
      onClickItem,
    }
  },
})

</script>
