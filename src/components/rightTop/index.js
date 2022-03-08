import React,{Component} from "react";
import {Header} from "antd/es/layout/layout";
import "./index.less"
import {exit, getUser, USERKEY} from "../../api/adminApi";
import {Avatar, Dropdown, Menu, Modal} from "antd";
import {DownOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import withRouter from "../../tools/withRouter"
import {getFormalDate} from "../../tools/dateTool";
import {baseURL} from "../../tools/Ajax";
import {Link} from "react-router-dom";


class RightTop extends Component{
    state = {
        user:getUser(USERKEY),
        currentTime:getFormalDate()
    }


    /**
     * 组件加载完毕后设置每隔一秒，改变状态机当中的时间
     */
    componentDidMount() {
        this.timer = setInterval(()=>{
            this.setState({
                currentTime:getFormalDate()
            })
        },1000)
    }

    /**
     * 当组件销毁时，清除定时器
     */
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    /**
     * 处理退出按键的点击，点击退出按钮弹出一个对话框
     * @private
     */
    _handlerExistClick = ()=>{
        Modal.confirm({
            title: '你确定要退出吗？',
            icon: <ExclamationCircleOutlined />,
            content: '不再考虑一下吗？',
            okText: '残忍离开',
            okType: 'danger',
            cancelText: '考虑一下',
            onOk:()=> {
                exit()
                this.props.navigate("/login",{replace:true})
            },
        });
    }

    _dropdownMenuConfig = (
        <Menu>
            <Menu.Item  key={"personal"} disabled>
                <Link to={"#"}>
                    个人中心
                </Link>
            </Menu.Item>
            <Menu.Item key={"exist"} >
                <div onClick={this._handlerExistClick}>退出登录</div>
            </Menu.Item>
        </Menu>
    );


    render() {
        const {user,currentTime} = this.state
        return(
            <Header className="right-top" >
                <div className={"pane"}>
                    <div className={"left"}>{currentTime}</div>
                    <div className={"right"}>
                    <Avatar className={"header"} size={"large"} shape={"circle"} src={baseURL+ user.header} />
                    <Dropdown className={"dropdown"} overlay={this._dropdownMenuConfig}>
                        <a onClick={e => e.preventDefault()}>
                            {user.nick_name} <DownOutlined />
                        </a>
                    </Dropdown>
                    </div>
                </div>
            </Header>
        )
    }
}

export default withRouter(RightTop);
