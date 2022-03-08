import React,{Component} from "react"
import Modal from "antd/es/modal/Modal";
import {Form, Input, message, Switch} from "antd";
import TextArea from "antd/es/input/TextArea";
import UnloadFile from "../uploadFile";
import {baseURL} from "../../tools/Ajax";
import {updateTeacher, deleteTeacherHeader} from "../../api/teacherApi";
import {checkFile, deleteFile} from "../../tools/FileProcess";

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

class TeacherEdit extends Component{

    _handleCancel = ()=>{
        this.props._showOrHiddenPane()
    }

    _handleAddSubmit = ()=>{
        // console.log(this.unloadPane.G_getFilePath()) //非受控组件传值

        this.teacherAddForm.validateFields().then(result =>{
            updateTeacher(result).then(res =>{
                if(res.code === 0){
                    message.success("讲师编辑成功！")
                    //关闭模态窗口
                    this.props._showOrHiddenPane()
                    //刷新数据
                    this.props._onFinished()
                }else {
                    message.error("讲师编辑失败")
                }
            })
        }).catch(error =>{
            message.warn("编辑失败，请检查数据格式。")
        })
    }

    render(){
        const {visible,currentEditTeacher} = this.props
        return (
            <Modal destroyOnClose={true} title="编辑讲师"  okText={"提交"} cancelText={"取消"} visible={visible} onOk={this._handleAddSubmit} onCancel={this._handleCancel}>
                <Form
                    ref={dom=>this.teacherAddForm = dom}
                    name="teacher-add-form"
                    initialValues={currentEditTeacher}
                    {...formItemLayout}
                >

                    <Form.Item
                        name="id"
                        label="ID"
                        style={{display:"none"}}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="姓名"
                        rules={[
                            {
                                required: true,
                                message: '必须输入讲师姓名',
                            },
                        ]}
                    >
                        <Input placeholder="请输入讲师姓名" />
                    </Form.Item>

                    <Form.Item
                        name="position"
                        label="职位"
                        rules={[
                            {
                                required: true,
                                message: '必须输入讲师职位',
                            },
                        ]}
                    >
                        <Input placeholder="请输入讲师职位" />
                    </Form.Item>

                    <Form.Item name="is_star" label="是否星级" valuePropName="checked"  getValueFromEvent={(event)=>{
                        return +event
                    }}>
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        name="intro"
                        label="简介"
                        rules={[
                            {
                                required: true,
                                message: '必须输入讲师简介',
                            },
                        ]}
                    >
                        <TextArea  placeholder="请输入讲师简介" />
                    </Form.Item>
                    <Form.Item label="头像" >
                        <Form.Item name="header" noStyle>
                            <UnloadFile  ref={dom=>this.unloadPane = dom} name={"header"} fileType={"image"} previewBaseURL={baseURL} action={baseURL + "/api/manager/teacher/upload_header"} cheakFile={checkFile} deleteFile={(filePath)=>{deleteFile(filePath,deleteTeacherHeader)}} />
                        </Form.Item>
                    </Form.Item>

                </Form>
            </Modal>
        )
    }
}

export default TeacherEdit