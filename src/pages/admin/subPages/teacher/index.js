import React,{Component} from "react";
import {Button, Card, Popconfirm, Space, Switch, Table, Avatar, notification, message} from "antd";
import {deleteTeacher, getTeacherList, updateIsStar} from "../../../../api/teacherApi";
import {baseURL} from "../../../../tools/Ajax";
import TeacherAdd from "../../../../components/teacherAdd";
import TeacherEdit from "../../../../components/teacherEdit";


class Teacher extends Component{
    state = {
        dataSource:[], //讲师列表数据
        showOrHiddenPaneFlag:0,  //0隐藏 1显示新增面板 2显示编辑面板
        currentEditTeacher:{}
    }

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align:'center',
            width:'100px'
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            width:'150px'
        },
        {
            title: '职位',
            dataIndex: 'position',
            key: 'position',
            align:'center',
            width:'150px'
        },
        {
            title: '是否星级',
            dataIndex: 'is_star',
            key: 'is_star',
            align:'center',
            width:'100px',
            render:(text,data)=>{
               return(
                   <Switch checked={text} onChange={(checked)=>{
                        updateIsStar(data.id,+checked).then(result=>{
                            if(result.code === 0){
                                //给用户一个提示
                                notification['success']({
                                    message: '明星讲师设置',
                                    description:
                                        `设置讲师${data.name}，为${checked ? "星级":"非星级"}讲师`,
                                });
                                this.setState(preState=>{
                                    preState.dataSource.find(item =>item.id === data.id).is_star = checked
                                    return {
                                        dataSource:preState.dataSource
                                    }
                                })
                                this.forceUpdate()
                            }else{
                               message.warn("更新讲师星级失败")
                            }
                        })
                   }} />
               )
            }
        },
        {
            title: '头像',
            dataIndex: 'header',
            key: 'header',
            align:'center',
            width:'100px',
            render:(text)=>{
                return(
                    <Avatar size={64} src={baseURL+ text} />
                )
            }
        },
        {
            title: '简介',
            dataIndex: 'intro',
            key: 'intro',
            align:'center'
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'action',
            align:'center',
            width: '200px',
            render:(id,data)=>{
                return (
                    <Space size="middle">
                        <Button onClick={()=>{
                            this._showOrHiddenPane(2)
                            this.setState({
                                currentEditTeacher:data
                            })
                        }}>编辑</Button>
                        <Popconfirm
                            title="你确定要删除这个分类列表么?"
                            onConfirm={() => {
                                deleteTeacher(id).then(result =>{
                                    if(result.code === 0){
                                        message.success("讲师删除成功！")
                                        this.setState(preState =>{
                                            return {
                                                dataSource:preState.dataSource.filter(item=>item.id !== id)
                                            }
                                        })
                                    }else{
                                        message.error("讲师删除失败,请检查该讲师是否还存在课程！")
                                    }
                                })
                            }}
                            okText="强行删除"
                            cancelText="考虑一下"
                        >
                            <Button danger>删除</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        },

    ]

    /**
     * 加载讲师列表数据
     * @private
     */
    _loadTeacherData = ()=>{
        getTeacherList().then((result)=>{
            this.setState({
                dataSource:result.data
            })
        })
    }

    componentDidMount() {
        this._loadTeacherData()
    }

    /**
     * 显示或隐藏面板
     * @param flag 0隐藏 1显示新增面板 2显示编辑面板
     * @private
     */
    _showOrHiddenPane = (flag=0)=>{
       this.setState({
           showOrHiddenPaneFlag:flag
       })
    }

    render() {
        const {dataSource,showOrHiddenPaneFlag,currentEditTeacher}=this.state
        return (
           <>
               <Card title="讲师列表" extra={<Button type={"primary"} onClick={()=>{this._showOrHiddenPane(1)}}>新增</Button>} >
                   <Table bordered={true} dataSource={dataSource} columns={this.columns} rowKey={"id"} pagination={{
                       defaultPageSize:5
                   }}/>;
               </Card>
               <TeacherAdd visible={showOrHiddenPaneFlag === 1 }  _showOrHiddenPane={this._showOrHiddenPane} _onFinished={this._loadTeacherData} />
               <TeacherEdit visible={showOrHiddenPaneFlag === 2 }  _showOrHiddenPane={this._showOrHiddenPane} _onFinished={this._loadTeacherData} currentEditTeacher = {currentEditTeacher}/>

           </>
        )
    }
}

export default Teacher