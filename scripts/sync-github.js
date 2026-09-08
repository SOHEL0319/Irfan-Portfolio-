/**
 * GitHub Build-Time Synchronization Utility
 * Usage: node scripts/sync-github.js
 * Mahammad Irfan Shaik — ML Engineer & Data Scientist Portfolio
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'data', 'projects-config.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'projects-live.json');

async function syncGithub() {
  console.log('🚀 Starting GitHub Portfolio Synchronization...');

  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('❌ Configuration file not found at:', CONFIG_PATH);
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const username = config.githubUsername || 'IRFAN18727';
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-Build-Sync'
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    console.log('🔑 Authenticated with GITHUB_TOKEN');
  }

  try {
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers });
    if (!reposRes.ok) {
      throw new Error(`Failed to fetch repositories: HTTP ${reposRes.status}`);
    }

    const repos = await reposRes.json();
    const filtered = repos.filter(r => !r.fork && (!config.excludedRepos || !config.excludedRepos.includes(r.name)));

    console.log(`📦 Found ${filtered.length} active public repositories for ${username}`);

    const enriched = await Promise.all(
      filtered.map(async (r) => {
        let readme = '';
        try {
          const readmeRes = await fetch(`https://api.github.com/repos/${username}/${r.name}/readme`, {
            headers: {
              ...headers,
              'Accept': 'application/vnd.github.v3.raw'
            }
          });
          if (readmeRes.ok) {
            readme = await readmeRes.text();
          }
        } catch (e) {}

        return {
          id: r.id,
          name: r.name,
          full_name: r.full_name,
          description: r.description,
          html_url: r.html_url,
          homepage: r.homepage,
          language: r.language,
          topics: r.topics || [],
          stargazers_count: r.stargazers_count || 0,
          forks_count: r.forks_count || 0,
          created_at: r.created_at,
          updated_at: r.updated_at,
          readme: readme,
          lastSyncedAt: new Date().toISOString()
        };
      })
    );

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(enriched, null, 2), 'utf8');
    console.log(`✅ Successfully generated ${OUTPUT_PATH} with ${enriched.length} projects!`);
  } catch (err) {
    console.warn('⚠️ GitHub Sync Warning (Rate Limit or Network):', err.message);
    if (fs.existsSync(OUTPUT_PATH)) {
      console.log(`📦 Preserving existing cached snapshot at ${OUTPUT_PATH}`);
      process.exit(0);
    } else {
      console.error('❌ No fallback snapshot available.');
      process.exit(1);
    }
  }
}

syncGithub();
