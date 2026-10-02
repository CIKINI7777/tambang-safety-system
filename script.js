const STORAGE_KEYS = {
  employees: 'tambang-safety-employees',
  incidents: 'tambang-safety-incidents',
  ppe: 'tambang-safety-ppe',
  training: 'tambang-safety-training',
};

const defaultData = {
  employees: [
    { name: 'Rahmat S', department: 'Penambangan', shift: 'Pagi', status: 'Siap Kerja', lastCheck: '08:00' },
    { name: 'Doni K', department: 'Maintenance', shift: 'Siang', status: 'Siap Kerja', lastCheck: '09:15' },
    { name: 'Sari M', department: 'HSE', shift: 'Pagi', status: 'Perlu Review', lastCheck: '07:40' },
    { name: 'Andi P', department: 'Logistik', shift: 'Malam', status: 'Siap Kerja', lastCheck: '10:20' },
    { name: 'Budi H', department: 'Pengolahan', shift: 'Siang', status: 'Siap Kerja', lastCheck: '08:50' },
  ],
  incidents: [
    {
      name: 'Rahmat S',
      department: 'Penambangan',
      type: 'Near Miss',
      severity: 'Tinggi',
      description: 'Material longsor di area jalan tambang barat saat shift pagi.',
      action: 'Area dibatasi dan pengecekan geoteknik dilakukan segera.',
    },
    {
      name: 'Doni K',
      department: 'Maintenance',
      type: 'Kondisi Bahaya',
      severity: 'Sedang',
      description: 'Pipa air bocor di sekitar area produksi.',
      action: 'Pipa segera diberhentikan sementara dan perbaikan dibantu tim teknis.',
    },
  ],
  ppe: [
    { workerName: 'Rahmat S', ppeCategory: 'Helm', ppeStatus: 'Baik' },
    { workerName: 'Doni K', ppeCategory: 'Sepatu Safety', ppeStatus: 'Perlu Diganti' },
    { workerName: 'Sari M', ppeCategory: 'Masker', ppeStatus: 'Baik' },
  ],
  training: [
    { title: 'P3K Darurat', status: 'Valid', date: '2026-09-12', note: 'Sertifikasi aktif sampai 2027.' },
    { title: 'JSA / Job Safety Analysis', status: 'Review', date: '2026-06-03', note: 'Perlu refresh ulang dalam 2 minggu.' },
    { title: 'K3 Excavation', status: 'Valid', date: '2026-08-18', note: 'Sertifikasi masih berlaku.' },
  ],
};

function loadState() {
  const state = {};
  Object.entries(STORAGE_KEYS).forEach(([key, value]) => {
    const item = localStorage.getItem(value);
    state[key] = item ? JSON.parse(item) : defaultData[key];
  });
  return state;
}

function saveState(state) {
  Object.entries(STORAGE_KEYS).forEach(([key, value]) => {
    localStorage.setItem(value, JSON.stringify(state[key]));
  });
}

function setState(state) {
  saveState(state);
  renderDashboard();
}

function getRiskClass(level) {
  const normalized = level.toLowerCase();
  if (normalized.includes('rendah')) return 'level-low';
  if (normalized.includes('sedang')) return 'level-medium';
  if (normalized.includes('tinggi') || normalized.includes('kritis')) return 'level-high';
  return 'level-medium';
}

function renderStats(state) {
  const totalEmployees = state.employees.length;
  const totalIncidents = state.incidents.length;
  const ppeCompliant = state.ppe.filter((item) => item.ppeStatus === 'Baik').length;
  const trainingValid = state.training.filter((item) => item.status === 'Valid').length;

  document.getElementById('totalEmployees').textContent = totalEmployees;
  document.getElementById('totalIncidents').textContent = totalIncidents;

  const ppePercentage = totalEmployees ? Math.round((ppeCompliant / totalEmployees) * 100) : 0;
  const trainingPercentage = state.training.length ? Math.round((trainingValid / state.training.length) * 100) : 0;

  document.getElementById('ppeCompliance').textContent = `${ppePercentage}%`;
  document.getElementById('trainingValid').textContent = `${trainingPercentage}%`;
}

function renderRiskList(state) {
  const riskList = document.getElementById('riskList');
  const visible = state.incidents.slice(0, 3);

  riskList.innerHTML = visible
    .map(
      (item) => `
        <div class="risk-item">
          <div class="risk-top">
            <h4>${item.type}</h4>
            <span class="risk-level ${getRiskClass(item.severity)}">${item.severity}</span>
          </div>
          <p><strong>${item.name}</strong> • ${item.department}</p>
          <p>${item.description}</p>
        </div>
      `
    )
    .join('');
}

function renderPPE(state) {
  const tbody = document.getElementById('ppeTableBody');
  tbody.innerHTML = state.ppe
    .slice(0, 5)
    .map((item) => {
      const statusClass = item.ppeStatus === 'Baik' ? 'status-ready' : item.ppeStatus === 'Perlu Diganti' ? 'status-risk' : 'status-watch';
      return `
        <tr>
          <td>${item.workerName}</td>
          <td>${item.ppeCategory}</td>
          <td><span class="status-pill ${statusClass}">${item.ppeStatus}</span></td>
        </tr>
      `;
    })
    .join('');
}

function renderTraining(state) {
  const list = document.getElementById('trainingList');
  list.innerHTML = state.training
    .map((item) => {
      const statusClass = item.status === 'Valid' ? 'status-ready' : 'status-watch';
      return `
        <div class="training-item">
          <div class="training-top">
            <h4>${item.title}</h4>
            <span class="status-pill ${statusClass}">${item.status}</span>
          </div>
          <p>${item.note}</p>
          <p><strong>Tanggal:</strong> ${item.date}</p>
        </div>
      `;
    })
    .join('');
}

function renderEmployees(state) {
  const tbody = document.getElementById('employeeTableBody');
  tbody.innerHTML = state.employees
    .map((employee) => {
      const statusClass = employee.status === 'Siap Kerja' ? 'status-ready' : 'status-watch';
      return `
        <tr>
          <td>${employee.name}</td>
          <td>${employee.department}</td>
          <td>${employee.shift}</td>
          <td><span class="status-pill ${statusClass}">${employee.status}</span></td>
          <td>${employee.lastCheck}</td>
        </tr>
      `;
    })
    .join('');
}

function renderDashboard() {
  const state = loadState();
  renderStats(state);
  renderRiskList(state);
  renderPPE(state);
  renderTraining(state);
  renderEmployees(state);
}

document.getElementById('incidentForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const state = loadState();
  state.incidents.unshift({
    name: formData.get('name'),
    department: formData.get('department'),
    type: formData.get('type'),
    severity: formData.get('severity'),
    description: formData.get('description'),
    action: formData.get('action'),
  });

  setState(state);
  form.reset();
});

document.getElementById('ppeForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const state = loadState();
  state.ppe.unshift({
    workerName: formData.get('workerName'),
    ppeCategory: formData.get('ppeCategory'),
    ppeStatus: formData.get('ppeStatus'),
  });

  setState(state);
  form.reset();
});

document.getElementById('resetDataBtn').addEventListener('click', () => {
  const confirmReset = window.confirm('Apakah Anda ingin mengembalikan data demo ke kondisi awal?');
  if (!confirmReset) return;

  const state = JSON.parse(JSON.stringify(defaultData));
  setState(state);
});

renderDashboard();
