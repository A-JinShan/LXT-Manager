import {ajax} from "../tools/Ajax";

export function getConfigData(){
     return ajax("/api/manager/config/detail")
}
export function deleteConfigImage(file_path){
     return ajax("/api/manager/config/delete_file",{file_path})
}
export function updateConfigData(data){
     return ajax("/api/manager/config/update",data,"post")
}