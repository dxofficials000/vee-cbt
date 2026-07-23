// ==========================================
// COGNITO SYSTEM CORE ENGINE (app.js)
// ==========================================

// GLOBAL APP STATE
const appState = {
  activeTab: 'veeTab',
  userName: localStorage.getItem('cognito_username') || null,
  currentQuestionIndex: 0,
  activeQuestions: [],
  selectedOption: null
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initVeeChat();
  initCBTTestMode();
  updateUserData();
});

// 1. BOTTOM NAVIGATION SYSTEM
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update Nav Buttons
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update Active Panel
      tabPanels.forEach(panel => panel.classList.remove('active'));
      const activePanel = document.getElementById(targetTab);
      if (activePanel) activePanel.classList.add('active');

      appState.activeTab = targetTab;
    });
  });
}

// 2. VEE AI CHAT ENGINE
function initVeeChat() {
  const sendBtn = document.getElementById('sendBtn');
  const promptInput = document.getElementById('promptInput');

  if (!sendBtn || !promptInput) return;

  sendBtn.addEventListener('click', handleUserMessage);
  promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserMessage();
    }
  });
}

async function handleUserMessage() {
  const input = document.getElementById('promptInput');
  const query = input.value.trim();

  if (!query) return;

  // Clear Input
  input.value = '';

  // Render User Message
  renderChatMessage(query, 'user');

  // Check Local Overrides (Name & Memory)
  const localReply = checkLocalIdentity(query);
  if (localReply) {
    renderChatMessage(localReply, 'vee');
    return;
  }

  // Show Thinking Indicator
  const veeBubble = renderChatMessage("Vee is thinking...", 'vee');

  // Fetch Live Response
  try {
    const prompt = `You are Vee, an intelligent study assistant on the Cognito CBT platform. Answer this question accurately and concisely for a student: "${query}"`;
    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);

    if (response.ok) {
      const text = await response.text();
      veeBubble.innerHTML = parseMarkdown(text);
    } else {
      veeBubble.innerText = "I encountered an issue fetching that answer. Please try again!";
    }
  } catch (err) {
    veeBubble.innerText = "Network connection interrupted. Please check your internet!";
  }
}

function renderChatMessage(text, sender) {
  const container = document.getElementById('chatContainer');
  if (!container) return null;

  const msg = document.createElement('div');
  msg.className = `message ${sender}-message`;
  msg.innerHTML = sender === 'vee' ? parseMarkdown(text) : escapeHtml(text);

  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;

  return msg;
}

function checkLocalIdentity(query) {
  const q = query.toLowerCase();

  if (q.includes("my name is ")) {
    const name = query.split(/my name is /i)[1].trim().split(" ")[0];
    appState.userName = name;
    localStorage.setItem('cognito_username', name);
    updateUserData();
    return `Nice to meet you, ${name}! 👋 How can I help you with your studies on Cognito today?`;
  }

  if (q.includes("what is my name") || q.includes("do you know my name")) {
    return appState.userName 
      ? `Yes! Your name is ${appState.userName}.` 
      : "I don't know your name yet! Tell me by saying 'My name is [your name]'.";
  }

  if (q.includes("who are you") || q.includes("what is vee")) {
    return "I am **Vee**, your AI study assistant integrated into Cognito. Ask me step-by-step math solutions, literature analysis, or practice questions!";
  }

  return null;
}

// 3. CBT TEST ENGINE & EXPLANATIONS
function initCBTTestMode() {
  const startBtn = document.getElementById('startTestBtn');
  if (!startBtn) return;

  startBtn.addEventListener('click', () => {
    const subject = document.getElementById('testSubjectSelect').value;
    
    // Filter questions from questionBank (questions.js)
    if (typeof questionBank !== 'undefined' && questionBank.length > 0) {
      appState.activeQuestions = subject === 'ALL' 
        ? questionBank 
        : questionBank.filter(q => q.subject.toLowerCase().includes(subject.toLowerCase()) || subject === 'ALL');
      
      appState.currentQuestionIndex = 0;
      renderCurrentQuestion();
    } else {
      document.getElementById('testWorkspace').innerHTML = '<p style="color:var(--text-muted);">No questions found in questions.js database.</p>';
    }
  });
}

function renderCurrentQuestion() {
  const workspace = document.getElementById('testWorkspace');
  if (!workspace || appState.activeQuestions.length === 0) return;

  const q = appState.activeQuestions[appState.currentQuestionIndex];
  appState.selectedOption = null;

  let optionsHTML = q.options.map((opt, idx) => `
    <button class="option-btn" onclick="selectTestOption(${idx})">
      ${opt}
    </button>
  `).join('');

  workspace.innerHTML = `
    <div class="welcome-card">
      <small style="color:var(--text-muted); font-weight:700;">Question ${appState.currentQuestionIndex + 1} of ${appState.activeQuestions.length} • ${q.subject}</small>
      <div class="question-text" style="margin-top:8px;">${q.question}</div>
      <div class="options-grid" style="margin-top:12px;">
        ${optionsHTML}
      </div>
      <div id="explanationContainer"></div>
      <button class="action-btn" id="nextQuestionBtn" onclick="nextQuestion()" style="margin-top:14px; width:100%; display:none;">Next Question</button>
    </div>
  `;
}

function selectTestOption(index) {
  if (appState.selectedOption !== null) return; // Prevent changing after selection
  appState.selectedOption = index;

  const q = appState.activeQuestions[appState.currentQuestionIndex];
  const optionBtns = document.querySelectorAll('.option-btn');
  const expContainer = document.getElementById('explanationContainer');
  const nextBtn = document.getElementById('nextQuestionBtn');

  optionBtns.forEach((btn, idx) => {
    if (idx === q.answerIndex) {
      btn.classList.add('correct'); // Highlights Green
    } else if (idx === index) {
      btn.classList.add('wrong'); // Highlights Red
    }
    btn.style.pointerEvents = 'none'; // Lock options
  });

  // Render Explanations
  let expText = q.m2 || q.explanation || "No explanation breakdown provided for this question.";
  expContainer.innerHTML = `
    <div class="explanation-card">
      <strong style="color:var(--purple-light);">Breakdown & Solution:</strong><br>
      ${expText}
    </div>
  `;

  if (nextBtn) nextBtn.style.display = 'block';

  // Increment questions answered count
  let answered = parseInt(localStorage.getItem('cognito_answered') || '0') + 1;
  localStorage.setItem('cognito_answered', answered.toString());
  updateUserData();
}

function nextQuestion() {
  if (appState.currentQuestionIndex + 1 < appState.activeQuestions.length) {
    appState.currentQuestionIndex++;
    renderCurrentQuestion();
  } else {
    document.getElementById('testWorkspace').innerHTML = `
      <div class="welcome-card" style="text-align:center;">
        <h2>🎉 Test Completed!</h2>
        <p>You have finished all questions in this session.</p>
      </div>
    `;
  }
}

// 4. UTILITIES & HELPERS
function updateUserData() {
  const answeredSpan = document.getElementById('answeredCount');
  if (answeredSpan) {
    answeredSpan.innerText = localStorage.getItem('cognito_answered') || '0';
  }
}

function parseMarkdown(text) {
  if (window.marked) {
    return marked.parse(text);
  }
  return escapeHtml(text);
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
