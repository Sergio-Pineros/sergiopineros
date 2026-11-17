'use strict';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
function patchGlyphs(root) {
 const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
 const nodes = [];
 while (walker.nextNode()) { const node = walker.currentNode; if (/[⌑✳☀✺◐◉▣]/.test(node.nodeValue) && !node.parentElement.closest('.glyph,script,style')) nodes.push(node); }
 nodes.forEach(node => { const fragment = document.createDocumentFragment(); node.nodeValue.split(/([⌑✳☀✺◐◉▣])/).forEach(part => { if (/^[⌑✳☀✺◐◉▣]$/.test(part)) { const span = document.createElement('span'); span.className = 'glyph'; span.textContent = part; fragment.append(span); } else fragment.append(document.createTextNode(part)); }); node.replaceWith(fragment); });
}
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const state = { scenario: 'week', stage: 0, hero: 0, manualHero: null, manualStage: null, lastManualY: 0, checked: new Set(), moved: false, vote: null, celebrating: false, dialogSeen: false };
const scenarios = {
 week: {
  chat: `<div class="timestamp">Today, 9:41 AM</div><div class="bubble user">this week is already a lot</div><div class="bubble">Okay. What’s the one thing you’d feel good about making time for?</div><div class="bubble user">getting outside. even just a walk</div><div class="bubble delay">Then let’s make room for that. A little fresh air counts.</div>`,
  intro: `<div class="timestamp">Today, 9:41 AM</div><div class="bubble user">can we make a tiny plan?</div><div class="bubble">Yes. Here’s a starting point—you can change any of it.</div>`,
  title: 'A plan with breathing room.', description: 'An editable plan gives an intention a useful shape. Keep it small, explain the starting point, and make changes easy.'
 },
 friends: {
  chat: `<div class="timestamp">Dinner crew · Today</div><div class="bubble user">we’ve talked about dinner for 3 weeks 😭</div><div class="bubble">The group-chat planning spiral. Let’s make one decision at a time.</div><div class="bubble user">friday or saturday?</div><div class="bubble delay">Two good options. Let’s put them in one place.</div>`,
  intro: `<div class="timestamp">Dinner crew · Today</div><div class="bubble user">help us actually pick a night</div><div class="bubble">A quick vote should do it. You’re still in charge of the plan.</div>`,
  title: 'Less back-and-forth.', description: 'A decision needs a shared surface. Turn scattered options into a clear choice the group can act on.'
 },
 win: {
  chat: `<div class="timestamp">Today, 9:41 AM</div><div class="bubble user">i finally went for that walk</div><div class="bubble">You made time for yourself. That’s a real win.</div><div class="bubble user">it was only 10 minutes lol</div><div class="bubble delay">Ten minutes more than zero. Let’s give that a little credit ☀️</div>`,
  intro: `<div class="timestamp">Today, 9:41 AM</div><div class="bubble user">i want to remember this feeling</div><div class="bubble">Here’s a small way to mark it. Nothing to compete with. Just yours.</div>`,
  title: 'Make progress feel personal.', description: 'A milestone can be meaningful without becoming a scoreboard. Let someone mark the moment on their own terms.'
 }
};
function weekCard() {
 const tasks = [ ['walk', 'A ten-minute walk', state.moved ? 'Tomorrow · whenever feels good' : 'Today · whenever feels good'], ['message', 'Text someone you miss', 'One person. One hello.'], ['rest', 'An evening with no big plans', 'Make space for doing less.'] ];
 return `<div class="generated-card"><span class="card-eyebrow"><img src="assets/tomo-compact.svg" alt="">A PLAN FOR THIS MOMENT</span><h4>A softer kind of week.</h4><p class="card-subtitle">Starting with what you said: more time outside.</p>${tasks.map(([id, label, sub]) => `<label class="task-row"><input type="checkbox" data-task="${id}" ${state.checked.has(id) ? 'checked' : ''}><span>${label}<small>${sub}</small></span></label>`).join('')}<div class="card-toolbar"><span class="card-progress">${state.checked.size} of 3 little steps</span><button class="mini-button" id="move-walk">${state.moved ? 'Undo move ' : 'Move walk to tomorrow'}</button></div>${state.moved ? '<p class="feedback-note">Moved in this demo. You can undo it.</p>' : ''}</div><div class="suggestion-pills"><button id="reset-week">Start fresh </button><button data-card-scenario="friends">Try a group plan </button></div>`;
}
function friendsCard() {
 return `<div class="generated-card"><span class="card-eyebrow"><img src="assets/tomo-compact.svg" alt="">ONE DECISION, TOGETHER</span><h4>Let’s make dinner happen.</h4><p class="card-subtitle">Choose the night that works for you.</p><button class="poll-option ${state.vote === 'Friday' ? 'chosen' : ''}" data-vote="Friday" aria-pressed="${state.vote === 'Friday'}"><span>Friday, 7 PM</span><span>${state.vote === 'Friday' ? '✓ Your choice' : '○'}</span></button><button class="poll-option ${state.vote === 'Saturday' ? 'chosen' : ''}" data-vote="Saturday" aria-pressed="${state.vote === 'Saturday'}"><span>Saturday, 7 PM</span><span>${state.vote === 'Saturday' ? '✓ Your choice' : '○'}</span></button><p class="poll-message">${state.vote ? `${state.vote} selected in this demo. Change it anytime.` : 'Illustrative poll · No invitation will be sent.'}</p>${state.vote ? '<div class="card-toolbar"><button class="mini-button secondary" id="clear-vote">Clear my choice </button></div>' : ''}</div><div class="suggestion-pills"><button data-card-scenario="week">Try a personal plan </button></div>`;
}
function winCard() {
 return `<div class="generated-card win-card"><span class="card-eyebrow"><img src="assets/tomo-compact.svg" alt="">THIS ONE’S YOURS</span><div class="win-badge">${state.celebrating ? '✺' : '☀'}</div><h4>${state.celebrating ? 'A little win, kept.' : 'You showed up.'}</h4><p class="card-subtitle">Ten minutes outside.<br> A little more space for yourself.</p><button class="mini-button" id="keep-win">${state.celebrating ? 'Undo ' : 'Mark this little win'}</button>${state.celebrating ? '<p class="feedback-note">Marked for this visit. No streak to protect.</p>' : ''}</div><div class="suggestion-pills"><button data-card-scenario="week">Make another small plan </button></div>`;
}
function updatePhone() {
 const scenario = scenarios[state.scenario];
 const container = $('#phone-content');
 container.innerHTML = state.stage === 0 ? scenario.chat : scenario.intro + ({ week: weekCard, friends: friendsCard, win: winCard }[state.scenario])();
 $('#demo-label').textContent = state.stage === 0 ? 'Illustrative conversation · Independent concept' : 'Interactive concept · Scripted, not live AI';
 $('#right-heading').innerHTML = state.stage === 0 ? 'Less explaining.<br> More experiencing.' : scenario.title;
 $('#right-description').textContent = state.stage === 0 ? 'A visitor should recognize a moment from their own life, then see how Tomo might help.' : scenario.description;
 $('#interaction-note').textContent = state.stage === 0 ? 'Choose a moment. Then scroll to see it take shape.' : ({ week: 'Try checking a step or moving the walk. You can undo both.', friends: 'Pick a night. Change your mind. Nothing gets sent.', win: 'Mark the moment. No pressure to turn it into a streak.' }[state.scenario]);
 $$('[data-scenario]').forEach(button => { const active = button.dataset.scenario === state.scenario; button.classList.toggle('selected', active); button.setAttribute('aria-pressed', String(active)); });
 container.scrollTop = 0;
 bindCardActions();
 patchGlyphs(container);
}
function changeScenario(scenario) { state.scenario = scenario; updatePhone(); }
function bindCardActions() {
 $$('[data-task]').forEach(input => input.addEventListener('change', () => { if (input.checked) state.checked.add(input.dataset.task); else state.checked.delete(input.dataset.task); $('.card-progress').textContent = `${state.checked.size} of 3 little steps`; }));
 $('#move-walk')?.addEventListener('click', () => { state.moved = !state.moved; updatePhone(); $('#move-walk')?.focus({preventScroll:true}); });
 $('#reset-week')?.addEventListener('click', () => { state.checked.clear(); state.moved = false; updatePhone(); $('#reset-week')?.focus({preventScroll:true}); });
 $$('[data-vote]').forEach(button => button.addEventListener('click', () => { state.vote = button.dataset.vote; updatePhone(); $(`[data-vote="${state.vote}"]`)?.focus({preventScroll:true}); }));
 $('#clear-vote')?.addEventListener('click', () => { state.vote = null; updatePhone(); $('[data-vote]')?.focus({preventScroll:true}); });
 $('#keep-win')?.addEventListener('click', () => { state.celebrating = !state.celebrating; updatePhone(); $('#keep-win')?.focus({preventScroll:true}); });
 $$('[data-card-scenario]').forEach(button => button.addEventListener('click', () => changeScenario(button.dataset.cardScenario)));
}
function setStage(stage) {
 if (state.stage === stage && $('#phone-content').children.length) return;
 state.stage = stage;
 $('#story-eyebrow').textContent = stage === 0 ? 'A conversation that meets you here' : 'An interface that grows from the moment';
 $('#story-heading').innerHTML = stage === 0 ? 'A little support.<br> A real next step.' : 'The right shape.<br> At the right time.';
 $('#story-description').textContent = stage === 0 ? 'Keep the conversation familiar. Bring the useful part closer: a plan you can change, a next step you can take.' : 'The conversation becomes a plan, a decision, or a moment worth keeping. The interface follows the person.';
 $('#right-kicker').textContent = stage === 0 ? 'MAKE THE FEELING VISIBLE' : 'BEYOND THE CHAT BUBBLE';
 $('#story-progress').textContent = stage === 0 ? 'The conversation' : 'The interface';
 $$('.story-dot').forEach((button, index) => { button.classList.toggle('active', index === stage); button.setAttribute('aria-pressed', String(index === stage)); });
 updatePhone();
}
function setHero(progress) {
 state.hero = progress;
 document.documentElement.style.setProperty('--hero-progress', progress.toFixed(3));
 const proposed = progress > .5;
 $('#original-hero').inert = proposed;
 $('#proposed-hero').inert = !proposed;
 $('#original-hero').setAttribute('aria-hidden', String(proposed));
 $('#proposed-hero').setAttribute('aria-hidden', String(!proposed));
 $('#original-button').classList.toggle('active', !proposed);
 $('#proposal-button').classList.toggle('active', proposed);
 $('#original-button').setAttribute('aria-pressed', String(!proposed));
 $('#proposal-button').setAttribute('aria-pressed', String(proposed));
 $('#version-caption').textContent = proposed ? 'A familiar world. A new first impression.' : 'Their world, as it is today.';
}
function updateScroll() {
 const y = window.scrollY;


 const journey = $('.hero-journey');
 const heroRange = journey.offsetHeight - innerHeight;
 const progress = reducedMotion ? (state.manualHero ?? 0) : state.manualHero ?? Math.max(0, Math.min(1, (y / Math.max(1, heroRange) - .12) / .62));
 setHero(progress);
 const story = $('.product-story');
 const storyY = y - story.offsetTop;
 const stage = state.manualStage ?? (reducedMotion ? state.stage : storyY > innerHeight * .72 ? 1 : 0);
 setStage(stage);
 const total = document.documentElement.scrollHeight - innerHeight;
 $('#reading-progress').style.width = `${Math.max(0, Math.min(100, y / Math.max(1,total) * 100))}%`;
}
let ticking = false;
addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(() => { updateScroll(); ticking = false; }); ticking = true; } }, {passive:true});
addEventListener('resize', updateScroll);
$('#original-button').addEventListener('click', () => { state.manualHero = 0; state.lastManualY = scrollY; setHero(0); });
$('#proposal-button').addEventListener('click', () => { state.manualHero = 1; state.lastManualY = scrollY; setHero(1); });
$$('[data-scenario]').forEach(button => button.addEventListener('click', () => changeScenario(button.dataset.scenario)));
$$('[data-stage]').forEach(button => button.addEventListener('click', () => { state.manualStage = Number(button.dataset.stage); state.lastManualY = scrollY; setStage(state.manualStage); }));
$('#contrast-button').addEventListener('click', () => { const dark = $('.size-lab').classList.toggle('dark'); $('#contrast-button').setAttribute('aria-pressed', String(dark)); $('#contrast-button').textContent = dark ? 'Try light background ◐' : 'Try dark background ◐'; patchGlyphs($('#contrast-button')); });
$('#mark-toggle').addEventListener('click', () => { const original = $('#mark-toggle').getAttribute('aria-pressed') !== 'true'; $('#mark-toggle').setAttribute('aria-pressed', String(original)); $('#mark-toggle').textContent = original ? 'Show compact direction ' : 'Compare original mark '; $$('.size-samples img').forEach(img => { img.src = original ? 'assets/tomo-symbol.svg' : 'assets/tomo-compact.svg'; img.alt = `${original ? 'Original' : 'Compact'} mark at ${img.width} pixels`; }); });
const dialog = $('#about-dialog');
let previousFocus = null;
function openAbout() { if (dialog.open) return; state.dialogSeen = true; previousFocus = document.activeElement; dialog.showModal(); }
$$('[data-open-about]').forEach(button => button.addEventListener('click', openAbout));
$('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => previousFocus?.focus({preventScroll:true}));
const aboutObserver = new IntersectionObserver(entries => { if (entries[0].isIntersecting && !state.dialogSeen) { setTimeout(() => { if (!state.dialogSeen && $('#about').getBoundingClientRect().top < innerHeight && $('#about').getBoundingClientRect().bottom > 0) openAbout(); }, 1300); } }, {threshold:.35});
aboutObserver.observe($('#about'));
addEventListener('wheel', () => { state.manualStage = null; state.manualHero = null; }, {passive:true});
addEventListener('touchmove', () => { state.manualStage = null; state.manualHero = null; }, {passive:true});
addEventListener('keydown', event => { if (['PageDown','PageUp','ArrowDown','ArrowUp','Home','End'].includes(event.key)) { state.manualStage = null; state.manualHero = null; } });
updatePhone(); updateScroll(); patchGlyphs(document.body);
