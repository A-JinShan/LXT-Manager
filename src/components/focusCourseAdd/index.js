import React,{Component} from "react"
import Modal from "antd/es/modal/Modal";
import {Form, Input, message, Select} from "antd";
import UnloadFile from "../uploadFile";
import {baseURL} from "../../tools/Ajax";
import {addFocusCourse, deleteFocusCourseImage, getLinkCourseList} from "../../api/focusCourseApi";
import {checkFile, deleteFile} from "../../tools/FileProcess";

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

class FocusCourseAdd extends Component{
    state = {
        linkCourseData:[]
    }

    _handleAddSubmit = ()=>{
        this.focusCourseAddForm.validateFields().then(result =>{
            // console.log(result)
            addFocusCourse(result).then(res=>{
                if(res.code === 0){
                    message.success("新增焦点课程成功")
                    this.props.onFinished()
                }else{
                    message.error("新增焦点课程失败")
                }
            })

        }).catch(error =>{
            message.warn("新增失败，请检查数据格式。")
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
        this._loadLinkCourseData()
    }

    render(){
        const {visible,onFinished} = this.props
        const {linkCourseData} = this.state
        return (
            <Modal destroyOnClose={true} title="新增焦点课程"  okText={"新增"} cancelText={"取消"} visible={visible} onOk={this._handleAddSubmit} onCancel={onFinished}>
                <Form
                    ref={dom=>this.focusCourseAddForm = dom}
                    name="focusCourse-add-form"
                    {...formItemLayout}
                >
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

export default FocusCourseAdd