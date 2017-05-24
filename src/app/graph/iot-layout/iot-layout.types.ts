import * as T from '../gojs.types';
import * as DT from './iot-layout.domain-types';

export interface YearGroupData extends DT.Entry {
    kind: "YearGroupData"
}

export interface TermGroupData extends DT.Entry {
    kind: "TermGroupData"
}

export interface CourseGroupData extends DT.CourseBase {
    kind: "CourseGroupData"
}

export type GroupData =
    YearGroupData
    | TermGroupData
    | CourseGroupData;

export type NodeData = DT.CourseUnit;

export type LinkData = DT.LinkStatus;

export type GroupView = T.GroupView<GroupData>;

export type NodeView = T.NodeView<NodeData, "rect">;

export type LinkView = T.LinkView<LinkData>;

export type GraphView = T.GraphView<NodeView, GroupView, LinkView>;