import React,{Component} from "react"
import {Breadcrumb, Button, Card, Form, Input, message} from "antd";
import {Link} from "react-router-dom";
import RichTextEditor from "../../../../../../components/richTextEditor";
import {addArticle} from "../../../../../../api/articleApi";
import withRouter from "../../../../../../tools/withRouter";

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

class ArticleAdd extends Component{

    /**
     * 处理文章添加业务
     * @private
     */
    _handlerAdd = ()=>{
        this.articleAddForm.validateFields().then(result =>{
            // console.log(result)
            addArticle(result).then(res =>{
                console.log(res)
                if(res.code === 0 ){
                    message.success("新增文章成功")
                    this.props.navigate("/article",{replace:true})
                }else{
                    message.error("新增文章失败")
                }
            })
        }).catch(error =>{
            message.warn("新增文章失败,请检查数据规范")
        })
    }

    render(){
        return (
            <Card title={
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={"/article"}>文章列表</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>文章新增</Breadcrumb.Item>
                </Breadcrumb>
            } extra={<Button type={"primary"} onClick={this._handlerAdd}>保存</Button>}>
                <Form
                    ref={dom=>this.articleAddForm =dom}
                    name="article-add-form"
                    {...formItemLayout}
                >
                    <Form.Item
                        label="文章标题"
                        name="title"
                        rules={[{ required: true, message: '必须输入文章标题' }]}
                    >
                        <Input placeholder={"请输入文章标题"} />
                    </Form.Item>

                    <Form.Item
                        label="文章简介"
                        name="intro"
                        rules={[{ required: true, message: '必须输入文章简介' }]}
                    >
                        <Input.TextArea placeholder={"请输入文章简介"} />
                    </Form.Item>

                    <Form.Item
                        label="文章内容"
                        name="content"
                        rules={[{ required: true, message: '必须输入文章内容' }]}
                    >
                        <RichTextEditor placeholder={"请输入文章内容"}/>
                    </Form.Item>

                </Form>


            </Card>
        )
    }
}

export default withRouter(ArticleAdd)