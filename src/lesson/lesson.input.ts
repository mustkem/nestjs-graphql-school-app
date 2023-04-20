import { Field, ID, InputType } from "@nestjs/graphql";
import { MinLength, IsDateString, isUUID, IsUUID } from 'class-validator'


@InputType()
export class CreatLessonInput {

    @MinLength(1)
    @Field()
    name: string

    @IsDateString()
    @Field()
    startDate: string

    @IsDateString()
    @Field()
    endDate: string

    @IsUUID('4', { each: true })
    @Field(type => [ID], { defaultValue: [] })
    students: string[]

}