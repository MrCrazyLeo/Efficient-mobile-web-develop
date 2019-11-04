// 创建媒体数据源
var mediaSource = new MediaSource();
// 添加媒体数据源打开时的监听
mediaSource.addEventListener("sourceopen", handleSourceOpen, false);
var mediaRecorder, recordedBlobs, sourceBuffer;
var sourceVideo = document.getElementById("source");
var recordedVideo = document.getElementById("recorded");
var recordButton = document.getElementById("record");
recordButton.onclick = toggleRecording;
// 设置媒体约束
var constrains = {audio:true, video:{width: 320}};

// 成功获取到media资源
function handleSuccess(stream){
    // 取消录制按钮不可选中状态
    recordButton.disabled = false; 
    window.stream = stream;
    // 将媒体流放入播放源<video>标签内
    sourceVideo.srcObject = stream;
}

// 获取媒体流异常
function handleError(error){
    console.log("获取用户媒体流错误：", error);
}

// 获取用户媒体源
navigator.mediaDevices.getUserMedia(constrains).then(handleSuccess).catch(handleError);

// 处理媒体打开
function handleSourceOpen(event){
    sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs = "vp8"');
}

// 处理数据可用
function handleDataAvailable(event){
    if (event.data && event.data.size > 0) {
		recordedBlobs.push(event.data);	// 将数据追加到录制记录中
	}
}

// 切换录制按钮
function toggleRecording(){
    if(recordButton.textContent === "开始录制"){
        startRecording();
    } else{
        stopRecording();
        recordButton.textContent = "开始录制";
    }
}


// 开始录制函数
function startRecording(){
    recordedBlobs  = [];
    var mimeTypes = [
        'video/webm; codecs=vp9',
        'video/webm; codecs=vp8',
        'video/webm'
    ];

    // 查找支持的视频格式
    var mimeType = mimeTypes.find(type => MediaRecorder.isTypeSupported(type)) || '';
    try{
        // 创建媒体录制器
        mediaRecorder = new MediaRecorder(window.stream, {mimeType});
    } catch(e){
        alert('创建媒体录制器异常:' + e);
        return;
    }
    recordButton.textContent = "停止录制";
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(10);
}

// 终止录制
function stopRecording(){
    mediaRecorder.stop();
    var buf = new Blob(recordedBlobs, { type: 'video/webm' });
    // 设置已录制视频的源为录制好的视频
	recordedVideo.src = window.URL.createObjectURL(buf);
}