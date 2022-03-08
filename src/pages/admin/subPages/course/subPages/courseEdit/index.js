import React,{Component} from "react"
import {Breadcrumb, Button, Card, Form, Input, message, Select, Switch} from "antd";
import {Link} from "react-router-dom";
import RichTextEditor from "../../../../../../components/richTextEditor";
import withRouter from "../../../../../../tools/withRouter";
import {baseURL} from "../../../../../../tools/Ajax";
import UnloadFile from "../../../../../../components/uploadFile";
import {deleteCourseFile, getCourseDetail, updateCourse} from "../../../../../../api/courseApi";
import {checkFile, deleteFile} from "../../../../../../tools/FileProcess";

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

class CourseEdit extends Component{
    state = {
        courseDetail: {}
    }

    /**
     * 加载课程详情数据
     * @private
     */
    _loadCourseDetail = ()=>{
        const id = this.props.params.id
        getCourseDetail(id).then(result => {
            this.setState({
                courseDetail: result.data
            })
        })
    }

    componentDidMount() {
        this._loadCourseDetail()
    }

    /**
     * 处理文章更新业务
     * @private
     */
    _handlerUpdate = ()=>{
        this.courseEditForm.validateFields().then(result =>{
            // console.log(result)
            updateCourse(result).then(res =>{
                if(res.code === 0 ){
                    message.success("新增课程成功")
                    this.props.navigate("/course",{replace:true})
                }else{
                    message.error("新增课程失败")
                }
            })
        }).catch(error =>{
            message.warn("新增课程失败,请检查数据规范")
        })
    }

    render(){
        const {teacherSelectList,categorySelectList} = this.props.location.state;
        const {courseDetail} = this.state
        return (
            <Card title={
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={"/course"}>课程列表</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>文章编辑</Breadcrumb.Item>
                </Breadcrumb>
            } extra={<Button type={"primary"} onClick={this._handlerUpdate}>更新</Button>}>
                {!courseDetail.id ? <div/> : <Form
                    ref={dom=>this.courseEditForm =dom}
                    name="course-edit-form"
                    initialValues={courseDetail}
                    {...formItemLayout}
                >
                    <Form.Item
                        label="课程ID"
                        name="id"
                        hidden={true}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="课程标题"
                        name="title"
                        rules={[{ required: true, message: '必须输入课程标题' }]}
                    >
                        <Input placeholder={"请输入课程标题"} />
                    </Form.Item>

                    <Form.Item
                        label="是否热门"
                        name="is_hot"
                        initialValue={0}
                        valuePropName={"checked"}
                        getValueFromEvent={(event)=>{return +event}}
                        rules={[{ required: true, message: ' ' }]}
                    >
                        <Switch/>
                    </Form.Item>

                    <Form.Item
                        label="所属讲师"
                        name="teacher_id"
                        rules={[{ required: true, message: '必须选择所属讲师' }]}
                    >
                        <Select>
                            {teacherSelectList.map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="所属分类"
                        name="category_id"
                        rules={[{ required: true, message: '必须选择所属分类' }]}
                    >
                        <Select>
                            {categorySelectList.map(item => <Select.Option value={item.id} key={item.id}>{item.title}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="课程封面"
                        name="fm_url"
                        rules={[{ required: true, message: '必须上传课程封面' }]}
                    >
                        <UnloadFile  ref={dom=>this.unloadPane = dom} name={"fm"} fileType={"image"} previewBaseURL={baseURL} action={baseURL + "/api/manager/course/upload_fm"} cheakFile={checkFile} deleteFile={(filePath)=>{deleteFile(filePath,deleteCourseFile)}} />
                    </Form.Item>

                    <Form.Item
                        label="文章内容"
                        name="intro"
                        rules={[{ required: true, message: '必须输入文章内容' }]}
                    >
                        <RichTextEditor placeholder={"请输入文章内容"}/>
                    </Form.Item>
                </Form>}

            </Card>
        )
    }
}

export default withRouter(CourseEdit)