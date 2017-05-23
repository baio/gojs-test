export interface GroupView<T> {
    key: string
    isGroup: true
    data: T
}

export interface NodeView<T, C> {
    key: string
    group: number
    category: C
    data: T
}

export interface LinkView<T> {
    from: string
    to: string
    data: T
}

export interface GraphView<N extends NodeView<any, any>, G extends GroupView<any>, L extends LinkView<any>>  {
    nodes: (N|G)[]
    links: L[]
}

