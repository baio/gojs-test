import { GraphView } from './basic-layout.types';

export const diagram: GraphView = {
  nodes: [

    <any>{
        key: "-1",
        isGroup: true,
        data: {
            layout: {
              row: 0,
              cols: [0, 1]
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
    {
      key: "n-1",
      group: "-2",
      category: "rect",
      data: {
          layout: {
            row: 0,
            cols: [0, 1]
          },
          state: "passed",
          label: "n-1",
      }
    },
    {
      key: "n-2",
      group: "-2",
      category: "rect",
      data: {
          layout: {
            row: 1,
            cols: [0, 1]
          },
          state: "passed",
          label: "n-2"
      }
    },
    {
      key: "n-3",
      group: "-2",
      category: "rect",
      data: {
          layout: {
            row: 0,
            cols: [1, 2]
          },
          state: "passed",
          label: "n-3",
      }
    }
    /*,
    {
      key: "n-4",
      group: "-3",
      category: "rect",
      data: {
          layout: {
            row: 1,
            cols: [1, 2]
          },
          state: "passed",
          label: "n-4",
      }
    }
  */],
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


