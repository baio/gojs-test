import { GraphView } from './basic-layout.types';

/*
[
  [][]
]
*/

export const diagram: GraphView = {
  nodes: [

    <any>{
        key: "-1",
        isGroup: true,
        data: {
            layout: {
              row: 0,
              cols: [0, 2]
            },
            label: "g-1",
            isCloseToComplete: true,
            state: "passed"
        }
    },
    <any>{
        key: "-2",
        group: "-1",
        isGroup: true,
        data: {
            layout: {
              row: 0,
              cols: [0, 1]
            },
            label: "g-3",
            isCloseToComplete: false,
            state: "passed"
        }
    },
    <any>{
        key: "-3",
        group: "-1",
        isGroup: true,
        data: {
            layout: {
              row: 0,
              cols: [1, 2]
            },
            label: "g-3",
            isCloseToComplete: false,
            state: "passed"
        }
    }
  ],
  links: [/*
    {
      from: "n-1",
      to: "n-2",
      data: {
        state: "passed"
      }
    }*/
  ]
};


