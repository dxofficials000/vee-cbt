// ==========================================
// COGNITO AI — SYSTEM CORE ENGINE (app.js)
// ==========================================

// 1. GLOBAL STATE & MEMORY MANAGEMENT
const state = {
  activeView: 'chatView',
  theme: localStorage.getItem('cognito_theme') || 'light',
  userName: localStorage.getItem('cognito_username') || 'Student',
  chatHistory: JSON.parse(localStorage.getItem('cognito_chats')) || [],
  currentChatId: null,
  isGenerating: false,
  speechRecognition: null,
  isListening: false
};

// 2. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initChatEngine();
  initSpeech();
  renderHistoryList();
});

// 3. THEME TOGGLE SYSTEM
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.checked = state.theme === 'dark';
    themeToggle.addEventListener('change', (e) => {
      state.theme = e.target.checked ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('cognito_theme', state.theme);
    });
  }
}

// 4. NAVIGATION & VIEW SWITCHING
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetView = item.getAttribute('data-view');
      switchView(targetView);
    });
  });

  // Mobile Sidebar Toggle
  const sidebar = document.getElementById('sidebar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarToggle = document.getElementById('sidebarToggle');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  // New Chat Button
  document.getElementById('newChatBtn').addEventListener('click', startNewChat);
}

function switchView(viewId) {
  state.activeView = viewId;
  document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));

  const activePanel = document.getElementById(viewId);
  if (activePanel) activePanel.classList.add('active');

  const activeNav = document.querySelector(`.nav-item[data-view="${viewId}"]`);
  if (activeNav) activeNav.classList.add('active');

  // Close mobile sidebar after switching
  document.getElementById('sidebar').classList.remove('open');
}

// 5. CHAT ENGINE & VEE INTEGRATION
function initChatEngine() {
  const sendBtn = document.getElementById('sendBtn');
  const promptInput = document.getElementById('promptInput');

  sendBtn.addEventListener('click', handleUserSubmit);

  promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserSubmit();
    }
  });

  // Auto-resize textarea
  promptInput.addEventListener('input', () => {
    promptInput.style.height = 'auto';
    promptInput.style.height = Math.min(promptInput.scrollHeight, 120) + 'px';
  });
}

async function handleUserSubmit() {
  const promptInput = document.getElementById('promptInput');
  const query = promptInput.value.trim();

  if (!query || state.isGenerating) return;

  // Clear Input & Hide Welcome
  promptInput.value = '';
  promptInput.style.height = 'auto';
  document.getElementById('chatWelcome').style.display = 'none';

  // Render User Message
  renderMessage(query, 'user');

  // Check for local smart identity overrides
  const smartReply = processSmartIdentity(query);
  if (smartReply) {
    renderMessage(smartReply, 'vee');
    return;
  }

  // Stream AI Search Engine Response
  state.isGenerating = true;
  const veeMsgElement = renderMessage("Vee is analyzing your query...", 'vee', true);

  try {
    const prompt = `You are Vee, Cognito's study assistant. Give a detailed, clear, and accurate study answer to this question: "${query}"`;
    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);

    if (response.ok) {
      const responseText = await response.text();
      veeMsgElement.innerHTML = parseMarkdown(responseText);
      
      // Trigger code syntax highlighting and MathJax
      if (window.hljs) hljs.highlightAll();
      if (window.MathJax) MathJax.typesetPromise();
      
      saveChatToHistory(query, responseText);
    } else {
      throw new Error("Service Timeout");
    }
  } catch (err) {
    veeMsgElement.innerText = "⚠️ Network connection interrupted. Please check your internet and try again.";
  } finally {
    state.isGenerating = false;
  }
}

function renderMessage(content, sender, isThinking = false) {
  const container = document.getElementById('chatContainer');

  const row = document.createElement('div');
  row.className = `message-row ${sender}`;

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.innerHTML = sender === 'user' ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-brain"></i>';

  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';

  if (isThinking) {
    bubble.innerText = content;
  } else {
    bubble.innerHTML = sender === 'vee' ? parseMarkdown(content) : escapeHtml(content);
  }

  row.appendChild(avatar);
  row.appendChild(bubble);
  container.appendChild(row);

  container.scrollTop = container.scrollHeight;
  return bubble;
}

function processSmartIdentity(query) {
  const q = query.toLowerCase().trim();

  if (q.includes("my name is ")) {
    const name = query.split(/my name is /i)[1].trim().split(" ")[0];
    state.userName = name;
    localStorage.setItem('cognito_username', name);
    document.getElementById('displayUserName').innerText = name;
    return `Nice to meet you, ${name}! 👋 How can I help you with your studies today?`;
  }

  if (q.includes("who are you") || q.includes("what is your name")) {
    return "I'm **Vee**, Cognito's AI search engine and study companion! I'm here to answer study questions, explain complex topics step-by-step, and help you excel in your exams.";
  }

  return null;
}

// 6. HELPER UTILITIES
function parseMarkdown(text) {
  if (window.marked) {
    return marked.parse(text);
  }
  return escapeHtml(text);
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function quickPrompt(text) {
  document.getElementById('promptInput').value = text;
  handleUserSubmit();
}

function startNewChat() {
  document.getElementById('chatContainer').innerHTML = '';
  document.getElementById('chatWelcome').style.display = 'block';
  switchView('chatView');
}

function renderHistoryList() {
  const list = document.getElementById('historyList');
  if (!list) return;
  list.innerHTML = '';
  state.chatHistory.slice(-5).reverse().forEach(chat => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerText = chat.title;
    item.onclick = () => loadChatFromHistory(chat.id);
    list.appendChild(item);
  });
}

function saveChatToHistory(title, response) {
  const newChat = { id: Date.now(), title, response };
  state.chatHistory.push(newChat);
  localStorage.setItem('cognito_chats', JSON.stringify(state.chatHistory));
  renderHistoryList();
}

function loadChatFromHistory(id) {
  const chat = state.chatHistory.find(c => c.id === id);
  if (!chat) return;
  document.getElementById('chatWelcome').style.display = 'none';
  const container = document.getElementById('chatContainer');
  container.innerHTML = '';
  renderMessage(chat.title, 'user');
  renderMessage(chat.response, 'vee');
  switchView('chatView');
}

// 7. SPEECH RECOGNITION (VOICE INPUT)
function initSpeech() {
  const micBtn = document.getElementById('micBtn');
  if (!micBtn) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    micBtn.style.display = 'none';
    return;
  }

  state.speechRecognition = new SpeechRecognition();
  state.speechRecognition.continuous = false;
  state.speechRecognition.interimResults = false;

  state.speechRecognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    document.getElementById('promptInput').value = transcript;
    micBtn.style.color = 'var(--text-muted)';
  };

  micBtn.addEventListener('click', () => {
    if (state.isListening) {
      state.speechRecognition.stop();
      state.isListening = false;
      micBtn.style.color = 'var(--text-muted)';
    } else {
      state.speechRecognition.start();
      state.isListening = true;
      micBtn.style.color = '#ef4444';
    }
  });
}
