import {message} from "antd";

export const checkFile = (file,type="image",size=5)=>{
    let fileType = file.type
    fileType = fileType.substring(0,fileType.lastIndexOf('/'))
    const isType = fileType === type;
    console.log(isType)
    if (!isType) {
        message.error(`只能上传 ${type} 文件！`);
    }
    const isSize = file.size / 1024 / 1024 < size;
    if (!isSize) {
        message.error(`文件大小不能超过${size}M！`);
    }
    return isType && isSize;
}

export const deleteFile = (filePath,deleteFuc) =>{
    if(typeof deleteFuc === "function"){
        deleteFuc(filePath).then(result =>{
            if(result.code === 0 ){
                //删除成功
                message.success("删除成功！")
            }else{
                message.warn("删除失败！")
            }
        })
    }else {
        message.error("请传入删除方法！")
    }
}