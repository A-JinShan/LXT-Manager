import React,{Component} from "react"
import { Upload, message, Button} from 'antd';
import {InboxOutlined} from "@ant-design/icons";
import "./index.less"

const fileTypeConfig = {
    "image":"image/*",
    "video":"video/*"
}

class UnloadFile extends Component{
    state = {
        filePath:this.props.value || ""
    }

    //非受控主键获取上传文件路径
    // G_getFilePath(){
    //     return this.state.filePath
    // }

     _unloadConfig = {
        name: this.props.name,
        accept: fileTypeConfig[this.props.fileType],
        action: this.props.action,
        beforeUpload:(file)=>{
            if(typeof this.props.cheakFile === "function"){
                return this.props.cheakFile(file)
            }
            return true
        },
        onChange:(info)=>{
            const { status } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} 文件上传成功`);
                const filePath = info.file.response.data.file_path
                if(typeof this.props.onChange === "function"){
                    this.props.onChange(filePath)
                }
                this.setState({
                    filePath
                })
            } else if (status === 'error') {
                message.error(`${info.file.name} 文件上传失败`);
            }
        },
    };

    _handleDeleteFile = ()=>{
        if(typeof this.props.deleteFile === "function"){
            this.props.deleteFile(this.state.filePath)
            if(typeof this.props.onChange === "function"){
                this.props.onChange("")
            }
            this.setState({
                filePath:""
            })
        }
    }

    render(){
        const {filePath} = this.state
        const {previewBaseURL = ""}= this.props
        let imagePane = <div className={"show-file-pane"}>
            <img src={previewBaseURL+filePath} alt="" className={"show-file"}/>
            <Button type={"primary"} danger onClick={this._handleDeleteFile} className={"del_btn"}>删除</Button>
        </div>

        let videoPane = <div className={"show-file-pane"}>
            <video src={previewBaseURL+filePath} controls="controls" className={"show-file"}/>
            <Button type={"primary"} danger onClick={this._handleDeleteFile} className={"del_btn"}>删除</Button>
        </div>

        let previewPane = this.props.fileType === "image" ? imagePane:videoPane

        let uploadPane = <Upload.Dragger {...this._unloadConfig}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖拽文件区域上传</p>
            <p className="ant-upload-hint">仅支持单文件上传</p>
        </Upload.Dragger>

        return (
            <div>
                {filePath.length > 0 ? previewPane : uploadPane}
            </div>
        )
    }
}

export default UnloadFile