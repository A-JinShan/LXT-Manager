import React,{Component} from "react"
import ReactECharts from "echarts-for-react";
import {getCategoryCourseCount} from "../../../../../../api/statisticsApi";
import {Card} from "antd";

class StatisticsCourse extends Component{

    state = {
        data:[]
    }

    _getOption = (data)=>{
        return {
            xAxis: {
                type: 'category',
                data: data.map(item=>item.category_name)
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: data.map(item=>item.category_name),
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    }
                }
            ]
        };
    }

    /**
     * 加载学科课程统计数据
     * @private
     */
    _loadCategoryCourseCountData = ()=>{
        getCategoryCourseCount().then(result=>{
            this.setState({
                data:result.data
            })
        })
    }

    componentDidMount() {
        this._loadCategoryCourseCountData()
    }

    render(){
        const {data} = this.state
        return (
            <Card title={"学科课程统计"} >
                <ReactECharts option={this._getOption(data)} />
            </Card>
        )
    }
}

export default StatisticsCourse