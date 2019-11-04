// 预先定义每一个便签的HTML代码
var divstr = "<div class='note'><a class='close'>✖</a><textarea></textarea></div>";
// 实例化一个便签数据库、数据表，LocalDB定义在外置js文件中
var db = new LocalDB("db1", "table1");
db.open(function(){
    // 页面初始化时获取已有便签
    db.getAll(function(data){
        var div = $(divstr);
        div.data("id", data.id);
        div.find("textarea").val(data.content);
        // 将便签插入添加按钮前边
        div.insertBefore(add);
    });
});

// 为添加按钮注册单击事件
var add = $(".add").on("click", function(){
    var div = $(divstr);
    div.insertBefore(add);
    // 添加一条空数据到数据库
    db.set({content:''}, function(id){
        // 将数据库生成的自增id赋值到便签上
        div.data('id', id);
    });
});

// 监听所有便签编辑域的焦点事件
$(".notes").on("blur", "textarea", function(){
    var div = $(this).parent();
    // 获取该便签的id和内容
    var data = {id: div.data("id"), content:$(this).val()};
    // 写入数据库
    db.set(data);
});

// 监听所有关闭按钮的单击事件
$('.notes').on("click",".close", function(){
    if(confirm("确定删除标签吗？")){
        var div = $(this).parent();
        db.remove(div.data("id"));
        div.remove();
    }
});