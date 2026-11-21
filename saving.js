/**
 * Mr. O's General Knowledge Hub - Student Login + Saved Progress
 * Each quiz is sent to Mr. O's Google Sheet (same one as the Math Fact
 * Review sites) and shows up in the Teacher Dashboard. One tab per subject:
 *   gk-geography | gk-civics | gk-math | gk-ela
 */

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzv8CWv1yyi8NeH04now9UxVL4IZm5yMqqsEGMcgGdrcAOWVB-aSp5siTvSSJXIUpzFMA/exec';
const LOGIN_KEY = 'gk_student_v1';
// 📍 Right Now (Marcos 11/20: "Yes, those three"): a row at EVERY question now (it was every 5th answer) — see gkSubmit

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
    { name: "Douglas, Isaac",            id: "10070979" },
    { name: "Douglas, Iyana",            id: "10070980" },
    { name: "Dumphrey, Christopher",     id: "10060696" },
    { name: "Flores, Kiara",             id: "10052834" },
    { name: "Johnson, Destiny",          id: "10052926" },
    { name: "Jones, Tahji",              id: "10060315" },
    { name: "Lawrence, Eric",            id: "10057451" },
    { name: "Madero, Jovany",            id: "10076374" },
    { name: "Pettway, Lanaura",          id: "10060616" },
    { name: "Polanco Soriano, Thiara",   id: "10060503" },
    { name: "Roberts, Robyn",            id: "10060925" },
    { name: "Rodriguez-Jimenez, Marcos", id: "10048936" },
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

let gkSession = null; // { id, subject, started, missed, answered, sent, activeMs, activeSince }

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
    if (window.GKAssign) GKAssign.signedIn(name);   // 📌 their quizzes from Mr. O (assign.js; it reads this tab's sign-in itself)
}

function signOut() {
    if (window.SHARE_MODE) return;   // a visitor never sees the name list
    studentName = '';
    try { sessionStorage.removeItem(LOGIN_KEY); } catch (e) {}
    document.getElementById('student-bar').style.display = 'none';
    document.getElementById('score-history').style.display = 'none';
    resetLoginForm();
    displayScores();
    if (window.GKAssign) GKAssign.signedOut();
    showSignIn();   // "Not you?" → the sign-in screen (the hub's first screen since 11/20)
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
        events: [],                                 // every answer, for the dashboard's 📍 Right Now
        answered: 0,
        sent: false,
        activeMs: 0,                                // time on the page only
        activeSince: document.hidden ? null : started
    };
}

// ── Elapsed = time the quiz page was actually visible ──
// Pauses on tab switch / close; a resumed quiz picks up where it left off.
function gkPauseClock() {
    if (gkSession && gkSession.activeSince != null) {
        gkSession.activeMs = (gkSession.activeMs || 0) + (Date.now() - gkSession.activeSince);
        gkSession.activeSince = null;
    }
}

function gkResumeClock() {
    if (gkSession && !gkSession.sent && gkSession.activeSince == null && !document.hidden) {
        gkSession.activeSince = Date.now();
    }
}

function gkActiveSeconds() {
    if (!gkSession) return 0;
    const live = gkSession.activeSince != null ? Date.now() - gkSession.activeSince : 0;
    return Math.round(((gkSession.activeMs || 0) + live) / 1000);
}

// Store the paused clock in the saved progress so a resume keeps the right total.
function gkPersistClock() {
    try {
        const saved = JSON.parse(localStorage.getItem('savedQuizProgress'));
        if (!saved || !saved.gkSession || !gkSession || saved.gkSession.id !== gkSession.id) return;
        saved.gkSession = { ...saved.gkSession, activeMs: gkSession.activeMs, activeSince: null };
        localStorage.setItem('savedQuizProgress', JSON.stringify(saved));
    } catch (e) {}
}

function quizIsOpen() {
    return document.getElementById('quiz-screen').style.display === 'block';
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) { gkPauseClock(); gkPersistClock(); }
    else if (quizIsOpen()) gkResumeClock();
});

function gkRecordAnswer(isCorrect, question, pickedText) {
    if (!gkSession) return;
    gkSession.answered++;
    if (!isCorrect) {
        const qid = question.questionNumber != null ? `[Q${question.questionNumber}] ` : '';
        const entry = `${qid}${question.question} (picked: ${pickedText})`;
        if (!gkSession.missed.includes(entry)) gkSession.missed.push(entry);
    }
    // the box on the dashboard: the same id as the miss ("Q12"); the row goes out as the next question comes up
    gkLog('answer', { id: question.questionNumber != null ? `Q${question.questionNumber}` : `Q${currentQuestionIndex + 1}`, ok: !!isCorrect });
}

function gkLog(kind, extra) {
    if (!gkSession) return;
    if (!gkSession.events) gkSession.events = [];   // a quiz saved before 11/20
    gkSession.events.push({ at: new Date().toISOString(), e: kind, q: currentQuestionIndex + 1, on: gkActiveSeconds(), ...extra });
    if (gkSession.events.length > 200) gkSession.events.splice(0, gkSession.events.length - 200);
}

/* ONE ROW AT A TIME, IN ORDER (copied from vocab-practice's sendRow, 11/13). With a row at every question, a slow
   in-progress row could land after the finished one and turn "Complete" back into In Progress (the sheet writes over
   the try's row with no lock). Each row leaves only when the one before it was answered (or after SEND_WAIT_MS); an
   in-progress row still waiting is replaced by the newer one, and the finished row drops it. A row made as the page
   closes (pagehide) goes at once, as before: a waiting fetch would never start once the page is gone. */
const SEND_WAIT_MS = 20000;
let sheetLine = Promise.resolve();
let rowWaiting = null;   // an in-progress row made but not sent yet
function gkSendRow(body, now) {
    const text = JSON.stringify(body);
    const post = t => fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', keepalive: true,
        headers: { 'Content-Type': 'application/json' }, body: t }).catch(() => {});
    if (now) { if (rowWaiting) { rowWaiting.text = null; rowWaiting = null; } return post(text); }   // the page is closing
    if (rowWaiting && !body.done) { rowWaiting.text = text; return rowWaiting.sent; }
    if (rowWaiting) { rowWaiting.text = null; rowWaiting = null; }
    const row = { text };
    const go = () => {
        if (rowWaiting === row) rowWaiting = null;
        if (row.text == null) return;
        return post(row.text);
    };
    row.sent = sheetLine.then(go);
    if (!body.done) rowWaiting = row;
    sheetLine = Promise.race([row.sent, new Promise(r => setTimeout(r, SEND_WAIT_MS))]);
    return row.sent;
}

// A row as each question comes up (the first one too, so a student shows on the dashboard the moment they start)
function gkMarkQuestion() { gkSubmit(false, { marker: true }); }

function gkSubmit(done, opts = {}) {
    if (!gkSession || gkSession.sent || !studentName) return;
    if (gkSession.answered === 0 && !opts.marker) return;   // closed before any answer: nothing to save
    if (done) { gkPauseClock(); gkSession.sent = true; }
    const total = currentQuiz.length;
    // where the student is now rides at the end of this row's copy of the log (never in gkSession.events)
    const log = (gkSession.events || []).concat(done ? [] : [{ e: 'on', q: currentQuestionIndex + 1, of: total }]);
    gkSendRow({
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
            elapsed:        gkActiveSeconds(),
            tabSwitches:    0,
            wrongQuestions: gkSession.missed.join(' | '),
            events:         JSON.stringify(log)
        }, !!opts.now);
}

// Closing the tab mid-quiz still saves what they did (as in-progress,
// so resuming later keeps updating the same row).
window.addEventListener('pagehide', () => {
    if (!quizIsOpen()) return;
    gkPauseClock();
    gkPersistClock();
    gkSubmit(false, { now: true });
});

// ── Stay signed in for this tab ──
(function initLogin() {
    let saved = '';
    try { saved = sessionStorage.getItem(LOGIN_KEY) || ''; } catch (e) {}
    const known = ROSTER.some(s => s.name === saved) || saved.endsWith(' (Guest)');
    // Share mode (share.js): a colleague's link — no roster, no student number
    if (window.SHARE_MODE) {
        signIn('Guest');
        document.querySelectorAll('[onclick="signOut()"]').forEach(el => { el.style.display = 'none'; });
    } else if (saved && known) signIn(saved);
    showFirstScreen();   // the sign-in screen first (11/20); signed in already on this tab → the subjects
})();
