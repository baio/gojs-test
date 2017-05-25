import * as go from 'gojs';

export class RangeGraphLayout extends go.GridLayout {

  private _doLayout(coll, group: go.Group) {
    // get the Nodes and Links to be laid out
    const parts = this.collectParts(coll);

    const nodes = parts.toArray()
      .filter(n => n instanceof go.Node);

    console.log("111", nodes.map(x => x.data.data));

      nodes
      .forEach((group: go.Group, i) => {
        group.position = new go.Point(i * 200, group.data.data.layout.row * 100);
        group.resizeObject.width = 100;
        group.resizeObject.height = NaN;
        group.resizable = true;

        const childNodes = group.memberParts.iterator.filter(n => n instanceof go.Node);

        console.log("+++", nodes.map(x => x.data.data));

        childNodes.each(node =>
          node.position = new go.Point(group.position.x, group.position.y)
        );

      });

  }

  private _doChildsLayout(group:go.Group){

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

  private _doChildsLayout(group:go.Group){

    this.diagram.startTransaction("RangeGroupLayout");
    this._doLayout(group.memberParts.iterator, group);
    this.diagram.commitTransaction("RangeGroupLayout");
  }

  public doLayout(coll) {

    super.doLayout(coll);
    this._doLayout(coll, this.group);

  }
}
