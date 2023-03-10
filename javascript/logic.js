var textbox = document.getElementById("textbox");
var listOutput = document.getElementById("listOutput");
var inputText;
var textArray;
var stringifiedTextArray;
var modTextArray;
var list;
var wrapperRadios = document.getElementsByName("wrapper");
var stripRadios = document.getElementsByName("strip");
var selectedWrapper = "'";
var wrapperL = document.getElementById("wrapperL");
var wrapperR = document.getElementById("wrapperR");
var wrapperLval;
var wrapperRval;
var isCustomWrapper = false;
/*
    For stripState, there should only be 2 possible options. 'none' or 'whitespace'.
    */
var stripState = "none";
var customStripText;
// Add Event Listeners
textbox.addEventListener("input", () => {
  textboxUpdate();
});
wrapperL.addEventListener("input", () => {
  textboxUpdate();
  console.log("hello");
});
wrapperR.addEventListener("input", () => {
  textboxUpdate();
});

function copyToClipboard() {
  let text = document.getElementById("listOutput").value;
  navigator.clipboard.writeText(text);
}
function textboxUpdate() {
  wrapperRadios = document.getElementsByName("wrapper");
  inputText = textbox.value;
  textArray = inputText.split("\n");
  textArray = textArray.map((item) => stripItem(item)); // Strip out whitespace if selected
  if (!isCustomWrapper) {
    textArray = textArray.map(
      (item) => `${selectedWrapper}${item}${selectedWrapper},`
    );
  } else {
    //Grabbing most recent wrapper vals before generating.
    wrapperLval = document.getElementById("wrapperL").value;
    wrapperRval = document.getElementById("wrapperR").value;
    textArray = textArray.map((item) => `${wrapperLval}${item}${wrapperRval},`);
  }
  list = textArray.join("\n");
  //Trim last comma off of list
  trimmedList = list.substring(0, list.length - 1);
  listOutput.value = trimmedList;
}

function stripItem(item) {
  if (stripState == "none") {
    return item; // do nothing
  } else {
    item = item.replace(/\s/g, "");
    return item;
  }
}

/* 
    Move this logic into the textBoxUpdate funtion to generate text based on radio selections 
    or create seperate function to check radio buttons and update variables based on what is selected.
    */
for (var i = 0; i < wrapperRadios.length; i++) {
  wrapperRadios[i].onclick = function () {
    var wrapperId = this.id;
    switch (wrapperId) {
      case "singleq":
        selectedWrapper = "'";
        isCustomWrapper = false;
        break;
      case "doubleq":
        selectedWrapper = '"';
        isCustomWrapper = false;
        break;
      case "customWrapper":
        isCustomWrapper = true;
        wrapperLval = document.getElementById("wrapperL").value;
        wrapperRval = document.getElementById("wrapperR").value;
        break;
      default:
        break;
    }
    textboxUpdate();
  };
}

for (var i = 0; i < stripRadios.length; i++) {
  stripRadios[i].onclick = function () {
    var stripId = this.id;
    switch (stripId) {
      case "none":
        stripState = "none";
        break;
      case "whitespace":
        stripState = "whitespace";
        break;
      default:
        break;
    }
    textboxUpdate();
  };
}
