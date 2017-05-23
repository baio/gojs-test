import { GraphView } from './release-plan-graph-layout.types';

export const diagram: GraphView = {
  nodes: [
    <any>{
        key: "-1",
        isGroup: true,
        data: {
            label: "111",
            isCloseToComplete: true,
            state: "passed"
        }
    },
    <any>{
        key: "-2",
        isGroup: true,
        data: {
            label: "222",
            isCloseToComplete: false,
            state: "active"
        }
    },
    {
      key: "111",
      group: "-1",
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
    },
    {
      key: "2222",
      group: "-2",
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


