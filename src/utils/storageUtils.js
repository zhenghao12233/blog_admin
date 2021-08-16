export default {
    setStorage(key,params){
        localStorage.setItem(key,JSON.stringify(params))
    },
    getStorage(key) {
        return JSON.parse(localStorage.getItem(key) || '{}')
    },
    deleteStorage(key) {
        localStorage.removeItem(key)
    },
    clearStorage() {
        localStorage.clear()
    }
}