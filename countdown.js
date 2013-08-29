/*
Author: Robert Hashemian
http://www.hashemian.com/

You can use this code in any manner so long as the author's
name, Web address and this disclaimer is kept intact.
********************************************************
*/

/*
  I know this is garbage, but  I don't care!!!!!!!!!
  -Cassandra Sandquist
*/
function calcage(secs, num1, num2) {
  var results = {};
  results.isPlural = true;
  results.s = ((Math.floor(secs/num1))%num2).toString();
  if (LeadingZero && results.s.length < 2){
    results.s = "0" + results.s;
  }
  if (results.s === "01"){
    results.isPlural = false;
  }
  return results;
}
function CountBack(secs) {
  if (secs < 0) {
    document.getElementById("cntdwn").innerHTML = FinishMessage;
    document.getElementById("instruction").innerHTML = "Yes!";
    return;
  }
  DisplayStr = DisplayFormat;
  var hours, minutes, seconds;
  hours = calcage(secs,3600,24);
  minutes = calcage(secs,60,60);
  seconds = calcage(secs,1,60);

  DisplayStr = DisplayStr.replace(/%%H%%/g, hours.s);
  DisplayStr = DisplayStr.replace(/%%hs%%/g, hours.isPlural ? "s" : "");
  DisplayStr = DisplayStr.replace(/%%M%%/g, minutes.s);
  DisplayStr = DisplayStr.replace(/%%ms%%/g, minutes.isPlural ? "s" : "");
  DisplayStr = DisplayStr.replace(/%%S%%/g, seconds.s);
  DisplayStr = DisplayStr.replace(/%%ss%%/g, seconds.isPlural ? "s" : "" );
  document.getElementById("cntdwn").innerHTML = DisplayStr;
  if (CountActive)
    setTimeout("CountBack(" + (secs+CountStepper) + ")", SetTimeOutPeriod);
}

CountStepper = Math.ceil(CountStepper);
if (CountStepper === 0)
  CountActive = false;
var SetTimeOutPeriod = (Math.abs(CountStepper)-1)*1000 + 990;
var dthen = new Date(TargetDate);
var dnow = new Date();
if(CountStepper>0)
  ddiff = new Date(dnow-dthen);
else
  ddiff = new Date(dthen-dnow);
gsecs = Math.floor(ddiff.valueOf()/1000);
CountBack(gsecs);
