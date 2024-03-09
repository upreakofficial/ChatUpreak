  <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>
  <!-- <script  src="./script.js"></script> -->
$(document).ready(function() {
  var chatVisible = localStorage.getItem('chatVisible');

  if (chatVisible === 'true') {
    $('.chat-button').css({ "display": "none" });
    $('.chat-box').css({ "visibility": "visible" });
  }

  $('.chat-button').on('click', function() {
    localStorage.setItem('chatVisible', 'true');
    $('.chat-button').css({ "display": "none" });
    $('.chat-box').css({ "visibility": "visible" });
  });

  $('.chat-box .chat-box-header p').on('click', function() {
    localStorage.setItem('chatVisible', 'false');
    $('.chat-button').css({ "display": "block" });
    $('.chat-box').css({ "visibility": "hidden" });
  });
});


    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        
          $(document).ready(function() {
            var chatbox = document.getElementById("chatbox");
            chatbox.scrollTop = chatbox.scrollHeight;

            // Animate bubbles
            var bubbles = document.querySelectorAll(".bubble");
            for (var i = 0; i < bubbles.length; i++) {
              animateBubble(bubbles[i]);
            }

            function animateBubble(bubble) {
              bubble.style.opacity = "0";
              bubble.style.transform = "translateY(20px)";
              setTimeout(function() {
                bubble.style.opacity = "1";
                bubble.style.transform = "translateY(0)";
              }, 300);
            }
          });

  function scrollToBottom() {
    var chatBoxBody = document.getElementById("chat-box-body");
    chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
  }

  // Call scrollToBottom whenever a new message is added
  function addMessage(message) {
    var chatBoxBody = document.getElementById("chat-box-body");

    // Create a new message element
    var newMessage = document.createElement("div");
    newMessage.classList.add("chat-message");
    newMessage.textContent = message;

    // Append the new message to the chat box body
    chatBoxBody.appendChild(newMessage);

    // Call the scrollToBottom function to scroll to the bottom
    scrollToBottom();
  }

  // Fetch the value from the database or condition
  var fetchedValue = false; // Replace with your fetched value or condition

  // Get the skip button element
  var skipButton = document.getElementById("addExtra");

  // Set the disabled property based on the fetched value
  skipButton.disabled = fetchedValue;

