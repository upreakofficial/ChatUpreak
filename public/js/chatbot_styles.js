// Function to scroll to the bottom of the chat box
function scrollToBottom() {
  var chatBoxBody = document.getElementById("chat-box-body");
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
}

// Function to add a new message to the chat box
function addMessage(message) {
  var chatBoxBody = document.getElementById("chat-box-body");

  // Create a new message element
  var newMessage = document.createElement("div");
  newMessage.classList.add("chat-message");
  newMessage.textContent = message;

  // Append the new message to the chat box body
  chatBoxBody.appendChild(newMessage);

  // Call the scrollToBottom function to scroll to the bottom after a short delay
  setTimeout(scrollToBottom, 100);
}

// Call the scrollToBottom function when the page loads to initially scroll to the bottom
window.onload = function () {
  scrollToBottom();
};

// Function to handle user input and add messages to the chat box
function sendMessage() {
  var userInput = document.getElementById("user-input");
  var message = userInput.value.trim();
  if (message !== "") {
    addMessage("You: " + message);
    userInput.value = "";
  }
}

// Function to handle the "Add Extra" button click
function addExtra() {
  // Implement your logic here to add an extra feature or do something based on the fetched value or condition
  // For example:
  // var fetchedValue = true; // Replace with your fetched value or condition
  // if (fetchedValue) {
  //   alert("Extra feature added!");
  // } else {
  //   alert("No extra feature to add.");
  // }
}

// Get the "Send" button element and attach the sendMessage function to its click event
var sendButton = document.getElementById("sendButton");
sendButton.addEventListener("click", sendMessage);

// Get the "Add Extra" button element
var addExtraButton = document.getElementById("addExtra");

// Set the disabled property based on the fetched value or condition
// For this example, we'll disable the button initially and enable it after 3 seconds
setTimeout(function () {
  addExtraButton.disabled = false;
}, 3000);

// Attach the addExtra function to the "Add Extra" button click event
addExtraButton.addEventListener("click", addExtra);
// Vanilla JavaScript
window.addEventListener("scroll", function (event) {
  event.preventDefault();
  window.scrollTo(0, 0);
});

// If you are using jQuery
$(window).on("scroll", function (event) {
  event.preventDefault();
  $(window).scrollTop(0);
});
