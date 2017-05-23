import { Component, OnInit } from '@angular/core';

import { GraphView } from './gojs.types';
import { create, bind, DiagramConfig } from './gojs-graph';


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

      const diagram: GraphView = {
        summary: {
          passedPoints: 100,
          selectedPoints: 200,
          totalPoints: 300
        },
        nodes: [
          {
            key: "111",
            group: 1,
            category: "rect",
            data: {
                state: "passed",
                label: "xxxxx",
                block: {
                  code: "zzzz",
                  description: "zzzz",
                  points: 100,
                  state: "passed"
              }
            }

          }
        ],
        links: []
      };

      const graph = create("graph_canvas").run(config);
      bind(graph, diagram);
  }

}
