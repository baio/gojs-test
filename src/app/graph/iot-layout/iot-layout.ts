import * as go from 'gojs';
import * as R from 'ramda';
import * as T from './iot-layout.types';

const $ = go.GraphObject.make;  // for conciseness in defining templates
declare var require;
//const Reader = require('ramda-fantasy').Reader;
import { Reader } from 'ramda-fantasy';


/*
http://modeuswiki.custis.ru/Modeus/%D0%9C%D0%B0%D0%BA%D0%B5%D1%82_UI_%22%D0%9F%D0%BB%D0%B0%D0%BD_%D1%80%D0%B5%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8_%D0%9E%D0%9F_2%22#.D0.9C.D0.BE.D0.B4.D0.B5.D0.BB.D0.B8.D1.80.D0.BE.D0.B2.D0.B0.D0.BD.D0.B8.D0.B5_.D0.98.D0.9E.D0.A2

*/

export interface EntyColors {
  fill: string
  text: string
  border: string
}

export interface StateColors<T> {
  passed: T
  enabled: T
  disabled: T
  active?: T
}

export type EntyStateColors = StateColors<EntyColors>;
export type SimpleStateColors = StateColors<string>;

export interface DiagramConfig {
  onGroupCollapse: Function
  onObjectSingleClicked: Function
  linkDashedStyle: number[]// [12, 5]
  linkColors: SimpleStateColors
  groupColors: EntyStateColors
  nodeColors: EntyStateColors
}

const getEntyColor = R.curry((colors: EntyStateColors, type: "fill"|"text"|"border", enty: any) : string =>
  colors[enty.data.state][type]
)

const getSimpleColor = R.curry((colors: SimpleStateColors, enty: any) : string =>
  colors[enty.data.state]
)

const nodeContent = Reader((env: DiagramConfig) =>
    $(go.TextBlock,
        {
          margin: 3,
          row: 1,
          column: 1,
          maxSize: new go.Size(200, NaN)
        },  // some room around the text
        new go.Binding("text", "", ({data: {label}}) => label),
        new go.Binding("stroke", "", getEntyColor(env.nodeColors, "text"))
    )
)

const chainContent = f =>
  nodeContent.chain(content => Reader(env => f(env, content)))


const rectNode = chainContent((env: DiagramConfig, content) =>  $(go.Node, "Auto",
        $(go.Shape, {
            geometryString: "F M 0 0, 150 0, 155 50, 150 100, 0 100, 0 0",
            strokeWidth: 1
          },
          new go.Binding("stroke", "", getEntyColor(env.nodeColors, "border")),
          new go.Binding("fill", "", getEntyColor(env.nodeColors, "fill")),
        ),
        content
      )
)

const roundRectNode = chainContent((env: DiagramConfig, content) =>  $(go.Node, "Auto",  // the Shape will go around the TextBlock
        $(go.Shape, "RoundedRectangle", {
           strokeWidth: 1
          },
          new go.Binding("stroke", "", getEntyColor(env.nodeColors, "border")),
          new go.Binding("fill", "", getEntyColor(env.nodeColors, "fill"))
        ),
        content
      )
)

const circleNode =
  chainContent((env: DiagramConfig, content) => $(go.Node, "Vertical",
      $(go.Shape, "Ellipse",{
          width: 40,
          height: 40,
          portId: "",
          fromSpot: go.Spot.Right,
          toSpot: go.Spot.Left
        },
        new go.Binding("stroke", "", getEntyColor(env.nodeColors, "border")),
        new go.Binding("fill", "", getEntyColor(env.nodeColors, "fill"))
      ),
      content
    )
  )

const nodeTemplateMap =
  Reader.of(rect => rrect  => circle => {
    const templmap = new go.Map("string", go.Node);
    templmap.add("rect", rect);
    templmap.add("rrect", rrect);
    templmap.add("circle", circle);
    return templmap;
  })
  .ap(rectNode)
  .ap(roundRectNode)
  .ap(circleNode)

export type NodeCategories = "rect" | "rrect" | "circle";

//const dashedStyleParams = [12, 5];

const linkTemplate = Reader((env: DiagramConfig) =>
      $(go.Link, {
        selectable: true,
      },
        $(go.Shape,
          {
            strokeWidth: 1,
            strokeDashArray: env.linkDashedStyle
          },
          new go.Binding("strokeDashArray", "dash"),
          new go.Binding("stroke", "", getSimpleColor(env.linkColors))
        ),
        $(go.Shape,  // arrowhead
          { toArrow: "Triangle", stroke: null, scale: 1 },
          new go.Binding("fill", "", getSimpleColor(env.linkColors))
        )
      )
)

const groupTemplate = Reader((env: DiagramConfig) =>
  $(go.Group, "Auto",
      {
        selectable: true,
        layout: $(go.TreeLayout, { nodeSpacing: 3 }),
        subGraphExpandedChanged: env.onGroupCollapse || null,
        isSubGraphExpanded: false
      },
      $(go.Shape, "Rectangle",
        {
          fill: "white"
        },
        new go.Binding("stroke", "", getEntyColor(env.groupColors, "border")),
      ),
      $(go.Panel, "Vertical", // position header above the subgraph
          { defaultAlignment: go.Spot.Left, margin: 0 },
          $(go.Panel, "Horizontal", // the header
            {
              alignment: go.Spot.Top,
              stretch: go.GraphObject.Fill
            },
            $("SubGraphExpanderButton", { alignment: go.Spot.Left }),
            $(go.TextBlock,
              {
                font: "14px Sans-Serif",
                margin: 4
              },
              new go.Binding("text", "", x =>
                x.data.isCloseToComplete ? x.data.label + " [^] " : x.data.label
              ),
              new go.Binding("stroke", "", getEntyColor(env.groupColors, "text")),
            ),
            new go.Binding("background", "", getEntyColor(env.groupColors, "fill"))
          ),
          $(go.Placeholder, { padding: 10 })
      )
    )
)

const diagram = (selector: string) => Reader((env: DiagramConfig) =>
    $(go.Diagram, selector,  // create a Diagram for the DIV HTML element
        {
            initialAutoScale: go.Diagram.UniformToFill,
            layout: $(go.LayeredDigraphLayout),
            "animationManager.isEnabled": false,
            "undoManager.isEnabled": false,
            ObjectSingleClicked: env.onObjectSingleClicked || null
        }
    )
)

export const create = (selector: string) : Reader => {

    return Reader.of(drm => nodeTemplateMap => linkTemplate => groupTemplate => {
      drm.nodeTemplateMap = nodeTemplateMap;
      drm.linkTemplate = linkTemplate;
      drm.groupTemplate = groupTemplate;
      return drm;
    })
    .ap(diagram(selector))
    .ap(nodeTemplateMap)
    .ap(linkTemplate)
    .ap(groupTemplate)
}


export const bind = (diagram: any, graph: T.GraphView) => {

    if (diagram.model.nodeDataArray.length > 0) {

      const model = diagram.model;
      model.startTransaction("update");

      const nodesData = model.nodeDataArray;
      const linksData = model.linkDataArray;

      nodesData.forEach(n => {
        const node = graph.nodes.find(x => x.key === n.key);
        if (!R.equals(n.data, node.data)) {
          model.setDataProperty(n, "data", node.data);
        }
      });
      linksData.forEach(l => {
        const link = graph.links.find(x => x.from === l.from && x.to === l.to);
        if (!R.equals(l.data, link.data)) {
          model.setDataProperty(l, "data", link.data);
        }
      });
      model.commitTransaction("update");

    }
    else {
      diagram.model = new go.GraphLinksModel(graph.nodes, graph.links);
    }

}

export const update = (diagram: any, model: T.GraphView) => {
    //diagram.clear();
    //diagram.model = new go.GraphLinksModel(model.nodes, model.links);
    console.log(diagram.model);
}