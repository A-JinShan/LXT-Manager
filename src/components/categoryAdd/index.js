import React,{Component} from "react";
import Modal from "antd/es/modal/Modal";
import {addCategory} from "../../api/categoryApi";
import {Form, Input, message} from "antd";
import PropTypes from 'prop-types';

class CategoryAdd extends Component{
    static propTypes = {
        visible: PropTypes.bool,
        _showOrHiddenPane:PropTypes.func,
        _onFinished:PropTypes.func
    }

    static defaultProps = {
        visible:false,
        _showOrHiddenPane:()=>{},
        _onFinished:()=>{}
    }
    render() {
        const {visible,_showOrHiddenPane,_onFinished} = this.props
        return (
            <Modal
                title="新增分类"
                okText={"新增"}
                cancelText={"取消"}
                visible={visible}
                // destroyOnClose={true} // 关闭时销毁 Modal 里的子元素
                onOk={() => {
                    //获取表单数据
                    this.addForm.validateFields().then(result => {
                        //调用接口新增数据
                        addCategory(result.title).then(res => {
                            //新增成功->给用户提示->关闭模态窗口->刷新数据
                            if (res.code === 0) {
                                _showOrHiddenPane()
                                this.addForm.resetFields()  //重置表单控件
                                message.success("分类新增成功！")
                                _onFinished()
                            } else { //新增失败
                                message.error("分类新增失败！")
                            }
                        })
                    }).catch(() => {
                        //新增失败
                        message.error("请确认输入的内容规则！")
                    })
                }}
                onCancel={() => {
                    _showOrHiddenPane()
                }}
            >

                <Form
                    name="add_category"
                    autoComplete="off"
                    ref={dom => (this.addForm = dom)}
                >
                    <Form.Item
                        label=" "
                        name="title"
                        colon={false}
                        rules={[
                            {
                                required: true,
                                message: '必须输入分类名称！',
                            },
                        ]}
                    >
                        <Input placeholder={"请输入新增分类名称"}/>
                    </Form.Item>
                </Form>

            </Modal>
        )
    }
}

export default CategoryAdd