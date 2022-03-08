import React,{Component} from "react";
import { Layout, Menu } from 'antd';
import "./index.less"
import IconFont from "../../tools/iconfont";
import {Link} from "react-router-dom";
import menuItems from "../../configs/menuConfig"
import withRouter from "../../tools/withRouter"

const { Sider } = Layout;
const { SubMenu } = Menu;

class MenuBar extends Component{
    state = {
        collapsed: false,
        routeToTitle:{},
    };

    /**
     * 菜单展开合并的控制
     * @param collapsed
     */
    _onCollapse = collapsed => {
         // console.log(collapsed);
        this.setState({ collapsed });
    };

    /**
     * 将菜单数据转换为 router => title的键值对，方便后续查找
     * @param menuData
     * @private
     */
    _handleMenuData(menuData){
        let routeToTitle = {"404":["404"]};
        menuData.forEach(item =>{
            if(!item.children){
                routeToTitle[item.route] = [item.title]
            }else {
                routeToTitle[item.route] = [item.title]
                item.children.forEach(subItem =>{
                    routeToTitle[subItem.route] = [item.title,subItem.title]
                })
            }
        })
        return routeToTitle
    }

    /**
     * 获取路由相对应的面包屑导航的标题
     * 如果完全匹配标题不存在，则取路由的上一节路径直至匹配完成
     * 如果都没匹配到则返回404
     * @param key
     * @returns {*}
     * @private
     */
    _getRouterTitle = (key)=>{
        if(key.length > 0){
            let titles  = this.state.routeToTitle[key]
            if(titles) return titles
            key = key.substring(0,key.lastIndexOf('/'))
            return this._getRouterTitle(key)
        }else{
            return this.state.routeToTitle["404"]
        }
    }

    /**
     * 菜单点击面包屑导航改变
     * @param key
     * @private
     */
    _handlerMenuClick = ({key})=>{
        let titles  = this._getRouterTitle(key)
         // console.log(titles)
        if(typeof this.props.menuChangeFunc === "function" ){
            this.props.menuChangeFunc(titles)
        }
    }


    /**
     * 左侧菜单条目映射
     * @param menuItems
     * @returns {*}
     */
    _renderMenus(menuItems) {
        return menuItems.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item  key={item.route} icon={<IconFont type={item.icon}/>}>
                        <Link to={item.route}> {item.title}</Link>
                    </Menu.Item>
                )
            }else {
                return (
                    <SubMenu  key={item.route} icon={<IconFont type={item.icon} />} title={item.title}>
                        {this._renderMenus(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    _handlerTruePathName = (pathname)=>{
        while (true){
            if(pathname.length === 0 ) return "/"
            let titles  = this.state.routeToTitle[pathname]
            if(titles) return pathname
            pathname = pathname.substring(0,pathname.lastIndexOf('/'))
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const key = this.props.location.pathname
        // console.log(pathname);
        this._handlerMenuClick({key})
    }

    /**
     * 当组件加载完成后把处理的标题数据放到状态机中
     */
    componentDidMount() {
        this.setState({
            routeToTitle:this._handleMenuData(menuItems)
        })
    }

    render() {
        const {collapsed} = this.state
        const pathname = this._handlerTruePathName(this.props.location.pathname)
        return(
            <Sider collapsible collapsed={collapsed} onCollapse={this._onCollapse}>
                <div className="logo" >
                    {collapsed ? "撩":"撩学堂-后台管理"}
                </div>
                <Menu onClick={this._handlerMenuClick} theme="dark" defaultSelectedKeys={['1']} mode="inline" selectedKeys={pathname}>
                    {this._renderMenus(menuItems)}
                </Menu>
            </Sider>
        )
    }
}

export default  withRouter(MenuBar);