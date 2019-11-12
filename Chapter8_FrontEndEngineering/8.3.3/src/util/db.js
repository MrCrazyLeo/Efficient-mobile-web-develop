// 封装DB操作
(function($window){
    const indexedDB = $window.indexedDB;
    const DB_NAME = 'mkeditor';
    const STORE_NAME = 'artical';
    const openDB = (verson = 1) => {
        return new Promise((resolve, reject) => {
            // 打开数据库
            const request = indexedDB.open(DB_NAME, verson)
            request.addEventListener("error", (e) => {
                reject(e.target.error)
            });
            request.addEventListener("success", (e) => {
                resolve(e.target.result)
            });
            // 第一次创建数据库时触发该事件
            request.addEventListener("upgradeneeded", (e) => {
                const db = e.target.result;
                // 检测是否存在指定的表
                if(!db.objectStoreNames.contains(STORE_NAME)){
                    // 如果不存在，则创建，并指定一个自增的id作为查询依据
                    db.createObjectStore(STORE_NAME, {kayPath: "id", autoIncreament: true})
                };
            });
        });
    };


    const wrapPromise = (fn) => {
        return new Promise((resolve, reject) => {
            const request = fn();
            request.addEventListener("error", (e) => {
                reject(e.target.error)
            });
            request.addEventListener('success', (e) => {
                resolve(e.target.result);
            });
        })
        
    };

    // 获取数据表的实例
    const getStore = (mode = 'readonly') => {
        return openDB().then((db) => {
            return db.transaction(STORE_NAME).objectStore(STORE_NAME)
        });
    };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

    const add = (data) => {
        return getStore('readwrite').then((store) => {
            return wrapPromise(() => {
                return store.add(data);
            });
        });
    };

    // 保存一条数据：添加和修改
    const save = (data) => {
        const id = data.id;
        if(id){
            return getStore('readwrite').then((store) =>{
                return wrapPromise(() => {
                    return store.get(id)
                }).then((result) => {
                    if(result){
                        Object.assign(result, data);
                        return wrapPromise(() => {
                            return store.put(result)
                        })
                    } else{
                        return Promise.reject(new Error(`item with id ${id} not found`))
                    }
                })
            })
        } else{
            return add(data);
        }
    };

    // 获取表中所有数据
    const getAll = () => {
        return getStore().then((store) => {
            return new Promise((resolve, reject) => {
                const request = store.openCursor();
                let resuts = [];
                request.addEventListener("success", (e) => {
                    const cursor = e.target.result;
                    if(cursor){
                        // 如果游标存在，执行回调并传入当前数据行
                        resuts.push(cursor.value);
                        // 继续下一行数据
                        cursor.continue();
                    } else{
                        return resolve(resuts);
                    }
                })
                request.addEventListener("error", (e) => {
                    reject(e.target.error)
                })
            })
        })
    };

    // 获取数据表中指定id的数据
    const getById = (id) => {
        return getStore().then((store) => {
            return wrapPromise(()=>{
                return store.get(id)
            })
        })
    };

    // 删除数据表中指定id的数据
    const delData = (id) => {
        return getStore('readwrite').then((store) => {
            return wrapPromise(() => {
                return store.delete(id);
            })
        })
    };

    // MKDB就是MarkdownDB啦
    $window.MKDB = {
        save: save,
        getAll: getAll,
        getById: getById,
        delete: delData
    }

}(window))