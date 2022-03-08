import React,{Component} from "react";
import {Routes,Route} from "react-router-dom"
import StatisticsUser from "./subPages/statisticsUser";
import StatisticsCourse from "./subPages/statisticsCourse";
import StatisticsComment from "./subPages/statisticsComment";

class Statistics extends Component{
    render() {
        return (
            <div>
                <Routes>
                   <Route path={"/bar"} element={<StatisticsCourse/>}/>
                   <Route path={"/line"} element={<StatisticsUser/>}/>
                   <Route path={"/pie"} element={<StatisticsComment/>}/>
                </Routes>
            </div>
        )
    }
}

export default Statistics