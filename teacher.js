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
    const pin = prompt("Teacher PIN:");
    if (pin === null) return;
    if (pin !== TEACHER_PIN) { alert("Incorrect PIN."); return; }

    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('teacher-screen').style.display = 'block';
    renderTeacherTabs();
    renderTeacherReview();
    window.scrollTo(0, 0);
}

function closeTeacherMode() {
    window.speechSynthesis.cancel();
    document.getElementById('teacher-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
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

    questions.forEach((q, i) => {
        const card = el('div', 'teacher-card');
        card.appendChild(el('div', 'teacher-qnum', `Q${q.questionNumber != null ? q.questionNumber : i + 1}`));
        card.appendChild(el('p', 'teacher-question', q.question));

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
