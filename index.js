/*
说明：
这是一个《大家来找茬》的问题求解器。
这个小工具是为了打游戏而写的。原程序配合abd工具，截取手机屏幕，在网页上显示两张图片不一样的地方。


图像坐标系：
   |
---+--------------------> x
   |
   |
   |
   |
   |
   V 
     y

下面是不同手机玩腾讯小程序版《大家来找茬》时手机中两张图的位置与尺寸。



// iphone 8 :   
{
    imgWidth:824,    // 图片宽度
    imgHeight:827,   // 图片高度
    x1:214,          // 第一张图左上角位置，x坐标
    y1:165,          // 第一张图左上角位置，y坐标
    x2:214,          // 第二张图左上角位置，x坐标
    y2:1026          // 第二张图左上角位置，y坐标
}

// sunsung note 8 (最高像素屏)日常游戏: 
{imgWidth:1100,imgHeight:1100,x1:286,y1:422,x2:286,y2:1570}

// sunsung note 8 (最高像素屏)多人比赛: 
{
    imgWidth:1100,
    imgHeight:1100,
    x1:266,
    y1:330,
    x2:266,
    y2:1530
}

// sunsung note 8 (最低像素屏)多人比赛: 
{
    imgWidth:550,
    imgHeight:550,
    x1:133,
    y1:165,
    x2:133,
    y2:765
}
*/

var baseXY = 
{
    imgWidth:550,
    imgHeight:550,
    x1:133,
    y1:165,
    x2:133,
    y2:765
};


//获取canvas元素
var cvs0 = document.getElementById("cvs0");
var cvs1 = document.getElementById("cvs1");
var cvs2 = document.getElementById("cvs2");
var cvs3 = document.getElementById("cvs3");

//创建image对象
var imgObj = new Image();
imgObj.src = "test.png";

var imgWidth = baseXY.imgWidth; // 
var imgHeight = baseXY.imgHeight; // 

imgObj.onload = function() {
    //待图片加载完后，将其显示在canvas上
    var ctx0 = cvs0.getContext('2d');
    var ctx1 = cvs1.getContext('2d');
    var ctx2 = cvs2.getContext('2d');
    var ctx3 = cvs3.getContext('2d');

    {
        cvs0.width = imgObj.width;
        cvs0.height = imgObj.height;
    }
    {
        cvs1.width = imgWidth;
        cvs1.height = imgHeight;
    }
    {
        cvs2.width = imgWidth;
        cvs2.height = imgHeight;
    }
    {
        cvs3.width = imgWidth;
        cvs3.height = imgHeight;
    }


    ctx0.drawImage(imgObj, 0, 0,imgObj.width,imgObj.height);
    ctx1.drawImage(imgObj, baseXY.x1, baseXY.y1, imgObj.width, imgObj.height, 0, 0, imgObj.width, imgObj.height);
    ctx2.drawImage(imgObj, baseXY.x2, baseXY.y2, imgObj.width, imgObj.height, 0, 0, imgObj.width, imgObj.height);

    var data1 = ctx1.getImageData(0, 0, imgWidth, imgHeight);
    var data2 = ctx2.getImageData(0, 0, imgWidth, imgHeight);

    let data3 = ctx3.createImageData(data1.width, data1.height);

    var dataLength = data1.width*4*data1.height*4;
    for(var i = 0;i<dataLength;i++) {
        if((i+1)%4 == 0) {
            data3.data[i] = data1.data[i];
        } else {
            var x2 = data2.data[i];
            var x1 = data1.data[i];
            data3.data[i] = Math.abs(x2 - x1);
            
        }
    }

    ctx3.putImageData(data3,0,0);
};