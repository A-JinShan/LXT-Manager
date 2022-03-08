import {ajax} from "../tools/Ajax";

export function getCourseList(page_num,page_size){
    return ajax("/api/manager/course/list",{page_num,page_size})
}

export function getTeacherSelectList(){
    return ajax("/api/manager/course/own_teachers")
}

export function getCategorySelectList(){
    return ajax("/api/manager/course/own_categories")
}

export function updateTeacherSelectChange(id,teacher_id){
    return ajax("/api/manager/course/update_teacher",{id,teacher_id},"post")
}

export function updateCategorySelectChange(id,category_id){
    return ajax("/api/manager/course/update_category",{id,category_id},"post")
}

export function updateHotChange(id,is_hot){
    return ajax("/api/manager/course/update_is_hot",{id,is_hot},"post")
}

export function getCourseDetail(id){
    return ajax("/api/manager/course/detail",{id})
}

export function getCourseCommentList(course_id){
    return ajax("/api/manager/course/comments",{course_id})
}

export function getCourseOutlinesList(course_id){
    return ajax("/api/manager/course/outlines",{course_id})
}

export function deleteCourseFile(file_path){
    return ajax("/api/manager/course/delete_file",{file_path})
}

export function addCourseOutline(data){
    return ajax("/api/manager/course/add_outline",data,"post")
}

export function addCourse(data){
    return ajax("/api/manager/course/add",data,"post")
}

export function updateCourse(data){
    return ajax("/api/manager/course/update",data,"post")
}

export function deleteCourse(id){
    return ajax("/api/manager/course/delete",{id})
}

export function deleteCourseOutline(outline_id){
    return ajax("/api/manager/course/del_outline",{outline_id})
}
