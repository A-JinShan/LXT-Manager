import React, {Component} from "react"
import {
    Button,
    Card,
    Drawer,
    Form,
    Input,
    message,
    notification, Popconfirm,
    Select,
    Space,
    Switch,
    Table,
    Timeline,
} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {
    addCourseOutline, deleteCourse, deleteCourseFile, deleteCourseOutline,
    getCategorySelectList, getCourseCommentList, getCourseDetail,
    getCourseList, getCourseOutlinesList,
    getTeacherSelectList, updateCategorySelectChange, updateHotChange,
    updateTeacherSelectChange
} from "../../../../../../api/courseApi";
import {baseURL} from "../../../../../../tools/Ajax";
import {getFormalDate} from "../../../../../../tools/dateTool";
import UnloadFile from "../../../../../../components/uploadFile";
import withRouter from "../../../../../../tools/withRouter";
import {checkFile, deleteFile} from "../../../../../../tools/FileProcess";

class CourseList extends Component {

    state = {
        dataSource: [], //课程列表数据
        total: 0, //课程数据总数
        isLoading: false,
        teacherSelectList: [], //讲师选择框列表数据
        categorySelectList: [], //课程分类选择框列表数据
        showOrHiddenPaneFlag: 0, //0什么都不显示 1显示课程介绍 2显示课程评论 3课程大纲
        courseDetail: {}, //课程详情
        courseComments: [], //课程评论列表
        courseOutlines: [], //课程大纲类别
    }

    _columnsConfig = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: '课程名字',
            dataIndex: 'title',
            key: 'title',
            align: 'center',
        },
        {
            title: '课程封面',
            dataIndex: 'fm_url',
            key: 'fm_url',
            align: 'center',
            render: (fm_url) => {
                return <Avatar shape="square" size={64} src={baseURL + fm_url}/>
            }
        },
        {
            title: '是否热门',
            key: 'is_hot',
            dataIndex: 'is_hot',
            align: 'center',
            render: (is_hot, data) => {
                return <Switch checked={is_hot} onChange={(checked) => {
                    this._handlerHotChange(data, checked)
                }}/>
            }
        },
        {
            title: '所属老师',
            key: 'teacher_id',
            dataIndex: 'teacher_id',
            align: 'center',
            render: (teacher_id) => {
                const {teacherSelectList} = this.state
                return (
                    <Select defaultValue={teacher_id} style={{width: "150px"}} onChange={(value) => {
                        this._handlerTeacherSelectChange(teacher_id, value)
                    }}>
                        {teacherSelectList.map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)}
                    </Select>
                )
            }
        },
        {
            title: '所属分类',
            key: 'category_id',
            dataIndex: 'category_id',
            align: 'center',
            render: (category_id) => {
                const {categorySelectList} = this.state
                return (
                    <Select defaultValue={category_id} style={{width: "150px"}} onChange={(value) => {
                        this._handlerCategorySelectChange(category_id, value)
                    }}>
                        {categorySelectList.map(item => <Select.Option value={item.id} key={item.id}>{item.title}</Select.Option>)}
                    </Select>
                )
            }
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'id',
            align: 'center',
            render: (id, data) => (
                <Space size="small">
                    <Button onClick={() => {
                        this._loadCourseDetail(id, data)
                        this._showOrHiddenPane(1)
                    }}>介绍</Button>
                    <Button onClick={() => {
                        this._loadCourseDetail(id, data)
                        this._loadCourseComments(id, data)
                        this._showOrHiddenPane(2)
                    }}>评论</Button>
                    <Button onClick={() => {
                        this._loadCourseDetail(id, data)
                        this._loadCourseOutlines(id, data)
                        this._showOrHiddenPane(3)
                    }}>大纲</Button>
                    <Button onClick={()=>{
                        const {categorySelectList,teacherSelectList} = this.state
                        //跳转自编辑页面
                        this.props.navigate('/course/edit/'+ id,{state:{categorySelectList,teacherSelectList}})
                    }}>编辑</Button>
                    <Popconfirm
                        title="你确定要删除这个课程吗?"
                        onConfirm={()=>{this._handlerDeleteCourse(id)}}
                        okText="删除"
                        cancelText="取消"
                    >
                    <Button>删除</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    /**
     * 显示或隐藏面板
     * @param flag 0为隐藏 1为显示介绍面板  2为显示评论面板 3为显示大纲面板
     * @private
     */
    _showOrHiddenPane = (flag=0) => {
        this.setState({
            showOrHiddenPaneFlag: flag
        })
    }

    /**
     * 处理删除课程大纲
     * @param id 大纲id
     * @private
     */
    _handlerDeleteCourseOutline = (id) =>{
        deleteCourseOutline(id).then(result =>{
            if(result.code === 0){
                message.success("删除课程大纲成功")
                let temp = this.state.courseOutlines.filter(item => item.id !== id)
                this.setState({
                    courseOutlines:temp
                })
            }else {
                message.error("删除课程大纲失败")
            }
        })
    }

    /**
     * 处理删除课程
     * @param id 课程id
     * @private
     */
    _handlerDeleteCourse = (id)=>{
        deleteCourse(id).then(result => {
            if(result.code  === 0){
                message.success("删除课程成功")
                let temp = this.state.dataSource.filter(item => item.id !== id)
                this.setState({
                    dataSource:temp
                })
            }else{
                message.error("删除课程失败")
            }
        })
    }

    /**
     * 加载课程大纲列表数据
     * @param id 课程id
     * @param data 数据模型
     * @private
     */
    _loadCourseOutlines = (id, data) => {
        if (data.outlines === undefined) {
            getCourseOutlinesList(id).then(result => {
                this.setState({
                    courseOutlines: result.data
                })
                data.outlines = result.data
            })
        } else {
            this.setState({
                courseComments: data.outlines
            })
        }
    }

    /**
     * 加载课程评论列表数据
     * @param id 课程id
     * @param data 数据模型
     * @private
     */
    _loadCourseComments = (id, data) => {
        if (data.comments === undefined) {
            getCourseCommentList(id).then(result => {
                this.setState({
                    courseComments: result.data
                })
                data.comments = result.data
            })
        } else {
            this.setState({
                courseComments: data.comments
            })
        }
    }

    /**
     * 加载课程详情数据
     * @param id 课程id
     * @param data 数据模型
     * @private
     */
    _loadCourseDetail = (id, data) => {
        if (data.intro === undefined) {
            getCourseDetail(id).then(result => {
                this.setState({
                    courseDetail: result.data
                })
                data.intro = result.data
            })
        } else {
            this.setState({
                courseDetail: data.intro
            })
        }
    }

    /**
     * 处理是否热门改变业务
     * @param data 数据模型
     * @param is_hot 是否热门 0为不热门 1为热门
     * @private
     */
    _handlerHotChange = (data, is_hot) => {
        // console.log(data, is_hot)
        updateHotChange(data.id, +is_hot).then(result => {
            if (result.code === 0) {
                notification['success']({
                    message: '热门课程设置',
                    description: `设置${data.title}课程,为${is_hot ? "热门" : "非热门"}课程`,
                });
                this.state.dataSource.find(item => item.id === data.id).is_hot = is_hot
                this.forceUpdate()
            } else {
                message.error("更新课程热门失败")
            }
        })
    }

    /**
     * 处理讲师选择框改变业务
     * @param id 课程id
     * @param value 改变的值
     * @private
     */
    _handlerTeacherSelectChange = (id, value) => {
        updateTeacherSelectChange(id, value).then(result => {
            if (result.code === 0) {
                message.success("更新所属讲师成功")
            } else {
                message.error("更新所属讲师失败")
            }
        })
    }

    /**
     * 处理课程分类改变业务
     * @param id 课程id
     * @param value 改变的值
     * @private
     */
    _handlerCategorySelectChange = (id, value) => {
        updateCategorySelectChange(id, value).then(result => {
            if (result.code === 0) {
                message.success("更新所属分类成功")
            } else {
                message.error("更新所属分类失败")
            }
        })
    }

    /**
     * 加载课程数据
     * @param page_num 页码
     * @param page_size 每页的条数
     * @private
     */
    _loadCourseData = (page_num, page_size) => {
        this.setState({
            isLoading: true
        })
        getCourseList(page_num, page_size).then(result => {
            this.setState({
                dataSource: result.data.course_list,
                total: result.data.total_count,
                isLoading: false
            })
        })
    }

    /**
     * 加载讲师选择框数据
     * @private
     */
    _loadTeacherSelectList = () => {
        getTeacherSelectList().then(result => {
            this.setState({
                teacherSelectList: result.data
            })
        })
    }

    /**
     * 加载课程分类选择框数据
     * @private
     */
    _loadCategorySelectList = () => {
        getCategorySelectList().then(result => {
            this.setState({
                categorySelectList: result.data
            })
        })
    }

    componentDidMount() {
        this._loadTeacherSelectList()
        this._loadCategorySelectList()
        this._loadCourseData(1, 3)
    }

    render() {
        const {
            dataSource,
            total,
            isLoading,
            showOrHiddenPaneFlag,
            courseDetail,
            courseComments,
            courseOutlines,
            teacherSelectList,
            categorySelectList,
        } = this.state
        return (
            <>
                <Card title="课程列表" extra={<Button type={"primary"} onClick={()=>{
                    this.props.navigate('/course/add',{state:{teacherSelectList,categorySelectList}})
                }}>新增课程</Button>}>
                    <Table bordered={true} loading={isLoading} columns={this._columnsConfig} dataSource={dataSource}
                           rowKey={'id'} pagination={{
                        defaultPageSize: 3,
                        total,
                        onChange: ((page, pageSize) => {
                            this._loadCourseData(page, pageSize)
                        })
                    }}/>
                </Card>

                <Drawer
                    title={courseDetail.title + " > 课程介绍"}
                    placement="left"
                    closable={false}
                    onClose={this._showOrHiddenPane}
                    visible={showOrHiddenPaneFlag === 1}
                    key="detail"
                    width={"400px"}
                >
                    <div dangerouslySetInnerHTML={{__html: courseDetail.intro}}/>
                </Drawer>

                <Drawer
                    title={courseDetail.title + " > 评论列表"}
                    placement="left"
                    closable={false}
                    onClose={this._showOrHiddenPane}
                    visible={showOrHiddenPaneFlag === 2}
                    key="comments"
                    width={"400px"}
                >
                    <Timeline mode={"left"}>
                        {
                            courseComments.map(item => {
                                return (
                                    <Timeline.Item label={getFormalDate(item.comment_time)} key={item.num}>
                                        <Avatar src={baseURL + item.user_header} key={item.num}/>
                                        {item.comment_content}
                                    </Timeline.Item>
                                )
                            })
                        }
                    </Timeline>
                </Drawer>

                <Drawer
                    title={courseDetail.title + " > 课程大纲"}
                    placement="right"
                    closable={false}
                    onClose={this._showOrHiddenPane}
                    visible={showOrHiddenPaneFlag === 3}
                    key="outline"
                    width={"400px"}
                >
                    <Timeline mode={"left"}>
                        {
                            courseOutlines.map(item => {
                                return (
                                        <Timeline.Item key={item.num}>
                                            <Button size={"small"} danger onClick={()=>{this._handlerDeleteCourseOutline(item.id)}}> 删除</Button>{`${item.num}-${item.title}`}
                                        </Timeline.Item>
                                )
                            })
                        }
                    </Timeline>

                    <Form
                        ref={dom => this._outlineAddForm = dom}
                        name="outline-add-form"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        onFinish={(values)=>{
                            values.course_id = courseDetail.id
                            addCourseOutline(values).then(result =>{
                                if(result.code === 0){
                                    message.success("新增课程大纲成功")
                                    this.setState(preState =>{
                                        preState.courseOutlines.push(result.data)
                                        return{
                                            courseOutlines:preState.courseOutlines
                                        }
                                    })
                                    this._outlineAddForm.resetFields()
                                }else {
                                    message.error("新增课程大纲失败")
                                }
                            })
                        }}
                    >

                        <Form.Item
                            label="章节序号"
                            name="num"
                            rules={[{required: true, message: '必须输入章节序号'}]}
                        >
                            <Input placeholder={"请输入章节序号"} />
                        </Form.Item>
                        <Form.Item
                            label="章节名称"
                            name="title"
                            rules={[{required: true, message: '必须输入章节名称'}]}
                        >
                            <Input placeholder={"请输入章节名称"} />
                        </Form.Item>
                        <Form.Item
                            label="章节视频"
                            name="video_url"
                            rules={[{required: true, message: '必须上传章节视频'}]}
                        >
                            <UnloadFile name={"video"} fileType={"video"}  previewBaseURL={baseURL} action={baseURL+ "/api/manager/course/upload_video"} cheakFile={(file)=>{checkFile(file,"video",200)}} deleteFile={(filePath)=>{deleteFile(filePath,deleteCourseFile)}}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                新增
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>

            </>
        )
    }
}

export default withRouter(CourseList)