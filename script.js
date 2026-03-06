const quizData = {
    geography: typeof geographyData !== 'undefined' ? geographyData : [],
    civics: typeof civicsData !== 'undefined' ? civicsData : [],
    math: typeof mathData !== 'undefined' ? mathData : [],
    ela: typeof elaData !== 'undefined' ? elaData : []
};

let currentQuiz = [];
let currentSubjectName = "";
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionObj = null;
let selectedButton = null;

let ttsMap = []; 
let currentTextForTTS = "";

window.onload = function() {
    displayScores();
};

function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function startQuiz(subject) {
    if (!quizData[subject] || quizData[subject].length === 0) {
        alert("Oops! The questions for this subject haven't been loaded yet.");
        return;
    }

    currentQuiz = shuffleArray(quizData[subject]);
    currentQuestionIndex = 0;
    score = 0;
    
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    
    let title = "";
    if(subject === 'geography') { title = "🌍 Geography Quiz"; currentSubjectName = "Geography"; }
    if(subject === 'civics') { title = "🏛️ Civics & Government Quiz"; currentSubjectName = "Civics"; }
    if(subject === 'math') { title = "➕ Math Quiz"; currentSubjectName = "Math"; }
    if(subject === 'ela') { title = "📚 Language Arts Quiz"; currentSubjectName = "Language Arts"; }
    document.getElementById('quiz-title').innerText = title;

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
    
    const questionWordsHTML = q.question.split(/\s+/).map((word, i) => `<span class="tts-word">${word}</span>`).join(' ');
    document.getElementById('question-text').innerHTML = `${currentQuestionIndex + 1}. ${questionWordsHTML}`;
    
    const hintWordsHTML = q.hint.split(/\s+/).map((word, i) => `<span class="tts-word">${word}</span>`).join(' ');
    document.getElementById('hint-text').innerHTML = hintWordsHTML;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = "";

    const randomizedOptions = shuffleArray(q.answerOptions);

    randomizedOptions.forEach((option) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        
        const optionWordsHTML = option.text.split(/\s+/).map((word, i) => `<span class="tts-word">${word}</span>`).join(' ');
        btn.innerHTML = optionWordsHTML;
        
        btn.onclick = () => selectOption(option, btn);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(option, btn) {
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(b => b.classList.remove('selected'));
    
    btn.classList.add('selected');
    selectedOptionObj = option;
    selectedButton = btn;
    document.getElementById('submit-btn').style.display = 'block';
}

function submitAnswer() {
    document.getElementById('submit-btn').style.display = 'none'; 
    window.speechSynthesis.cancel(); 

    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true);

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
        
        allButtons.forEach(btn => {
            const cleanBtnText = btn.innerText.trim();
            const correctText = currentQuiz[currentQuestionIndex].answerOptions.find(o => o.isCorrect).text.trim();
            if(cleanBtnText === correctText) {
                btn.style.border = "4px solid #2ecc71";
            }
        });
    }

    document.getElementById('next-btn').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// --- Grading Scale Helper Function ---
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
    
    // Calculate percentage and letter grade
    let percentage = Math.round((score / currentQuiz.length) * 100);
    let letterGrade = getLetterGrade(percentage);
    
    document.getElementById('final-score').innerText = `You scored ${score} out of ${currentQuiz.length}!\n(${percentage}% - Grade: ${letterGrade})`;
    
    saveScore(percentage, letterGrade);
    displayScores();
}

function saveScore(percentage, letterGrade) {
    let history = JSON.parse(localStorage.getItem('quizScores')) || [];
    let today = new Date().toLocaleDateString();
    
    // Save the new detailed score metrics
    history.unshift({ 
        subject: currentSubjectName, 
        score: score, 
        total: currentQuiz.length, 
        percentage: percentage,
        grade: letterGrade,
        date: today 
    });
    
    if (history.length > 10) history.pop();
    localStorage.setItem('quizScores', JSON.stringify(history));
}

function displayScores() {
    let history = JSON.parse(localStorage.getItem('quizScores')) || [];
    let list = document.getElementById('score-list');
    list.innerHTML = "";
    if (history.length === 0) {
        list.innerHTML = "<li>No scores yet. Take a quiz!</li>";
        return;
    }
    history.forEach(item => {
        let li = document.createElement('li');
        
        // This check ensures it still works even if they have old scores saved without percentages!
        let perc = item.percentage !== undefined ? `${item.percentage}%` : Math.round((item.score/item.total)*100) + '%';
        let grade = item.grade !== undefined ? item.grade : getLetterGrade(Math.round((item.score/item.total)*100));

        li.innerText = `${item.date} - ${item.subject}: ${item.score} / ${item.total} (${perc} - ${grade})`;
        list.appendChild(li);
    });
}

function toggleScores() {
    const scoreBoard = document.getElementById('score-history');
    if (scoreBoard.style.display === 'none') {
        scoreBoard.style.display = 'block';
    } else {
        scoreBoard.style.display = 'none';
    }
}

function clearScores() {
    const pin = prompt("Enter Teacher PIN to clear all scores:");
    if (pin === "9377") {
        localStorage.removeItem('quizScores');
        displayScores();
        alert("The scoreboard has been cleared.");
        toggleScores(); 
    } else if (pin !== null) {
        alert("Incorrect PIN.");
    }
}

function goHome() {
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
    document.getElementById('score-history').style.display = 'none'; 
}

// --- Interactive Hint Functions ---
function showHint() {
    document.getElementById('show-hint-btn').style.display = 'none';
    document.getElementById('hint-container').style.display = 'flex';
}

function readHint() {
    window.speechSynthesis.cancel();
    ttsMap = [];
    currentTextForTTS = "";

    const hSpans = document.getElementById('hint-text').querySelectorAll('.tts-word');
    hSpans.forEach(span => addTTSMap(span, span.innerText));

    let utterance = new SpeechSynthesisUtterance("Hint. " + currentTextForTTS);
    utterance.rate = 0.85; 
    
    ttsMap.forEach(item => {
        item.start += 6;
        item.end += 6;
    });

    utterance.onboundary = (event) => {
        if(event.name === 'word') {
            ttsMap.forEach(item => { if(item.el) { item.el.classList.remove('highlighted-word'); } });
            let match = ttsMap.find(item => event.charIndex >= item.start && event.charIndex < item.end);
            if (match && match.el) {
                match.el.classList.add('highlighted-word');
            }
        }
    };

    utterance.onend = () => {
        ttsMap.forEach(item => { if(item.el) { item.el.classList.remove('highlighted-word'); } });
    };

    window.speechSynthesis.speak(utterance);
}

// --- Main Text to Speech ---
function addTTSMap(element, textToSpeak) {
    let startIndex = currentTextForTTS.length;
    currentTextForTTS += textToSpeak + " ";
    ttsMap.push({
        el: element,
        start: startIndex,
        end: currentTextForTTS.length
    });
}

function readAloud() {
    window.speechSynthesis.cancel();
    
    ttsMap = [];
    currentTextForTTS = "";

    const qSpans = document.getElementById('question-text').querySelectorAll('.tts-word');
    qSpans.forEach(span => addTTSMap(span, span.innerText));

    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, optIndex) => {
        currentTextForTTS += `Option ${optIndex + 1}. `; 
        const oSpans = btn.querySelectorAll('.tts-word');
        oSpans.forEach(span => addTTSMap(span, span.innerText));
    });

    let utterance = new SpeechSynthesisUtterance(currentTextForTTS);
    utterance.rate = 0.85; 
    
    utterance.onboundary = (event) => {
        if(event.name === 'word') {
            ttsMap.forEach(item => { if(item.el) { item.el.classList.remove('highlighted-word'); } });
            
            let match = ttsMap.find(item => event.charIndex >= item.start && event.charIndex < item.end);
            if (match && match.el) {
                match.el.classList.add('highlighted-word');
            }
        }
    };

    utterance.onend = () => {
        ttsMap.forEach(item => { if(item.el) { item.el.classList.remove('highlighted-word'); } });
    };

    window.speechSynthesis.speak(utterance);
}