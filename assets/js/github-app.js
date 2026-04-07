/**
 * GitHub Integration Component (Consolidated Gallery)
 * Handles populating the Project Gallery from global JS data.
 */

const GITHUB_USERNAME = 'darknecrocities';
const API_BASE_URL = 'https://api.github.com';

// State
let githubState = {
  profile: null,
  repos: []
};

/**
 * Initialize
 */
function initGitHubIntegration() {
  try {
    // 1. Fetch Profile (Live stats)
    fetch(`${API_BASE_URL}/users/${GITHUB_USERNAME}`)
      .then(res => res.json())
      .then(data => {
         githubState.profile = data;
         populateGitHubDashboard();
      })
      .catch(e => console.warn('Profile fetch failed'));

    // 2. Load Repos from global variable (github-repos.js)
    if (!window.GITHUB_REPOS) {
      console.warn('GitHub data not found. Retrying in 1s...');
      setTimeout(initGitHubIntegration, 1000);
      return;
    }
    githubState.repos = window.GITHUB_REPOS;

    // 3. Populate Gallery
    populateProjectsSection();
    populateGitHubDashboard();

    // 4. Setup Modal Listeners
    setupModalListeners();

  } catch (error) {
    console.error('GitHub Integration Error:', error);
  }
}

/**
 * Populate Project Gallery
 */
function populateProjectsSection() {
  const projectList = document.getElementById('project-list');
  if (!projectList) return;

  projectList.innerHTML = ''; 

  githubState.repos.forEach(repo => {
    const li = document.createElement('li');
    li.className = 'project-post-item';

    const ogImage = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`;

    li.innerHTML = `
      <div class="repo-trigger" data-repo-name="${repo.name}">
        <figure class="project-banner-box">
          <img src="${ogImage}" alt="${repo.name}" loading="lazy">
        </figure>

        <div class="project-content">
          <div class="project-meta">
            <p class="project-category">${repo.language || 'Documentation'}</p>
            <span class="dot"></span>
            <time>${new Date(repo.updated).toLocaleDateString()}</time>
          </div>

          <h3 class="h3 project-item-title">${repo.name}</h3>
          <p class="project-text">
            ${repo.description || 'Professional open-source project and contribution.'}
          </p>
        </div>
      </div>
    `;
    projectList.appendChild(li);
  });
}

/**
 * Modal Popup Logic
 */
function setupModalListeners() {
  const modal = document.getElementById('github-detail-modal');
  const overlay = modal?.querySelector('[data-overlay]');
  const closeBtn = document.getElementById('close-github-modal');

  const toggleModal = () => modal?.classList.toggle('active');

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.repo-trigger');
    if (trigger) {
      const repoName = trigger.dataset.repoName;
      const repo = githubState.repos.find(r => r.name === repoName);
      if (repo) {
        renderRepoModal(repo);
        toggleModal();
      }
    }
  });

  closeBtn?.addEventListener('click', toggleModal);
  overlay?.addEventListener('click', toggleModal);
}

function renderRepoModal(repo) {
  const content = document.getElementById('github-modal-content');
  if (!content) return;

  const demoLink = repo.homepage ? `
    <a href="${repo.homepage}" target="_blank" class="modal-btn success">
      Live Demo <ion-icon name="globe-outline"></ion-icon>
    </a>` : '';

  const licenseBadge = repo.license ? `<span class="badge badge-license"><ion-icon name="shield-checkmark-outline"></ion-icon> ${repo.license}</span>` : '';
  const createDate = new Date(repo.created).toLocaleDateString([], { month: 'short', year: 'numeric' });
  const updateDate = new Date(repo.updated).toLocaleDateString([], { month: 'short', year: 'numeric' });

  content.innerHTML = `
    <div class="modal-detail-wrapper">
      <div class="modal-header">
        <div class="repo-main">
          <ion-icon name="logo-github" class="main-icon"></ion-icon>
          <div>
            <h3 class="h3">${repo.name}</h3>
            <p class="repo-full-name">${GITHUB_USERNAME}/${repo.name} ${licenseBadge}</p>
          </div>
        </div>
        <div class="repo-stats details-grid">
          <div class="stat" title="Stars"><ion-icon name="star"></ion-icon> ${repo.stars}</div>
          <div class="stat" title="Watchers"><ion-icon name="eye"></ion-icon> ${repo.watchers}</div>
          <div class="stat" title="Forks"><ion-icon name="git-network-outline"></ion-icon> ${repo.forks}</div>
          <div class="stat" title="Open Issues"><ion-icon name="alert-circle-outline"></ion-icon> ${repo.open_issues}</div>
        </div>
      </div>

      <div class="modal-body">
        <p class="description">${repo.description || 'No description provided for this repository.'}</p>
        
        <div class="tech-metadata-grid">
          <div class="meta-item">
            <span class="meta-label">Primary Language</span>
            <span class="tag language-tag">${repo.language || 'Markdown'}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Repository Size</span>
            <span class="meta-value">${Math.round((repo.size || 0) / 1024)} MB</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Created</span>
            <span class="meta-value">${createDate}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Last Push</span>
            <span class="meta-value">${updateDate}</span>
          </div>
        </div>

        ${repo.topics && repo.topics.length > 0 ? `
        <div class="tech-stack topics-list">
          <h4>Topics</h4>
          ${repo.topics.map(t => `<span class="tag topic-tag">${t}</span>`).join('')}
        </div>` : ''}

        <div class="modal-actions">
          ${demoLink}
          <a href="${repo.url}" target="_blank" class="modal-btn primary">
            View Source <ion-icon name="code-slash-outline"></ion-icon>
          </a>
          <a href="https://github.com/${GITHUB_USERNAME}/${repo.name}/archive/refs/heads/main.zip" class="modal-btn secondary">
            Download ZIP <ion-icon name="download-outline"></ion-icon>
          </a>
        </div>
      </div>
    </div>
  `;
}

/**
 * GitHub Dashboard Logic — Premium Redesign
 */
function populateGitHubDashboard() {
  const container = document.getElementById('github-dashboard-container');
  if (!container) return;

  const { profile, repos } = githubState;
  const totalStars = repos.reduce((sum, r) => sum + (r.stars || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks || 0), 0);
  const languages = calculateLanguages(repos);
  const recentRepos = [...repos].sort((a, b) => new Date(b.updated) - new Date(a.updated)).slice(0, 5);
  const topRepos = [...repos].sort((a, b) => (b.stars || 0) - (a.stars || 0)).slice(0, 3);

  const langColors = {
    'JavaScript': '#f7df1e', 'Python': '#3572A5', 'TypeScript': '#3178c6',
    'HTML': '#e34c26', 'CSS': '#563d7c', 'Java': '#b07219', 'C++': '#f34b7d',
    'C#': '#178600', 'PHP': '#4F5D95', 'Ruby': '#701516', 'Go': '#00ADD8',
    'Rust': '#dea584', 'Swift': '#ffac45', 'Kotlin': '#A97BFF', 'Dart': '#00B4AB',
    'Jupyter Notebook': '#DA5B0B', 'Shell': '#89e051', 'Vue': '#41b883',
  };

  container.innerHTML = `
    <!-- HERO PROFILE CARD -->
    <div class="gh-hero glassmorphism">
      <div class="gh-hero-bg"></div>
      <div class="gh-hero-content">
        <div class="gh-avatar-wrap">
          <img src="${profile?.avatar_url || 'https://github.com/' + GITHUB_USERNAME + '.png'}" alt="${GITHUB_USERNAME}" class="gh-avatar">
          <span class="gh-status-dot"></span>
        </div>
        <div class="gh-hero-info">
          <h3 class="gh-display-name">${profile?.name || GITHUB_USERNAME}</h3>
          <p class="gh-handle">@${GITHUB_USERNAME}</p>
          <p class="gh-bio">${profile?.bio || 'Fullstack Developer & AI Enthusiast'}</p>
          ${profile?.location ? `<p class="gh-meta-line"><ion-icon name="location-outline"></ion-icon> ${profile.location}</p>` : ''}
          ${profile?.company ? `<p class="gh-meta-line"><ion-icon name="business-outline"></ion-icon> ${profile.company}</p>` : ''}
          <div class="gh-social">
            <span><strong>${profile?.followers || 0}</strong> followers</span>
            <span class="gh-dot">·</span>
            <span><strong>${profile?.following || 0}</strong> following</span>
          </div>
          <a href="${profile?.html_url || 'https://github.com/' + GITHUB_USERNAME}" target="_blank" class="gh-follow-btn">
            <ion-icon name="logo-github"></ion-icon> Follow on GitHub
          </a>
        </div>
      </div>
    </div>

    <!-- STATS GRID -->
    <div class="gh-stats-grid">
      <div class="gh-stat-card">
        <div class="gh-stat-icon" style="background: hsla(45, 100%, 72%, 0.12);"><ion-icon name="code-slash-outline" style="color: var(--github-accent);"></ion-icon></div>
        <div class="gh-stat-data">
          <span class="gh-stat-value">${repos.length}</span>
          <span class="gh-stat-label">Repositories</span>
        </div>
      </div>
      <div class="gh-stat-card">
        <div class="gh-stat-icon" style="background: hsla(50, 100%, 60%, 0.12);"><ion-icon name="star" style="color: hsl(50, 100%, 65%);"></ion-icon></div>
        <div class="gh-stat-data">
          <span class="gh-stat-value">${totalStars}</span>
          <span class="gh-stat-label">Total Stars</span>
        </div>
      </div>
      <div class="gh-stat-card">
        <div class="gh-stat-icon" style="background: hsla(200, 100%, 60%, 0.12);"><ion-icon name="git-network-outline" style="color: hsl(200, 100%, 70%);"></ion-icon></div>
        <div class="gh-stat-data">
          <span class="gh-stat-value">${totalForks}</span>
          <span class="gh-stat-label">Total Forks</span>
        </div>
      </div>
      <div class="gh-stat-card">
        <div class="gh-stat-icon" style="background: hsla(280, 100%, 70%, 0.12);"><ion-icon name="people-outline" style="color: hsl(280, 100%, 75%);"></ion-icon></div>
        <div class="gh-stat-data">
          <span class="gh-stat-value">${profile?.followers || 0}</span>
          <span class="gh-stat-label">Followers</span>
        </div>
      </div>
    </div>

    <!-- TOP REPOSITORIES -->
    <div class="gh-section glassmorphism">
      <div class="gh-section-header">
        <h3 class="h3"><ion-icon name="trophy-outline"></ion-icon> Top Repositories</h3>
      </div>
      <div class="gh-top-repos">
        ${topRepos.map((repo, i) => `
          <div class="gh-top-repo-card">
            <div class="gh-top-rank">#${i + 1}</div>
            <div class="gh-top-repo-info">
              <h4 class="gh-top-repo-name">${repo.name}</h4>
              <p class="gh-top-repo-desc">${repo.description || 'No description.'}</p>
              <div class="gh-top-repo-meta">
                ${repo.language ? `<span class="gh-lang-dot" style="background:${langColors[repo.language] || '#8b8b8b'}"></span><span>${repo.language}</span>` : ''}
                <span><ion-icon name="star"></ion-icon> ${repo.stars}</span>
                <span><ion-icon name="git-network-outline"></ion-icon> ${repo.forks}</span>
              </div>
            </div>
            <a href="${repo.url}" target="_blank" class="gh-top-repo-link"><ion-icon name="open-outline"></ion-icon></a>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- RECENT ACTIVITY -->
    <div class="gh-section glassmorphism">
      <div class="gh-section-header">
        <h3 class="h3"><ion-icon name="time-outline"></ion-icon> Recent Activity</h3>
      </div>
      <div class="gh-activity-feed">
        ${recentRepos.map(repo => {
          const timeAgo = getTimeAgo(new Date(repo.updated));
          return `
          <div class="gh-activity-item">
            <div class="gh-activity-dot"></div>
            <div class="gh-activity-content">
              <p class="gh-activity-title">Pushed to <a href="${repo.url}" target="_blank">${repo.name}</a></p>
              <p class="gh-activity-desc">${repo.description || 'Updated repository.'}</p>
              <span class="gh-activity-time">${timeAgo}</span>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- TECH STACK -->
    <div class="gh-section glassmorphism">
      <div class="gh-section-header">
        <h3 class="h3"><ion-icon name="layers-outline"></ion-icon> Tech Stack</h3>
      </div>
      <div class="lang-grid">
        ${languages.map(lang => `
          <div class="lang-card">
            <div class="lang-info">
              <span class="lang-name"><span class="gh-lang-dot" style="background:${langColors[lang.name] || '#8b8b8b'}"></span>${lang.name}</span>
              <span class="lang-percent">${lang.percent}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${lang.percent}%; background: ${langColors[lang.name] || 'var(--github-accent)'};"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

function calculateLanguages(repos) {
  const langCount = {};
  let total = 0;
  repos.forEach(r => {
    if (r.language) {
      langCount[r.language] = (langCount[r.language] || 0) + 1;
      total++;
    }
  });
  return Object.entries(langCount)
    .map(([name, count]) => ({ name, percent: Math.round((count / total) * 100) }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 8);
}

document.addEventListener('DOMContentLoaded', initGitHubIntegration);
