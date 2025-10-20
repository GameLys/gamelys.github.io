// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark-mode';
if (currentTheme === 'light-mode') {
    body.classList.add('light-mode');
    themeIcon.textContent = '🌙';
}

// Theme toggle handler
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light-mode');
    } else {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark-mode');
    }
});

// Fetch GitHub public repositories
async function fetchGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/GameLys/repos?per_page=100');
        const repos = await response.json();
        // Filter only public repos
        const publicRepos = repos.filter(repo => !repo.private);
        document.getElementById('repoCount').textContent = publicRepos.length;
    } catch (error) {
        console.error('Erreur lors de la récupération des repos GitHub:', error);
        document.getElementById('repoCount').textContent = '0';
    }
}

// Fetch Discord member count
async function fetchDiscordMembers() {
    try {
        // Note: Cette méthode utilise l'invite Discord pour récupérer les infos
        // Vous devrez peut-être configurer un bot Discord ou utiliser une API tierce
        const response = await fetch('https://discord.com/api/v10/invites/2kDzyARjNb?with_counts=true');
        const data = await response.json();
        document.getElementById('memberCount').textContent = data.approximate_member_count;
    } catch (error) {
        console.error('Erreur lors de la récupération des membres Discord:', error);
        document.getElementById('memberCount').textContent = '?';
    }
}

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubRepos();
    fetchDiscordMembers();
});