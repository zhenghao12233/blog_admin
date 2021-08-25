
import { ajax } from './index.js'

/* 
    添加列表
        url: saveArticle
        参数: [title, content, thumb, article, type]
*/
export const saveArticle = (url,data) => {
    return ajax(url,data,"post");
}

/* 
    获取列表：
        url:  findTitleOrContentOrType
        参数:  [title,content,[page],[size],[type]]
            title、contnet模糊查询（两者满足一项），空为查找全部
*/
export const getArticleList = (url ,data ) => {
    return ajax(url, data);
}

/* 
    更新文章
        url: updateArticle
        参数：[id,title,content,article,thumb,type]
*/
export const updateArticle = (url, data) => {
    return ajax(url,data)
}

/* 
    删除文章
        url: deleteArticle
        参数: [id]
*/
export const deleteArticle = (url, data) => {
    return ajax(url,data)
}

/* 
    获取单篇文章
        url: findAllById
        参数: [id]
*/
export const findAllById = (url, data) => {
    return ajax(url,data)
}
