(function (window,undefinded){ // 为了兼容性
    var doc = window.document;
    var arr = doc.querySelectorAll(".small-img-box a"); // arr指向所有小图
    var bigImg = doc.querySelector(".big-img"); // bigImg指向将要显示的大图
    for(var i = 0 ; i < arr.length; i++){
        arr[i].addEventListener("click", function(e){
            bigImg.src = this.getAttribute("href");
            doc.querySelector(".small-img-box .hover").classList.remove("hover");
            this.classList.add("hover");
            e.preventDefault();
            //return false;  // ??
        }, false);
    }
})(window);