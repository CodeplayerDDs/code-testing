/**
 * Created by uedc on 2021/10/11.
 */

import { computed, defineComponent, watch, toRef } from '@vue/composition-api'
import { TablePublicProps, tableProps } from './types'

export default defineComponent({
  name: 'Table',
  props: tableProps,
  data () {
    return {
      _data: null
    }
  },
  setup(props, { slots }) {
    const classes = useClasses(props)
    const data = toRef(props, 'data')

    watch (data, (newV) => {
      updateData(data);
    })

    updateData(data);

    return () => {
      debugger
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Header content 1</th>
                <th>Header content 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Body content 1</td>
                <td>Body content 2</td>
              </tr>
            </tbody>

          </table>
          <p class={classes.value}>Hello World. {slots?.default?.()}</p>
        </div>
      )
    }
  },
})

function updateData (data) {

}

function useClasses (props: TablePublicProps) {
  return computed(() => {
    return {
      'test-class': props.test,
    }
  })
}
