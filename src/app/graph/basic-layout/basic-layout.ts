import * as go from 'gojs';
import * as R from 'ramda';

const settings = {

  unitWidth: 200,
  unitHeight: 50

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

const getNodesFomParts = (parts: go.Iterator<go.Part>) =>
  parts.iterator.filter(n => n instanceof go.Node);

const getChildrenNodes = (group: go.Group) =>
  getNodesFomParts(group.memberParts)

const getSiblingNodes = (node: go.Node) =>
  getNodesFomParts(node.containingGroup ? node.containingGroup.memberParts : node.layer.parts);

const getNodeLayout = (node: go.Node) : NodeLayout =>
  node.data.data.layout

const getGroupHeight = (group: go.Group) => {

    //get group height by calculating height of the children nodes
    //calc each column height and then take ones max height
    let colHeights = {};
    getChildrenNodes(group).each(n => {
      const nl: NodeLayout = n.data.data.layout;
      for(let i = nl.cols[0]; i < nl.cols[1]; i++) {
        //update cols heights for single node
        colHeights[i] = colHeights[i] ? colHeights[i] + n.height : n.height;
      }
    });

    // Get max col height
    return R.pipe(
      R.values,
      R.reduce(R.max, -Infinity)
    )(colHeights);

}

const getNodeTopOffset = (node: go.Node) => {

    //get node top offset by calculating total heights of previous siblings
    //calc each previous row height (by index) and then sum each rows max height
    // then calc total sum
    // !!! Previous rows in the parent group must already be calculated (have activated height)
    const nodeRow = getNodeLayout(node).row;
    let rowHeights = {};
    getSiblingNodes(node)
    .filter((n: go.Node) => getNodeLayout(n).row < nodeRow)
    .each(n => {
      const nl: NodeLayout = n.data.data.layout;
      for(let i = 0; i < nodeRow; i++) {
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

const setGroupPosition = (parent: NodeParams) => (node: go.Node) => {

  if (!parent) {
    //set root group (layout) params (no relative offsets)
    parent = {position: {x: 0, y: 0}, layout: { row: 0, cols: [0, 0] }};
  }

  const parentPosition = parent.position;
  const parentLayout: NodeLayout = parent.layout;

  const nodeLayout: NodeLayout = node.data.data.layout;

  //node's x = container node x position + offset relative to the left border of the container in pixels = (offset in units) * (unit width)
  const x = parentPosition.x + (nodeLayout.cols[0] - parentLayout.cols[0]) * settings.unitWidth;
  //node's y = get total sum of previous rows heights (they must be already calculated)
  const y = getNodeTopOffset(node);

  //set abs position of the node (calculated relatively parent group)
  node.position = new go.Point(x, y);

  //node width = (width in units) * (unit width)
  node.width = (nodeLayout.cols[1] - nodeLayout.cols[0]) * settings.unitWidth;
  //node.height = settings.unitHeight;
  node.resizable = false;

  if (node instanceof go.Group && node.memberParts.count !== 0) {

    const setPosition = setGroupPosition(mapNodeToParams(node));

    getChildrenNodes(node).each(setPosition);

    node.height = getGroupHeight(node);

  } else {

    //If this is NOT group or number of the children nodes is zero, then set this node height to the fixed value
    node.height = settings.unitHeight;
  }

  //set node height with respect of children total height
  //const childrenTotalHeight =


  //console.log("+++", node.height);

  /*
  nodes.forEach((group: go.Group, i) => {

    //calc child nodes positions (relatively to parent nodes)
    const childNodes = group.memberParts.iterator.filter(n => n instanceof go.Node);

    childNodes.each(node =>
      node.position = new go.Point(group.position.x, group.position.y)
    );

  });
  */

  /*
  group.position = new go.Point(i * 200, group.data.data.layout.row * 100);
  group.resizeObject.width = 100;
  group.resizeObject.height = NaN;
  group.resizable = true;

  //calc child nodes positions (relatively to parent nodes)
  const childNodes = group.memberParts.iterator.filter(n => n instanceof go.Node);

  childNodes.each(node =>
    node.position = new go.Point(group.position.x, group.position.y)
  );
  */

}

export class RangeGraphLayout extends go.GridLayout {

  private _doLayout(coll, group: go.Group) {
    // get the Nodes and Links to be laid out
    const parts = this.collectParts(coll);

    //calc root nodes positions
    const setPosition = setGroupPosition(null);

    const nodes = parts.toArray()
      .filter(n => n instanceof go.Node)
      .forEach(setPosition);
  }

  private _doChildsLayout(group: go.Group) {

    //this.diagram.startTransaction("RangeGraphLayout");
    this._doLayout(group.memberParts.iterator, group);
    //this.diagram.commitTransaction("RangeGraphLayout");
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

    console.log("222", nodes.map(x => x.data.data), group.data.data);

    /*
      nodes
      .forEach((node, i) => {
        node.position = new go.Point(i * 200, node.data.data.layout.row * 100);
        node.resizeObject.width = 100;
        node.resizeObject.height = NaN;
        node.resizable = true;
      });
    */

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
