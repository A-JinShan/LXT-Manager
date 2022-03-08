import React, {Component} from "react"
import BraftEditor from 'braft-editor'
import "./index.less"

class RichTextEditor extends Component {
    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(this.props.value)
    }

    _controls =['undo', 'redo', 'separator',
        'font-size', 'line-height', 'letter-spacing', 'separator',
        'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
        'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
        'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
        'link', 'separator', 'hr', 'separator', 'separator', 'clear']

    _handleEditorChange = (editorState) => {
        this.setState({ editorState })
        if(typeof this.props.onChange === "function"){
            this.props.onChange(editorState.toHTML())
        }
    }

    render() {
        const {editorState} = this.state
        const {placeholder = ""} = this.props
        return (
            <div className="rich-text-editor" >
                <BraftEditor
                    controls={this._controls}
                    value={editorState}
                    onChange={this._handleEditorChange}
                    placeholder={placeholder}
                />
            </div>
        )
    }
}

export default RichTextEditor