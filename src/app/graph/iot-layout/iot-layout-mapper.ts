import * as DT from './iot-layout.domain-types';
import * as T from './iot-layout.types';
import * as R from 'ramda';

const mapCourseUnit = (course: DT.Course) => (courseUnit: DT.CourseUnit) : T.NodeView[] => [
  {
    key: courseUnit.id,
    category: "rect",
    group: course.id,
    data: R.omit(["children", "kind"]),
  }
]

const mapCourse = (course: DT.Course) : (T.GroupView|T.NodeView)[] => [
  {
    key: course.id,
    isGroup: true,
    data: R.pipe(
      R.omit(["children"]),
      R.assoc("kind", "CourseGroupData")
    )(course)
  },
  ...R.map(R.ifElse(R.propEq("kind", "Course"), mapCourse, mapCourseUnit), course.children)
]

const mapTerm = (term: DT.AcademicTerm) : (T.GroupView|T.NodeView)[] => [
  {
    key: term.id,
    isGroup: true,
    data: R.pipe(
      R.omit(["courses"]),
      R.assoc("kind", "TermGroupData")
    )(term)
  },
  ...R.map(mapTerm, term.courses)
]

const mapYear = (year: DT.AcademicYear) : (T.GroupView|T.NodeView)[] => [
  {
    key: year.id,
    isGroup: true,
    data: R.pipe(
      R.omit(["academicTerms"]),
      R.assoc("kind", "YearGroupData")
    )(year)
  },
  ...R.map(mapTerm, year.academicTerms)
]

export const map = (src: DT.AcademicRoadMap) : T.GraphView => {

  return null;
}