import React,{Component} from "react";
import {Route,Routes} from "react-router-dom"
import ArticleList from "./subPages/articleList";
import ArticleAdd from "./subPages/articleAdd";
import ArticleEdit from "./subPages/articleEdit";
import NotFound from "../404";

class Article extends Component{
    render() {
        return (
            <div>
                <Routes>
                    <Route path={'/'} element={<ArticleList/>} />
                    <Route path={'/add'} element={<ArticleAdd/>} />
                    <Route path={'/edit/:id'} element={<ArticleEdit/>} />
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </div>
        )
    }
}

export default Article