

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1"><link rel="stylesheet" type="text/css" href="/SCSWeb/DXR.axd?r=0_118,1_50,1_51,1_16,0_122-zrQfh" /><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>

</title>
    <style type="text/css">
        #body
        {
            background-color:aliceblue;
        }

        #middle 
        {
            position:absolute; 
            width:400px; 
            height:440px;
            top:0; 
            bottom:0; 
            left:0; 
            right:0; 
            margin:auto;
            background-color:#BFBFBF;
            border: 1px solid black;
        }
        #divC00021
        {
            position:absolute; 
            width:400px; 
            height:300px;
            top:0; 
            bottom:0; 
            left:0; 
            right:0; 
            margin:auto;
        }
    </style>

    <script>
        $(function () {
            $("#dialog").dialog();
            $(".ui-widget").css({ "font-size": +50 + "px" });
        });

        function GetLocalTime() {
            var localTime = new Date();
            var year = localTime.getFullYear();
            var month = localTime.getMonth() + 1;
            var date = localTime.getDate();
            var hours = localTime.getHours();
            var minutes = localTime.getMinutes();
            var seconds = localTime.getSeconds();
            document.getElementById('THF_SwipeTime').value = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        }
	</script>
<link id="base.css" href="/SCSWeb/css/base.css?v=7.3.2019.0311" rel="stylesheet" type="text/css" /></head>
<body id="body">
    <form method="post" action="./AttEmpOnlineSwipe.aspx" id="form1">
<div class="aspNetHidden">
<input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
<input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
<input type="hidden" name="__UNIQUEGUID" id="__UNIQUEGUID" value="673d19a5-1f6f-4072-a9c5-935a606f0bd4" />
<input type="hidden" name="__ROOTPATH" id="__ROOTPATH" value="/SCSWeb/" />
<input type="hidden" name="__LOGINCOMPANYID" id="__LOGINCOMPANYID" value="EG5D1F4853M34E2DB2DD05UB" />
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="" />
</div>

<script type="text/javascript">
//<![CDATA[
var theForm = document.forms['form1'];
if (!theForm) {
    theForm = document.form1;
}
function __doPostBack(eventTarget, eventArgument) {
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
        theForm.__EVENTTARGET.value = eventTarget;
        theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
}
//]]>
</script>


<script src="/SCSWeb/WebResource.axd?d=pynGkmcFUV13He1Qd6_TZLJtHrDt9_lMr6v9xWdlgTwMUeTlcxYduPEX743MqCrWEJLqvr-8QRje4EUFnCqZAA2&amp;t=636765751264470882" type="text/javascript"></script>


<script src="/SCSWeb/Scripts/language-zh-TW.js?v=7.3.2019.0311" type="text/javascript"></script>
<script src="/SCSWeb/Scripts/ais.webform.js?v=7.3.2019.0311" type="text/javascript"></script>
<div class="aspNetHidden">

	<input type="hidden" name="__SCROLLPOSITIONX" id="__SCROLLPOSITIONX" value="0" />
	<input type="hidden" name="__SCROLLPOSITIONY" id="__SCROLLPOSITIONY" value="0" />
	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="ld4kKLF7RMM6ksqgEPRtGKds5V2Twa/Fi4mKMrTo52Z0x1OvaD/ccz1XToW8zR/Er5pkKG0uY1JpQ7D6AQiOhmCs1QP0Nycp5ncdJzuEGQi0tiM2CTSqmbGre77GBriC" />
</div>
        
        <div id="middle" style="height:230px;">
            <table style="width:100%; height:100%">
                <tr id="tr1">
	<td style="text-align: center">                
                        <script id="dxis_1024231845" src="/SCSWeb/DXR.axd?r=1_304,1_185,1_298,1_211,1_221,1_188,1_182,1_198-zrQfh" type="text/javascript"></script><div class="dxbButton_Aqua dxbButtonSys dxbTSys" id="btnOnSwipe" style="color:#CC0000;font-size:40pt;font-weight:bold;width:350px;-webkit-user-select:none;text-align:Center;">
		<div class="dxb">
			<div class="dxb-hbc">
				<input id="btnOnSwipe_I" class="dxb-hb" value="上　　班" type="submit" name="btnOnSwipe" readonly="readonly" />
			</div><span class="dx-vam">上　　班</span>
		</div>
	</div><script id="dxss_1864339404" type="text/javascript">
<!--
ASPx.AddHoverItems('btnOnSwipe',[[['dxbButtonHover_Aqua'],[''],[''],['','TC']]]);
ASPx.AddPressedItems('btnOnSwipe',[[['dxbButtonPressed_Aqua'],[''],[''],['','TC']]]);
ASPx.AddDisabledItems('btnOnSwipe',[[['dxbDisabled_Aqua'],['color:#999999;'],[''],['','TC']]]);
ASPx.AddSelectedItems('btnOnSwipe',[[['dxbf'],[''],['CD']]]);
ASPx.createControl(ASPxClientButton,'btnOnSwipe','',{'autoPostBack':true,'serverEvents':['Click']},{'Click':function(s, e) {
	GetLocalTime();
}});

//-->
</script> 
                    </td>
</tr>

                <tr id="tr2">
	<td style="text-align: center">
                        <div class="dxbButton_Aqua dxbButtonSys dxbTSys" id="btnOffSwipe" style="color:Blue;font-size:40pt;font-weight:bold;width:350px;-webkit-user-select:none;text-align:Center;">
		<div class="dxb">
			<div class="dxb-hbc">
				<input id="btnOffSwipe_I" class="dxb-hb" value="下　　班" type="submit" name="btnOffSwipe" readonly="readonly" />
			</div><span class="dx-vam">下　　班</span>
		</div>
	</div><script id="dxss_1586719288" type="text/javascript">
<!--
ASPx.AddHoverItems('btnOffSwipe',[[['dxbButtonHover_Aqua'],[''],[''],['','TC']]]);
ASPx.AddPressedItems('btnOffSwipe',[[['dxbButtonPressed_Aqua'],[''],[''],['','TC']]]);
ASPx.AddDisabledItems('btnOffSwipe',[[['dxbDisabled_Aqua'],['color:#999999;'],[''],['','TC']]]);
ASPx.AddSelectedItems('btnOffSwipe',[[['dxbf'],[''],['CD']]]);
ASPx.createControl(ASPxClientButton,'btnOffSwipe','',{'autoPostBack':true,'serverEvents':['Click']},{'Click':function(s, e) {
	GetLocalTime();
}});

//-->
</script>    
                    </td>
</tr>

                
                            
            </table>
    
        </div>
        <div>
            <input type="hidden" name="THF_SwipeTime" id="THF_SwipeTime" value="2019-6-7 11:12:29" />
        </div>
    

<script type="text/javascript">
//<![CDATA[
setTimeout(function(){alert('下班刷卡失敗\n刷卡時間：2019/6/7 上午 11:12:40\n\n\n請確認是否漏刷上班卡或誤按下班卡');}, 500);
theForm.oldSubmit = theForm.submit;
theForm.submit = WebForm_SaveScrollPositionSubmit;

theForm.oldOnSubmit = theForm.onsubmit;
theForm.onsubmit = WebForm_SaveScrollPositionOnSubmit;

theForm.oldOnLoad = window.onload;
window.onload = WebForm_RestoreScrollPosition;
//]]>
</script>
</form>
</body>
</html>
