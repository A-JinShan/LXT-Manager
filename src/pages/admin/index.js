import React,{Component} from "react";
import "./index.less"
import {isLogin} from "../../api/adminApi";
import MenuBar from "../../components/menuBar";
import RightTop from "../../components/rightTop";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {Layout, Breadcrumb} from 'antd';
import Overview from "./subPages/overview";
import Course from "./subPages/course";
import Category from "./subPages/category";
import Article from "./subPages/article";
import WebConfig from "./subPages/webConfig";
import Teacher from "./subPages/teacher";
import FocusCourse from "./subPages/focusCourse";
import NotFound from "./subPages/404";
import Statistics from "./subPages/statistics";

const {Content, Footer} = Layout;

class AdminPane extends Component{
    state = {
        operationPath:[]
    }

    /**
     * MenuBar 的回调函数
     * 监听菜单改变时,把titles返回到父组件，把返回的title设置到状态机中方便后续使用
     * @param titles
     * @private
     */
    _handleMenuChange = (titles)=>{
        if( titles !== this.state.operationPath){
            this.setState({
                operationPath:titles
            })
        }
    }

    render() {
        if(!isLogin()){
            return <Navigate to={"/login"}/>
        }
        let {operationPath} = this.state
        return (
            <div>
                <Layout className="admin-pane">
                    <MenuBar menuChangeFunc={this._handleMenuChange}/>
                    <Layout className={"site-layout"}>
                        <RightTop/>
                        <Content className={"content-pane"}>
                            <Breadcrumb className={"bread"} >
                                <Breadcrumb.Item key={'撩学堂-后台首页'}>撩学堂-后台首页</Breadcrumb.Item>
                                {
                                    operationPath.map(item=>{
                                        return (
                                            <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                                        )
                                    })
                                }
                            </Breadcrumb>
                            <div className={"site-layout-background"} >
                                <Routes>
                                    <Route path={'/'} element={<Overview/>}/>
                                    <Route path={'/ad_course'} element={<FocusCourse/>}/>
                                    <Route path={'/course_category'} element={<Category/>}/>
                                    <Route path={'/teacher'} element={<Teacher/>}/>
                                    <Route path={'/course/*'} element={<Course/>}/>
                                    <Route path={'/article/*'} element={<Article/>}/>
                                    <Route path={'/chart/*'} element={<Statistics/>}/>
                                    <Route path={'/web_contact'} element={<WebConfig/>}/>
                                    <Route path={'*'} element={<NotFound/>}/>
                                </Routes>
                            </div>
                        </Content>
                        <Footer className={"footer"}>开始时间:2022-02-22 完成时间:2022-03-07 By-JinShan</Footer>
                    </Layout>
                </Layout>
                <Outlet/>
            </div>
        )
    }
}

export default AdminPane;