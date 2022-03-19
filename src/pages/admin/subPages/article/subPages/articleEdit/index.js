import React,{Component} from "react"
import {Breadcrumb, Button, Card, Form, Input, message} from "antd";
import {Link} from "react-router-dom";
import RichTextEditor from "../../../../../../components/richTextEditor";
import withRouter from "../../../../../../tools/withRouter";
import {getArticleDetail, updateArticle} from "../../../../../../api/articleApi";


const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

class ArticleEdit extends Component{
    state = {
        currentEditArticle:{}
    }

    _handlerUpdate = ()=>{
        console.log(this.props.params["id"]);
        this.articleEditForm.validateFields().then(result =>{
            updateArticle(result).then(res =>{
                if(res.code === 0 ){
                    this.props.navigate("/article",{replace:true})
                    message.success("更新文章成功")
                }else{
                    message.error("更新文章失败")
                }
            })
        }).catch(error =>{
            message.warn("更新文章文章失败,请检查数据规范")
        })
    }

    /**
     * 加载当前编辑的
     * @private
     */
    _uploadCurrentArticle = ()=>{
        const  id = this.props.params["id"]
        getArticleDetail(id).then(result =>{
            this.setState({
                currentEditArticle:result.data
            })
        })
    }

    componentDidMount() {
        this._uploadCurrentArticle()
    }

    render(){
        const {currentEditArticle}=this.state

        const articleEditPane = <Form
            ref={dom=>this.articleEditForm =dom}
            name="article-add-form"
            initialValues={currentEditArticle}
            {...formItemLayout}
        >
            <Form.Item
                label="文章ID"
                name="id"
                rules={[{ required: true, message: '必须输入文章ID' }]}
                hidden={true}
            >
                <Input />
            </Form.Item>

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

        return (
            <Card title={
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={"/article"}>文章列表</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>文章编辑</Breadcrumb.Item>
                </Breadcrumb>
            } extra={<Button type={"primary"} onClick={this._handlerUpdate}>更新</Button>}>
                {!currentEditArticle.id ? <div/> : articleEditPane}
            </Card>
        )
    }
}

export default withRouter(ArticleEdit)