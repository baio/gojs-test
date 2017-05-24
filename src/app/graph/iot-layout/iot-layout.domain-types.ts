export interface Entry {
  id: string
  name: string
}

export interface CourseUnit extends Entry {
  kind: "CourseUnit"
  points: number
  isAlert: boolean
}

export interface CourseBase extends Entry {
  points: number
  coursesNumber: number
  courseUnitsNumber: number
  courseUnitsPoints: number
  isAlert: boolean
  manager: {
    id: string
    name: string
  } | null
}

export interface Course extends CourseBase {
  kind: "Course"
  children: (Course|CourseUnit[])
}

export type LinkStatus = "normal" | "alert" | "dotted";

export interface Links {
  from: string
  to: string
  status: LinkStatus
}

export interface AcademicTerm extends Entry {
  courses: Course[]
}

export interface AcademicYear extends Entry {
  academicTerms: AcademicTerm[]
}

export interface AcademicRoadMap {
  academicYears: AcademicYear[]
}