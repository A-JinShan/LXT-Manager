import React,{Component} from "react";
import {Button, Result} from "antd";
import {Link} from "react-router-dom";

class NotFound extends Component{
    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="访问的页面不存在，请不要瞎操作，你可以点击下面按钮回到首页！"
                extra={<Button type="primary"><Link to={'/'}>回到首页</Link></Button>}
            />
        )
    }
}

export default NotFound