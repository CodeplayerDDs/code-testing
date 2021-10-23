/**
 * Created by uedc on 2021/10/11.
 */

import { computed, defineComponent, watch, toRef, ref } from '@vue/composition-api'
import { tableProps } from './types'

import './table.less';

export default defineComponent({
  name: 'Table',
  props: tableProps,
  data () {
    return {
      showedData: [],
      curPage: 0,
      totalPage: 0,
      pageSize: 20
    }
  },
  setup(props) {
    // const table = getCurrentInstance()
    const data = toRef(props, 'data')
    let curPage = ref(0),
      totalPage = ref(0),
      pageSize = ref(20),
      startInd = ref(0),
      showedData = ref([]);

    let sortProp = ref(''),
        sortType = ref('0');

    // 不支持跨页选中
    let checkedList = ref([]);

    let chekedHeadStatus = computed(()=> {
      let count = checkedList.value?.length;

      if (count === showedData.value.length) {
        return 'checked';
      }

      if (!checkedList.value?.length) {
        return '';
      }

      return 'half-checked';
    });

    if (!data.value || !data.value.length) {
      totalPage.value = 0;
      curPage.value = 0;
      return;
    }

    let isMore = data.value.length % pageSize.value > 0;
    totalPage.value = Math.floor(data.value.length / pageSize.value) + (isMore ? 1 : 0);
    curPage.value === 0 && (curPage.value = 1);

    watch(data, (newV) => {
      if (!newV || !newV.length) {
        totalPage.value = 0;
        curPage.value = 0;
        return;
      }

      let isMore = newV.length % pageSize.value > 0;
      totalPage.value = Math.floor(newV.length / pageSize.value) + (isMore ? 1 : 0);
      curPage.value === 0 && (curPage.value = 1);
    }, {
      deep: true,
      immediate: true
    })

    let enablePre = computed(() =>curPage.value > 1);
    let enableNext = computed(() =>curPage.value < totalPage.value);

    watch(curPage, (newV) => {
      startInd.value = (curPage.value - 1) * pageSize.value;
      let endInd = Math.min(startInd.value + pageSize.value, data.value.length);
      showedData.value = data.value.slice(startInd.value, endInd);
    }, {
      immediate: true,
      deep: true
    })

    const { columns, registryColumn } = useColumns()

    if (props.enableMultiCheck) {
      registryColumn({
        type: 'check'
      })
    }

    if (props.enableLocalPaging) {

    }

    columns.value.push.apply(columns.value, props.columns)

    return () => {
      const TYPE = {
        check: {
          title: (<div class={['table-checkbox', chekedHeadStatus.value]} onclick={()=>console.log('clickHead')}></div>),
          template: (<div class="table-checkbox" onclick={()=>console.log('clickRow')}></div>)
        },
        index: {
          title: '序号'
        }
      }

      const SORT_TEXT = {
        0: '自然',
        1: '正序',
        2: '倒序'
      }

      function onClickHeadSort(e:Event, sortKey, sortFn) {
        // 选中新的列排序后从自然状态开始
        if (sortProp.value !== sortKey) {
          sortProp.value = sortKey;
          sortType.value = '0';
        };

        sortType.value = '' + ((parseInt(sortType.value) + 1) % 3);

        // 回到不排序状态
        if (sortType.value === '0') {
          let endInd = Math.min(startInd.value + pageSize.value, data.value.length);
          showedData.value = data.value.slice(startInd.value, endInd);
          return;
        }

        let curdata = showedData.value;

        curdata.sort(function(b, a) {
          a = a[sortProp.value];
          b = b[sortProp.value];

          if (!sortFn) {
            if (sortType.value === '1') {
              if (b === a) {
                return 0;
              }
              return b > a ? 1 : -1;
            } else {
              if (b === a) {
                return 0;
              }
              return b < a ? 1 : -1;
            }
          }

          if (sortType.value === '1') {
            return sortFn(a, b);
          } else {
            return sortFn(b, a);
          }
        });

        showedData.value = curdata;
      }

      function onClickCheck(e:Event, row) {
        // 是否选中以数据为准，不以样式为准
        let ind = checkedList.value.indexOf(row);
        if (ind > -1) { // 反选
          checkedList.value.splice(ind, 1);
          return;
        }

        //如果已选列表里没有,则是选中
        checkedList.value.unshift(row);
      }

      function onClickHeadCheck() {

        // 全选
        if (checkedList.value.length !== showedData.value.length) {
          checkedList.value = showedData.value;
          return;
        }

        // 清空
        checkedList.value = [];
      }

      let curType;
      return (
        <div>
          <table class="test-table">
            <thead>
              <tr>
                {
                  columns.value.map(col => {
                    curType = TYPE[col.type];
                    if (curType) {
                      if (col.type === 'check') {
                        return <th rowspan="1" colspan="1" class={['table-head_check']} onClick={onClickHeadCheck}>{curType.title}</th>;
                      }
                      return <th rowspan="1" colspan="1">{curType.title}</th>;
                    }

                    return (<th rowspan="1" colspan="1">
                      {col.title}
                      {col.enableSort &&
                        (<span
                          class="table-head_sort"
                          onClick={(e)=>onClickHeadSort(e, col.dataIndex, col.sortFn)}>
                            {col.dataIndex === sortProp.value ? SORT_TEXT[sortType.value] : '自然'}
                        </span>)
                      }
                    </th>);
                  })
                }
              </tr>
            </thead>
            <tbody>
              {showedData.value.map((row, ind) => {
                let rowHtml = columns.value.map((col) => {
                  if (col.type === 'index') {
                    return <td class="table-cell">{startInd.value + ind + 1}</td>;
                  }

                  if (col.type === 'check') {
                    return <td class="table-cell" rowspan="1" colspan="1"><div class={['table-checkbox', checkedList.value.includes(row) && 'checked']} onClick={(e)=>onClickCheck(e, row)}></div></td>
                  }

                  return <td class="table-cell" rowspan="1" colspan="1">{row[col.dataIndex] || '-'}</td>;
                })

                return <tr class="table-row">{rowHtml}</tr>
              })}
            </tbody>
          </table>

          <div class="table-paging-bar" v-if={props.enableLocalPaging}>
            <span class={['paging-btn', !enablePre.value && 'disabled']} onClick={()=>enablePre.value && curPage.value--}>{'<上一页'}</span>
            <div class="paging-item_wrapper">
              {new Array(totalPage.value).fill(0).map((v, ind) => {
                return (<span class={['paging-item', curPage.value === ind + 1 && 'activated']}>{ind + 1}</span>);
              })}
            </div>
            <span class={['paging-btn', !enableNext.value && 'disabled']} onClick={()=>enableNext.value && curPage.value++}>{'下一页>'}</span>
          </div>
        </div>
      )
    }
  },
})

function useColumns() {
  const columns = ref([])
  function registryColumn(column) {
    columns.value.push(column)
  }

  return {
    columns,
    registryColumn
  }
}