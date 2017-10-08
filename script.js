var rand = Math.floor(Math.random() * screen.height - 250);
var rand2 = Math.floor(Math.random() * screen.width - 250);
var img = document.createElement("IMG");
var div = document.createElement("DIV");
var imgURL;

document.background.maxWidth = 100;
document.background.maxHeight = 100;

function catAppearance() {
  var chance = Math.floor(Math.random());
  var catNum = selectRandom(1, 28);
  if (chance < 0.9) {
      div.id = "cat";
      imgURL = chrome.extension.getURL('images/cat' + catNum + '.gif');
      img.src = imgURL;
      div.style.setProperty('--top-placement', rand + 'px', 'important');
      div.style.setProperty('--left-placement', rand2 + 'px', 'important');
      div.appendChild(img);
      document.body.appendChild(div);
      div.addEventListener("click", catClick);
  }
}

// selects random int inclusive!
function selectRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function catClick() {
    img.src = chrome.extension.getURL('images/smoke.gif');
    window.setTimeout(clearImage, 900);
    // check if any cats are found, should only be done for first cat
    chrome.storage.sync.get('cats', function (profileObj) {
        var profile = profileObj;
        console.log(profile);
        if (jQuery.isEmptyObject(profile)) {
            // Add string of imgURL
            chrome.storage.sync.set({'cats': [imgURL]}, function () {
                console.log("added to storage");
            });
            var key = imgURL;
            var file = {};
            file[key] = 1;
            chrome.storage.sync.set(file, function () {
                console.log(imgURL + ":" + 1);
            });
        } else {
            // Seen multiple cats, add more cats
            //var seenCats = JSON.parse(chrome.storage.sync.get('cats', function () {
            //}));
            if (jQuery.inArray(imgURL, profile['cats'], 0) > -1) {
                chrome.storage.sync.get(imgURL, function (timesSeen) {
                    var key = imgURL;
                    var file = {};
                    file[key] = timesSeen[imgURL] + 1;
                    chrome.storage.sync.set(file, function () {
                        console.log(file);
                    });
                });
            } else {
                var cats = profile['cats'];
                cats.push(imgURL);
                chrome.storage.sync.set({'cats': cats}, function () {
                    console.log("added to storage");
                });
                var key = imgURL;
                var file = {};
                file[key] = 1;
                chrome.storage.sync.set(file, function () {
                    console.log(file);
                });
            }
        }
    });
}


function clearImage() {
  img.removeAttribute("src");
}

catAppearance();

/** #cat css "object" is dynamic, can be reused
var div = document.createElement("DIV");
div.id = "cat";
var imgURL = chrome.extension.getURL('cat.png');
var img = document.createElement("IMG");
img.src = imgURL;
div.appendChild(img);
document.body.appendChild(div);
 */
