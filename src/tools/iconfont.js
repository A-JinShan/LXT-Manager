import { createFromIconfontCN } from '@ant-design/icons';

/***
 * 导入阿里图标库
 * @type {React.FC<IconFontProps<string>>}
 */
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3203790_w326fro7cf.js', //图标地址
});

export default IconFont;