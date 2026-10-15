/**
 * Mr. O's 4th Grade General Knowledge Hub - Logic Engine
 * Features: Shuffling, TTS Highlighting, Progress Saving, Grading,
 *           Student Sign-In (after subject pick) + saving to Mr. O's
 *           Google Sheet — see saving.js
 */

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

let answered = false;           // the current question has been checked
let streak = 0;                 // right answers in a row (for the 🔥 badge)

// Each subject's banner icon and color theme (style.css: [data-subject])
const SUBJECT_ICONS = { geography: "🌍", civics: "🏛️", math: "➕", ela: "📚" };

function setQuizTheme(subjectKey) {
    document.getElementById('quiz-screen').dataset.subject = subjectKey || "";
    document.getElementById('quiz-icon').textContent = SUBJECT_ICONS[subjectKey] || "⭐";
}

window.onload = function () {
    displayScores();
    checkForProgress();
};

// --- 1. Student Sign-In (shown after subject is picked) ---

function submitName() {
    if (!attemptLogin()) return;
    document.getElementById('name-screen').style.display = 'none';

    // Now actually start the quiz with the subject that was chosen
    startQuiz(pendingSubject);
}

function cancelName() {
    // Back button — return to subject selection without starting
    document.getElementById('name-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
    resetLoginForm();
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
        studentName: studentName,
        gkSession: gkSession
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
    if (saved.studentName) signIn(saved.studentName);
    gkSession = saved.gkSession ? { ...saved.gkSession, activeSince: null } : null;
    if (!gkSession) gkBeginSession(SUBJECT_KEYS[currentSubjectName]);
    else gkResumeClock();

    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';

    const titles = {
        "Geography": "Geography Quiz",
        "Civics": "Civics & Government Quiz",
        "Math": "Math Quiz",
        "Language Arts": "Language Arts Quiz"
    };
    document.getElementById('quiz-title').innerText = titles[currentSubjectName] || "Quiz";
    setQuizTheme(SUBJECT_KEYS[currentSubjectName]);
    streak = 0;

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
    // Already signed in this tab — go straight to the quiz
    if (studentName) {
        startQuiz(subject);
        return;
    }
    pendingSubject = subject;

    // Update subtitle to show which quiz they picked
    const labels = {
        geography: "🌍 Geography Quiz",
        civics: "🏛️ Civics & Government Quiz",
        math: "➕ Math Quiz",
        ela: "📚 Language Arts Quiz"
    };
    document.getElementById('name-screen-subtitle').innerText =
        `You picked: ${labels[subject]} — Sign in so Mr. O can see your score!`;

    resetLoginForm();

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
    gkBeginSession(subject);

    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('name-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';

    const displayTitles = {
        geography: "Geography Quiz",
        civics: "Civics & Government Quiz",
        math: "Math Quiz",
        ela: "Language Arts Quiz"
    };
    document.getElementById('quiz-title').innerText = displayTitles[subject];
    setQuizTheme(subject);
    streak = 0;

    loadQuestion();
}

/* Put a 🔊 in front of a .say block (the question, the hint). */
function addSpeaker(sayEl, label) {
    const row = sayEl.parentElement;
    const old = row.querySelector(':scope > .spk-btn');
    if (old) old.remove();
    row.insertBefore(makeSpeaker(sayEl, label), sayEl);
}

function loadQuestion() {
    gkSpeech.stop();
    answered = false;
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = "";
    feedback.className = 'feedback';
    feedback.style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('next-btn').innerText =
        currentQuestionIndex === currentQuiz.length - 1 ? '🏁 See My Score' : 'Next Question ➜';
    setHintOpen(false);
    document.getElementById('show-hint-btn').style.display = '';

    selectedOptionObj = null;
    selectedButton = null;

    const q = currentQuiz[currentQuestionIndex];
    const total = currentQuiz.length;
    document.getElementById('quiz-progress').innerText = `Question ${currentQuestionIndex + 1} of ${total}`;
    document.getElementById('progress-fill').style.width = `${Math.round((currentQuestionIndex / total) * 100)}%`;
    showStreak();

    const questionEl = document.getElementById('question-text');
    fillWords(questionEl, q.question);
    addSpeaker(questionEl, 'Read the question to me');
    showQuestionPicture(q);

    fillWords(document.getElementById('hint-text'), q.hint);
    addSpeaker(document.getElementById('hint-text'), 'Read the hint to me');

    const container = document.getElementById('options-container');
    container.innerHTML = "";
    container.classList.remove('locked');
    const grid = q.answerOptions.every(o => o.text.length <= 60);
    container.classList.toggle('grid', grid);
    document.querySelector('.question-card').classList.toggle('compact-pic', !grid);

    q.answerOptions.forEach((option) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (option.isCorrect) btn.dataset.correct = '1';
        const words = document.createElement('span');
        words.className = 'say';
        fillWords(words, option.text);
        btn.appendChild(makeSpeaker(words, 'Read this answer to me'));
        btn.appendChild(words);
        btn.onclick = () => selectOption(option, btn);
        container.appendChild(btn);
    });
}

function selectOption(option, btn) {
    if (answered) return;   // choices stay tappable after checking, so their 🔊 still works
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedOptionObj = option;
    selectedButton = btn;
    const check = document.getElementById('submit-btn');
    check.style.display = 'block';
    // Questions with long answers can push the button below a Chromebook screen.
    check.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function submitAnswer() {
    if (answered || !selectedOptionObj) return;
    answered = true;
    gkSpeech.stop();
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('show-hint-btn').style.display = 'none';
    document.getElementById('options-container').classList.add('locked');
    document.querySelectorAll('.option-btn').forEach(btn => btn.setAttribute('aria-disabled', 'true'));

    const right = selectedOptionObj.isCorrect;
    gkRecordAnswer(right, currentQuiz[currentQuestionIndex], selectedOptionObj.text);
    if (right) {
        score++;
        streak++;
        selectedButton.classList.add('is-right');
        starBurst(selectedButton);
    } else {
        streak = 0;
        selectedButton.classList.add('is-wrong');
        document.querySelectorAll('.option-btn[data-correct]').forEach(btn => btn.classList.add('show-right'));
    }
    showFeedback(right, selectedOptionObj.rationale);
    showStreak();
    document.getElementById('progress-fill').style.width =
        `${Math.round(((currentQuestionIndex + 1) / currentQuiz.length) * 100)}%`;
    const next = document.getElementById('next-btn');
    next.style.display = 'block';
    // The explanation and Next sit under the choices; bring them on screen.
    next.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* A map or math picture beside the question (data: "image", "imageAlt").
   Tapping it opens it big; tapping again closes it. */
function showQuestionPicture(q) {
    const card = document.querySelector('.question-card');
    const old = card.querySelector('.q-pic');
    if (old) old.remove();
    card.classList.toggle('has-pic', !!q.image);
    if (!q.image) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'q-pic';
    btn.title = 'Make the picture bigger';
    btn.setAttribute('aria-label', `Make the picture bigger: ${q.imageAlt || 'picture'}`);
    const img = document.createElement('img');
    img.src = q.image;
    img.alt = q.imageAlt || '';
    const zoom = document.createElement('span');
    zoom.className = 'q-pic-zoom';
    zoom.setAttribute('aria-hidden', 'true');
    zoom.textContent = '🔍';
    btn.append(img, zoom);
    btn.onclick = () => openPicture(q.image, q.imageAlt);
    card.appendChild(btn);
}

function openPicture(src, alt) {
    const box = document.getElementById('pic-zoom');
    const img = document.getElementById('pic-zoom-img');
    img.src = src;
    img.alt = alt || '';
    box.hidden = false;
    document.getElementById('pic-zoom-close').focus();
}

function closePicture() {
    document.getElementById('pic-zoom').hidden = true;
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closePicture(); });

function showStreak() {
    const badge = document.getElementById('streak');
    if (streak >= 2) {
        badge.textContent = `🔥 ${streak} in a row!`;
        badge.style.display = '';
    } else {
        badge.style.display = 'none';
    }
}

/* A quick burst of stars from a right answer. Decoration only. */
function starBurst(btn) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const burst = document.createElement('span');
    burst.className = 'burst';
    burst.setAttribute('aria-hidden', 'true');
    ['⭐', '✨', '🌟', '⭐', '✨', '🌟'].forEach((s, i) => {
        const star = document.createElement('span');
        star.textContent = s;
        star.style.setProperty('--angle', `${i * 60}deg`);
        burst.appendChild(star);
    });
    btn.appendChild(burst);
    setTimeout(() => burst.remove(), 900);
}

function nextQuestion() {
    gkSpeech.stop();
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

    // 1 to 5 stars from the score; the stars pop in one by one (style.css)
    const stars = Math.max(1, Math.min(5, Math.round(percentage / 20)));
    const starRow = document.getElementById('result-stars');
    starRow.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const s = document.createElement('span');
        s.textContent = '⭐';
        s.className = i < stars ? 'star on' : 'star';
        s.style.animationDelay = `${i * 0.15}s`;
        starRow.appendChild(s);
    }
    document.getElementById('result-title').innerText =
        percentage >= 80 ? '🎉 Great job!' : percentage >= 60 ? '👍 Nice work!' : '💪 Keep practicing!';
    document.getElementById('final-score').innerText = `You got ${score} out of ${currentQuiz.length} right.`;
    document.getElementById('final-grade').innerText = `${percentage}% · Grade: ${grade}`;

    saveScoreToHistory(percentage, grade);
    gkSubmit(true);
}

// --- 7. Local Score History ---

// Each student sees only their own scores (kept on this computer).
const HISTORY_PER_STUDENT = 20;

function saveScoreToHistory(percentage, grade) {
    const history = JSON.parse(localStorage.getItem('quizScores')) || [];
    const today = new Date().toLocaleDateString();
    const entry = { name: studentName, subject: currentSubjectName, score, total: currentQuiz.length, percentage, grade, date: today };
    const mine = [entry, ...history.filter(h => h.name === studentName)].slice(0, HISTORY_PER_STUDENT);
    const others = history.filter(h => h.name && h.name !== studentName);
    localStorage.setItem('quizScores', JSON.stringify([...mine, ...others]));
    displayScores();
}

function displayScores() {
    const history = JSON.parse(localStorage.getItem('quizScores')) || [];
    const list = document.getElementById('score-list');
    if (!studentName) {
        list.innerHTML = "<li>Pick a subject and sign in to see your scores.</li>";
        return;
    }
    const mine = history.filter(h => h.name === studentName);
    list.innerHTML = mine.length === 0 ? "<li>No scores yet — take a quiz!</li>" : "";
    mine.forEach(item => {
        const li = document.createElement('li');
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

function setHintOpen(open) {
    document.getElementById('hint-container').style.display = open ? 'block' : 'none';
    const btn = document.getElementById('show-hint-btn');
    btn.innerText = open ? '💡 Hide the Hint' : '💡 Show a Hint';
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

/* One button opens and closes the hint. Opening it also reads it out loud:
   the students who need a hint most are the ones who can't read it yet. */
function toggleHint() {
    const open = document.getElementById('hint-container').style.display === 'none';
    setHintOpen(open);
    const hint = document.getElementById('hint-text');
    if (open) {
        gkSpeech.say(hint, hint.parentElement.querySelector('.spk-btn'));
    } else if (hint.contains(document.querySelector('.w.hl')) || gkSpeech.btn === hint.parentElement.querySelector('.spk-btn')) {
        gkSpeech.stop();
    }
}

/* The box under the choices after "Check My Answer": a title (Correct! /
   Not quite.) and the explanation, with its own 🔊. The title is spoken
   first but is not one of the lit-up words. */
function showFeedback(right, rationale) {
    const box = document.getElementById('feedback');
    box.className = 'feedback ' + (right ? 'feedback-right' : 'feedback-wrong');
    box.innerHTML = '';
    const title = document.createElement('p');
    title.className = 'feedback-title';
    title.textContent = right ? '✅ Correct!' : '❌ Not quite.';
    const row = document.createElement('p');
    row.className = 'speak-row';
    const words = document.createElement('span');
    words.className = 'say';
    words.dataset.lead = right ? 'Correct!' : 'Not quite.';
    fillWords(words, String(rationale || '').replace(/^Explanation:\s*/, ''));
    row.appendChild(makeSpeaker(words, 'Read this to me'));
    row.appendChild(words);
    box.appendChild(title);
    box.appendChild(row);
    box.style.display = 'block';
}