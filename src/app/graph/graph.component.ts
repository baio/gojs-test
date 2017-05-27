import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { GraphView, GroupView } from './basic-layout/basic-layout.types';
import { create, bind, DiagramConfig } from './basic-layout/basic-scheme';

const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements AfterViewInit {

  public id: string;

  constructor() {

    this.id = guid();

  }

  @Input() size: { width: number; height: number };
  @Input() view: GraphView;

  ngAfterViewInit() {

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

      const graph = create(this.id).run(config);
      bind(graph, this.view);
  }

}
