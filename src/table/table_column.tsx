/**
 * Created by uedc on 2021/10/11.
 */

import { computed, defineComponent } from '@vue/composition-api'
import { TablePublicProps, tableProps } from './types'

export default defineComponent({
  name: 'Table',
  props: {
    title: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    sortAble: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    return () => {
      return (
        <template>

          {{
            default: () =>
          }}
        </template>
      )
    }
  },
})
