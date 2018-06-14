// Javascript file

// VARIABLE-DECLARATION
const button = document.getElementById("enter");
const input = document.getElementById("userinput");
const ul = document.querySelector("ul");

// Returns the length of "userinput".
function inputLength() {
  return input.value.length;
}

// Optional. It is used to identify each new node.
function assignAttribute() {
  const attribute = document.createAttribute("key");
  if (ul.childNodes > 0) {
    const oldKey = Number(ul.lastElementChild.getAttribute("key"));
    const newKey = "0" + (oldKey + 1).toString();
    attribute.value = newKey;
    return attribute;
  } else {
    const newKey = "01";
    attribute.value = newKey;
    return attribute;
  }
}

// Create a new <ul> child node called <li>.
// Create a new <li> child node callde <a> to assign a function.
function createListElement() {
  let li = document.createElement("li");
  let anchor = document.createElement("a");
  const classA = document.createAttribute("class");
  classA.value = "anchor";
//  Add li tag.
  li.append(document.createTextNode(input.value), anchor);
  li.setAttributeNode(assignAttribute());

//  Add anchor tag.
  anchor.appendChild(document.createTextNode("-"));
  anchor.setAttributeNode(assignAttribute());
  anchor.setAttributeNode(classA);

// Use values from li and anchor to add as ul child.
  ul.appendChild(li);
  input.value = "";
}

// Uses the "click" event listener to apply an action on <button>.
function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement();
  }
}

// Needs an event parameter to identify the Enter key.
function addListAfterKeyPress(e) {
  if (inputLength() > 0 && e.keyCode === 13) {
    createListElement();
  }
}

// Optional/not used. Used textContent instead of innerText due to compatibility.
function getTextContent() {
  let li = document.querySelectorAll("li");
  let text = [];
  li.forEach(element => text.push(element.textContent));
}

/*
window.event		        <-- Uses the action from the window object.
e.target		            <-- Selects an element.
Conditional             <-- Without this conditional, it will try to get the parent node of each clicked element and will throw errors.
target.parentNode	      <-- Uses the selected target to get the parent node (if you meant to apply an action to it's parent).
ul.removeChild(anchor)	<-- Applies remove on your unordered-list <ul> using the variable "anchor".
*/
function deleteLi(e) {
  e = window.event;
  const target = e.target;
  if (target.tagName === "A") {
    const anchor = target.parentNode;
    ul.removeChild(anchor);
  } else {
    return;
  }
}

/*
window.event		                <-- Uses the action from the window object.
e.target		                    <-- Selects an element.
Conditional                     <-- Without this conditional, it will apply line-through to other nodes.
target.classList.toggle("done") <-- Toggles classList on your selected node. Needs css text-decoration.
*/
function toggler(e) {
  e = window.event;
  const target = e.target;
  if (target.tagName === "LI") {
    target.classList.toggle("done");
  } else {
    return;
  }
}

// EVENT-LISTENERS
button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeyPress);

document.addEventListener("click", deleteLi);

document.addEventListener("click", toggler);
