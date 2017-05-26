import * as go from 'gojs';
import * as R from 'ramda';

const settings = {

  unitWidth: 200,
  unitHeight: 50,
  nodeMargin: {
    top: 5,
    bottom: 5,
    right: 5,
    left: 5
  },
  groupPadding: {
    top: 7,
    bottom: 7,
    right: 7,
    left: 7
  }
}

interface NodeLayout {
  //row, relative to parent group
  row: number
  //cols, absolute
  cols: [number, number]
}

interface NodePosition {
  x: number
  y: number
}

interface NodeParams {
  layout: NodeLayout
  position: NodePosition
}

const mapNodeToParams = (node: go.Node) => ({
  position: node.position,
  layout: node.data.data.layout
})

const getNodesFomParts = (parts: go.Iterator<go.Part>) : go.Iterator<go.Node> =>
  <any>parts.iterator.filter(n => n instanceof go.Node);

const getChildrenNodes = (group: go.Group) =>
  getNodesFomParts(group.memberParts)

const getSiblingNodes = (node: go.Node) =>
  getNodesFomParts(node.containingGroup ? node.containingGroup.memberParts : node.layer.parts);

const getNodeLayout = (node: go.Node): NodeLayout =>
  node.data.data.layout

const getGroupHeight = (group: go.Group) => {

  //get group height by calculating height of the children nodes
  //calc each column height and then take ones max height
  let colHeights = {};
  getChildrenNodes(group).each(n => {
    const nl: NodeLayout = getNodeLayout(n);
    for (let i = nl.cols[0]; i < nl.cols[1]; i++) {
      //update cols heights for single node
      //height must be real, whole node size including padding
      colHeights[i] = colHeights[i] ? colHeights[i] + n.height : n.height;
    }
  });

  // Get max col height
  return R.pipe(
    R.values,
    R.reduce(R.max, -Infinity)
  )(colHeights);

}

const getGroupWidth = (group: go.Group) => {

  //get group width by calculating max width of the children rows
  //collect each node lefts and rights, then take min left and max right
  //the diff will be the width of the whole group
  let lefts = [];
  let rights = [];
  getChildrenNodes(group).each(n => {
    lefts.push(n.position.x);
    rights.push(n.position.x + n.width);
  });

  const minLeft =  R.reduce(R.min, Infinity, lefts);
  const maxRight = R.reduce(R.max, -Infinity, rights);

  return maxRight - minLeft;
}

const getNodeTopRelativeOffset = (node: go.Node) => {

  //get node top offset (relative to the group)  by calculating total heights of previous siblings
  //calc each previous row height (by index) and then sum each rows max height
  // then calc total sum
  // !!! Previous rows in the parent group must already be calculated (have activated height)
  const nodeRow = getNodeLayout(node).row;
  let rowHeights = {};
  //console.log("1111", getNodeLayout(node));
  //getSiblingNodes(node).map(getNodeLayout).each(console.log);
  getSiblingNodes(node)
    .filter(n => getNodeLayout(n).row < nodeRow)
    .each(n => {
      const nl: NodeLayout = n.data.data.layout;
      for (let i = 0; i < nodeRow; i++) {
        //get row with max height

        if (!rowHeights[i] || n.height > rowHeights[i]) {
          rowHeights[i] = n.height;
        }
      }
    });

  // Get total rows height
  return R.pipe(
    R.values,
    R.sum
  )(rowHeights);
}

const setNodeMargin = (margin: {top?: number, right?: number, bottom?: number, left?: number}) => (node: go.Node) => {

  const top = margin.top || 0;
  const bottom = margin.bottom || 0;
  const left = margin.left || 0;
  const right = margin.right || 0;

  node.position = new go.Point(node.position.x + left, node.position.y + top);

  node.width = node.width - (left + right);
  node.height = node.height - (top + bottom);

}

const setGroupPadding = (padding: {top?: number, right?: number, bottom?: number, left?: number}) => (node: go.Node) => {

  const top = padding.top || 0;
  const bottom = padding.bottom || 0;
  const left = padding.left || 0;
  const right = padding.right || 0;

  node.position = new go.Point(node.position.x - top, node.position.y - left);

  node.width = node.width + (left + right);
  node.height = node.height + (top + bottom);

}

const getNodeSizeWithPadding = (padding: {top?: number, right?: number, bottom?: number, left?: number}, node: go.Node) => {
  const top = padding.top || 0;
  const bottom = padding.bottom || 0;

  return {height: node.height + (top + bottom), width: node.width};
}


const setGroupPositionAndSize = (parent: NodeParams) => (node: go.Node) => {

  if (!parent) {
    //set root group (layout) params (no relative offsets)
    parent = { position: { x: 0, y: 0 }, layout: { row: 0, cols: [0, 0] } };
  }

  const parentPosition = parent.position;
  const parentLayout: NodeLayout = parent.layout;

  const nodeLayout: NodeLayout = node.data.data.layout;

  //node's x = container node x position + offset relative to the left border of the container in pixels = (offset in units) * (unit width)
  const x = parentPosition.x + (nodeLayout.cols[0] - parentLayout.cols[0]) * settings.unitWidth;
  //node's y = get total sum of group's previous rows heights (they must be already calculated) + parent offset
  const y = getNodeTopRelativeOffset(node) + parentPosition.y;

  //set abs position of the node (calculated relatively parent group)
  node.position = new go.Point(x, y);

  //TODO: calc additional space required for node padding
  //get ancestors count * padding
  //node width = (width in units) * (unit width)
  node.width = (nodeLayout.cols[1] - nodeLayout.cols[0]) * settings.unitWidth;

  //node.width = (nodeLayout.cols[1] - nodeLayout.cols[0]) * settings.unitWidth;
  //node.height = settings.unitHeight;
  node.resizable = false;

  if (node instanceof go.Group && node.memberParts.count !== 0) {

    //func to calc position and width of children nodes
    const setPosition = setGroupPositionAndSize(mapNodeToParams(node));

    //set children nodes positions and size
    getChildrenNodes(node).each(setPosition);

    //set group height by calculating height of the children nodes
    node.height = getGroupHeight(node);

    setGroupPadding(settings.groupPadding)(node);

    //after node height is calculated, modify children nodes height according to paddings
    //getChildrenNodes(node).each(setNodeMargin(settings.nodeMargin));

  } else {

    //If this is NOT group or number of the children nodes is zero, then set this node height to the fixed value
    node.height = settings.unitHeight;
  }
}

export class RangeGraphLayout extends go.GridLayout {

  private _doLayout(coll, group: go.Group) {

    // get layout root nodes
    const parts = this.collectParts(coll).toArray().filter(n => n instanceof go.Node);

    //func to calc root nodes positions
    const setPosition = setGroupPositionAndSize(null);

    parts.forEach(setPosition);
  }

  private _doChildsLayout(group: go.Group) {

    this.diagram.startTransaction("RangeGraphLayout");
    this._doLayout(group.memberParts.iterator, group);
    this.diagram.commitTransaction("RangeGraphLayout");
  }

  public doLayout(coll) {
    //super.doLayout(coll);
    this._doLayout(coll, this.group);
    //super.doLayout(coll);
  }
}


export class RangeGroupLayout extends go.GridLayout {

  private _doLayout(coll, group: go.Group) {

    // get the Nodes and Links to be laid out
    const parts = this.collectParts(coll);

    let nodes = parts.toArray()
      .filter(n => n instanceof go.Node);

  }

  private _doChildsLayout(group: go.Group) {

    this.diagram.startTransaction("RangeGroupLayout");
    this._doLayout(group.memberParts.iterator, group);
    this.diagram.commitTransaction("RangeGroupLayout");
  }

  public doLayout(coll) {

    //super.doLayout(coll);
    this._doLayout(coll, this.group);

  }
}

