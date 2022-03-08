import {useLocation, useNavigate,useParams} from "react-router-dom";

/**
 * 在组件props加上location,和 navigate 方便后续操作
 * @param Child 组件
 * @returns {function(*)}
 */
export default function withRouter( Child ) {
    return ( props ) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        return <Child { ...props } navigate={ navigate } location={ location } params={ params }/>;
    }
}