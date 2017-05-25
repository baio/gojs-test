import * as go from 'gojs';

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
  //node's y =  container node y position + offset relative to the top ((row index) * (unit height))
  const y = parentPosition.y + (nodeLayout.row * settings.unitHeight);
  //set abs position of the node (calculated relatively parent group)
  node.position = new go.Point(x, y);

  //node width = (width in units) * (unit width)
  node.width = (nodeLayout.cols[1] - nodeLayout.cols[0]) * settings.unitWidth;
  node.height = settings.unitHeight;
  node.resizable = false;

  console.log("===", nodeLayout, node.position)

  if (node instanceof go.Group) {

    const setPosition = setGroupPosition(mapNodeToParams(node));
    node.memberParts.iterator.filter(n => n instanceof go.Node).each(setPosition);
  }

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
