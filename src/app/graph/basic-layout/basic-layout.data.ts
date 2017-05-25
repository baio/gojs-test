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
        isGroup: true,
        data: {
            layout: {
              row: 1,
              cols: [0, 3]
            },
            label: "g-2",
            isCloseToComplete: false,
            state: "passed"
        }
    }
    /*,
    <any>{
        key: "-3",
        isGroup: true,
        group: "-2",
        data: {
            layout: {
              row: 0,
              cols: [1, 3]
            },
            label: "g-3",
            isCloseToComplete: false,
            state: "passed"
        }
    }*/,
    {
      key: "n-1",
      group: "-1",
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
      key: "n-3",
      group: "-1",
      category: "rect",
      data: {
          layout: {
            row: 1,
            cols: [0, 1]
          },
          state: "passed",
          label: "n-3",
      }
    }/*,
    {
      key: "n-2",
      group: "-2",
      category: "rect",
      data: {
          layout: {
            row: 0,
            cols: [1, 3]
          },
          state: "passed",
          label: "n-2"
      }
    }
    */
  ],
  links: [/*
    {
      from: "n-1",
      to: "n-2",
      data: {
        state: "passed"
      }
    }
  */]
};


