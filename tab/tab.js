function $(id) {
	return typeof id === 'string' ? document.getElementById(id) : id;
}
//window.onload=tab;  直接切换
//window.onload=tabdelay;  延时切换
window.onload = tabauto; //自动切换
function tab() {
	var titles = $("tab-title").getElementsByTagName("li");
	var divs = $("tab-con").getElementsByTagName("div");
	var timer = null;
	//判断标题内容数目是否对等
	if(titles.length != divs.length) {
		alert("标题内容数目不对等");
	}
	for(var i = 0; i < titles.length; i++) {
		titles[i].id = i;
		divs[i].id = i;
		titles[i].onmouseover = function() {
			//清除不在状态
			for(var j = 0; j < titles.length; j++) {
				titles[j].removeAttribute("class", "active");
				divs[j].style.display = 'none';
			}
			//设置当前状态样式
			this.setAttribute("class", "actice");
			divs[this.id].style.display = 'block';
		}
	}
}

function tabdelay() {
	var titles = $("tab-title").getElementsByTagName("li");
	var divs = $("tab-con").getElementsByTagName("div");
	var timer = null;
	//判断标题内容数目是否对等
	if(titles.length != divs.length) {
		alert("标题内容数目不对等");
	}
	for(var i = 0; i < titles.length; i++) {
		titles[i].id = i;
		divs[i].id = i;
		titles[i].onmouseover = function() {
			var li = this; //setTimeout 函数内this不可用
			if(timer) {
				clearTimeout(timer);
				timer = null;
			}
			timer = setTimeout(function() {
				//清除不在状态
				for(var j = 0; j < titles.length; j++) {
					titles[j].removeAttribute("class", "active");
					divs[j].style.display = 'none';
				}
				//设置当前状态样式
				li.setAttribute("class", "actice");
				divs[li.id].style.display = 'block';
			}, 500)
		}
	}
}

function tabauto() {
	var titles = $("tab-title").getElementsByTagName("li");
	var divs = $("tab-con").getElementsByTagName("div");
	var timer = null;
	var index = 0;
	//判断标题内容数目是否对等
	if(titles.length != divs.length) {
		alert("标题内容数目不对等");
	}
	for(var i = 0; i < titles.length; i++) {
		titles[i].id = i;
		titles[i].onmouseover = function() {
			clearInterval(timer);
			changeoption(this.id);
		}
		titles[i].onmouseout = function() {
			//计时器
			timer = setInterval(autoplay, 3000)
		   //计时器
		}
	}
	if(timer){
		clearInterval(timer);
		timer=null;
	}
	timer = setInterval(autoplay, 3000)
   function autoplay(){
   	  index++;
		if(index >= titles.length) {
			index = 0;
		}
		changeoption(index);
   }
	function changeoption(curindex) {
		for(var j = 0; j < titles.length; j++) {
			titles[j].removeAttribute("class", "active");
			divs[j].style.display = 'none';
		}
		titles[curindex].setAttribute("class", "actice");
		divs[curindex].style.display = 'block';
		index=curindex;
	}
}