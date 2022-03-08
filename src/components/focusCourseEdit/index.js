import React,{Component} from "react"
import Modal from "antd/es/modal/Modal";
import {Form, Input, message, Select} from "antd";
import UnloadFile from "../uploadFile";
import {baseURL} from "../../tools/Ajax";
import {deleteFocusCourseImage, getLinkCourseList, updateFocusCourse} from "../../api/focusCourseApi";
import {checkFile, deleteFile} from "../../tools/FileProcess";

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

class FocusCourseEdit extends Component{
    state = {
        linkCourseData:[],
    }

    _handleEditSubmit = ()=>{
        this.focusCourseEditForm.validateFields().then(result =>{
            // console.log(result)
            updateFocusCourse(result).then(res=>{
                if(res.code === 0){
                    message.success("更新焦点课程成功")
                    this.props.onFinished()
                }else{
                    message.error("更新焦点课程失败")
                }
            })
        }).catch(error =>{
            message.warn("更新失败，请检查数据格式。")
        })
    }

    _loadLinkCourseData = ()=>{
        getLinkCourseList().then(result =>{
            this.setState({
                linkCourseData:result.data
            })
        })
    }

    componentDidMount() {
        this.setState({
            currentEditFocusCourse:this.props.value
        })
        this._loadLinkCourseData()
    }

    render(){
        const {visible,onFinished,currentEditFocusCourse} = this.props
        const {linkCourseData} = this.state
        return (
            <Modal destroyOnClose={true} title="编辑焦点课程"  okText={"更新"} cancelText={"取消"} visible={visible} onOk={this._handleEditSubmit} onCancel={onFinished}>
                <Form
                    ref={dom=>this.focusCourseEditForm = dom}
                    name="focusCourse-edit-form"
                    initialValues={currentEditFocusCourse}
                    {...formItemLayout}
                >

                    <Form.Item
                        name="id"
                        label="ID"
                        style={{display:"none"}}
                        rules={[
                            {
                                required: true,
                                message: ' ',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="title"
                        label="焦点图标题"
                        rules={[
                            {
                                required: true,
                                message: '必须输入焦点图标题',
                            },
                        ]}
                    >
                        <Input placeholder="请输入焦点图标题" />
                    </Form.Item>

                    <Form.Item
                        name="course_id"
                        label="关联课程"
                        rules={[
                            {
                                required: true,
                                message: '必须选择关联课程',
                            },
                        ]}
                    >
                        <Select placeholder={"请选择关联课程"}>
                            {linkCourseData.map(item =>(<Select.Option value={item.id} key={item.id}>{item.title}</Select.Option>))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="焦点图" >
                        <Form.Item name="ad_url" noStyle>
                            <UnloadFile  ref={dom=>this.unloadPane = dom} name={"ad_img"} fileType={"image"} previewBaseURL={baseURL} action={baseURL + "/api/manager/ad_course/upload_ad_img"} cheakFile={checkFile} deleteFile={(filePath)=>{deleteFile(filePath,deleteFocusCourseImage)}} />
                        </Form.Item>
                    </Form.Item>

                </Form>
            </Modal>
        )
    }
}

export default FocusCourseEdit