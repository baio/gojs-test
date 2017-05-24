import { AcademicRoadMap } from './iot-layout.domain-types';

export const diagram: AcademicRoadMap = {
  academicYears: [
    {
      id: "y-0",
      name: "Год 1",
      academicTerms: [
        {
          id: "t-0-0",
          name: "Семестр 1",
          courses: [
            {
              id: "c-0-0-0",
              name: "string",
              kind: "Course",
              points: 100,
              coursesNumber: 100,
              courseUnitsNumber: 100,
              courseUnitsPoints: 100,
              isAlert: true,
              manager: {
                id: "1",
                name: "manager"
              },
              children: []
            }
          ]
        },
        {
          id: "t-0-1",
          name: "Семестр 2",
          courses: [
            {
              id: "c-0-1-0",
              name: "string",
              kind: "Course",
              points: 100,
              coursesNumber: 100,
              courseUnitsNumber: 100,
              courseUnitsPoints: 100,
              isAlert: true,
              manager: {
                id: "1",
                name: "manager"
              },
              children: []
            }
          ]
        }
      ]
    }
  ]
};


