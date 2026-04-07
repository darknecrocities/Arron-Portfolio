const fs = require('fs');
const https = require('https');
const path = require('path');

const USERNAME = 'darknecrocities';
const OUTPUT_DIR = path.join(__dirname, '../assets/data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'github-repos.js');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Fetch data from GitHub API
 */
function fetchGitHub(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Node.js-Fetcher',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Main execution
 */
async function main() {
  console.log(`Fetching repositories for ${USERNAME}...`);
  try {
    const repos = await fetchGitHub(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`);
    
    if (!Array.isArray(repos)) {
      console.error('Invalid response from GitHub:', repos);
      return;
    }

    // Filter, prioritize, and sort
    const processedRepos = repos
      .filter(repo => !repo.fork)
      .sort((a, b) => {
        // 1. Prioritize description presence
        const aHasDesc = !!a.description;
        const bHasDesc = !!b.description;
        if (aHasDesc !== bHasDesc) return bHasDesc - aHasDesc;

        // 2. Sort by stars
        return b.stargazers_count - a.stargazers_count;
      })
      .map(repo => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        watchers: repo.watchers_count,
        forks: repo.forks_count,
        open_issues: repo.open_issues_count,
        language: repo.language,
        created: repo.created_at,
        updated: repo.updated_at,
        size: repo.size,
        license: repo.license ? repo.license.name : null,
        topics: repo.topics || []
      }));

    // Wrap the data in a global JS variable to bypass CORS/local file security
    const jsPayload = `window.GITHUB_REPOS = ${JSON.stringify(processedRepos, null, 2)};`;
    
    fs.writeFileSync(OUTPUT_FILE, jsPayload);
    console.log(`Successfully saved ${processedRepos.length} repositories to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Error fetching/writing repos:', error);
  }
}

main();
