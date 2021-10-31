/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PropOptions, PropType } from 'vue-types/dist/types'
import { rowProps } from '../table_row/types'
type Prop<T, D = T> = PropOptions<T, D> | PropType<T>
type PublicRequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } ? K : never
}[keyof T]

type PublicOptionalKeys<T> = Exclude<keyof T, PublicRequiredKeys<T>>
type InferPropType<T> = T extends null
  ? any // null & true would fail to infer
  : T extends { type: null | true }
    ? any // As TS issue https://github.com/Microsoft/TypeScript/issues/14829 // somehow `ObjectConstructor` when inferred from { (): T } becomes `any` // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
    : T extends ObjectConstructor | { type: ObjectConstructor }
      ? Record<string, any>
      : T extends BooleanConstructor | { type: BooleanConstructor }
        ? boolean
        : T extends Prop<infer V, infer D>
          ? unknown extends V
            ? D
            : V
          : T

// eslint-disable-next-line @typescript-eslint/ban-types
export type IxPublicPropTypes<O> = O extends object
  ? { [K in PublicRequiredKeys<O>]: InferPropType<O[K]> } & { [K in PublicOptionalKeys<O>]?: InferPropType<O[K]> }
  : { [K in string]: any }


export type CellType = 'bodyCell' | 'headCell';

import type { Column } from '../types'

// Props 定义在这里
export const cellProps = {
  dataIndex: {
    type: String,
    default: '',
  },
  value: {
    default: '',
  },
  record: {
    type: Object,
    default: (): any => ({}),
  },
  type: {
    type: String as Prop<CellType>,
    default: 'bodyCell',
  },
  columnCfg: {
    type: Object as Prop<Column>,
    default: ():Column => ({}),
  },
}

export type CellPublicProps = IxPublicPropTypes<typeof cellProps>



