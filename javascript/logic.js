// Inputs
var textbox = document.getElementById("textbox");
var listOutput = document.getElementById("listOutput");
var wrapperRadios = document.getElementsByName("wrapper");
var stripRadios = document.getElementsByName("strip");
var itemSeparator = document.getElementsByName("itemSeparator");
var customWrapper = document.getElementById("customWrapper");
var selectedWrapper = "'";
var wrapperL = document.getElementById("wrapperL");
var wrapperR = document.getElementById("wrapperR");
var customStripText = document.getElementById("customStripText");
var customItemSeparator = document.getElementById("customItemSeparator");
var newLineCheck = document.getElementById("newLineCheck");

// Variables
var inputText;
var textArray;
var stringifiedTextArray;
var modTextArray;
var list;
var wrapperLval;
var wrapperRval;
var isCustomWrapper = false;
var itemSeparatorVal = ",";

// States
var stripState = "none"; // For stripState, there should only be 2 possible options. 'none' or 'whitespace'
var itemSeparatorState = "comma"; // Default to a comma, meaning a comma will be added before the newline character

// Event Listeners
textbox.addEventListener("input", () => {
  textboxUpdate();
});

wrapperL.addEventListener("input", () => {
  textboxUpdate();
});

wrapperR.addEventListener("input", () => {
  textboxUpdate();
});

customStripText.addEventListener("input", () => {
  textboxUpdate();
});

customItemSeparator.addEventListener("input", () => {
  if (itemSeparatorState === "custom") {
    itemSeparatorVal = customItemSeparator.value;
  }
  textboxUpdate();
});

newLineCheck.addEventListener("change", () => {
  textboxUpdate();
});

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
      case "custom":
        stripState = "custom";
        break;
      default:
        break;
    }
    textboxUpdate();
  };
}

for (var i = 0; i < itemSeparator.length; i++) {
  itemSeparator[i].onclick = function () {
    var itemSeparatorID = this.id;
    if (itemSeparatorID === "comma") {
      itemSeparatorState = "comma";
      itemSeparatorVal = ",";
    }
    else if (itemSeparatorID === "none") {
      itemSeparatorState = "none";
      itemSeparatorVal = "";
    }
    else if (itemSeparatorID === "custom") {
      itemSeparatorState = "custom";
      itemSeparatorVal = document.getElementById("customItemSeparator").value;
    }
    textboxUpdate();
  };
}

// Functions
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
      (item) => `${selectedWrapper}${item}${selectedWrapper}`
    );
  } else {
    //Grabbing most recent wrapper vals before generating.
    wrapperLval = document.getElementById("wrapperL").value;
    wrapperRval = document.getElementById("wrapperR").value;
    textArray = textArray.map((item) => `${wrapperLval}${item}${wrapperRval}`);
  }
  // If new line checkbox is checked, add a newline character to the end of each item
  var newlineChar = newLineCheck.checked ? "\n" : "";
  list = textArray.join(itemSeparatorVal + newlineChar);
  //Trim last item seperator off of list
  if (list.endsWith(itemSeparatorVal) && (!isCustomWrapper || wrapperRval !== itemSeparatorVal)) {
    trimmedList = list.substring(0, list.length - 1);
  } else {
    trimmedList = list; // No trimming needed
  }
  listOutput.value = trimmedList;
}

function stripItem(item) {
  if (stripState == "none") {
    return item; // do nothing
  } 
  else if (stripState == "whitespace"){
    item = item.replace(/\s/g, "");
    return item;
  } 
  else if (stripState == "custom") {
    item = item.replace(customStripText.value, "");
    return item;
  }
}
