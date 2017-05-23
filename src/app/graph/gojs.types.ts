export type BlockState = "passed" | "enabled" | "disabled" | "active";

export interface BlockData {
    code: string
    description: string
    points: number
    state: BlockState
}

export interface GroupView {
    key: number
    isGroup: boolean
    data: {
        label: string
        isCloseToComplete: boolean
        state: "passed" | "enabled" | "disabled"
    }
}

export type NodeViewCategory = "rect" | "rrect" | "circle";

export interface NodeView {
    key: string
    group: number
    category: NodeViewCategory
    data: {
        state: BlockState,
        label: string,
        block: BlockData,
    }
}

export interface LinkView {
    from: string
    to: string
    data: {
        state: BlockState
    }
}

export interface GraphSummaryView {
    passedPoints: number
    selectedPoints: number
    totalPoints: number
}

export interface GraphView {
    nodes: (NodeView|GroupView)[]
    links: LinkView[]
}

