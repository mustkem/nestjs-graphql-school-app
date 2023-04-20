import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { LessonType } from "./lesson.type";
import { LessonService } from "./lesson.service";
import { CreatLessonInput } from './lesson.input'
import { AssignStudentsToLessonInput } from "./assign-student-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { StudentService } from "src/student/student.service";


@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService

    ) { }

    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string
    ) {
        this.lessonService.getLesson(id)
    }

    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getLessons()
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreatLessonInput,

    ) {
        return this.lessonService.createLesson(createLessonInput)
    }

    @Mutation(returns => LessonType)
    assingStudentsToLesson(@Args("assignStudentsToLessonInput") assingStudentsToLessonInput: AssignStudentsToLessonInput) {
        const { lessonId, studentIds } = assingStudentsToLessonInput

        this.lessonService.assignStudentsToLesson(lessonId, studentIds)
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return this.studentService.getmanyStudents(lesson.students)
    }

} 