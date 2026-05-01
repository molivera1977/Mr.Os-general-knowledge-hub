/**
 * Mr. O's 4th Grade General Knowledge Hub - Logic Engine
 * Features: Shuffling, TTS Highlighting, Progress Saving, Grading,
 *           Student Name Entry (after subject pick), Silent Google Sheets Reporting
 */

// ============================================================
// CONFIGURATION
// ============================================================
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyvYUXLVw0c_C5Iy-xkT0lDH2SqJog0nK2JgN9nI_wOWDwHzmdop-oJW6EzzzgA4KYM/exec";
// ============================================================

const quizData = {
    geography: typeof geographyData !== 'undefined' ? geographyData : [],
    civics: typeof civicsData !== 'undefined' ? civicsData : [],
    math: typeof mathData !== 'undefined' ? mathData : [],
    ela: typeof elaData !== 'undefined' ? elaData : []
};

let currentQuiz = [];
let currentSubjectName = "";
let pendingSubject = "";        // holds the subject chosen before name is entered
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionObj = null;
let selectedButton = null;
let studentName = "";

// Variables for Text-to-Speech (TTS) mapping
let ttsMap = [];
let currentTextForTTS = "";

window.onload = function () {
    displayScores();
    checkForProgress();
};

// Allow pressing Enter on the name input to submit
document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('student-name-input');
    if (nameInput) {
        nameInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') submitName();
        });
    }
});

// --- 1. Student Name (shown after subject is picked) ---

function submitName() {
    const input = document.getElementById('student-name-input').value.trim();
    if (!input) {
        document.getElementById('name-error').style.display = 'block';
        return;
    }
    studentName = input;
    document.getElementById('name-screen').style.display = 'none';

    // Now actually start the quiz with the subject that was chosen
    startQuiz(pendingSubject);
}

function cancelName() {
    // Back button — return to subject selection without starting
    document.getElementById('name-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
    document.getElementById('student-name-input').value = '';
    document.getElementById('name-error').style.display = 'none';
    pendingSubject = "";
}

// --- 2. Randomization ---

function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    shuffled.forEach(q => {
        q.answerOptions = [...q.answerOptions];
        for (let i = q.answerOptions.length - 1; i > 0; i--) {
            const k = Math.floor(Math.random() * (i + 1));
            [q.answerOptions[i], q.answerOptions[k]] = [q.answerOptions[k], q.answerOptions[i]];
        }
    });
    return shuffled;
}

// --- 3. Progress & Resume Logic ---

function checkForProgress() {
    const saved = JSON.parse(localStorage.getItem('savedQuizProgress'));
    const resumeSection = document.getElementById('resume-section');
    if (saved) {
        resumeSection.style.display = 'block';
        document.getElementById('resume-btn').innerText = `Resume ${saved.subject} Quiz (Q${saved.index + 1})`;
        if (!studentName && saved.studentName) {
            studentName = saved.studentName;
        }
    } else {
        resumeSection.style.display = 'none';
    }
}

function saveProgress() {
    const progress = {
        subject: currentSubjectName,
        quizArray: currentQuiz,
        index: currentQuestionIndex,
        currentScore: score,
        studentName: studentName
    };
    localStorage.setItem('savedQuizProgress', JSON.stringify(progress));
}

function deleteProgress() {
    const pin = prompt("Teacher PIN required to delete progress and start fresh:");
    if (pin === "9377") {
        localStorage.removeItem('savedQuizProgress');
        checkForProgress();
        alert("Progress cleared.");
    } else if (pin !== null) {
        alert("Incorrect PIN.");
    }
}

function resumeQuiz() {
    const saved = JSON.parse(localStorage.getItem('savedQuizProgress'));
    if (!saved) return;

    currentSubjectName = saved.subject;
    currentQuiz = saved.quizArray;
    currentQuestionIndex = saved.index;
    score = saved.currentScore;
    if (saved.studentName) studentName = saved.studentName;

    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';

    const titles = {
        "Geography": "🌍 Geography Quiz",
        "Civics": "🏛️ Civics & Government Quiz",
        "Math": "➕ Math Quiz",
        "Language Arts": "📚 Language Arts Quiz"
    };
    document.getElementById('quiz-title').innerText = titles[currentSubjectName] || "Quiz";

    loadQuestion();
}

function confirmStart(subject) {
    if (localStorage.getItem('savedQuizProgress')) {
        const pin = prompt("You have an unfinished quiz! Teacher PIN required to start a new one:");
        if (pin === "9377") {
            localStorage.removeItem('savedQuizProgress');
            showNameScreen(subject);
        } else if (pin !== null) {
            alert("Incorrect PIN. Please resume your current quiz.");
        }
    } else {
        showNameScreen(subject);
    }
}

function showNameScreen(subject) {
    pendingSubject = subject;

    // Update subtitle to show which quiz they picked
    const labels = {
        geography: "🌍 Geography Quiz",
        civics: "🏛️ Civics & Government Quiz",
        math: "➕ Math Quiz",
        ela: "📚 Language Arts Quiz"
    };
    document.getElementById('name-screen-subtitle').innerText =
        `You picked: ${labels[subject]} — Enter your name to begin!`;

    // Clear any previous input
    document.getElementById('student-name-input').value = studentName; // pre-fill if they already entered it
    document.getElementById('name-error').style.display = 'none';

    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('name-screen').style.display = 'block';

    // Auto-focus the input
    setTimeout(() => document.getElementById('student-name-input').focus(), 100);
}

// --- 4. Core Quiz Engine ---

function startQuiz(subject) {
    if (!quizData[subject] || quizData[subject].length === 0) {
        alert("Questions not found!");
        return;
    }

    currentQuiz = shuffleArray(quizData[subject]);
    currentQuestionIndex = 0;
    score = 0;

    const titles = { geography: "Geography", civics: "Civics", math: "Math", ela: "Language Arts" };
    currentSubjectName = titles[subject];

    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('name-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';

    const displayTitles = {
        geography: "🌍 Geography Quiz",
        civics: "🏛️ Civics & Government Quiz",
        math: "➕ Math Quiz",
        ela: "📚 Language Arts Quiz"
    };
    document.getElementById('quiz-title').innerText = displayTitles[subject];

    loadQuestion();
}

function loadQuestion() {
    window.speechSynthesis.cancel();
    document.getElementById('feedback').innerText = "";
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('show-hint-btn').style.display = 'inline-block';
    document.getElementById('hint-container').style.display = 'none';

    selectedOptionObj = null;
    selectedButton = null;

    const q = currentQuiz[currentQuestionIndex];

    const qHTML = q.question.split(/\s+/).map(word => `<span class="tts-word">${word}</span>`).join(' ');
    document.getElementById('question-text').innerHTML = `${currentQuestionIndex + 1}. ${qHTML}`;

    const hHTML = q.hint.split(/\s+/).map(word => `<span class="tts-word">${word}</span>`).join(' ');
    document.getElementById('hint-text').innerHTML = hHTML;

    const container = document.getElementById('options-container');
    container.innerHTML = "";

    q.answerOptions.forEach((option) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        const optHTML = option.text.split(/\s+/).map(word => `<span class="tts-word">${word}</span>`).join(' ');
        btn.innerHTML = optHTML;
        btn.onclick = () => selectOption(option, btn);
        container.appendChild(btn);
    });
}

function selectOption(option, btn) {
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedOptionObj = option;
    selectedButton = btn;
    document.getElementById('submit-btn').style.display = 'block';
}

function submitAnswer() {
    document.getElementById('submit-btn').style.display = 'none';
    window.speechSynthesis.cancel();
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

    const feedback = document.getElementById('feedback');
    if (selectedOptionObj.isCorrect) {
        selectedButton.style.backgroundColor = '#2ecc71';
        selectedButton.style.color = 'white';
        feedback.innerText = "✅ Correct! " + selectedOptionObj.rationale;
        feedback.style.color = '#27ae60';
        score++;
    } else {
        selectedButton.style.backgroundColor = '#e74c3c';
        selectedButton.style.color = 'white';
        feedback.innerText = "❌ Incorrect. " + selectedOptionObj.rationale;
        feedback.style.color = '#c0392b';

        document.querySelectorAll('.option-btn').forEach(btn => {
            if (btn.innerText.trim() === currentQuiz[currentQuestionIndex].answerOptions.find(o => o.isCorrect).text.trim()) {
                btn.style.border = "4px solid #2ecc71";
            }
        });
    }
    document.getElementById('next-btn').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.length) {
        saveProgress();
        loadQuestion();
    } else {
        deleteProgressSilently();
        showResults();
    }
}

// --- 5. Scoring & Results ---

function getLetterGrade(percentage) {
    if (percentage >= 97) return "A+";
    if (percentage >= 93) return "A";
    if (percentage >= 90) return "A-";
    if (percentage >= 87) return "B+";
    if (percentage >= 83) return "B";
    if (percentage >= 80) return "B-";
    if (percentage >= 77) return "C+";
    if (percentage >= 73) return "C";
    if (percentage >= 70) return "C-";
    if (percentage >= 67) return "D+";
    if (percentage >= 65) return "D";
    return "F";
}

function showResults() {
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';

    let percentage = Math.round((score / currentQuiz.length) * 100);
    let grade = getLetterGrade(percentage);

    document.getElementById('final-score').innerText =
        `You scored ${score} out of ${currentQuiz.length}!\n(${percentage}% - Grade: ${grade})`;

    saveScoreToHistory(percentage, grade);
    reportScoreSilently(percentage, grade);
}

// --- 6. Silent Google Sheets Reporting ---

function reportScoreSilently(percentage, grade) {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === "PASTE_YOUR_APPS_SCRIPT_URL_HERE") return;

    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
        month: '2-digit', day: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
    });

    const payload = {
        studentName: studentName || "Unknown",
        subject: currentSubjectName,
        score: score,
        total: currentQuiz.length,
        percentage: percentage,
        grade: grade,
        timestamp: timestamp
    };

    fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).catch(() => {
        // Fail silently — student never sees this
    });
}

// --- 7. Local Score History ---

function saveScoreToHistory(percentage, grade) {
    let history = JSON.parse(localStorage.getItem('quizScores')) || [];
    let today = new Date().toLocaleDateString();
    history.unshift({ subject: currentSubjectName, score, total: currentQuiz.length, percentage, grade, date: today });
    if (history.length > 10) history.pop();
    localStorage.setItem('quizScores', JSON.stringify(history));
    displayScores();
}

function displayScores() {
    let history = JSON.parse(localStorage.getItem('quizScores')) || [];
    let list = document.getElementById('score-list');
    list.innerHTML = history.length === 0 ? "<li>No scores yet.</li>" : "";
    history.forEach(item => {
        let li = document.createElement('li');
        li.innerText = `${item.date} - ${item.subject}: ${item.score}/${item.total} (${item.percentage}% - ${item.grade})`;
        list.appendChild(li);
    });
}

function toggleScores() {
    const board = document.getElementById('score-history');
    board.style.display = board.style.display === 'none' ? 'block' : 'none';
}

function clearScores() {
    const pin = prompt("Teacher PIN to clear scoreboard:");
    if (pin === "9377") {
        localStorage.removeItem('quizScores');
        displayScores();
        alert("Scores cleared.");
    } else if (pin !== null) alert("Incorrect PIN.");
}

function goHome() {
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
    document.getElementById('score-history').style.display = 'none';
    checkForProgress();
}

function deleteProgressSilently() {
    localStorage.removeItem('savedQuizProgress');
}

// --- 8. Accessibility & Hints ---

function showHint() {
    document.getElementById('show-hint-btn').style.display = 'none';
    document.getElementById('hint-container').style.display = 'flex';
}

function addTTSMap(element, text) {
    let start = currentTextForTTS.length;
    currentTextForTTS += text + " ";
    ttsMap.push({ el: element, start, end: currentTextForTTS.length });
}

function readAloud() {
    window.speechSynthesis.cancel();
    ttsMap = [];
    currentTextForTTS = "";

    document.getElementById('question-text').querySelectorAll('.tts-word').forEach(span => addTTSMap(span, span.innerText));
    document.querySelectorAll('.option-btn').forEach((btn, i) => {
        currentTextForTTS += `Option ${i + 1}. `;
        btn.querySelectorAll('.tts-word').forEach(span => addTTSMap(span, span.innerText));
    });

    executeTTS(currentTextForTTS, 0);
}

function readHint() {
    window.speechSynthesis.cancel();
    ttsMap = [];
    currentTextForTTS = "";
    document.getElementById('hint-text').querySelectorAll('.tts-word').forEach(span => addTTSMap(span, span.innerText));
    executeTTS("Hint. " + currentTextForTTS, 6);
}

function executeTTS(text, offset) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.onboundary = (e) => {
        if (e.name === 'word') {
            document.querySelectorAll('.highlighted-word').forEach(el => el.classList.remove('highlighted-word'));
            let match = ttsMap.find(m => (e.charIndex - offset) >= m.start && (e.charIndex - offset) < m.end);
            if (match && match.el) match.el.classList.add('highlighted-word');
        }
    };
    utterance.onend = () => document.querySelectorAll('.highlighted-word').forEach(el => el.classList.remove('highlighted-word'));
    window.speechSynthesis.speak(utterance);
}