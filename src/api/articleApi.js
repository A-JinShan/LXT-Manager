import {ajax} from "../tools/Ajax";

export function getArticleList(){
    return ajax("/api/manager/article/list")
}

export function getArticleDetail(id){
    return ajax("/api/manager/article/detail/"+id)
}

export function deleteArticle(id){
    return ajax("/api/manager/article/delete",{id})
}

export function addArticle(data){
    return ajax("/api/manager/article/add",data,"post")
}

export function updateArticle(data){
    return ajax("/api/manager/article/update",data,"post")
}