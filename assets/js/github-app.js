/**
 * GitHub Integration Component (Consolidated Gallery)
 * Handles populating the Project Gallery from global JS data.
 */

const GITHUB_USERNAME = 'darknecrocities';

// State
let githubState = {
  repos: []
};

/**
 * Initialize
 */
function initGitHubIntegration() {
  try {
    // Load Repos from global variable (github-repos.js)
    if (!window.GITHUB_REPOS) {
      console.warn('GitHub data not found. Retrying in 1s...');
      setTimeout(initGitHubIntegration, 1000);
      return;
    }
    githubState.repos = window.GITHUB_REPOS;

    // Populate Gallery
    populateProjectsSection();

    // Setup Modal Listeners
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

    const localImage = `./assets/images/projects/${repo.name}.png`;
    const fallbackImage = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`;

    li.innerHTML = `
      <div class="repo-trigger" data-repo-name="${repo.name}">
        <figure class="project-banner-box">
          <img src="${localImage}" alt="${repo.name}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackImage}';">
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

document.addEventListener('DOMContentLoaded', initGitHubIntegration);
