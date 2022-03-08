import React, {Component} from "react";
import {Button, Card, Form, Input, message} from "antd";
import UnloadFile from "../../../../components/uploadFile";
import {baseURL} from "../../../../tools/Ajax";
import {deleteConfigImage, getConfigData, updateConfigData} from "../../../../api/configApi";
import {deleteFile} from "../../../../tools/FileProcess";


const formItemLayout = {
    labelCol: {span: 9},
    wrapperCol: {span: 6},
};

class WebConfig extends Component {

    state = {
        configData: {}
    }


    componentDidMount() {
        this._unloadConfigData()
    }

    /**
     * 加载配置数据
     * @private
     */
    _unloadConfigData = () => {
        getConfigData().then(result => {
            if (result.code === 0) {
                this.setState({
                    configData: result.data
                })
            }
        })
    }

    /**
     * 处理配置更新业务
     * @private
     */
    _handlerUpdate = ()=>{
        this.configForm.validateFields().then(result =>{
            updateConfigData(result).then(res=>{
              if (res.code === 0){
                  this.setState({
                      configData:res.data
                  })
                  message.success("更新成功")
              }else {
                  message.error("更新失败")
              }
            })
        }).catch(error =>{
            message.error("更新失败")
        })
    }

    render() {
        const {configData} = this.state
        return (
            <Card title="网站的联系配置" extra={<Button type={"primary"} onClick={this._handlerUpdate}>更新</Button>}>
                {!configData.id ? <div/> : <Form
                    ref={dom => this.configForm = dom}
                    name="config-form"
                    initialValues={configData}
                    {...formItemLayout}
                >
                    <Form.Item
                        name="id"
                        label="ID"
                        style={{display: "none"}}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="tel"
                        label="联系电话"
                        rules={[
                            {
                                required: true,
                                message: '必须输入联系电话',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item label="微信">
                        <Form.Item name="wechat_qrcode" noStyle>
                            <UnloadFile  name={"img"} fileType={"image"}
                                        previewBaseURL={baseURL} action={baseURL + "/api/manager/config/upload_img"}
                                        cheakFile={this.checkFile} deleteFile={(filePath)=>{deleteFile(filePath,deleteConfigImage)}}/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="小程序">
                        <Form.Item name="mini_program" noStyle>
                            <UnloadFile  name={"img"} fileType={"image"}
                                        previewBaseURL={baseURL} action={baseURL + "/api/manager/config/upload_img"}
                                        cheakFile={this.checkFile} deleteFile={(filePath)=>{deleteFile(filePath,deleteConfigImage)}}/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="微博">
                        <Form.Item name="wb_qrcode" noStyle>
                            <UnloadFile  name={"img"} fileType={"image"}
                                        previewBaseURL={baseURL} action={baseURL + "/api/manager/config/upload_img"}
                                        cheakFile={this.checkFile} deleteFile={(filePath)=>{deleteFile(filePath,deleteConfigImage)}}/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="APP">
                        <Form.Item name="app" noStyle>
                            <UnloadFile  name={"img"} fileType={"image"}
                                        previewBaseURL={baseURL} action={baseURL + "/api/manager/config/upload_img"}
                                        cheakFile={this.checkFile} deleteFile={(filePath)=>{deleteFile(filePath,deleteConfigImage)}}/>
                        </Form.Item>
                    </Form.Item>
                </Form>}
            </Card>
        )
    }
}

export default WebConfig