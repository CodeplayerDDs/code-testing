/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PropOptions, PropType } from 'vue-types/dist/types'
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


export interface InnerColumn {
  type: 'index' | 'check'
}

export interface ColumnCfg {
    title?: string
    dataIndex: string
    enableSort?: boolean
}

export type Column = Partial<ColumnCfg> & Partial<InnerColumn>

export interface PagingCfg {
  pageSize: number
}

export interface PagingStatus {
  pageSize: number
  totalPage: number
  curPage: number
  startInd: number
}

// Props 定义在这里
export const tableProps = {
  test: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  enableMultiCheck: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array,
    default: (): any[] => [],
  },
  columns: {
    type: Array as PropType<(InnerColumn | ColumnCfg)[]>,
    default: ():(InnerColumn | ColumnCfg)[] => ([]),
  },
  enableLocalPaging: {
    type: Boolean,
    default: true,
  },
  pagingCfg: {
    type: Object as PropType<PagingCfg>,
    default: ():PagingCfg => ({
      pageSize: 20,
    }),
  },
  defaultSortKey: {
    type: String,
    default: '',
  },
}

export type TablePublicProps = IxPublicPropTypes<typeof tableProps>
