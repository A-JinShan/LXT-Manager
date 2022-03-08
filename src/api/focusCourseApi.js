import {ajax} from "../tools/Ajax";

export function getFocusCourseList(){
    return ajax("/api/manager/ad_course/list")
}

export function deleteFocusCourse(id){
    return ajax("/api/manager/ad_course/delete",{id})
}

export function deleteFocusCourseImage(file_path){
    return ajax("/api/manager/ad_course/delete_file",{file_path})
}

export function getLinkCourseList(){
    return ajax("/api/manager/ad_course/link_course")
}

export function addFocusCourse(data){
    return ajax("/api/manager/ad_course/add",data,"post")
}

export function updateFocusCourse(data){
    return ajax("/api/manager/ad_course/update",data,"post")
}