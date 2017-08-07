$(document).ready(function(){
	//棋盘
	chess=new Array();
	step=0;//步数
	row=15;//棋盘行数
	col=15;//棋盘列数
	chess=new Array();//棋盘棋子情况  -1 空 0 白 1 黑
	num=new Array();
	bot=1;
	for(var i=0;i<row;i++){
		chess[i]=new Array();
		num[i]=new Array();
		for(var j=0;j<col;j++){
			chess[i][j]=-1;
			num[i][j]=new Array();
			//num[i][j][0]=0;//白棋子情况
			//num[i][j][1]=0;//黑棋子情况
		}	
	}
	var top=0;//棋盘上边距
	var left=400;//棋盘左边距
	
	var div=document.createElement("div");
	div.id="0";
	div.style.position="absolute";
	div.style.top=top+"px";
	div.style.left=left+"px";
	div.className="dd1";
	document.body.appendChild(div);
	var img=document.createElement("img");
	img.id="i0";
	div.appendChild(img);
	for(var i=1;i<col-1;i++){
		div=document.createElement("div");
		div.id=i;
		div.style.position="absolute";
		div.style.top=top+"px";
		div.style.left=left+50*i+"px";
		div.className="dd2";
		document.body.appendChild(div);
		img=document.createElement("img");
		img.id="i"+i;
		div.appendChild(img);
	}
	div=document.createElement("div");
	div.id=col-1;
	div.style.position="absolute";
	div.style.top=top+"px";
	div.style.left=left+(col-1)*50+"px";
	div.className="dd3";
	document.body.appendChild(div);
	img=document.createElement("img");
	img.id="i"+(col-1);
	div.appendChild(img);
	for(var i=1;i<row-1;i++){
		div=document.createElement("div");
		div.id=i*col;
		div.style.position="absolute";
		div.style.top=top+50*i+"px";
		div.style.left=left+"px";
		div.className="dd4";
		document.body.appendChild(div);
		img=document.createElement("img");
		img.id="i"+(col*i);
		div.appendChild(img);
		for(var j=1;j<col-1;j++){
			div=document.createElement("div");
			div.id=i*col+j;
			div.style.position="absolute";
			div.style.top=top+50*i+"px";
			div.style.left=left+50*j+"px";
			div.className="dd5";
			document.body.appendChild(div);
			img=document.createElement("img");
			img.id="i"+(i*col+j);
			div.appendChild(img);
		}
		div=document.createElement("div");
		div.id=col*(i+1)-1;
		div.style.position="absolute";
		div.style.top=top+50*i+"px";
		div.style.left=left+(col-1)*50+"px";
		div.className="dd6";
		document.body.appendChild(div);
		img=document.createElement("img");
		img.id="i"+(col*(i+1)-1);
		div.appendChild(img);
	}
	div=document.createElement("div");
	div.id=col*(row-1);
	div.style.position="absolute";
	div.style.top=top+50*(row-1)+"px";
	div.style.left=left+"px";
	div.className="dd7";
	document.body.appendChild(div);
	img=document.createElement("img");
	img.id="i"+(col*(row-1));
	div.appendChild(img);
	for(var i=1;i<col-1;i++){
		div=document.createElement("div");
		div.id=col*(row-1)+i;
		div.style.position="absolute";
		div.style.top=top+50*(row-1)+"px";
		div.style.left=left+50*i+"px";
		div.className="dd8";
		document.body.appendChild(div);
		img=document.createElement("img");
		img.id="i"+(col*(row-1)+i);
		div.appendChild(img);
	}
	div=document.createElement("div");
	div.id=col*row-1;
	div.style.position="absolute";
	div.style.top=top+50*(row-1)+"px";
	div.style.left=left+(col-1)*50+"px";
	div.className="dd9";
	document.body.appendChild(div);
	img=document.createElement("img");
	img.id="i"+(col*row-1);
	div.appendChild(img);
	
	
	//PVP
	/*$("div").click(function(){
		if($("#i"+this.id).attr("src")==undefined){
			$("#i"+this.id).attr("src",step%2+".png");
			chess[Math.floor(this.id/col)][this.id%col]=step%2;
			step++;
		}
	});*/
	
	$("div").attr("onclick","PVP(this.id)");
	
});
//重新开始
function resetbtn(){
	for(var i=0;i<row*col-1;i++){
		$("#i"+i).removeAttr("src");
	}	
	step=0;
}
//人人对战
function PVP(id){
	if($("#i"+id).attr("src")==undefined){
		$("#i"+id).attr("src",step%2+".png");
		chess[Math.floor(id/col)][id%col]=step%2;
		step++;
	}
}




//切换为人人对战
$("#pvp").click(function(){
	resetbtn();
	$("div").emoveAttr("onclick");	
	$("div").attr("onclick","PVP(this.id)");	
});

function AI(){
	
	

}

//人机对战
function PVC(id){
	if($("#i"+id).attr("src")==undefined){
		$("#i"+id).attr("src","0.png");
		alert($("#i"+id).attr("src"));
		chess[Math.floor(id/col)][id%col]=0;
		step++;
		AI();
		alert(num[0][0][3][0]);
	}
}

//切换为人机对战
$("#pvc").click(function(){
	resetbtn();
	$("div").emoveAttr("onclick");	
	$("div").attr("onclick","PVC(this.id)");	
});