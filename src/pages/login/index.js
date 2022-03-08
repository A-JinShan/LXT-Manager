import React from "react";
import "./index.less"
import {Button, Form, Input, message} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {checkLogin, saveUser,isLogin} from "../../api/adminApi";
import {Navigate} from "react-router-dom"
import withRouter from "../../tools/withRouter";

class LoginPane extends React.Component{

    /**
     * 登录表单验证成功完成回调
     * @param account
     * @param password
     */
    onFinish = ({account,password})=>{
       checkLogin(account,password).then(result=>{
           if(result.data.id){
               //登录成功业务
               //存储用户信息
               saveUser(result.data)

               //跳转首页
               this.props.navigate('/',{replace:true})
       }else {
            //登录失败业务
            message.warn("账号或密码不正确，请重新输入！")
        }
        })
    }
    /**
     * 登录表单验证失败回调
     */
    onFinishFailed = ()=>{
        message.warning('输入的信息不正确');
    }
    render() {
        if(isLogin()){
            return <Navigate to={"/"}/>
        }
        return (
            <div className={"login-pane"}>
                <div className={"pane"}>
                    <div className={"title"}>撩学堂-后台管理系统</div>
                    <Form
                        name="lxt_login"
                        className="login-form"
                        onFinish={this.onFinish}
                        onFinishFailed = {this.onFinishFailed}
                    >
                        <Form.Item
                            name="account"
                            rules={[
                                {
                                    required: true,
                                    message: '用户名不能为空!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '密码不能为空！',
                                },{
                                    min:6,
                                    message:'密码不能少于6位',
                                }

                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="请输入密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button login_btn">
                                立即登录
                            </Button>
                        </Form.Item>


                    </Form>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginPane);
