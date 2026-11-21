/**
 * Mr. O's General Knowledge Hub - Teacher Mode
 * PIN-protected answer key: every question in each subject, in order,
 * with the correct answer marked, the hint, and the explanations.
 */

const TEACHER_PIN = "9377";
const TEACHER_SUBJECTS = [
    { key: 'geography', label: '🌍 Geography' },
    { key: 'civics',    label: '🏛️ Civics & Gov' },
    { key: 'math',      label: '➕ Math' },
    { key: 'ela',       label: '📚 Language Arts' }
];

let teacherSubject = 'geography';

function openTeacherMode() {
    if (!window.SHARE_TEACHER) {   // the teacher/admin guest link opens it with no PIN (below)
        const pin = prompt("Teacher PIN:");
        if (pin === null) return;
        if (pin !== TEACHER_PIN) { alert("Incorrect PIN."); return; }
    }

    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('name-screen').style.display = 'none';   // it opens from the sign-in screen (11/20)
    document.getElementById('teacher-screen').style.display = 'block';
    renderTeacherTabs();
    renderTeacherReview();
    window.scrollTo(0, 0);
}

function closeTeacherMode() {
    window.speechSynthesis.cancel();
    document.getElementById('teacher-screen').style.display = 'none';
    showFirstScreen();   // back where it was opened: the sign-in screen, or (signed in · a guest link) the subjects
    window.scrollTo(0, 0);
}

function renderTeacherTabs() {
    const tabs = document.getElementById('teacher-tabs');
    tabs.innerHTML = '';
    TEACHER_SUBJECTS.forEach(({ key, label }) => {
        const btn = document.createElement('button');
        btn.className = 'teacher-tab' + (key === teacherSubject ? ' active' : '');
        btn.textContent = `${label} (${(quizData[key] || []).length})`;
        btn.onclick = () => {
            teacherSubject = key;
            renderTeacherTabs();
            renderTeacherReview();
        };
        tabs.appendChild(btn);
    });
}

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
}

function renderTeacherReview() {
    const showAll = document.getElementById('teacher-show-all').checked;
    const questions = [...(quizData[teacherSubject] || [])]
        .sort((a, b) => (a.questionNumber || 0) - (b.questionNumber || 0));

    const label = TEACHER_SUBJECTS.find(s => s.key === teacherSubject).label;
    document.getElementById('teacher-count').textContent =
        `${label} — ${questions.length} questions (students see them in a random order)`;

    const list = document.getElementById('teacher-questions');
    list.innerHTML = '';
    // On paper only, first thing: what this is (Marcos 11/4: "every print version should have a title")
    const head = el('div', 'key-print-head');
    head.appendChild(el('h1', null, `General Knowledge Hub Answer Key — ${label.replace(/^\S+\s+/, '')}`));
    head.appendChild(el('p', null, `Mr. O's 4th Grade · ${questions.length} questions · the right answer has a ✅ · students see them in a random order`));
    list.appendChild(head);

    questions.forEach((q, i) => {
        const card = el('div', 'teacher-card');
        card.appendChild(el('div', 'teacher-qnum', `Q${q.questionNumber != null ? q.questionNumber : i + 1}`));
        card.appendChild(el('p', 'teacher-question', q.question));
        if (q.image) {
            const pic = document.createElement('img');
            pic.className = 'teacher-pic';
            pic.src = q.image;
            pic.alt = q.imageAlt || '';
            card.appendChild(pic);
        }

        const opts = el('ul', 'teacher-options');
        q.answerOptions.forEach(opt => {
            const li = el('li', opt.isCorrect ? 'correct' : 'wrong');
            li.appendChild(el('span', 'teacher-mark', opt.isCorrect ? '✅' : '▫️'));
            li.appendChild(el('span', 'teacher-opt-text', opt.text));
            if (opt.isCorrect || showAll) li.appendChild(el('div', 'teacher-rationale', opt.rationale));
            opts.appendChild(li);
        });
        card.appendChild(opts);

        if (q.hint) card.appendChild(el('p', 'teacher-hint', `💡 Hint: ${q.hint}`));
        list.appendChild(card);
    });
}

/* THE TEACHER/ADMIN GUEST LINK (share.js v9, Marcos 11/16: "do it for GK hub"). It arrives on this page with share.js's
   two big buttons in place of the four subjects: 🎒 Student guest shows the subjects (the quizzes the way a student takes
   them, as Guest), 🧑‍🏫 Teacher / admin guest opens Teacher Mode, the answer key, with no PIN; ← Back comes back to the
   two buttons. The cards' lines are this hub's own (SHARE_CARDS): its Teacher Mode is the answer key, nothing more.
   The student guest link (?share=mro) and the students' page are unchanged. Nothing is saved or sent (share.js). */
function studentParts() {
    return document.querySelectorAll('#welcome-screen .subject-buttons, #welcome-screen [onclick="toggleScores()"]');
}
function guestPickSubject() {
    const row = document.querySelector('.guest-choice');
    if (row) row.style.display = 'none';
    studentParts().forEach(el => { el.style.display = ''; });
}
(function teacherGuest() {
    if (!window.SHARE_TEACHER) return;
    studentParts().forEach(el => { el.style.display = 'none'; });
    const pinLink = document.querySelector('.btn-teacher-link');
    if (pinLink) pinLink.style.display = 'none';
    window.SHARE_OPEN_TEACHER = () => openTeacherMode();
    window.SHARE_CARDS = {
        student: [
            ['\u{1F513}', 'Every quiz open', 'No sign-in. All four subjects.'],
            ['\u2714\uFE0F', 'The right answer and why', 'After each question, and the score at the end.'],
            ['\u{1F6E1}\uFE0F', 'Nothing is saved', 'No scores go to Mr. O.']
        ],
        teacher: [
            ['\u2705', 'Answer key', 'All four quizzes, every question: the right answer and why, and the hint. Printable.']
        ]
    };
})();
