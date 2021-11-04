/*
 * @Author: your name
 * @Date: 2021-11-01 13:47:44
 * @LastEditTime: 2021-11-04 10:42:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code-testing\src\table\types.ts
 */
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

/** 内置列的设置 */
export interface InnerColumn {
  type: 'index' | 'check'
}

/** 客户列的设置 */
export interface ColumnCfg<TRecord> {
    title?: string
    dataIndex: string
    enableSort?: boolean
    sortFn?: sortFnType<TRecord>
}

/** 列设置 */
export type Column<TRecord> = Partial<ColumnCfg<TRecord> & InnerColumn>

/** 分页相关配置 */
export interface PagingCfg {
  pageSize: number
}

export const DEFAULT_PAGING_SIZE = 20

/** 分页相关状态集合 */
export interface PagingStatus {
  pageSize: number
  totalPage: number
  curPage: number
  startInd: number
}

export type sortFnType<TRecord> = (b: TRecord, a: TRecord) => -1 | 0 | 1

/** 排序方式 */
export const enum SortDir {
  /** 原始数据，没有排序 */
  none = 0,
  /** 升序 */
  desc,
  /** 倒序 */
  asc,
}

export const SortDirTextMap = {
  [SortDir.none]: '原始',
  [SortDir.desc]: '升序',
  [SortDir.asc]: '倒序',
}

/** 排序相关配置项 */
export interface SortCfg {
  /** 默认排序字段 */
  defaultSortKey?: string
  /** 默认人排序顺序 */
  defaultSortDir: SortDir
}

/** 排序相关状态集合 */
export interface SortStatus {
  /** 当前排序字段 */
  sortKey?: string
  /** 当前排序方式 */
  sortDir: SortDir
  /** 原始未排序数据 */
  readonly unsortedData?: any[]
}

// Props 定义在这里
export const tableProps = {
  enableMultiCheck: {
    type: Boolean,
    default: false,
  },
  originData: {
    type: Array,
    default: (): any[] => [],
  },
  columns: {
    type: Array as PropType<Column<any>[]>,
    default: (): Column<any>[] => ([]),
  },
  enableLocalPaging: {
    type: Boolean,
    default: true,
  },
  pagingCfg: {
    type: Object as PropType<PagingCfg>,
    default: ():PagingCfg => ({
      pageSize: DEFAULT_PAGING_SIZE,
    }),
  },
  sortCfg: {
    type: Object as PropType<SortCfg>,
    default: (): SortCfg => ({
      defaultSortDir: SortDir.desc,
    }),
  },
}

export type TablePublicProps = IxPublicPropTypes<typeof tableProps>
