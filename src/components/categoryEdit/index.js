import React,{Component} from "react";
import Modal from "antd/es/modal/Modal";
import {editCategory} from "../../api/categoryApi";
import {Form, Input, message} from "antd";
import PropTypes from "prop-types";

class CategoryEdit extends Component{
    static propTypes = {
        visible: PropTypes.bool,
        currentEditCategoryData:PropTypes.object,
        _showOrHiddenPane:PropTypes.func,
        _onFinished:PropTypes.func
    }

    static defaultProps = {
        visible:false,
        currentEditCategoryData:{},
        _showOrHiddenPane:()=>{},
        _onFinished:()=>{}
    }

    render() {
        const {visible,currentEditCategoryData,_showOrHiddenPane,_onFinished} =this.props
        return (
            <Modal
                title="编辑分类"
                okText={"确定"}
                cancelText={"取消"}
                visible={visible}
                destroyOnClose={true} // 关闭时销毁 Modal 里的子元素
                onOk={() => {
                    this.editForm.validateFields().then(result =>{
                        editCategory(result.id,result.title).then((res)=>{
                            // console.log(res)
                            if(res.code ===0){
                                //更新成功
                                //关闭模态窗口
                                _showOrHiddenPane()
                                //显示提示信息
                                message.success("分类修改成功！")
                                //刷新表格数据
                                _onFinished()
                            }else{
                                //更新失败
                                message.warn("更新失败！")
                            }
                        })
                    }).catch(()=>{
                        message.error("请确认输入的内容规则！")
                    })
                }}
                onCancel={() => {
                    _showOrHiddenPane()
                }}
            >

                <Form
                    name="edit_category"
                    autoComplete="off"
                    ref={dom => (this.editForm = dom)}
                    initialValues={currentEditCategoryData}
                >
                    <Form.Item
                        label="ID"
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: '请输入新增分类名称!',
                            },
                        ]}
                    >
                        <Input disabled={true}/>
                    </Form.Item>

                    <Form.Item
                        label="分类名称"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: '请输入新增分类名称!',
                            },
                        ]}
                    >
                        <Input placeholder={"请输入分类名称"}/>
                    </Form.Item>
                </Form>

            </Modal>
        )
    }
}

export default CategoryEdit