// ==========================================
// COGNITO VEE ENGINE - EMBEDDED AI SYSTEM
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  initChatEngine();
});

function initChatEngine() {
  const sendBtn = document.getElementById("sendBtn") || document.querySelector(".send-btn");
  const promptInput = document.getElementById("promptInput") || document.querySelector("input[type='text']");

  if (!sendBtn || !promptInput) return;

  sendBtn.addEventListener("click", () => handleSendMessage(promptInput));

  promptInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage(promptInput);
    }
  });
}

async function handleSendMessage(inputElement) {
  const query = inputElement.value.trim();
  if (!query) return;

  // Render User Message in Chat Box
  appendMessage(query, "user");
  inputElement.value = "";

  // Check for Local Quick Overrides (Name, Identity)
  const localResponse = checkLocalIdentity(query);
  if (localResponse) {
    appendMessage(localResponse, "vee");
    return;
  }

  // Show Loading Indicator
  const loadingBubble = appendMessage("Vee is thinking...", "vee", true);

  // Fetch Live AI Answer from API
  try {
    const prompt = `You are Vee, an intelligent AI study assistant inside Cognito CBT platform. Answer this query concisely and accurately for a student: "${query}"`;
    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);

    if (response.ok) {
      const answer = await response.text();
      loadingBubble.innerText = answer;
    } else {
      loadingBubble.innerText = "I couldn't fetch that right now. Please check your connection and try again!";
    }
  } catch (err) {
    loadingBubble.innerText = "Connection error. Please try again in a moment.";
  }
}

function appendMessage(text, sender, isThinking = false) {
  const chatContainer = document.getElementById("chatContainer") || document.querySelector(".chat-box") || document.querySelector(".messages");
  if (!chatContainer) return null;

  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}-message`;
  
  // Style for clarity based on sender
  if (sender === "user") {
    msgDiv.style.alignSelf = "flex-end";
    msgDiv.style.background = "#7e22ce";
    msgDiv.style.color = "#ffffff";
  } else {
    msgDiv.style.alignSelf = "flex-start";
    msgDiv.style.background = "#f3e8ff";
    msgDiv.style.color = "#3b0764";
  }
  
  msgDiv.style.padding = "10px 14px";
  msgDiv.style.borderRadius = "12px";
  msgDiv.style.margin = "6px 0";
  msgDiv.style.maxWidth = "85%";
  msgDiv.style.fontSize = "14px";

  msgDiv.innerText = text;
  chatContainer.appendChild(msgDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  return msgDiv;
}

function checkLocalIdentity(query) {
  const q = query.toLowerCase();

  if (q.includes("my name is ")) {
    const name = query.split(/my name is /i)[1].trim().split(" ")[0];
    localStorage.setItem("cognito_user_name", name);
    return `Nice to meet you, ${name}! How can I help you with your studies on Cognito today?`;
  }

  if (q.includes("do you know my name") || q.includes("what is my name")) {
    const savedName = localStorage.getItem("cognito_user_name");
    return savedName 
      ? `Yes! Your name is ${savedName}.` 
      : "I don't know your name yet! You can tell me by saying 'My name is...'";
  }

  return null;
}
