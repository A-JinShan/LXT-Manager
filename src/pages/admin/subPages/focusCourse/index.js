import React,{Component} from "react";
import "./index.less"
import {Button, Card, Carousel, Descriptions, Divider, message, Popconfirm} from "antd";
import {DoubleLeftOutlined, DoubleRightOutlined} from "@ant-design/icons";
import {baseURL} from "../../../../tools/Ajax";
import {deleteFocusCourse, getFocusCourseList} from "../../../../api/focusCourseApi";
import FocusCourseAdd from "../../../../components/focusCourseAdd";
import FocusCourseEdit from "../../../../components/focusCourseEdit";

class FocusCourse extends Component{

    state = {
        showOrHiddenPaneFlag:0, // 0为隐藏 1为显示焦点图新增面板 2位显示焦点图编辑面板
        to:0, //滚动到的位置
        focusCourseData:[]
    }

    /**
     * 轮播图改变前执行该函数 当左边的轮播图滚动时 右边的跟着滚动
     * @param from 滚动的前的位置
     * @param to 滚动到的位置
     * @private
     */
    _handlerBeforeChange = (from,to)=>{
        this.leftDom.goTo(to)
        this.rightDom.goTo(to)
        this.setState({
            to
        })
    }
    /**
     * 处理想左滚动业务
     * @private
     */
    _handlerPre = ()=>{
        this.leftDom.prev()
        this.rightDom.prev()
    }
    /**
     * 处理向右滚动业务
     * @private
     */
    _handlerNext = ()=>{
        this.leftDom.prev()
        this.rightDom.prev()
    }

    /**
     * 加载焦点课程数据
     * @private
     */
    _loadFocusCourseData = ()=>{
        getFocusCourseList().then(result =>{
            this.setState({
                focusCourseData:result.data
            })
        })
    }

    /**
     * 显示或隐藏面板 默认隐藏
     * @param flag 0为隐藏 1为显示焦点图新增面板 2位显示焦点图编辑面板
     * @private
     */
    _showOrHiddenPane = (flag=0)=>{
        this.setState({
            showOrHiddenPaneFlag:flag
        })
    }


    /**
     * 处理删除焦点图业务
     * @private
     */
    _handlerDeleteFocusCourse = ()=> {
        const item = this.state.focusCourseData[this.state.to]
        deleteFocusCourse(item.id).then(result =>{
            if(result.code === 0){
                message.success("焦点课程删除成功")
                this._loadFocusCourseData()
            }else {
                message.error("焦点课程删除失败")
            }
        })
    }

    componentDidMount() {
        this._loadFocusCourseData()
    }

    render() {
        const {focusCourseData,to,showOrHiddenPaneFlag} = this.state
        const extra = <>
            <Button onClick={()=>{this._showOrHiddenPane(2)}}>编辑</Button>
            <Divider type="vertical" />
            <Button type={"primary"} onClick={()=>{this._showOrHiddenPane(1)}}>新增</Button>
            <Divider type="vertical" />
            <Popconfirm
                title="你确定要删除这个焦点课程吗？"
                onConfirm={this._handlerDeleteFocusCourse}
                okText="删除"
                cancelText="取消"
            >
            <Button danger>删除</Button>
            </Popconfirm>
        </>

        return (
            <>
                <Card title="焦点课程管理" extra={extra} className={"focus-course"}>
                <div className="top">
                    <div className={"pre"} onClick={this._handlerPre}><DoubleLeftOutlined /></div>
                    <div className="left">
                        <Carousel ref={dom=>this.leftDom = dom} beforeChange={this._handlerBeforeChange}>
                            {focusCourseData.map(item=>(
                                <div className={"item"} key={item.id}>
                                    <img className={"image"} src={baseURL+item.ad_url} alt=""/>
                                    <p className={"title"}>{item.title}</p>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className="right">
                        <Carousel ref={dom=>this.rightDom = dom}>
                            {focusCourseData.map(item=>(
                                <div className={"item"} key={item.course_id}>
                                    <img className={"image"} src={baseURL+item.fm_url} alt=""/>
                                    <p className={"title"}>{item.course_title}</p>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className={"next"} onClick={this._handlerNext}><DoubleRightOutlined /></div>
                </div>
                <Divider orientation="left">焦点图详情描述</Divider>
                <div className="bottom">
                    <Descriptions layout="vertical" column={4}>
                        {!focusCourseData[to] ? <div/> : <>
                            <Descriptions.Item label="焦点图ID">{focusCourseData[to].id}</Descriptions.Item>
                            <Descriptions.Item label="焦点图标题">{focusCourseData[to].title}</Descriptions.Item>
                            <Descriptions.Item label="课程ID">{focusCourseData[to].course_id}</Descriptions.Item>
                            <Descriptions.Item label="课程标题">{focusCourseData[to].course_title}</Descriptions.Item>
                        </>}

                    </Descriptions>,
                </div>
            </Card>
                <FocusCourseAdd  visible={showOrHiddenPaneFlag === 1} onFinished={()=>{
                    this._showOrHiddenPane()
                    this._loadFocusCourseData()
                }}/>
                <FocusCourseEdit visible={showOrHiddenPaneFlag === 2} currentEditFocusCourse={focusCourseData[to]} onFinished={()=>{
                    this._showOrHiddenPane()
                    this._loadFocusCourseData()
                }}/>
            </>
        )
    }
}

export default FocusCourse