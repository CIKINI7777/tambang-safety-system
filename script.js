const STORAGE_KEYS = {
  hall: 'kne_hall_of_fame',
  checklist: 'kne_checklist',
  suggestions: 'kne_suggestions',
  stories: 'kne_stories',
};

const hallData = [
  {
    emoji: '🏆',
    name: 'Rahmat S.',
    title: 'Pahlawan Deteksi Dini',
    description: 'Memutuskan menghentikan pekerjaan atas tanda bahaya kecil dan menyelamatkan tim dari potensi longsor.',
  },
  {
    emoji: '🛡️',
    name: 'Sari M.',
    title: 'Guard of PPE',
    description: 'Menegakkan penggunaan APD dan mendorong disiplin yang membuat area kerja lebih aman.',
  },
  {
    emoji: '💡',
    name: 'Doni K.',
    title: 'Inovator Safety',
    description: 'Mengusulkan perbaikan visual area kerja dan meningkatkan kewaspadaan di jalur pergerakan.',
  },
  {
    emoji: '🤝',
    name: 'Nadya R.',
    title: 'Komunikator Tim',
    description: 'Membantu membangun komunikasi yang sehat antara shift dan mendorong pelaporan peristiwa aman.',
  },
];

const defaultChecklist = [
  { name: 'Rahmat S', area: 'Lubang Tambang', item: 'Helm dan APD lengkap', status: 'Selesai' },
  { name: 'Doni K', area: 'Workshop', item: 'Peralatan diperiksa', status: 'Perhatian' },
  { name: 'Sari M', area: 'Area Logistik', item: 'Jalur evakuasi aman', status: 'Selesai' },
];

const defaultSuggestions = [
  {
    name: 'Andi P',
    title: 'Penanda zona aman lebih terlihat',
    text: 'Penanda jalur aman dan zona bahaya perlu dibuat lebih kontras agar lebih mudah terlihat saat cuaca buruk.',
    votes: 12,
  },
  {
    name: 'Budi H',
    title: 'Pemasangan alarm di titik rawan',
    text: 'Titik-titik rawan perlu memiliki sensor sederhana atau indikator visual agar lebih siap mencegah bahaya.',
    votes: 9,
  },
];

const defaultStories = [
  {
    id: 'story-1',
    emoji: '🛡️',
    name: 'Rahmat S.',
    department: 'Supervisor',
    tag: 'leadership',
    title: 'Saya tidak ingin orang lain harus kehilangan momen bersama keluarga.',
    story: 'Saat itu saya melihat satu pekerja melewati area yang belum dibersihkan. Saya menghentikan pekerjaan dan memastikan area aman sebelum melanjutkan. Saya sadar bahwa menghentikan pekerjaan bukan tanda takut, melainkan bentuk tanggung jawab. Sejak saat itu, kami lebih terbuka untuk saling mengingatkan dan lebih peka terhadap tanda bahaya kecil.',
    likes: 42,
  },
  {
    id: 'story-2',
    emoji: '⚠️',
    name: 'Sari M.',
    department: 'HSE',
    tag: 'near-miss',
    title: 'Near miss bukan hal sepele, itu sinyal penyelamatan hidup.',
    story: 'Pada awalnya saya pikir laporan near miss itu terlalu kecil. Namun, setelah melihat satu kejadian yang nyaris menimbulkan cidera, saya mulai memahami bahwa tindakan kecil yang dilaporkan bisa mencegah tragedi besar. Karena itu, kami terus mendorong setiap pekerja untuk melaporkan kondisi berbahaya tanpa rasa takut.',
    likes: 35,
  },
  {
    id: 'story-3',
    emoji: '👨‍👩‍👧‍👦',
    name: 'Doni K.',
    department: 'Teknisi',
    tag: 'family',
    title: 'Helm bukan beban, itu jembatan pulang ke rumah.',
    story: 'Saya pernah melihat rekan kerja melepas helm hanya sebentar karena merasa panas. Saat itu saya langsung mengingatkan, bukan hanya karena aturan, tetapi karena saya ingin ia pulang melihat anak dan istrinya. Begitu saya berbicara dari hati, semua orang mulai lebih peduli pada APD dan keselamatan.',
    likes: 51,
  },
];

const simulatorQuestions = [
  {
    question: 'Apa yang harus Anda lakukan saat menemukan area kerja berdebu tinggi?',
    options: [
      'Langsung bekerja tanpa menghentikan aktivitas',
      'Mencegah masuknya pekerja dan melaporkan ke supervisor',
      'Mengabaikan karena itu bagian dari pekerjaan',
      'Tinggalkan area tanpa memberitahu siapa pun',
    ],
    correct: 1,
  },
  {
    question: 'Manakah tindakan paling tepat sebelum memulai pekerjaan di area baru?',
    options: [
      'Langsung mulai tanpa briefing',
      'Melakukan briefing, pengecekan area, dan identifikasi bahaya',
      'Menunggu sampai akhir shift',
      'Hanya mengecek alat kerja',
    ],
    correct: 1,
  },
  {
    question: 'Apa maksud dari laporan near miss yang baik?',
    options: [
      'Hanya untuk formalitas administrasi',
      'Mencegah kejadian serupa di masa depan',
      'Menghambat target produksi',
      'Hanya untuk disimpan di arsip',
    ],
    correct: 1,
  },
];

function loadData(key, fallback) {
  const saved = localStorage.getItem(key);
  if (!saved) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return JSON.parse(JSON.stringify(fallback));
  }

  try {
    const parsed = JSON.parse(saved);
    return parsed;
  } catch (error) {
    return JSON.parse(JSON.stringify(fallback));
  }
}

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function renderDashboard() {
  const employees = loadData('kne_employees', [
    { name: 'Rahmat S', department: 'Penambangan', status: 'Siap Kerja' },
    { name: 'Doni K', department: 'Maintenance', status: 'Siap Kerja' },
    { name: 'Sari M', department: 'HSE', status: 'Perlu Review' },
    { name: 'Andi P', department: 'Logistik', status: 'Siap Kerja' },
    { name: 'Budi H', department: 'Pengolahan', status: 'Siap Kerja' },
  ]);

  const nearMiss = loadData('kne_near_miss_count', 127);
  const ppe = loadData('kne_ppe_percent', 92);
  const training = loadData('kne_training_percent', 88);

  document.getElementById('totalEmployees').textContent = employees.length;
  document.getElementById('totalNearMiss').textContent = nearMiss;
  document.getElementById('ppeCompliance').textContent = `${ppe}%`;
  document.getElementById('trainingCompletion').textContent = `${training}%`;

  const riskList = document.getElementById('riskSummary');
  const items = [
    { title: 'Area jalan tambang barat', level: 'Tinggi', detail: 'Kondisi tanah berpasir dan jalan basah memerlukan perhatian ekstra.' },
    { title: 'Workshop maintenance', level: 'Sedang', detail: 'Pembersihan lantai dan pemeriksaan kabel perlu ditingkatkan.' },
    { title: 'Area logistik', level: 'Rendah', detail: 'Kondisi tertata, tetapi pengawasan tetap diperlukan selama shift malam.' },
  ];

  riskList.innerHTML = items
    .map(
      (item) => `
        <div class="risk-item">
          <div class="risk-top">
            <h4>${item.title}</h4>
            <span class="status-pill ${item.level === 'Tinggi' ? 'status-risk' : item.level === 'Sedang' ? 'status-watch' : 'status-done'}">${item.level}</span>
          </div>
          <p>${item.detail}</p>
        </div>
      `
    )
    .join('');
}

function renderHallOfFame() {
  const hallList = document.getElementById('hallList');
  const items = loadData(STORAGE_KEYS.hall, hallData);

  hallList.innerHTML = items
    .map(
      (item) => `
        <article class="hall-card">
          <div class="hall-hero">${item.emoji}</div>
          <div class="hall-body">
            <h3>${item.name}</h3>
            <p><strong>${item.title}</strong></p>
            <p>${item.description}</p>
          </div>
        </article>
      `
    )
    .join('');
}

function renderChecklist() {
  const list = document.getElementById('checklistList');
  const items = loadData(STORAGE_KEYS.checklist, defaultChecklist);

  list.innerHTML = items
    .map(
      (item) => `
        <div class="checklist-item">
          <div class="checklist-top">
            <h4>${item.name}</h4>
            <span class="status-pill ${item.status === 'Selesai' ? 'status-done' : item.status === 'Perhatian' ? 'status-watch' : 'status-risk'}">${item.status}</span>
          </div>
          <p><strong>Area:</strong> ${item.area}</p>
          <p><strong>Item:</strong> ${item.item}</p>
        </div>
      `
    )
    .join('');
}

function renderSuggestions() {
  const list = document.getElementById('suggestionList');
  const items = loadData(STORAGE_KEYS.suggestions, defaultSuggestions);

  list.innerHTML = items
    .map(
      (item) => `
        <div class="suggestion-item">
          <div class="suggestion-top">
            <h4>${item.title}</h4>
            <span class="status-pill status-done">${item.votes} votes</span>
          </div>
          <p><strong>${item.name}</strong></p>
          <p>${item.text}</p>
        </div>
      `
    )
    .join('');
}

function renderStories() {
  const list = document.getElementById('storyList');
  const stories = loadData(STORAGE_KEYS.stories, defaultStories);

  list.innerHTML = stories
    .map(
      (story) => `
        <article class="story-card">
          <div class="story-emoji">${story.emoji}</div>
          <div class="story-body">
            <span class="chip muted">${story.tag}</span>
            <h3>${story.title}</h3>
            <p>${story.story.slice(0, 120)}...</p>
            <div class="story-meta">
              <span>${story.name}</span>
              <span>${story.department}</span>
            </div>
            <div class="story-actions">
              <button class="read-more" data-id="${story.id}">Baca</button>
              <button class="like-btn" data-like="${story.id}">❤ ${story.likes}</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

function openStoryModal(id) {
  const stories = loadData(STORAGE_KEYS.stories, defaultStories);
  const story = stories.find((item) => item.id === id);
  if (!story) return;

  document.getElementById('modalTag').textContent = story.tag;
  document.getElementById('modalTitle').textContent = story.title;
  document.getElementById('modalAuthor').textContent = story.name;
  document.getElementById('modalDept').textContent = story.department;
  document.getElementById('modalText').textContent = story.story;

  document.getElementById('storyModal').classList.remove('hidden');
  document.getElementById('storyModal').setAttribute('aria-hidden', 'false');
}

function closeStoryModal() {
  document.getElementById('storyModal').classList.add('hidden');
  document.getElementById('storyModal').setAttribute('aria-hidden', 'true');
}

function handleChecklist(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const items = loadData(STORAGE_KEYS.checklist, defaultChecklist);

  items.unshift({
    name: data.get('name'),
    area: data.get('area'),
    item: data.get('item'),
    status: data.get('status'),
  });

  saveData(STORAGE_KEYS.checklist, items);
  renderChecklist();
  form.reset();
}

function handleSuggestion(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const items = loadData(STORAGE_KEYS.suggestions, defaultSuggestions);

  items.unshift({
    name: data.get('name'),
    title: data.get('title'),
    text: data.get('text'),
    votes: 0,
  });

  saveData(STORAGE_KEYS.suggestions, items);
  renderSuggestions();
  form.reset();
}

function handleStorySubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const stories = loadData(STORAGE_KEYS.stories, defaultStories);

  stories.unshift({
    id: `story-${Date.now()}`,
    emoji: '✨',
    name: data.get('name'),
    department: data.get('department'),
    tag: data.get('tag'),
    title: data.get('title'),
    story: data.get('story'),
    likes: 0,
  });

  saveData(STORAGE_KEYS.stories, stories);
  renderStories();
  form.reset();
}

function increaseLike(id) {
  const stories = loadData(STORAGE_KEYS.stories, defaultStories);
  const updated = stories.map((story) =>
    story.id === id ? { ...story, likes: Number(story.likes || 0) + 1 } : story
  );
  saveData(STORAGE_KEYS.stories, updated);
  renderStories();
}

function setupSimulator() {
  let currentIndex = 0;
  let score = 0;
  const questions = simulatorQuestions;

  const progress = document.getElementById('simulatorProgress');
  const scoreEl = document.getElementById('simulatorScore');
  const questionText = document.getElementById('questionText');
  const answersEl = document.getElementById('answers');
  const nextBtn = document.getElementById('nextQuestion');

  function renderQuestion() {
    const q = questions[currentIndex];
    questionText.textContent = q.question;
    progress.textContent = `${currentIndex + 1}/${questions.length}`;
    scoreEl.textContent = score;
    answersEl.innerHTML = q.options
      .map(
        (option, index) => `
          <button class="answer-btn" data-answer="${index}">${option}</button>
        `
      )
      .join('');

    document.querySelectorAll('.answer-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const chosen = Number(btn.dataset.answer);
        const isCorrect = chosen === q.correct;
        if (isCorrect) score += 10;

        document.querySelectorAll('.answer-btn').forEach((item) => {
          item.disabled = true;
          item.classList.remove('selected');
          if (Number(item.dataset.answer) === q.correct) {
            item.classList.add('correct');
          } else if (Number(item.dataset.answer) === chosen && !isCorrect) {
            item.classList.add('wrong');
          }
        });
        btn.classList.add('selected');
        scoreEl.textContent = score;
      });
    });
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < questions.length - 1) {
      currentIndex += 1;
      renderQuestion();
      return;
    }

    nextBtn.textContent = 'Selesai';
    questionText.textContent = `Latihan selesai! Skor akhir Anda: ${score}/30. Terus tingkatkan kesadaran dan tindakan aman di setiap pekerjaan.`;
    answersEl.innerHTML = '';
    progress.textContent = `${questions.length}/${questions.length}`;
    scoreEl.textContent = score;
  });

  renderQuestion();
}

function bindEvents() {
  document.getElementById('checklistForm').addEventListener('submit', handleChecklist);
  document.getElementById('suggestionForm').addEventListener('submit', handleSuggestion);
  document.getElementById('storyForm').addEventListener('submit', handleStorySubmit);
  document.getElementById('refreshDashboard').addEventListener('click', renderDashboard);

  document.getElementById('storyList').addEventListener('click', (event) => {
    const readBtn = event.target.closest('.read-more');
    if (readBtn) openStoryModal(readBtn.dataset.id);

    const likeBtn = event.target.closest('.like-btn');
    if (likeBtn) increaseLike(likeBtn.dataset.like);
  });

  document.getElementById('storyModal').addEventListener('click', (event) => {
    if (event.target.dataset.close === 'true') closeStoryModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeStoryModal();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderDashboard();
  renderHallOfFame();
  renderChecklist();
  renderSuggestions();
  renderStories();
  setupSimulator();
  bindEvents();
});

