const searchBuffer = (url, params) => {
    let firstIndex = url.indexOf(params)
    let endIndex = url.indexOf('&', firstIndex) == -1 ? url.length : url.indexOf('&', firstIndex)
    return url.substring(firstIndex, endIndex).split('=')[1]
}

module.exports = {
    searchBuffer
}