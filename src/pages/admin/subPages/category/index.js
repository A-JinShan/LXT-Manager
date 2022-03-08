import React, {Component} from "react";
import {Button, Card, message, Popconfirm, Space, Table} from "antd";
import {deleteCategory, getCategory} from "../../../../api/categoryApi";
import CategoryAdd from "../../../../components/categoryAdd";
import CategoryEdit from "../../../../components/categoryEdit";


class Category extends Component {
    state = {
        dataSource: [], //分类列表数据
        showOrHiddenPaneFlag: 0, //0不显示 1显示新增面板 2显示编辑面板
        currentEditCategoryData: {},
        isLoading:false
    }

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: '150px',
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            align: 'center'
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'action',
            align: 'center',
            width: '200px',
            render: (id,data) => {
                return (
                    <Space size="middle">
                        <Button onClick={()=>{
                            this.setState({
                                currentEditCategoryData:data
                            })
                            this._showOrHiddenPane(2)
                        }}>编辑</Button>
                        <Popconfirm
                            title="你确定要删除这个分类列表么?"
                            onConfirm={() => {
                                deleteCategory(id).then(result => {
                                    if (result.code === 0) {
                                        //删除成功
                                        message.success("分类列表删除成功！")
                                        this._loadCategoryData()
                                    } else {
                                        //删除失败
                                        message.error("删除失败,该分类还有课程！")
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
    ];

    componentDidMount() {
        this._loadCategoryData()
    }

    /**
     * 加载分类列表数据
     * @private
     */
    _loadCategoryData = () => {
        this.setState({
            isLoading:true
        })
        getCategory().then(result => {
            this.setState({
                dataSource: result.data,
                isLoading:false
            })
        })
    }

    /**
     * 显示隐藏面板 默认隐藏 0为隐藏 1显示新增面板 2显示编辑面板
     * @param flag
     * @private
     */
    _showOrHiddenPane = (flag=0) =>{
        this.setState({
            showOrHiddenPaneFlag: flag
        })
    }

    render() {
        const {showOrHiddenPaneFlag, currentEditCategoryData,isLoading} = this.state
        return (
            <>
                <Card title="分类管理" extra={<Button type={"primary"} onClick={()=>{this._showOrHiddenPane(1)}}>新增</Button>}>
                    <Table loading={isLoading} dataSource={this.state.dataSource} columns={this.columns} bordered={true} pagination={{
                        defaultPageSize: 5
                    }} rowKey={"id"}/>
                </Card>
                <CategoryAdd visible={showOrHiddenPaneFlag === 1} _showOrHiddenPane={this._showOrHiddenPane} _onFinished={()=>{
                    this._loadCategoryData()
                }}/>
                <CategoryEdit visible={showOrHiddenPaneFlag === 2}  currentEditCategoryData={currentEditCategoryData} _showOrHiddenPane={this._showOrHiddenPane} _onFinished={()=>{
                    this._loadCategoryData()
                }}/>

            </>
        )
    }
}

export default Category