import {ajax} from "../tools/Ajax";

export function getTeacherList(){
    return ajax("/api/manager/teacher/list")
}

export function updateIsStar(id,is_star){
    return ajax("/api/manager/teacher/update_is_star",{id,is_star},"post")
}

export function deleteTeacher(id){
    return ajax("/api/manager/teacher/delete",{id})
}
export function deleteTeacherHeader(file_path){
    return ajax("/api/manager/teacher/delete_file",{file_path})
}

export function addTeacher(teacher){
    return ajax("/api/manager/teacher/add",teacher,"post")
}

export function updateTeacher(teacher){
    return ajax("/api/manager/teacher/update",teacher,"post")
}