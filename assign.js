/* =====================================================================
   📌 QUIZZES FROM MR. O (Marcos 11/16/2026: "can i assign assignments from GK Hub" → "Yes, build it").
   The same idea as Math Fact Review's and After the QPS's assign.js. He assigns from the Teacher
   Dashboard (🌟 General Knowledge → 📌 Assign a Quiz). A student with an open one sees only its
   banner on the subjects page until it is done, then the next one, then the subjects as before.
   "Done" = they finish the quiz once, any score (Marcos 11/16: "get rid of the 80 or better" — a
   score-to-reach choice was built first and taken out).

   THE SHEET — the gk-assign tab, one row per assignment, written with the sheet's usual 'submit'
   (the Apps Script did not change):
     name       '<student> #<order>' — order is the ms it was assigned (end of the list) or minus
                that (front). The leaderboard read gives back ONE row per name, so every one comes back.
     sessionId  'GA-<ms assigned>-<n>'   one per assignment
     form       the quiz: 'geography' | 'civics' | 'math' | 'ela' · 'None' = taken away
     score      the ms it was written (taking one away = a newer 'None' row with its name)
     percent    their score when they finished it (this page) · correct = 1 once finished
     done       true once they finish the quiz (this page)
   Only a signed-in student on the roster is ever held: never Mr. O, a guest, or a guest link.
   If the sheet can't be read in 10 s at sign-in, this device's last copy stands in and the same
   read keeps going (60 s): when it lands, the banner comes up on the subjects page (a quiz already
   going is never cut off — Math Fact Review's 11/11 lesson: the sheet is slowest at class time).
   ===================================================================== */
window.GKAssign = (function () {
    const GAME = 'gk-assign';
    const CACHE = 'gk_assign_v1:';
    const MAX_KEY = 1e15;
    const WAIT_MS = 10000;
    const LATE_MS = 60000;
    const RETRY_MS = 15000;  // a read that failed (or ran out at 60 s) is tried twice more, this far apart
    const TEACHER = 'Mr. O (Teacher)';
    // what each quiz is called on the banner (said the same way: no "&", no emoji in the words)
    const QUIZ = {
        geography: { icon: '🌍', name: 'Geography Quiz' },
        civics:    { icon: '🏛️', name: 'Civics and Government Quiz' },
        math:      { icon: '➕', name: 'Math Quiz' },
        ela:       { icon: '📚', name: 'Language Arts Quiz' }
    };
    const $ = id => document.getElementById(id);
    const wait = ms => new Promise(done => setTimeout(done, ms));

    let who = '';            // the student the list belongs to
    let list = [];           // their assignments, in order (finished ones too)
    let state = 'idle';      // idle · checking (the sign-in read, 10 s at most) · ready
    let turn = 0;            // a newer sign-in or a sign-out makes an older read's answer stale
    let firstWait = null;    // the sign-in's wait (submitName waits on it)
    let fresh = false;       // the list came from the sheet this sign-in (not only this device's copy)

    const assignable = name => !window.SHARE_MODE && !!name && name !== TEACHER && ROSTER.some(s => s.name === name);

    /* 'geography' → { subject }; anything else → null (a form this page can't read never holds a kid). */
    function parseForm(form) {
        const subject = String(form || '').trim();
        return QUIZ[subject] ? { subject } : null;
    }

    /* One sheet row → one of this student's assignments, or null (someone else's, taken away, unreadable). */
    function parse(row, student) {
        if (!row || !row.sessionId || typeof row.name !== 'string' || typeof row.form !== 'string') return null;
        const m = /^(.*) #(-?\d+)$/.exec(row.name);
        if (!m || m[1] !== student) return null;
        const rule = parseForm(row.form);
        if (!rule) return null;
        const key = Number(row.score) || 0;
        return {
            id: String(row.sessionId), rowName: row.name, form: row.form.trim(), ...rule, key, order: Number(m[2]),
            best: Math.max(0, Number(row.percent) || 0), done: row.done === true || row.done === 'true'
        };
    }
    const valid = a => !!(a && typeof a.id === 'string' && typeof a.rowName === 'string' && QUIZ[a.subject] &&
        [a.order, a.key, a.best].every(Number.isFinite));

    function saved(name) {
        try { const l = JSON.parse(localStorage.getItem(CACHE + name) || 'null'); return Array.isArray(l) ? l.filter(valid) : []; } catch (e) { return []; }
    }
    function keep(name, l) { try { localStorage.setItem(CACHE + name, JSON.stringify(l)); } catch (e) { /* private window */ } }

    /* The sheet's rows joined with this device's copy (a finish wins). One finished here whose row never
       reached the sheet is sent again. */
    function build(rows, name, mine) {
        return rows.map(r => parse(r, name)).filter(Boolean)
            .sort((a, b) => a.order - b.order || a.key - b.key)
            .map(s => {
                const here = mine.find(x => x.id === s.id);
                if (!here) return s;
                if (s.done || !here.done) return s;                       // never to a done row: the sheet would add a row
                const a = { ...s, best: here.best, done: true };
                post(a);
                return a;
            });
    }

    /* The gk-assign tab (one row per name), or null if it can't be read within `ms`. */
    function readTab(ms) {
        if (window.SHARE_MODE) return Promise.resolve([]);
        const stop = new AbortController();
        const timer = setTimeout(() => stop.abort(), ms);
        return fetch(`${SHEET_URL}?action=leaderboard&game=${GAME}`, { cache: 'no-store', signal: stop.signal })
            .then(r => r.json()).then(rows => (Array.isArray(rows) ? rows : null))
            .catch(() => null).finally(() => clearTimeout(timer));
    }

    /* The finish back to the assignment's own row. */
    function post(a) {
        try {
            fetch(SHEET_URL, {
                method: 'POST', mode: 'no-cors', keepalive: true,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'submit', game: GAME, sessionId: a.id, name: a.rowName, form: a.form,
                    score: a.key, maxScore: MAX_KEY, correct: 1, total: 0, percent: a.best,
                    done: !!a.done, elapsed: 0, minSecs: 0, tabSwitches: 0, wrongQuestions: ''
                })
            }).catch(() => {});
        } catch (e) { /* offline: this device's copy sends it next time */ }
    }

    /* Read the row back and send it again if it did not land (about 1 send in 10 is lost on a busy sheet). */
    async function confirmSaved(a) {
        for (let n = 1; n <= 3; n++) {
            await wait(1500 * (n + 1));
            const rows = await readTab(WAIT_MS);
            if (rows === null) continue;
            const r = rows.find(x => x.name === a.rowName);
            if (!r || String(r.sessionId) !== a.id) return;           // taken away meanwhile: nothing to save
            const s = parse(r, a.rowName.replace(/ #-?\d+$/, ''));
            if (s && s.done) return;
            post(a);
        }
    }

    // the first open one — or the open one they have a quiz half done on, here (never swapped for a new front one)
    const current = () => {
        if (!who || who !== studentName) return null;
        const open = list.filter(a => !a.done);
        return open.find(progressFor) || open[0] || null;
    };
    const openCount = () => (who && who === studentName ? list.filter(a => !a.done).length : 0);
    const locked = () => assignable(studentName) && who === studentName && (state === 'checking' || !!current());

    /* A student signed in: read their list. The returned wait ends when the read lands or after 10 s. */
    function signedIn(name) {
        if (name === who && state !== 'idle') return;   // the same student again (a resumed quiz): their list is read
        const t = ++turn;
        if (!assignable(name)) { who = ''; list = []; state = 'idle'; firstWait = null; renderWelcome(); return; }
        who = name; list = saved(name); state = 'checking'; fresh = false;
        renderWelcome();
        const landed = readWithRetries(t).then(rows => {
            if (t !== turn) return;
            if (rows) { list = build(rows, name, saved(name)); keep(name, list); fresh = true; }
            state = 'ready';
            changed();
        });
        firstWait = Promise.race([landed, wait(WAIT_MS)]).then(() => {
            if (t === turn && state === 'checking') { state = 'ready'; renderWelcome(); }   // this device's copy for now
        });
    }
    /* The tab, tried up to 3 times (a new Chromebook has no copy of its own: one failed read must not leave it open). */
    async function readWithRetries(t) {
        for (let n = 0; n < 3; n++) {
            if (n) await wait(RETRY_MS);
            if (t !== turn) return null;
            const rows = await readTab(LATE_MS);
            if (rows) return rows;
        }
        return null;
    }
    function signedOut() { turn++; who = ''; list = []; state = 'idle'; firstWait = null; renderWelcome(); }

    /* The sign-in button (name screen): "Checking…" until the read lands (10 s at most); then the first open one, or null. */
    async function atSignIn() {
        if (!firstWait) return null;
        const btn = document.querySelector('#name-screen .btn-submit');
        const note = $('assign-checking-signin');
        btn.disabled = true;
        note.hidden = false;
        await firstWait;
        btn.disabled = false;
        note.hidden = true;
        return current();
    }
    const busy = () => !!document.querySelector('#name-screen .btn-submit:disabled');

    /* The list changed (a late read): the subjects page or the score page catch up; a quiz going on is never cut off. */
    function changed() {
        if ($('welcome-screen').style.display !== 'none') renderWelcome();
        if ($('result-screen').style.display === 'block' && !$('assign-result').dataset.mine) resultButtons(null);
    }

    /* A line with its own 🔊 on the left (the hub's way: speech.js). The emoji stays out of what is read. */
    function sayLine(row, text, label) {
        row.textContent = '';
        row.hidden = !text;
        if (!text) return;
        const words = document.createElement('span');
        words.className = 'say';
        fillWords(words, text);
        row.append(makeSpeaker(words, label || 'Read this to me'), words);
    }

    /* The subjects page: the banner in place of the subjects while one is open (or while checking). */
    function renderWelcome() {
        const box = $('assign-banner');
        if (!box) return;
        const subjects = document.querySelector('#welcome-screen .subject-buttons');
        const lock = locked();
        if (lock) {
            subjects.style.display = 'none';
            subjects.dataset.assignHid = '1';
            $('resume-section').style.display = 'none';
        } else if (subjects.dataset.assignHid) {
            subjects.style.display = '';
            delete subjects.dataset.assignHid;
            checkForProgress();
        }
        box.hidden = !lock;
        if (!lock) return;
        const checking = state === 'checking';
        box.querySelector('.assign-checking').hidden = !checking;
        box.querySelector('.assign-body').hidden = checking;
        if (checking) return;
        const a = current(), q = QUIZ[a.subject];
        box.querySelector('.assign-icon').textContent = q.icon;
        sayLine(box.querySelector('.assign-what'), q.name, 'Read the quiz name to me');
        sayLine(box.querySelector('.assign-goal'), 'Finish the whole quiz.', 'Read this to me');
        const more = openCount() - 1;
        sayLine(box.querySelector('.assign-more'), more > 0 ? `After this one, you have ${more} more.` : '');
        const go = box.querySelector('.assign-go');
        go.textContent = progressFor(a) ? '▶️ Keep Going' : '▶️ Start';
    }

    /* This student's unfinished try at this assignment, saved on this computer (script.js saveProgress). */
    function progressFor(a) {
        try {
            const s = JSON.parse(localStorage.getItem('savedQuizProgress'));
            return !!(s && s.assign && s.assign.id === a.id && s.studentName === studentName);
        } catch (e) { return false; }
    }

    /* ▶️ on the banner */
    function start() {
        const a = current();
        if (!a) { goHome(); return; }
        gkSpeech.stop();
        if (progressFor(a)) { resumeQuiz(); return; }
        startQuiz(a.subject, a);
    }

    /* A finished quiz. `a` = the assignment it was for (null = a quiz they picked). Marks it done,
       then fills the score page's buttons. */
    function afterQuiz(a0, pct) {
        let outcome = null;
        if (a0 && fresh && who === studentName && !list.some(x => x.id === a0.id)) a0 = null;   // taken away since: a quiz like any other
        if (a0) {
            const a = list.find(x => x.id === a0.id) || a0;   // the newest copy
            if (!a.done) {
                const next = { ...a, best: pct, done: true };
                if (list.some(x => x.id === a.id)) { list = list.map(x => (x.id === a.id ? next : x)); keep(who, list); }
                post(next);
                confirmSaved(next);
            }
            outcome = true;
        }
        resultButtons(outcome);
    }

    /* The score page's buttons (each says where it goes) and, for an assignment, one line about it. */
    function resultButtons(outcome) {
        const box = $('assign-result'), home = $('result-home-btn'), note = $('result-home-note');
        box.dataset.mine = outcome ? '1' : '';
        sayLine(box.querySelector('.assign-result-line'), outcome ? 'You finished your assignment from Mr. O.' : '');
        box.hidden = !outcome;
        const left = openCount();
        if (left > 0) {
            home.textContent = outcome ? '📌 Next Assignment' : '📌 Go to My Assignment';
            note.textContent = outcome ? `You have ${left} more from Mr. O.` : 'Mr. O gave you a quiz to do.';
        } else {
            home.textContent = '📚 Back to the Subjects';
            note.textContent = 'Pick another quiz. You stay signed in.';
        }
    }

    // a student already signed in on this tab (saving.js ran first)
    if (studentName) signedIn(studentName);

    return { GAME, parse, parseForm, build, signedIn, signedOut, atSignIn, busy, locked, current, renderWelcome, start, afterQuiz, resultButtons };
})();
