/**
 * Created by Administrator on 2017/4/13.
 */

fullpage.initialize('#fullpage', {
    afterLoad: function (anchorLink, index) {  /*回调函数，可添加动画效果*/
        var loadedSection = $(this);
        if (index == 1) {
            navEffect(index);
        }
        if (index == 2) {
            navEffect(index);
            setServe();
        }
        if (index != 2) {
            initServe();
        }
        if (index == 3) {
            navEffect(index);
            setCase();
            setCaseAnimal();
        }
        if (index != 3) {
            initCase();
            initCaseAnimal();
        }
        if (index == 4) {
            navEffect(index);
            setCustomer();
            autoCustomer();
        }
        if (index != 4) {
            initCustomer();
            CustomerHide();
        }
        if (index == 5) {
            navEffect(index);
            autoMv();
            autoSuperiority()
        }
        if (index != 5) {
            initMv();
            initSuperiority();
        }
        if (index == 6) {
            navEffect(index);
            setProject();
        }
        if (index != 6) {
            initProject();
        }
        if (index == 7) {
            navEffect(index);
            setTeam();
        }
        if (index != 7) {
            initTeam();
        }
        if (index == 8) {
            navEffect(index);
            autoAbout();
        }
        if (index != 8) {
            leaveAbout();
        }
        if (index == 9) {
            navEffect(index);
            contactIn();
        }
        if (index != 9) {
            contactOut();
        }
    }
});

//section0 首页-----------------------
// 导航效果
function navEffect(index) {
    $("#right-line1").stop().animate({left: 93 * (index - 1)}, 500);

    $("#leftNav li").eq(index - 1).find("span").css({
        width: 14,
        height: 14,
        borderRadius: 7
    }).end().siblings().find("span").css({
        width: 8,
        height: 8,
        borderRadius: 4
    });
}

//页面跳转
(function () {
    $("#caseUl .mask-top").click(function () {
        window.location.href = "../详情页/网站建设/construction.html";
    });
    $("#sign").click(function () {
        window.location.href = "../详情页/注册/details.html";
    });
})();

//顶部导航
(function () {
    var index = 0;
    $("#top-nav").children("li").mouseenter(function () {
        var $index = $(this).index();
        $("#right-line1").stop().animate({left: 93 * $index}, 500);
    }).click(function () {
        index = $(this).index();
        fullpage.moveTo(index + 1);
    }).mouseleave(function () {
        $("#right-line1").stop().animate({left: 93 * index}, 500);
    });

})();

//右侧导航
(function () {
    $("#sideUu").children("li").mouseenter(function () {
        $(this).children("div").stop().animate({
            width: 161
        }, 500);
        $(this).children("a").stop().animate({opacity: 0}, 100);
    }).mouseleave(function () {
        $(this).children("div").stop().animate({
            width: 0
        }, 500);
        $(this).children("a").stop().animate({opacity: 1}, 500);
    });
})();

//左侧导航
(function () {
    var $list = $("#leftNav a");
    $list.click(function () {
        var index = $(this).parent().index();
        fullpage.moveTo(index + 1);
    }).mouseenter(function () {
        $(this).find("span").css({
            width: 14,
            height: 14,
            borderRadius: 7
        });
        $(this).parent().find("em").stop().animate({"opacity": 1}, 200);
    }).mouseleave(function () {
        $(this).find("span").css({
            width: 8,
            height: 8,
            borderRadius: 4
        });
        $(this).parent().find("em").stop().animate({"opacity": 0}, 200);
    });
})();
// 结束--------------------------------------


// 开始--------------------------------------
//首页
(function () {
    var index = 0;
    var time = null;

    //创建构造函数
    function CarouselFlgure(indexBgImg, indexBtn, indexLeftAndRight, indexText) {
        this.containerObj = document.getElementById(indexBgImg);
        this.btnObjs = document.getElementById(indexBtn).children;
        this.lfAndRtObjs = document.getElementById(indexLeftAndRight).children;
        this.textObjs = document.getElementById(indexText).children;
    }

    //初始化轮播图按钮
    CarouselFlgure.prototype.btnList = function () {
        var that = this;
        var btnObjs = this.btnObjs;
        btnObjs[0].style.backgroundColor = "#ffffff";
        var containerObj = this.containerObj;
        var imgObjs = containerObj.children;
        var imgWidth = document.getElementById("section0").offsetWidth;
        for (var i = 0; i < imgObjs.length; i++) {
            imgObjs[i].style.width = imgWidth + "px";
        }
        for (var i = 0; i < btnObjs.length; i++) {
            btnObjs[i].index = i;
            btnObjs[i].onclick = function () {
                index = this.index;
                for (var i = 0; i < btnObjs.length; i++) {
                    btnObjs[i].style.backgroundColor = "";
                }
                this.style.backgroundColor = "#ffffff";
                $(containerObj).stop().animate({"left": -this.index * imgWidth}, 1000);
                that.text(index);
            };
        }
        this.btnLeftAndRight(containerObj, imgObjs, imgWidth, btnObjs)
    };

    //轮播图
    CarouselFlgure.prototype.btnLeftAndRight = function (containerObj, imgObjs, imgWidth, btnObjs) {
        var that = this;
        var imgLast = imgObjs[0].cloneNode(true);
        containerObj.appendChild(imgLast);

        var autoCarousel = function () {
            index++;
            if (index == imgObjs.length) {
                index = 1;
                containerObj.style.left = "0";
            }
            $(containerObj).stop().animate({"left": -index * imgWidth}, 1000);
            for (var i = 0; i < btnObjs.length; i++) {
                btnObjs[i].style.backgroundColor = "";
            }
            if (index == imgObjs.length - 1) {
                btnObjs[0].style.backgroundColor = "#ffffff";
            } else {
                btnObjs[index].style.backgroundColor = "#ffffff";
            }
            that.text(index);
        };

        time = setInterval(function () {
            autoCarousel();
        }, 3000);

        this.btnObjs[0].parentNode.onmouseover = function () {
            clearInterval(time);
        };
        this.btnObjs[0].parentNode.onmouseout = function () {
            time = setInterval(function () {
                autoCarousel();
            }, 3000);
        };
    };

    //初始化中间文字显示和隐藏
    CarouselFlgure.prototype.text = function (index) {
        var $imgObjs = $("#indexText>img");
        $imgObjs.each(function () {
            var element = $(arguments[1]);
            element.stop().animate({
                "width": 0,
                "left": 430
            }, 1000, function () {
                element.css("opacity", 0);
            })
        });

        $imgObjs.eq(index - 1).stop().animate({
            "width": 860,
            "left": 0,
            "opacity": 1
        }, 1000);
    };

    //实例化对象
    var example = new CarouselFlgure("indexBgImg", "indexBtn", "indexLeftAndRight", "indexText");

    //调用原型方法
    example.btnList();
})();

//section1 服务--------------------------
//服务内容特效
(function () {
    var ul = document.getElementById("svWhat");
    var list = ul.children;
    for (var i = 0; i < list.length; i++) {
        list[i].index = i;
        list[i].onmouseover = function () {
            var bg = this.children[4];
            var tw = this.children[0];
            animtteBackground(tw, [0, -164]); //调用函数 切换图片
            $(bg).stop().animate({"height": 380}, 500); //背景块
            this.children[1].style.transitionDelay = "0.3s"; //规定过渡效果在0.3s后开始   
            this.children[1].style.color = "#fff";
            this.children[2].style.transitionDelay = "0.2s";
            this.children[2].style.color = "#fff";
        };
        list[i].onmouseout = function () {
            var bg = this.children[4];
            var tw = this.children[0];
            animtteBackground(tw, [0, 0]);
            $(bg).stop().animate({"height": 0}, 500)
            this.children[1].style.transitionDelay = "0.2s";
            this.children[1].style.color = "";
            this.children[2].style.transitionDelay = "0.3s";
            this.children[2].style.color = "";
        };
    }

    //图片切换效果
    function animtteBackground(element, target) {
        clearInterval(element.timer);
        element.timer = setInterval(function () { //background-position
            var oldLeft = target[0];
            var oldTop = target[1];
            var bgP = getStyle(element, "backgroundPosition").split(" ");
            var newLeft = parseInt(bgP[0]);
            var newTop = parseInt(bgP[1]);
            var stepLf = (oldLeft - newLeft) / 10;
            stepLf = stepLf > 0 ? Math.ceil(stepLf) : Math.floor(stepLf);
            var stepTp = (oldTop - newTop) / 10;
            stepTp = stepTp > 0 ? Math.ceil(stepTp) : Math.floor(stepTp);
            var left = newLeft + stepLf;
            var top = newTop + stepTp;
            var step = left + "px " + top + "px";
            element.style.backgroundPosition = step;
            if (oldLeft == newLeft && oldTop == newTop) {
                clearInterval(element.timer);
            }
        }, 17);
    }

    function getStyle(element, attr) {
        return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element, null)[attr];
    }
})();

    //服务初始化
    function initServe() {
        var $h2Obj = $("#serve>h2");
        var $h3Obj = $("#serve>h3");
        $h2Obj.animate({fontSize: 15, opacity: 0}, 1000);
        $h3Obj.animate({top: 50, opacity: 0}, 1000);
        $h3Obj.children("img").animate({width: 300}, 1000);
    }
    //服务动画效果
    function setServe() {
        var $h2Obj = $("#serve>h2");
        var $h3Obj = $("#serve>h3");
        $h2Obj.animate({fontSize: 35, opacity: 1}, 1000);
        $h3Obj.animate({top: -20, opacity: 1}, 1000);
        $h3Obj.children("img").animate({width: 600}, 1000);
    }

    function getStyle(element, attr) {
        return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element, null)[attr];
    }
//-----------------------------------------


//section2 案例-----------------
//案例展示
(function () {
    var caseUl = my$("caseUl");
    var caseLi = caseUl.children;
    for (var i = 0; i < caseLi.length; i++) {
        var caseBigBox = caseLi[i].children[0];
        //点击大盒子，注册鼠标放上事件
        caseBigBox.onmouseover = function () {
            ////上部盒子
            var caseLiTop = this.children[0];
            var maskTop = caseLiTop.children[1];
            //下部盒子
            var caseLiBtm = this.children[1];
            //字体颜色
            var caseAobj = caseLiBtm.children[0];
            caseAobj.style.zIndex = 100;
            caseAobj.style.color = "white";
            caseAobj.children[0].style.color = "white";

            var maskBtm = caseLiBtm.children[1];
            animate(maskTop, {"top": 0});
            animate(maskBtm, {"bottom": 0});

        };
        caseBigBox.onmouseout = function () {
            ////上部盒子
            var caseLiTop = this.children[0];
            //字体颜色
            var maskTop = caseLiTop.children[1];
            //下部盒子
            var caseLiBtm = this.children[1];
            //字体颜色
            var caseAobj = caseLiBtm.children[0];
            caseAobj.style.zIndex = 0;
            caseAobj.style.color = "black";
            caseAobj.children[0].style.color = "#aaa";

            var maskBtm = caseLiBtm.children[1];
            animate(maskTop, {"top": -159});
            animate(maskBtm, {"bottom": -50});
        };
    }
})();

function initCaseAnimal() {
    var $list = $("#caseUl").find("li");
    var offSet = [];
    $list.each(function (index, element) {
        var top = $(element).offset().top;
        var left = $(element).offset().left;
        offSet.push({"top": top, "left": left});
    });
    $list.each(function (index, element) {
        $(element).offset({
            "top": offSet[index].top + 200,
            "left": offSet[index].left
        }).css("opacity", 0);
    });
}
function setCaseAnimal() {
    var $list = $("#caseUl").find("li");
    $list.each(function (index, element) {
        fun($(element), index * 100);
    });
    function fun(element, time) {
        setTimeout(function () {
            element.animate({top: 0, opacity: 1}, 1500);
        }, time)
    }
}

//案例初始化
function initCase() {
    var h2Case = $("#case>h2");
    var h3Case = $("#case>h3");
    h2Case.animate({fontSize: 15, opacity: 0}, 1000);
    h3Case.animate({top: 0, opacity: 0}, 1000);
    h3Case.children("img").animate({width: 200}, 1000);
}

//案例动画效果
function setCase() {
    var h2Case = $("#case>h2");
    var h3Case = $("#case>h3");
    h2Case.animate({fontSize: 30, opacity: 1}, 1000);
    h3Case.animate({top: 0, opacity: 1}, 1000);
    h3Case.children("img").animate({width: 400}, 1000);
}

//section3 客户--------------------
//客户初始化
function initCustomer() {
    var h2Customer = $("#customer>h2");
    var h3Customer = $("#customer>h3");
    var moreCustomer = $("#aCustomer");
    h2Customer.animate({fontSize: 15, opacity: 0}, 1000);
    h3Customer.animate({fontSize: 15, opacity: 0}, 1000);
    moreCustomer.animate({fontSize: 15, opacity: 0}, 1000);
}

//客户动画效果
function setCustomer() {
    var h2Customer = $("#customer>h2");
    var h3Customer = $("#customer>h3");
    var moreCustomer = $("#aCustomer");
    h2Customer.animate({fontSize: 28, opacity: 1}, 1000);
    h3Customer.animate({fontSize: 24, opacity: 1}, 1000);
    moreCustomer.animate({fontSize: 24, opacity: 1}, 1000);
}

function CustomerHide() {
    //customer部分
    var $leftList = $("#customerUl").children("li:odd");
    var $rightList = $("#customerUl").children("li:even");
    $leftList.css({left: 100, opacity: 0});
    $rightList.css({left: -100, opacity: 0});
}

function autoCustomer() {
    $("#customerUl").children("li").animate({left: 0, opacity: 1}, 1000);
}
// 结束--------------------------------------


//section4 优势---------------------------
function initMv() {
    $("#goodnessBg").css({width: 350, marginLeft: -175, top: 80});
}
function autoMv() {
    $("#goodnessBg").animate({width: 550, marginLeft: -275, top: 0}, 1500);
}

(function () {
    var $list = $("#list li");
    var offSet = [];
    $list.each(function (index, element) {
        var top = $(element).offset().top;
        var left = $(element).offset().left;
        offSet.push({"top": top, "left": left});
    });
    $list.each(function (index, element) {
        $(element).css("position", "absolute");
        $(element).offset({
            "top": offSet[index].top,
            "left": offSet[index].left
        });
    });
    $list.mouseenter(function () {
        $(this).stop().animate({width: 150, marginLeft: -10}, 200);
    }).mouseleave(function () {
        $(this).stop().animate({width: 130, marginLeft: 0}, 200);
    });
})();

function initSuperiority() {
    $("#superiority").css({"fontSize": 15, opacity: 0});
}
function autoSuperiority() {
    $("#superiority").animate({"fontSize": 30, opacity: 1}, 1500)
}

//section5 流程------------------
function setProject() {

    var list1 = $("#list1");
    var list2 = $("#list2");
    var list3 = $("#list3");
    var list4 = $("#list4");
    var list5 = $("#list5");
    var list6 = $("#list6");

    function fun(element, tp, time) {
        (function () {
            setTimeout(function () {
                element.animate({opacity: 1, top: tp}, 500);
            }, time)
        })(element, tp, time)
    }

    fun(list1, 132, 0);
    fun(list2, 100, 300);
    fun(list3, 66, 600);
    fun(list4, 0, 900);
    fun(list5, 34, 1200);
    fun(list6, 66, 1500);
}

function initProject() {
    $("#list1").css("opacity", "0").css("top", "32px");
    $("#list2").css("opacity", "0").css("top", "0");
    $("#list3").css("opacity", "0").css("top", "-34px");
    $("#list4").css("opacity", "0").css("top", "-100px");
    $("#list5").css("opacity", "0").css("top", "-66px");
    $("#list6").css("opacity", "0").css("top", "-34px");
}
// 结束--------------------------------------


//section6 团队内容特效
(function () {
    var teamUl = document.getElementById("teamUl");
    var list = teamUl.getElementsByTagName("li");
    for (var i = 0; i < list.length; i++) {
        list[i].onmouseenter = function () {
            $(this.children[0]).stop().animate({
                "width": 213,
                "height": 213,
                "top": -10,
                "left": -10
            }, 500).css("zIndex", 3);
            this.children[0].style.border = "2px solid #bbb";
            $(this.children[1]).stop().animate({
                "width": 387
            }, 500).css("zIndex", 2);
        };
        list[i].onmouseleave = function () {
            $(this.children[0]).stop().animate({
                "width": 193,
                "height": 193,
                "top": 0,
                "left": 0
            }, 500).css("zIndex", 0);
            this.children[0].style.border = "";
            $(this.children[1]).stop().animate({
                "width": 0
            }, 500).css("zIndex", 0);
        }
    }

//获取下面的按钮
    var teamBtn = document.getElementById("teamBtn");
    var leftBtn = teamBtn.children[0];
    var rightBtn = teamBtn.children[1];
    leftBtn.onclick = function () {
        $(teamUl).stop().animate({left: "0"}, 500);
        this.style.backgroundColor = "#009FDE";
        rightBtn.style.backgroundColor = "";
    };
    rightBtn.onclick = function () {
        $(teamUl).stop().animate({left: "-386"}, 500);
        this.style.backgroundColor = "#009FDE";
        leftBtn.style.backgroundColor = "";
    };
})();

//team初始化
function initTeam() {
    var $spanObj = $("#teamUl span");
    $spanObj.stop().animate({width: 0, zIndex: 0});
    var $imgObj = $("#teamUl img");
    $imgObj.stop().animate({
        width: 0,
        height: 0,
        left: 96,
        top: 96,
        opacity: 0,
        zIndex: 0
    }, 1000);
    if ($("#keepOut").length != 0) {
        return;
    }
    var $box = $("<div></div>").appendTo($("#team"));
    $box.attr("id", "keepOut");
    $box.css({
        width: 1160,
        height: 580,
        position: "absolute",
        zIndex: 5
    })
}
//team动画
function setTeam() {
    //获取img标签
    var arr1 = [1, 5, 7, 10, 15, 17];
    var arr2 = [3, 9, 13, 19, 4];
    var data = {
        width: 193,
        height: 193,
        left: 0,
        top: 0,
        opacity: 1
    };
    var $imgObj = $("#teamUl img");
    $imgObj.each(function (index, element) {
        if (arr1.indexOf(index) != -1) {
            (function () {
                setTimeout(function () {
                    $(element).stop().animate(data, 1000);
                }, 500);
            })(element)
        } else if (arr2.indexOf(index) != -1) {
            (function () {
                setTimeout(function () {
                    $(element).stop().animate(data, 1000, function () {
                        if ($("#keepOut").length != 0) {
                            $("#keepOut").remove();
                        }
                    });
                }, 1000);
            })(element)
        } else {
            $(element).stop().animate(data, 1000);
        }
    })
}
// 结束--------------------------------------


//section7 关于-------------------------
//封装页面进入的时候的函数
function autoAbout() {

    //获取得到页面中的h2标签
    var page8Us = my$("page8").getElementsByTagName("h2")[0];
    //获取得到页面中的h3标签
    var page8Com = my$("page8").getElementsByTagName("h3")[0];
    var sec8Pobjs = my$("sec8").children;

    //把需要出来的效果的标签全放到数组里面
    var array = [page8Us, page8Com];
    for (var i = 0; i < sec8Pobjs.length; i++) {
        array.push(sec8Pobjs[i]);
    }
//电脑屏幕的宽度
    var screenWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth || 0;

    $(array[0]).stop().animate({"opacity": 1, "left": ((screenWidth - 160) / 2), "top": 20}, function () {
        $(array[1]).stop().animate({"opacity": 1, "left": ((screenWidth - 300) / 2), "top": 90}, function () {
            $(array[2]).stop().animate({"opacity": 1, "left": ((screenWidth - 400) / 2), "top": 250}, function () {
                $(array[3]).stop().animate({"opacity": 1, "left": ((screenWidth - 1130) / 2), "top": 320}, function () {
                    $(array[4]).stop().animate({
                        "opacity": 1,
                        "left": ((screenWidth - 880) / 2),
                        "top": 420
                    }, function () {
                        $(array[5]).stop().animate({"opacity": 1, "left": ((screenWidth - 580) / 2), "top": 520});
                    });
                });
            });
        });
    });
};

//封装页面出去时候的函数
function leaveAbout() {

    //获取得到页面中的h2标签
    var page8Us = my$("page8").getElementsByTagName("h2")[0];
//获取得到页面中的h3标签
    var page8Com = my$("page8").getElementsByTagName("h3")[0];
    var sec8Pobjs = my$("sec8").children;
    //把需要出来的效果的标签全放到数组里面
    var array = [page8Us, page8Com];
    for (var i = 0; i < sec8Pobjs.length; i++) {
        array.push(sec8Pobjs[i]);
    }
//电脑屏幕的宽度
    var screenWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth || 0;

    for (var i = 0; i < array.length; i++) {
        array[i].style.opacity = 0;
        array[i].style.left = "-200px";
    }

};

//sec82部分,鼠标进入变宽，离开恢复
(function () {
    var sec82a = my$("sec82").children[0];
    sec82a.onmouseover = function () {
        $(sec82a).stop().animate({"width": 260})
    };
    sec82a.onmouseout = function () {
        $(sec82a).stop().animate({"width": 200})
    };
})();
// 结束--------------------------------------


//section8 联系----------------------
function contactIn() {
    var conLeft = my$("conLeft");
    var conRight = my$("conRight");
    $(conLeft).stop().animate({"left": 40, "opacity": 1}, 1000);
    $(conRight).stop().animate({"left": 550, "opacity": 1}, 1000);
    // contactAnimate(conLeft, {"left": 40, "opacity": 1});
    // contactAnimate(conRight, {"left": 550, "opacity": 1});
}
function contactOut() {
    var conLeft = my$("conLeft");
    var conRight = my$("conRight");
    $(conLeft).stop().animate({"left": -300, "opacity": 0}, 1000);
    $(conRight).stop().animate({"left": 1000, "opacity": 0}, 1000);
    // contactAnimate(conLeft, {"left": -300, "opacity": 0});
    // contactAnimate(conRight, {"left": 2000, "opacity": 0});
}
// 结束--------------------------------------