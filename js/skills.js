/**
 * Renders grouped Skills section with icon tags (no ES modules — works on file:// and static hosts).
 */
(function () {
  function renderSkills(root) {
    if (!window.SKILL_GROUPS || !window.createSkillIcon) return false;

    const grid = document.createElement('div');
    grid.className = 'skills-grid reveal';

    window.SKILL_GROUPS.forEach(function (group) {
      const block = document.createElement('div');
      block.className = 'skill-group';

      const heading = document.createElement('h4');
      heading.textContent = group.title;
      block.appendChild(heading);

      const tags = document.createElement('div');
      tags.className = 'skill-tags';

      group.skills.forEach(function (name) {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.innerHTML =
          '<span class="skill-tag-icon" aria-hidden="true">' + window.createSkillIcon(name) + '</span>' +
          '<span class="skill-tag-label">' + name + '</span>';
        tag.setAttribute('title', name);
        tags.appendChild(tag);
      });

      block.appendChild(tags);
      grid.appendChild(block);
    });

    root.innerHTML = '';
    root.appendChild(grid);

    if (window.observeReveal) window.observeReveal(grid);
    else grid.classList.add('visible');

    return true;
  }

  var attempts = 0;

  function init() {
    var root = document.getElementById('skills-grid-root');
    if (!root) return;

    if (renderSkills(root)) return;

    attempts += 1;
    if (attempts > 40) {
      root.innerHTML = '<p class="skills-loading">Unable to load skills.</p>';
      return;
    }
    root.innerHTML = '<p class="skills-loading">Loading...</p>';
    setTimeout(init, 50);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
