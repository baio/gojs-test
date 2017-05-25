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
              row: 0,
              cols: [1, 2]
            },
            label: "g-2",
            isCloseToComplete: false,
            state: "passed"
        }
    },
    {
      key: "n-1",
      group: "-1",
      category: "rect",
      data: {
          state: "passed",
          label: "n-1",
          block: {
            code: "n-1",
            description: "zzzz",
            points: 100,
            state: "passed"
        }
      }
    },
    {
      key: "n-2",
      group: "-2",
      category: "rect",
      data: {
          state: "passed",
          label: "n-2",
          block: {
            code: "n-2",
            description: "zzzz",
            points: 100,
            state: "passed"
        }
      }

    }

  ],
  links: [
    {
      from: "n-1",
      to: "n-2",
      data: {
        state: "passed"
      }
    }
  ]
};


