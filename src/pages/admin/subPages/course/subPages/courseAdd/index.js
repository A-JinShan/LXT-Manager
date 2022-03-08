import React,{Component} from "react"
import {Breadcrumb, Button, Card, Form, Input, message, Select, Switch} from "antd";
import {Link} from "react-router-dom";
import RichTextEditor from "../../../../../../components/richTextEditor";
import withRouter from "../../../../../../tools/withRouter";
import {baseURL} from "../../../../../../tools/Ajax";
import UnloadFile from "../../../../../../components/uploadFile";
import {addCourse, deleteCourseFile} from "../../../../../../api/courseApi";
import {checkFile, deleteFile} from "../../../../../../tools/FileProcess";

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

class CourseAdd extends Component{
    /**
     * 处理新增课程业务
     * @private
     */
    _handlerAdd = ()=>{
        this.courseAddForm.validateFields().then(result =>{
            // console.log(result)
            addCourse(result).then(res =>{
                console.log(res)
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
        const {teacherSelectList,categorySelectList } = this.props.location.state;

        return (
            <Card title={
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={"/course"}>课程列表</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>文章新增</Breadcrumb.Item>
                </Breadcrumb>
            } extra={<Button type={"primary"} onClick={this._handlerAdd}>保存</Button>}>
                <Form
                    ref={dom=>this.courseAddForm =dom}
                    name="course-add-form"
                    {...formItemLayout}
                >
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

                </Form>


            </Card>
        )
    }
}

export default withRouter(CourseAdd)