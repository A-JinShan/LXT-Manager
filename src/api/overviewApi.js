
import {ajax} from "../tools/Ajax"

export function getUserData(){
   return ajax("/api/manager/over_view/ov_user")
}

export function getTeacherData(){
    return ajax("/api/manager/over_view/ov_teacher")
}

export function getCourseData(){
    return ajax("/api/manager/over_view/ov_course")
}

export function getArticleData(){
    return ajax("/api/manager/over_view/ov_article")
}

export function getCommentDataWithScore(score){
    return ajax("/api/manager/over_view/ov_comment",{score})
}