/*立即执行代码
  (
	function(){}
)()
 */


(
	function(){
		var $=function(_id){
			return document.getElementById(_id);
		}
		var inpstyle=function()
		{
			var inps=$('inpList').getElementsByTagName("input");//获得inpList
			for(i=0;i<inps.length;i++){
				inps[i].onfocus=function()
				{
					var par=this.parentNode.parentNode;
					var msg=par.getElementsByTagName("p")[0];
					this.parentNode.parentNode.className="point cl";
					check.focus[this.id](par,this,msg);
				}
				inps[i].onblur=function()
				{
					var par=this.parentNode.parentNode;
					var msg=par.getElementsByTagName("p")[0];
					par.className="def cl";
					check.blurs[this.id](par,this,msg);
				}
			}
			$("enter").onclick=function(){
				subcheck(inps);
			}
		};
		var check={
			focus:{
				uname:function(_dd,_this,_p)//dd ,input,d
				{
					_dd.className="point cl";
					_p.innerHTML="请输入用户名";
				},
				email:function(_dd,_this,_p)//dd ,input,d
				{
					_dd.className="point cl";
					_p.innerHTML="请输入邮箱";
				},
				mobile:function(_dd,_this,_p)//dd ,input,d
				{
					_dd.className="point cl";
					_p.innerHTML="请输入邮箱";
				},
				pwd:function(_dd,_this,_p)//dd ,input,d
				{
					_dd.className="point cl";
					_p.innerHTML="请输入密码";
				},
				qrpwd:function(_dd,_this,_p)//dd ,input,d
				{
					_dd.className="point cl";
					_p.innerHTML="请确认密码";
				},
			},
			blurs:{
				uname:function(_dd,_this,_p)//dd ,input,d
				{
					var flag=false;
					_dd.className="error cl";
					if(_this.value == "")
					{
						_p.innerHTML="用户名不得为空";
					}
					else if(_this.value.length<3 || _this.value.length>16)
					{
						_p.innerHTML="用户名长度在3～16位字符" ;
					}
					else if(!/^[\w_-\u4e00-\u9fa5]+$/.test(_this.value))
					{
						_p.innerHTML = "<i></i>格式不正确";
					}
                    else{
                    	   _dd.className="ok cl";
                    	   _p.innerHTML="用户名可用";
                    	   flag=true;
                    }
                    return flag;
                  
				},
				email:function(_dd,_this,_p)//dd ,input,d
				{
					var flag=false;
					_dd.className="error cl";
					if(_this.value == "")
					{
						_p.innerHTML="邮箱不得为空";
					}
					else if(_this.value.length<3 || _this.value.length>16)
					{
						_p.innerHTML="邮箱长度在3～16位字符" ;
					}
					else if(!/^[\w_-\u4e00-\u9fa5]+$/.test(_this.value))
					{
						_p.innerHTML = "<i></i>邮箱格式不正确";
					}
                    else{
                    	   _dd.className="ok cl";
                    	   _p.innerHTML="邮箱可用";
                    	   flag=true;
                    }
                   return flag;
				},
				mobile:function(_dd,_this,_p)//dd ,input,d
				{
					var flag=false;
					_dd.className="error cl";
					if(_this.value == "")
					{
						_p.innerHTML="手机不得为空";
					}
					else if(_this.value.length<3 || _this.value.length>16)
					{
						_p.innerHTML="手机长度在3～16位字符" ;
					}
					else if(!/^[\w_-\u4e00-\u9fa5]+$/.test(_this.value))
					{
						_p.innerHTML = "<i></i>手机格式不正确";
					}
                    else{
                    	   _dd.className="ok cl";
                    	   _p.innerHTML="手机可用";
                    	   flag=true;
                    }
                   return flag;
				},
				pwd:function(_dd,_this,_p)//dd ,input,d
				{
					var flag=false;
					_dd.className="error cl";
					if(_this.value == "")
					{
						_p.innerHTML="密码不得为空";
					}
					else if(_this.value.length<6 || _this.value.length>16)
					{
						_p.innerHTML="密码长度在6～16位字符" ;
					}
					else if(!/^[\w_-\u4e00-\u9fa5]+$/.test(_this.value))
					{
						_p.innerHTML = "<i></i>密码格式不正确";
					}
                    else{
                    	   _dd.className="ok cl";
                    	   _p.innerHTML="密码可用";
                    	   flag=true;
                    }
                   return flag;
				},
				qrpwd:function(_dd,_this,_p)//dd ,input,d
				{
					var flag=false;
					var pwd=$('pwd');
					_dd.className="error cl";
					if(_this.value == "")
					{
						_p.innerHTML="密码不得为空";
					}
					else if(_this.value != pwd.value)
					{
						_p.innerHTML="两次密码输入不一致";
					}
					
                    else{
                    	   _dd.className="ok cl";
                    	   _p.innerHTML="密码可用";
                    	   flag=true;
                    }
                   return flag;
				},
			}
			  

		};
		var subcheck=function(inps){
//			for(i=0;i<inps.length;i++)
//			{
//			  inps[i].focus();
//			  inps[i].blur();
//			}
          var flag=true;
          for(i=0;i<inps.length;i++){
			    var par=inps[i].parentNode.parentNode;
				var msg=par.getElementsByTagName("p")[0];
				if(!check.blurs[inps[i].id](par,inps[i],msg))
				{
					flag=false;
					break;
				};
		    }
          alert(flag?"可以提交":"不可以提交");
         }
		window.onload=function(){
//			check.blurs.uname();
			inpstyle();
		}
	}
)()//立即执行
