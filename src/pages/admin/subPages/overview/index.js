import React, {Component} from "react";
import "./index.less"
import {Card, Comment, Statistic, Tabs, Tooltip} from "antd";
import {Link} from "react-router-dom";
import {ArrowUpOutlined} from "@ant-design/icons";
import {
    getArticleData,
    getCommentDataWithScore,
    getCourseData,
    getTeacherData,
    getUserData
} from "../../../../api/overviewApi";
import Avatar from "antd/es/avatar/avatar";
import {baseURL} from "../../../../tools/Ajax";
import {getFormalDate} from "../../../../tools/dateTool";

class Overview extends Component {
    state = {
        userData: {},
        teacherData: {},
        courseData: {},
        articleData: {},
        commentDataWithScore: {}
    }


    componentDidMount() {
        getUserData().then(result => {
            this.setState({
                userData: result.data
            })
        })
        getTeacherData().then(result => {
            this.setState({
                teacherData: result.data
            })
        })
        getCourseData().then(result => {
            this.setState({
                courseData: result.data
            })
        })
        getArticleData().then(result => {
            this.setState({
                articleData: result.data
            })
        })
        this._getCommentDataWithScore(5)
    }

    /**
     * 根据分数获取评论列表
     * @param score 评论分数
     * @private
     */
    _getCommentDataWithScore(score) {
        if (this.state.commentDataWithScore[score]) {
            return;
        }
        // console.log("发送网络请求,获取数据")
        getCommentDataWithScore(score).then(result => {
            this.setState(preState => {
                preState.commentDataWithScore[score] = result.data
                return {
                    commentDataWithScore: preState.commentDataWithScore
                }
            })
        })
    }

    /**
     * 处理标签改变业务
     * @param key 课程评论分数
     * @private
     */
    _handlerTabChange = (key) => {
        // console.log(key)
        this._getCommentDataWithScore(key)
    }

    render() {
        const {TabPane} = Tabs;
        const {userData, teacherData, courseData, articleData,commentDataWithScore} = this.state
        return (
            <div className={"overview"}>
                <div className={"top"}>
                    <Card title="用户概览" style={{width: 300}}>
                        <div className={"card"}>
                            <Statistic
                                title="今天注册"
                                value={userData.today}
                                valueStyle={{color: 'tomato'}}
                                prefix={<ArrowUpOutlined/>}
                            />
                            <Statistic
                                title="总人数"
                                value={userData.total}
                                valueStyle={{color: '#3f8600'}}
                            />
                        </div>
                    </Card>
                    <Card title="讲师概览" extra={<Link to="/teacher">更多</Link>} style={{width: 300}}>
                        <div className={"card"}>
                            <Statistic
                                title="总人数"
                                value={teacherData.total}
                                valueStyle={{color: '#3f8600'}}
                            />
                        </div>
                    </Card>
                    <Card title="课程概览" extra={<Link to="/course">更多</Link>} style={{width: 300}}>
                        <div className={"card"}>
                            <Statistic
                                title="总门数"
                                value={courseData.total}
                                valueStyle={{color: '#3f8600'}}
                            />
                        </div>
                    </Card>
                    <Card title="文章概览" extra={<Link to="/article">更多</Link>} style={{width: 300}}>
                        <div className={"card"}>
                            <Statistic
                                title="今天新增"
                                value={articleData.today}
                                valueStyle={{color: 'tomato'}}
                                prefix={<ArrowUpOutlined/>}
                            />
                            <Statistic
                                title="总人数"
                                value={articleData.total}
                                valueStyle={{color: '#3f8600'}}
                            />
                        </div>
                    </Card>
                </div>
                <div className={"bottom"}>
                    <Tabs defaultActiveKey="5" onChange={this._handlerTabChange}>
                        {
                            [5, 4, 3, 2, 1].map(item => {
                                return (
                                    <TabPane tab={item + "分评论"} key={item}>
                                        {
                                            (commentDataWithScore[item] || []).map(comment => {
                                                return (
                                                    <Comment
                                                        key={comment.comment_id}
                                                        actions={{}}
                                                        author={<a>{comment.user_name}</a>}
                                                        avatar={<Avatar src={baseURL+comment.user_header}
                                                                        alt={comment.user_name}/>}
                                                        content={
                                                            <p>
                                                                {comment.comment_content}
                                                            </p>
                                                        }
                                                        datetime={
                                                            <Tooltip title={getFormalDate(comment.comment_time)}>
                                                                <span>{getFormalDate(comment.comment_time)}</span>
                                                            </Tooltip>
                                                        }
                                                    />
                                                )
                                            })
                                        }
                                    </TabPane>
                                )
                            })
                        }
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default Overview