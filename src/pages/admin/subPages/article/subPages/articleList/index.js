import React, {Component} from "react"
import {Button, Card, Drawer, message, Popconfirm, Space, Table} from "antd";
import {deleteArticle, getArticleDetail, getArticleList} from "../../../../../../api/articleApi";
import {getFormalDate} from "../../../../../../tools/dateTool";
import {Link} from "react-router-dom";

class ArticleList extends Component {
    state = {
        isLoading: false, //是否处于加载状态
        dataSource: [], //文章数据
        showOrHiddenPaneFlag:0, //显示隐藏面板标记 0隐藏 1显示详情面板
        currentArticleDetail:{} //当前文章详情
    }

    _columnsConfig = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: '10px',
        },
        {
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
            align: 'center'
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align: 'center',
            render: (text) => {
                return getFormalDate(text)
            }
        },
        {
            title: '简介',
            dataIndex: 'intro',
            key: 'intro',
            align: 'center'
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'action',
            align: 'center',
            width: '250px',
            render: (id, data) => {
                return (
                    <Space size="middle">
                        <Button onClick={() => {
                            //获取详情数据
                            if(data.content===undefined){
                                getArticleDetail(id).then(result =>{
                                    data.content=result.data.content
                                    this.setState({
                                        currentArticleDetail:data
                                    })
                                })
                            }else {
                                this.setState({
                                    currentArticleDetail:data
                                })
                            }
                            this._showOrHiddenPane(1)
                        }}>详情</Button>
                        <Link to={"/article/edit/"+id}><Button>编辑</Button></Link>
                        <Popconfirm
                            title="你确定要删除这个分类列表么?"
                            onConfirm={() => {
                                deleteArticle(id).then(result => {
                                    if (result.code === 0) {
                                        //删除成功
                                        message.success("文章删除成功！")
                                        let temp = this.state.dataSource.filter(item => item.id !== id)
                                        this.setState({
                                            dataSource:temp
                                        })
                                    } else {
                                        //删除失败
                                        message.error("文章删除失败！")
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

    /**
     * 显示或隐藏面板 默认隐藏 0为隐藏 1为显示详情面板
     * @param flag
     * @private
     */
    _showOrHiddenPane = (flag=0)=>{
        this.setState({
            showOrHiddenPaneFlag:flag
        })
    }

    /**
     * 加载文章列表数据
     * @private
     */
    _loadArticleData = () => {
        this.setState({
            isLoading: true
        })
        getArticleList().then(result => {
            this.setState({
                isLoading: false,
                dataSource: result.data
            })
        })
    }

    componentDidMount() {
        this._loadArticleData()
    }

    render() {
        const {isLoading, dataSource,showOrHiddenPaneFlag,currentArticleDetail} = this.state
        return (
            <>
                <Card title="分类管理" extra={<Link to="/article/add"><Button type={"primary"}>新增</Button></Link>}>
                    <Table loading={isLoading} dataSource={dataSource} columns={this._columnsConfig} bordered={true}
                           pagination={{
                               defaultPageSize: 4
                           }} rowKey={"id"}/>
                </Card>
                <Drawer
                    title={currentArticleDetail.title}
                    placement={"left"}
                    closable={false}
                    onClose={this._showOrHiddenPane}
                    visible={showOrHiddenPaneFlag === 1}
                    key={"left"}
                    width={"400px"}
                >
                    <div dangerouslySetInnerHTML={{__html:currentArticleDetail.content}} />
                </Drawer>
            </>
        )
    }
}

export default ArticleList