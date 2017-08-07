$(document).ready(function(){
	for(var i=0;i<10;i++){
		var div=document.createElement("div");
		div.style.width="255px";
		div.style.height="25px";
		div.id="dd"+i;
		div.style.display="block";
		document.body.appendChild(div);
		for(var j=0;j<10;j++){
			var div=document.createElement("div");
			var flag=Math.round(Math.random(2))
			div.innerHTML=flag;
			div.id=(10*i+j);
			div.style.float="left";
			div.style.color="#ffffff";
			div.style.backgroundImage="url("+flag+".png)";
			div.style.textIndent="-9999px";
			div.style.width="25px";
			div.style.height="25px";
			var div1=document.getElementById("dd"+i);
			div1.appendChild(div);
		}
	}
	
	$("div div").click(function(){
		var id=parseInt(this.id);
		var flag=$(this).text()==0?1:0;
		var flag1=$("#"+(id-10)).text()==0?1:0;
		var flag2=$("#"+(id-1)).text()==0?1:0;
		var flag3=$("#"+(id+1)).text()==0?1:0;
		var flag4=$("#"+(id+10)).text()==0?1:0;
		$("#"+(id-10)).css("backgroundImage","url("+flag1+".png)");
		$("#"+(id-10)).text(flag1);
		if(id%10!=0){
			$("#"+(id-1)).css("backgroundImage","url("+flag2+".png)");
			$("#"+(id-1)).text(flag2);
		}
		if(id%10!=9){
			$("#"+(id+1)).css("backgroundImage","url("+flag3+".png)");
			$("#"+(id+1)).text(flag3);
		}
		$("#"+(id+10)).css("backgroundImage","url("+flag4+".png)");
		$("#"+(id+10)).text(flag4);
		$(this).css("backgroundImage","url("+flag+".png)");
		$(this).text(flag);
	});
});