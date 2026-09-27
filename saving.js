/**
 * Mr. O's General Knowledge Hub - Student Login + Saved Progress
 * Each quiz is sent to Mr. O's Google Sheet (same one as the Math Fact
 * Review sites) and shows up in the Teacher Dashboard. One tab per subject:
 *   gk-geography | gk-civics | gk-math | gk-ela
 */

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzv8CWv1yyi8NeH04now9UxVL4IZm5yMqqsEGMcgGdrcAOWVB-aSp5siTvSSJXIUpzFMA/exec';
const LOGIN_KEY = 'gk_student_v1';
const PARTIAL_EVERY = 5; // save an in-progress row every 5 answers

const GAME_KEYS = {
    geography: 'gk-geography',
    civics: 'gk-civics',
    math: 'gk-math',
    ela: 'gk-ela'
};
const SUBJECT_KEYS = { "Geography": 'geography', "Civics": 'civics', "Math": 'math', "Language Arts": 'ela' };

// ⚠️ ROSTER SYNC — keep identical to the Teacher Dashboard ROSTER
// and every other student-facing activity.
const ROSTER = [
    { name: "Mr. O (Teacher)",           id: "9377" },
    { name: "Avery, Jo'Von",             id: "10053632" },
    { name: "Belasquez Bonilla, Eduin",  id: "10058674" },
    { name: "Castaneda, Kelvin",         id: "10053248" },
    { name: "Chicas-Santos, Allison",    id: "10066737" },
    { name: "Collado, Roniel",           id: "10060249" },
    { name: "Dejesus, Michael",          id: "10049434" },
    { name: "Dock, Fakeem",              id: "10059720" },
    { name: "Douglas, Iyana",            id: "10070980" },
    { name: "Dumphrey, Christopher",     id: "10060696" },
    { name: "Flores, Kiara",             id: "10052834" },
    { name: "Garcia, Ariana",            id: "10045361" },
    { name: "Johnson, Destiny",          id: "10052926" },
    { name: "Jones, Tahji",              id: "10060315" },
    { name: "Lawrence, Eric",            id: "10057451" },
    { name: "Madero, Jovany",            id: "10076374" },
    { name: "Pettway, Lanaura",          id: "10060616" },
    { name: "Polanco Soriano, Thiara",   id: "10060503" },
    { name: "Rivera, Adrianna",          id: "10045661" },
    { name: "Roberts, Robyn",            id: "10060925" },
    { name: "Rojas, Alanie",             id: "10076388" },
    { name: "Sanchez Rodriguez, Johanelyz", id: "10076767" },
    { name: "Vega, Taishmara",           id: "10054043" },
    { name: "Watts, Autumn",             id: "10039032" },
    { name: "Zelaya-Osorto, Nazareth",   id: "10053626" }
];

const GUEST_SLOTS = {
    '937701': 'Guest 1', '937702': 'Guest 2', '937703': 'Guest 3',
    '937704': 'Guest 4', '937705': 'Guest 5', '937706': 'Guest 6',
    '937707': 'Guest 7', '937708': 'Guest 8', '937709': 'Guest 9',
    '937710': 'Guest 10'
};

let gkSession = null; // { id, subject, started, missed, answered, sent }

(function buildRoster() {
    const sel = document.getElementById('name-select');
    ROSTER.forEach(s => {
        const o = document.createElement('option');
        o.value = s.name; o.textContent = s.name;
        sel.appendChild(o);
    });
    const div = document.createElement('option');
    div.disabled = true; div.textContent = '── Guest Slots ──';
    sel.appendChild(div);
    Object.entries(GUEST_SLOTS).forEach(([code, label]) => {
        const o = document.createElement('option');
        o.value = `GUEST:${code}`; o.textContent = `🙋 ${label}`;
        sel.appendChild(o);
    });
    ['student-pin', 'guest-display-name'].forEach(id => {
        document.getElementById(id).addEventListener('keydown', e => {
            if (e.key === 'Enter') submitName();
        });
    });
})();

function onNameSelect() {
    const val = document.getElementById('name-select').value;
    const isGuest = val.startsWith('GUEST:');
    document.getElementById('name-error').textContent = '';
    document.getElementById('pin-section').style.display = val ? 'block' : 'none';
    document.getElementById('guest-name-section').style.display = isGuest ? 'block' : 'none';
    document.getElementById('pin-label').textContent = isGuest
        ? '🔒 Enter guest code:' : '🔒 Enter your student number:';
    if (val) setTimeout(() => document.getElementById('student-pin').focus(), 80);
}

// Returns the display name on success, '' on failure (error shown on screen).
function attemptLogin() {
    const selVal = document.getElementById('name-select').value;
    const pin    = document.getElementById('student-pin').value.trim();
    const errEl  = document.getElementById('name-error');
    errEl.textContent = '';

    if (!selVal) { errEl.textContent = '⚠️ Please select your name.'; return ''; }
    if (!pin)    { errEl.textContent = '⚠️ Please enter your student number.'; return ''; }

    let displayName = '';
    if (selVal.startsWith('GUEST:')) {
        if (pin !== selVal.replace('GUEST:', '')) { errEl.textContent = '❌ Incorrect guest code. Try again.'; return ''; }
        const firstName = document.getElementById('guest-display-name').value.trim();
        if (!firstName) { errEl.textContent = '⚠️ Please enter your first name.'; return ''; }
        displayName = firstName + ' (Guest)';
    } else {
        const student = ROSTER.find(s => s.name === selVal);
        if (!student || student.id !== pin) { errEl.textContent = '❌ Incorrect student number. Try again.'; return ''; }
        displayName = selVal;
    }

    document.getElementById('student-pin').value = '';
    signIn(displayName);
    return displayName;
}

function signIn(name) {
    studentName = name;
    try { sessionStorage.setItem(LOGIN_KEY, name); } catch (e) {}
    document.getElementById('student-name-display').textContent = name.includes(',')
        ? name.split(',')[1].trim() + ' ' + name.split(',')[0].trim()
        : name;
    document.getElementById('student-bar').style.display = 'flex';
    displayScores();
}

function signOut() {
    studentName = '';
    try { sessionStorage.removeItem(LOGIN_KEY); } catch (e) {}
    document.getElementById('student-bar').style.display = 'none';
    document.getElementById('score-history').style.display = 'none';
    resetLoginForm();
    displayScores();
}

function resetLoginForm() {
    document.getElementById('name-select').value = '';
    document.getElementById('student-pin').value = '';
    document.getElementById('guest-display-name').value = '';
    onNameSelect();
}

// ── Session tracking (called from the quiz engine in script.js) ──
function gkBeginSession(subjectKey) {
    const started = Date.now();
    gkSession = {
        id: `GK-${started}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
        subject: subjectKey,
        started,
        missed: [],
        answered: 0,
        sent: false
    };
}

function gkRecordAnswer(isCorrect, question, pickedText) {
    if (!gkSession) return;
    gkSession.answered++;
    if (!isCorrect) {
        const qid = question.questionNumber != null ? `[Q${question.questionNumber}] ` : '';
        const entry = `${qid}${question.question} (picked: ${pickedText})`;
        if (!gkSession.missed.includes(entry)) gkSession.missed.push(entry);
    }
    if (gkSession.answered % PARTIAL_EVERY === 0) gkSubmit(false);
}

function gkSubmit(done) {
    if (!gkSession || gkSession.sent || !studentName || gkSession.answered === 0) return;
    if (done) gkSession.sent = true;
    const total = currentQuiz.length;
    fetch(SHEET_URL, {
        method: 'POST', mode: 'no-cors', keepalive: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action:         'submit',
            game:           GAME_KEYS[gkSession.subject],
            sessionId:      gkSession.id,
            name:           studentName,
            form:           currentSubjectName,
            score:          score,
            correct:        score,
            total:          total,
            maxScore:       total,
            percent:        total ? Math.round((score / total) * 100) : 0,
            done:           done,
            elapsed:        Math.round((Date.now() - gkSession.started) / 1000),
            tabSwitches:    0,
            wrongQuestions: gkSession.missed.join(' | ')
        })
    }).catch(() => {});
}

// Closing the tab mid-quiz still saves what they did (as in-progress,
// so resuming later keeps updating the same row).
window.addEventListener('pagehide', () => {
    if (document.getElementById('quiz-screen').style.display === 'block') gkSubmit(false);
});

// ── Stay signed in for this tab ──
(function initLogin() {
    let saved = '';
    try { saved = sessionStorage.getItem(LOGIN_KEY) || ''; } catch (e) {}
    const known = ROSTER.some(s => s.name === saved) || saved.endsWith(' (Guest)');
    if (saved && known) signIn(saved);
})();
