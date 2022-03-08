import React,{Component} from "react"
import ReactECharts from 'echarts-for-react';
import {getCommentScoreCount} from "../../../../../../api/statisticsApi";
import {Card} from "antd";

class StatisticsComment extends Component{
    state = {
        data:[]
    }

    _getOption = (data)=>{
        return  {
            title: {
                text: '评价分布统计',
                subtext: '通过此数据，观测课程质量',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                left: 'center',
                top: 'bottom',
                data: data.map(item => item.score+"分")
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: [
                {
                    name: '评价分布统计',
                    type: 'pie',
                    radius: [20, 140],
                    center: ['25%', '50%'],
                    roseType: 'radius',
                    itemStyle: {
                        borderRadius: 5
                    },
                    label: {
                        show: true
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    data: data.map(item => ({value: item.score_count, name: item.score + "分"}))

                },
                {
                    name: '评价分布统计',
                    type: 'pie',
                    radius: [20, 140],
                    center: ['75%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 5
                    },
                    data: data.map(item => ({value: item.score_count, name: item.score + "分"}))
                }
            ]
        };
    }

    /**
     * 加载评价分布统计是数据
     * @private
     */
    _loadCategoryCourseCountData = ()=>{
        getCommentScoreCount().then(result=>{
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
            <Card title={"评价分布统计"} >
                <ReactECharts option={this._getOption(data)} />
            </Card>
        )
    }
}

export default StatisticsComment