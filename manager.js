// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

<<<<<<< HEAD
function displayCatCollection() {
  chrome.storage.sync.get("cats", function(items) {
=======

var table = document.getElementById('catTable');
var tableBody = table.getElementsByTagName('tbody');
var url;
var row, cell1, cell2, cell3;

function addRow(count, currentCat, seen) {
  var img = document.createElement("IMG");
  img.height = 35;
  img.width = 35;
  img.src = currentCat;
  console.log(count);
  row = table.insertRow(count);
  cell1 = row.insertCell(0);
  cell2 = row.insertCell(1);
  cell3 = row.insertCell(2);
  cell1.appendChild(img);
  cell2.innerHTML = seen.toString();
  cell3.innerHTML = "0";
}

function callback(count, currentCat) {
  chrome.storage.sync.get(currentCat, function (timesSeen) {
    addRow(count, currentCat, timesSeen[currentCat]);
  });
}

function displayCatCollection() {
  chrome.storage.sync.get('cats', function (profileObj) {
      var profile = profileObj;
      console.log(profile);
      if (jQuery.isEmptyObject(profile)) {
        return;
      } else {
        var i = 1;
        row = table.insertRow(0);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);

        cell1.innerHTML = "Catto Type";
        cell2.innerHTML = "Number of Times Seen";
        cell3.innerHTML = "Love Meter";

        var catArray = profile['cats'];
        for (var cat in catArray) {
          url = catArray[cat];
          callback(i, url);
          i++;
        }
      }
  });

  /**
  StorageArea.get(null, function(items) {
>>>>>>> james
    var cats_displayed = [];
    //var div = document.createElement("DIV");
    //div.id = "catCollection";
    var w = 0;
    var h = 100;
    console.log(items["cats"]);
    for (var i = 0; i < items["cats"].length; i++) {
      var imgURL = items["cats"][i];
      if (cats_displayed.indexOf(imgURL) == -1) {
        var img = document.createElement("IMG");
        img.height = 100;
        img.width = 100;
        img.bottom = h;
        img.left = w;
        img.src = imgURL;
        img.position = "fixed";
        //div.appendChild(img);
        if (w + 100 > window.innerWidth) {
          w = 0;
          h += 100;
        } else {
          w += 100;
        }
      }
      document.body.appendChild(img);
    }
    //document.body.appendChild(img);
  });
}

setTimeout(function(){
    // DOM manipulation stuff
}, 2500);
displayCatCollection();
