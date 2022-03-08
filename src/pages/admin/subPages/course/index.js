import React,{Component} from "react";
import {Routes,Route} from "react-router-dom"
import CourseList from "./subPages/courseList";
import CourseEdit from "./subPages/courseEdit";
import CourseAdd from "./subPages/courseAdd";
import NotFound from "../404";

class Course extends Component{
    render() {
        return (
            <div>
                <Routes>
                    <Route path={'/'} element ={<CourseList/>}/>
                    <Route path={'/add'} element ={<CourseAdd/>}/>
                    <Route path={'/edit/:id'} element ={<CourseEdit/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </div>
        )
    }
}

export default Course