var el = document.querySelector("#content");

// 可以抓取之前保存过的数据
el.value = localStorage.getItem("data") || '';

// 失去焦点则触发保存数据事件
el.addEventListener("blur", function(){
    // 获取文本内容
    var data = el.value;
    // 内容保存到服务器，离线则保存到本地
    if(navigator.onLine){
        saveOnline(data);
    } else{
        localStorage.setItem("data", data);
    }
});

// 监听上线事件
window.onLine = function(){
    // 从本地获取数据
    var data = localStorage.getItem("data");
    if(!!data){
        // 数据存在则保存在云端
        saveOnline(data);
        // 同时清空本地缓存
        localStorage.removeItem("data");
    } 
};

function saveOnline(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/savedata');
    xhr.send("data=" + data);
}