// ==UserScript==
// @name     boardgamearena
// @include     https://boardgamearena.com/*
// @version  1
// @grant    none
// ==/UserScript==

if (document.URL.includes("raceforthegalaxy") || document.URL.includes("replay")) {
  var htmlSource = ""
  console.log("RftG script loaded!");
  function myOnloadFunc() {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log("dundundun");
            htmlSource = xmlHttp.responseText;
          }
      }
      xmlHttp.open("GET", "http://racepics.weihwa.com/base-tgs-rvi-bow.html", true); // true for asynchronous 
      xmlHttp.send(null);
  }

  window.onload = myOnloadFunc;

  function improveImages() {
    if (htmlSource == "") {
      console.log("sad");
    }
    else {
      try {
        for (const card of document.querySelectorAll(".card,.stockitem")) {
          if (!card.getAttribute("style").includes("racepics"))  {
            var cardname=card.querySelectorAll(".cardname")[0].textContent;
            console.log(cardname);
            if (htmlSource.includes(cardname)) {
              //html = $.parseHTML( htmlSource ); // Not worth using proper html parsing methinks
              var picloc = htmlSource.split(cardname)[1].split("alt")[0].split("src='")[1].split("'")[0];
              console.log(picloc);
              if (card.getAttribute("class").includes("stockitem")) {
                card.setAttribute("style", card.getAttribute("style") + "background-image:url(http://racepics.weihwa.com/" + picloc + "); background-size: 126px 174px; background-position: -7px -7px;");
              }
              else {
              	card.setAttribute("style", "background-image:url(http://racepics.weihwa.com/" + picloc + "); background-size: 126px 174px; background-position: -7px -7px;");
              }
              console.log("card pic for \"" + cardname + "\" set " + picloc);
            }
          }
        }
      }
      catch(err) {
        console.log("FAIL! :(((");
        console.log(err.message);
      }
    }
  }

  setInterval(improveImages, 4000);

  console.log("RftG script initialized!");
}
