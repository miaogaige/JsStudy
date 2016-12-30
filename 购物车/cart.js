window.onload=function(){
	//判断classname 是否包含
//	var classof=function(a,classname){
//		b=(a.className === els || a.className.indexOf(''+els)>=0 || a.className.indexOf(''+els +'')>=0 || a.className.indexOf(''+els +'')>=0
//	}

	//ie6,兼容
	if(!document.getElementsByClassName){
		document.getElementsByClassName()=function(){
			var ret =[];
		    var els=document.getElementsByClassName("*");
		    for(i=0;i<els.length;i++)
		    {
			   if(els[i].className === els || 
			   	els[i].className.indexOf(''+els)>=0 
			   	|| els[i].className.indexOf(''+els +'')>=0 
			   	|| els[i].className.indexOf(''+els +'')>=0)
			    ret.push(els[i]);
		    }
		    return ret;
		}
		
	}
	//添加class
	var addclass=function(x,add){
		x.className ? x.className =x.className.concat(" ") + add  : x.className=add;
	}
    var removeclass=function(x,remove){
     x.className ? x.className =x.className.replace(remove,"") : x.removeAttribute("className");
    }
	var cartTable=document.getElementById("cartTable");
	var tr=cartTable.children[1].rows;    //children[1] 读取 thbody,rows tr特定读取
	var checks=document.getElementsByClassName("check");
	var checkall=document.getElementsByClassName("check-all");
	var selectedTotal=document.getElementById("selectedTotal");
	var priceTotal=document.getElementById("priceTotal");
	var selected=document.getElementById("selected");
	var foot=document.getElementById("foot");
	var selectedViewList=document.getElementById("selectedViewList");
	var deleteAll=document.getElementById("deleteAll");
// 计算
   function getTotal(){
   	var selected=0;
   	var price=0;
   	var str="";
   	for (i=0;i<tr.length;i++){
   		if(tr[i].getElementsByTagName('input')[0].checked)
   		{
   			addclass(tr[i],"on");
   			selected += parseInt(tr[i].getElementsByTagName("input")[1].value);
   			price += parseFloat(tr[i].cells[4].innerHTML);                     //cells td 特定读取
   			str+='<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>';

   		}
   		else{
   			tr[i].className="";
   		}
   		    selectedTotal.innerHTML=selected;
   			priceTotal.innerHTML=price.toFixed(2);                             //保留两位小数
   			selectedViewList.innerHTML=str;
   			
   	 }
   	
   }
    //全选
	for(i=0;i<checks.length;i++)
	{
		checks[i].onclick=function(){
			if(this.className === "check-all check")
			{
				for(j=0;j<checks.length;j++)
				{
					checks[j].checked=this.checked;
				}
			}
			if(this.checked==false)
			{
				for (k=0;k<checkall.length;k++)
				{
				  checkall[k].checked=false;	
				}
			}
			getTotal();
		}
	}

	//全选end
	
	//弹框显示
	selected.onclick=function(){
		if(foot.className.indexOf("show") < 0){
			if(selectedTotal.innerHTML !=0){addclass(foot,"show");}
		}
		else{
			removeclass(foot,"show");
			
		}
	}
	
	//取消选择
	selectedViewList.onclick=function(e)
	{
		e=e||window.event;
		var el=e.srcElement;
		if(el.className=="del"){
			var index=el.getAttribute("index");
			var input=tr[index].getElementsByTagName("input")[0];
			input.checked=false;
			input.onclick();
		}
	}
	//小记
	subtotal=function(tr)
	{
		var price=parseFloat(tr.cells[2].innerHTML);
		var num=parseInt(tr.getElementsByClassName("count-input")[0].value);
		var subtotal=tr.getElementsByClassName("subtotal")[0];
		subtotal.innerHTML=parseFloat(price * num).toFixed(2);
	}
	
	//加减
 	for (i=0;i<tr.length;i++)
 	{
		tr[i].onclick=function(e)
		{
			e=e||window.event;
			var el=e.srcElement;
			var cls=el.className;
			var reduce=this.getElementsByClassName("reduce")[0];
			var count=this.getElementsByClassName("count-input")[0];
			var val=parseInt(count.value);
			switch(cls){
				case "add":
				    count.value=val+1;
					reduce.innerHTML="-";
					subtotal(this);
					break;
				case "reduce":
				      if(val>0){
				      	count.value=val-1;
				      }
				      if (count.value>1){
				      	reduce.innerHTML="-";
				      }
				      else{
				      	reduce.innerHTML="";
				      }
				      subtotal(this);
				      break;
				  case "delete":
				     var con=confirm("确定删除么");
			 		 if(con){
			 		 	this.parentNode.removeChild(this);
			 		 }
			 		 break;
				 default:
				    break;
			}
			getTotal();
		}
	    tr[i].getElementsByClassName("count-input")[0].onkeyup=function(){
	    	    var val=parseInt(this.value);
	    	    var reduce=this.parentNode.getElementsByClassName("reduce")[0];
	    	    if(isNaN(val) || val<0){
	    	       	val=1;
	    	    }
	    	    this.value=val;
	    	    if(val<1){
	    	    	  reduce.innerHTML="";
	    	    }
	    	    else{
	    	    	  reduce.innerHTML="-";
	    	    }
	    	    subtotal(this.parentNode.parentNode);
	    	    getTotal();
	    }
 	}
 	
 	//全部删除
 	deleteAll.onclick=function()
 	{
 		if(selectedTotal.innerHTML != "0"){
 		 var con=confirm("确定删除么");
 		 if(con){
 		 	for(i=0;i<tr.length;i++){
 		 		if(tr[i].getElementsByTagName("input")[0].checked){
 		 			tr[i].parentNode.removeChild(tr[i]);
 		 			i--;
 		 		}
 		 	}
 		 }
 		}
 	}
}