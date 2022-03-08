import {ajax} from "../tools/Ajax";

export function getCategoryCourseCount(){
    return ajax("/api/manager/statistics/category_course_count")
}

export function getUserWeekCount(){
    return ajax("/api/manager/statistics/user_week_count")
}

export function getCommentScoreCount(){
    return ajax("/api/manager/statistics/comment_score_count")
}
