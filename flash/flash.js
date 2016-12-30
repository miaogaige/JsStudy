function $(id){
	return typeof id === "string"?document.getElementById(id):id;
}
window.onload=function(){
	var box=$("pic");
	var left=$("left");
	var right=$("right");
	var pics=$("pic").getElementsByTagName("li");
	var counts=$("list").getElementsByTagName("li");
	var index=0;
	var timer=null;
	if (pics.length != counts.length){
		alert("图片和按钮数量不一致");
		}
	//鼠标经过开始
	for (var i=0;i<counts.length;i++){
		counts[i].id=i;
		pics[i].id=i;
        counts[i].onmouseover=function()
		{
			   clearInterval(timer);
			   changepic(this.id);
	    }
		counts[i].onmouseout=function()
		{
			timer=setInterval(autoplay,3000);
		}
	}
	//鼠标经过结束
	left.onclick=function(){
		index>=1?index-=1:index=counts.length-1;
        console.log(index);
		changepic(index);
	}
	right.onclick=function(){
		index +=1;
		changepic(index);
	}
	if(timer){
		clearInterval(timer);
		timer=null;
	}
	timer=setInterval(autoplay,9000);//自动播放
	
	function changepic(curindex)
	{
		 for(var j=0;j<counts.length;j++)
	     {
		    pics[j].style.display="none";
		    counts[j].setAttribute("class","");
	     }
	     pics[curindex].style.display="block";
	     counts[curindex].setAttribute("class","on");
	     index=curindex;
	}
	function autoplay(){
		index ++;
		if(index>=counts.length){
				index=0;
		}
		changepic(index);
	}
}
