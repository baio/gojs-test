import * as T from '../gojs.types';

export type BlockState = "passed" | "enabled" | "disabled" | "active";

export interface BlockData {
    code: string
    description: string
    points: number
    state: BlockState
}

export interface GroupData {
    code: string
    description: string
    points: number
    state: BlockState
}

export interface NodeData {
    state: BlockState,
    label: string,
    block: BlockData
}

export interface LinkData {
    state: BlockState
}

export type GroupView = T.GroupView<GroupData>;

export type NodeCategory = "rect" | "rrect" | "circle";

export type NodeView = T.NodeView<NodeData, NodeCategory>;

export type LinkView = T.LinkView<LinkData>;

export type GraphView = T.GraphView<NodeView, GroupView, LinkView>;