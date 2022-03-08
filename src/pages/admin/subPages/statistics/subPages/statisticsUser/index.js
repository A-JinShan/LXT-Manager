import React,{Component} from "react"
import {getCategoryCourseCount, getUserWeekCount} from "../../../../../../api/statisticsApi";
import {Card} from "antd";
import ReactECharts from "echarts-for-react";
import {getFormalDate} from "../../../../../../tools/dateTool";

class StatisticsUser extends Component{
    state = {
        data:[]
    }

    _getOption = (data)=>{
        return  {
            xAxis: {
                type: 'category',
                data: data.map(item=>getFormalDate(item.register_time))
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: data.map(item=>item.register_count),
                    type: 'line',
                    smooth: true
                }
            ]
        };
    }

    /**
     * 加载一周内用户增长数据
     * @private
     */
    _loadCategoryCourseCountData = ()=>{
        getUserWeekCount().then(result=>{
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
            <Card title={"用户增长统计"} >
                <ReactECharts option={this._getOption(data)} />
            </Card>
        )
    }
}

export default StatisticsUser