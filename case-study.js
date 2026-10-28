(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const sevClass = s => 'sev sev-' + s.toLowerCase();

  // Test cases table
  const body = document.getElementById('tc-body');
  const search = document.getElementById('tc-search');
  const modulesEl = document.getElementById('tc-modules');
  const count = document.getElementById('tc-count');
  const modules = ['All', ...new Set(TEST_CASES.map(t => t.module))];
  let activeModule = 'All';

  modulesEl.innerHTML = modules.map(m =>
    `<button data-module="${m}" class="${m === 'All' ? 'active' : ''}">${m}</button>`).join('');
  modulesEl.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    activeModule = btn.dataset.module;
    modulesEl.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
    renderCases();
  });
  search.addEventListener('input', renderCases);

  function renderCases() {
    const q = search.value.trim().toLowerCase();
    const rows = TEST_CASES.filter(t =>
      (activeModule === 'All' || t.module === activeModule) &&
      (!q || [t.id, t.title, t.type, t.expected].join(' ').toLowerCase().includes(q)));
    body.innerHTML = rows.map(t => `
      <tr>
        <td class="tc-id-cell"><a class="tc-id" href="${REPO}${t.file}" target="_blank" rel="noopener">${t.id}</a></td>
        <td data-label="Module">${t.module}</td>
        <td class="tc-title">${esc(t.title)}</td>
        <td data-label="Type"><span class="type">${t.type}</span></td>
        <td data-label="Priority"><span class="prio prio-${t.priority.toLowerCase()}">${t.priority}</span></td>
        <td class="muted tc-expected" data-label="Expected">${esc(t.expected)}</td>
        <td class="tc-status"><span class="pass">✓ Pass</span></td>
      </tr>`).join('') || `<tr><td colspan="7" class="muted empty">No test cases match.</td></tr>`;
    count.textContent = `Showing ${rows.length} of ${TEST_CASES.length} test cases`;
  }
  renderCases();

  // Bug reports
  document.getElementById('bug-list').innerHTML = BUGS.map((b, i) => `
    <details class="bug card"${i === 0 ? ' open' : ''}>
      <summary>
        <span class="${sevClass(b.severity)}">${b.severity}</span>
        <code class="bug-id">${b.id}</code>
        <span class="bug-title">${esc(b.title)}</span>
        <span class="bug-chev" aria-hidden="true">▾</span>
      </summary>
      <div class="bug-body">
        <dl class="bug-meta">
          <div><dt>Priority</dt><dd>${b.priority}</dd></div>
          <div><dt>Module</dt><dd>${b.module}</dd></div>
          <div><dt>Account</dt><dd><code>${b.user}</code></dd></div>
          <div><dt>Status</dt><dd><span class="open-tag">Open</span></dd></div>
        </dl>
        <h5>Steps to reproduce</h5>
        <ol>${b.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
        <div class="ea">
          <div class="ea-box expected"><h5>Expected</h5><p>${esc(b.expected)}</p></div>
          <div class="ea-box actual"><h5>Actual</h5><p>${esc(b.actual)}</p></div>
        </div>
        <p class="impact"><strong>Impact:</strong> ${esc(b.impact)}</p>
        <a class="link small" href="${REPO}known-bugs.spec.ts" target="_blank" rel="noopener">View regression test →</a>
      </div>
    </details>`).join('');

  // Summary report
  document.getElementById('rs-cases').textContent = TEST_CASES.length;
  document.getElementById('rs-bugs').textContent = BUGS.length;

  function bars(el, key, order, colorFor) {
    const counts = {};
    BUGS.forEach(b => counts[b[key]] = (counts[b[key]] || 0) + 1);
    const keys = order || Object.keys(counts);
    const max = Math.max(...Object.values(counts));
    el.innerHTML = keys.filter(k => counts[k]).map(k => `
      <div class="bar-row">
        <span class="bar-label">${k}</span>
        <span class="bar-track"><span class="bar-fill ${colorFor ? colorFor(k) : ''}" style="width:${counts[k] / max * 100}%"></span></span>
        <span class="bar-val">${counts[k]}</span>
      </div>`).join('');
  }
  bars(document.getElementById('sev-bars'), 'severity', ['Blocker', 'Critical', 'Major', 'Minor'], k => 'fill-' + k.toLowerCase());
  bars(document.getElementById('mod-bars'), 'module');
})();
