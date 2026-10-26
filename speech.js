/**
 * Read aloud for the quiz screen.
 *
 * One 🔊 on the LEFT of each block a student might want to hear on its own:
 * the question, each answer choice, the hint and the explanation (Marcos 10/8:
 * "speaker icons so the whole page doesn't need to be read aloud"; 10/9: no
 * whole-page reader, speakers on the left). Tap to read, tap again to stop.
 * Words light up one at a time (10/9: word by word, not the whole box).
 *
 * Same approach as Science 1.1 (science-starting-and-stopping/script.js):
 * the voice reports which letter it is on and that picks the word; a voice
 * that never reports still gets a highlight paced by a timer.
 */

const READ_RATE = 0.82;   // rate for a read the student asks for (Marcos 10/26: "I like the 0.82. It's clear and easy to listen to.")
const PACE_BASE = 0.92;   // the 58 ms-a-letter pacing below was measured at this rate

const FRACTION_NAMES = {
    2: ['half', 'halves'], 3: ['third', 'thirds'], 4: ['fourth', 'fourths'],
    5: ['fifth', 'fifths'], 6: ['sixth', 'sixths'], 7: ['seventh', 'sevenths'],
    8: ['eighth', 'eighths'], 9: ['ninth', 'ninths'], 10: ['tenth', 'tenths'],
    12: ['twelfth', 'twelfths']
};
const SYMBOL_WORDS = { '+': 'plus', '=': 'equals', '×': 'times', '÷': 'divided by', '−': 'minus' };

/* What one shown word should SAY. Symbols are spoken as words (a math site
   that drops "+" reads "5 4 9"), and 3/4 is read "3 fourths". */
function spokenForm(word) {
    if (SYMBOL_WORDS[word]) return SYMBOL_WORDS[word];
    const frac = word.match(/^(\d+)\/(\d+)([.,!?;:]*)$/);
    if (frac && FRACTION_NAMES[frac[2]]) {
        const n = Number(frac[1]);
        return `${n} ${FRACTION_NAMES[frac[2]][n === 1 ? 0 : 1]}${frac[3]}`;
    }
    return word;
}

/* Fill el with one span per word, so each can light up on its own. */
function fillWords(el, text) {
    el.textContent = '';
    String(text).trim().split(/\s+/).filter(Boolean).forEach((word, i) => {
        if (i > 0) el.appendChild(document.createTextNode(' '));
        const w = document.createElement('span');
        w.className = 'w';
        w.textContent = word;
        el.appendChild(w);
    });
}

/* A speaker for `target`. It is a span, not a button: the answer choices ARE
   buttons and a button cannot sit inside one. The click is stopped so tapping
   the speaker never picks the answer. */
function makeSpeaker(target, label) {
    const s = document.createElement('span');
    s.className = 'spk-btn';
    s.setAttribute('role', 'button');
    s.setAttribute('tabindex', '0');
    s.setAttribute('aria-label', label || 'Read this to me');
    s.title = label || 'Read this to me';
    s.textContent = '🔊';
    const fire = e => { e.preventDefault(); e.stopPropagation(); gkSpeech.toggle(s, target); };
    s.addEventListener('click', fire);
    s.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') fire(e); });
    return s;
}

const gkSpeech = {
    btn: null, job: null, timer: null, lit: null,

    toggle(btn, target) {
        if (this.btn === btn) { this.stop(); return; }
        this.say(target, btn);
    },

    say(target, btn) {
        this.stop();
        if (!('speechSynthesis' in window) || !target) return;
        const spans = [...target.querySelectorAll('.w')];
        if (!spans.length) return;

        // `lead` is said first without a word to light (e.g. "Correct!").
        const lead = target.dataset.lead ? target.dataset.lead + ' ' : '';
        const says = spans.map(w => spokenForm(w.textContent));
        const starts = []; let at = lead.length;
        says.forEach(t => { starts.push(at); at += t.length + 1; });
        const text = lead + says.join(' ');
        const wordAt = ch => { let k = 0; while (k + 1 < spans.length && starts[k + 1] <= ch) k++; return k; };

        const job = this.job = { cancelled: false };
        this.btn = btn || null;
        if (this.btn) { this.btn.textContent = '⏹'; this.btn.classList.add('on'); }

        const light = k => {
            if (k < 0) return;
            const w = spans[Math.min(k, spans.length - 1)];
            if (w === this.lit) return;
            if (this.lit) this.lit.classList.remove('hl');
            w.classList.add('hl');
            this.lit = w;
        };

        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = READ_RATE;
        let heard = false;
        u.onboundary = e => {
            if (e.name && e.name !== 'word') return;
            heard = true;
            if (e.charIndex >= lead.length) light(wordAt(e.charIndex));
        };
        u.onstart = () => {
            // Voices that never report a word still get a moving highlight.
            const per = Math.max(240, (text.length * 58) / Math.max(1, spans.length) * (PACE_BASE / u.rate));
            let i = lead ? -1 : 0;
            this.timer = setInterval(() => {
                if (heard) { clearInterval(this.timer); this.timer = null; return; }
                light(i++);
                if (i > spans.length) { clearInterval(this.timer); this.timer = null; }
            }, per);
        };
        // An utterance cut off by the next one reports in late; it must not
        // clear the new one's highlight.
        const mine = () => this.job === job;
        u.onend = u.onerror = () => { if (mine()) this.reset(); };

        try { window.speechSynthesis.cancel(); window.speechSynthesis.speak(u); }
        catch (e) { this.reset(); }
    },

    reset() {
        if (this.timer) { clearInterval(this.timer); this.timer = null; }
        if (this.lit) { this.lit.classList.remove('hl'); this.lit = null; }
        document.querySelectorAll('.w.hl').forEach(w => w.classList.remove('hl'));
        if (this.btn) { this.btn.textContent = '🔊'; this.btn.classList.remove('on'); this.btn = null; }
        this.job = null;
    },

    stop() {
        if (this.job) this.job.cancelled = true;
        this.reset();
        try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
    }
};
