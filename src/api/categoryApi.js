import {ajax} from "../tools/Ajax";

export function getCategory(){
    return ajax("/api/manager/category/list")
}

export function deleteCategory(id){
    return ajax("/api/manager/category/delete",{id})
}

export function addCategory(title){
    return ajax("/api/manager/category/add",{title},"post")
}

export function editCategory(id,title){
    return ajax("/api/manager/category/update",{id,title},"post")
}