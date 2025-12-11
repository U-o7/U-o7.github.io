let currentLanguage = localStorage.getItem('language') || 'en';
let configData = null;

// 設定読み込み
async function loadConfig() {
  try {
    const response = await fetch('config.json');
    configData = await response.json();
    renderContent();
  } catch (error) {
    console.error('Error loading config:', error);
  }
}

// コンテンツをレンダリング
function renderContent() {
  const p = configData. profile[currentLanguage];
  const s = configData.sections[currentLanguage];
  const sk = configData.skills[currentLanguage];
  const pr = configData.projects[currentLanguage];
  const c = configData. contact[currentLanguage];

  // Profile
  document.getElementById('name').textContent = p.name;
  document.getElementById('title').textContent = p.title;
  document.getElementById('bio').textContent = p.bio;

  // About
  document.getElementById('aboutTitle').textContent = s.aboutTitle;
  document.getElementById('aboutText').textContent = p.about;

  // Skills
  document.getElementById('skillsTitle').textContent = s.skillsTitle;
  const skillsList = document.getElementById('skillsList');
  skillsList.innerHTML = '';
  sk.forEach(skill => {
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.textContent = skill;
    skillsList.appendChild(tag);
  });

  // Projects
  document. getElementById('projectsTitle').textContent = s.projectsTitle;
  const projectsList = document.getElementById('projectsList');
  projectsList.innerHTML = '';
  pr. forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card. innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tags">
        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
      </div>
    `;
    projectsList.appendChild(card);
  });

  // Contact
  document.getElementById('contactTitle').textContent = s.contactTitle;
  const contactList = document.getElementById('contactList');
  contactList.innerHTML = '';
  c.forEach(contact => {
    const link = document.createElement('a');
    link.className = 'contact-link';
    link.href = contact.url;
    link. target = '_blank';
    link.rel = 'noopener';
    link.innerHTML = `<span class="contact-icon">${contact.icon}</span>${contact.label}`;
    contactList.appendChild(link);
  });

  // Footer
  document.getElementById('footerText').textContent = s.footerText;

  // ページタイトル
  document.title = p.name;
  document. documentElement.lang = currentLanguage;
}

// 言語切り替え
document.addEventListener('DOMContentLoaded', () => {
  loadConfig();

  document.getElementById('langBtn').addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'ja' : 'en';
    localStorage.setItem('language', currentLanguage);
    document.getElementById('langBtn').textContent = 
      currentLanguage === 'en' ? 'English / 日本語' : '日本語 / English';
    renderContent();
  });
});
