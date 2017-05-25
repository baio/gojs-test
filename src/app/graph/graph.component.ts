import { Component, OnInit } from '@angular/core';

import { GraphView, GroupView } from './basic-layout/basic-layout.types';
import { create, bind, DiagramConfig } from './basic-layout/basic-scheme';
import { diagram } from './basic-layout/basic-layout.data';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {

      const config: DiagramConfig = {
        onGroupCollapse: () => {},
        onObjectSingleClicked: () => {},
        linkDashedStyle:  [12, 5],
        linkColors: {
          passed: "black",
          enabled: "black",
          disabled: "black"
        },
        groupColors: {
          passed: { border: "#f8d58c", text: "#a8863b", fill: "#fceed1" },
          disabled: { border: "#6b6b6b", text: "#838383", fill: "#dadada" },
          enabled: { border: "#f8d58c", text: "#a8863b", fill: "#fceed1" }
        },
        nodeColors: {
          passed: {
            fill: "white",
            text: "black",
            border: "black"
          },
          enabled: {
            fill: "white",
            text: "black",
            border: "black"
          },
          disabled: {
            fill: "white",
            text: "black",
            border: "black"
          }
        }
      };


      const graph = create("graph_canvas").run(config);
      bind(graph, diagram);
  }

}
