# Struktur Database Dashboard PT. KNE

## Daftar Tabel

1. users
2. roles
3. divisions
4. work_areas
5. employees
6. incidents
7. near_miss
8. ppe_compliance
9. inspections
10. equipment
11. training
12. certifications
13. risk_matrix
14. corrective_actions
15. audit_logs
16. notifications

---

## 1. Tabel: users

Untuk autentikasi dan manajemen pengguna sistem.

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  employee_id INT,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);
```

---

## 2. Tabel: roles

Untuk manajemen role dan permission.

```sql
CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
('Admin', 'Akses penuh sistem'),
('Safety Manager', 'Manajemen K3 keseluruhan'),
('Supervisor', 'Supervisor area kerja'),
('Officer K3', 'Tim officer keselamatan kerja'),
('HR Manager', 'Manajemen SDM dan pelatihan'),
('Site Manager', 'Manager site tambang'),
('Employee', 'Karyawan biasa');
```

---

## 3. Tabel: divisions

Untuk manajemen divisi / departemen.

```sql
CREATE TABLE divisions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  manager_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);

-- Insert sample divisions
INSERT INTO divisions (name, description) VALUES
('Penggalian', 'Divisi penggalian tambang'),
('Transportasi', 'Divisi transportasi material'),
('Maintenance', 'Divisi pemeliharaan alat'),
('Pengolahan', 'Divisi pengolahan material'),
('Keselamatan', 'Divisi keselamatan kerja');
```

---

## 4. Tabel: work_areas

Untuk manajemen area kerja di tambang.

```sql
CREATE TABLE work_areas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  division_id INT NOT NULL,
  risk_level ENUM('Rendah', 'Sedang', 'Tinggi', 'Kritis'),
  supervisor_id INT,
  location_coordinates VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (division_id) REFERENCES divisions(id),
  FOREIGN KEY (supervisor_id) REFERENCES employees(id)
);

-- Insert sample work areas
INSERT INTO work_areas (name, description, division_id, risk_level) VALUES
('Pit Utama', 'Area penggalian utama', 1, 'Kritis'),
('Tanggul Utara', 'Tanggul area utara', 1, 'Tinggi'),
('Jalan Angkut', 'Jalan transportasi material', 2, 'Tinggi'),
('Area Maintenance', 'Workshop maintenance alat', 3, 'Sedang');
```

---

## 5. Tabel: employees

Untuk data karyawan PT. KNE.

```sql
CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  nik VARCHAR(20) UNIQUE NOT NULL,
  division_id INT NOT NULL,
  work_area_id INT,
  position VARCHAR(100),
  shift ENUM('A', 'B', 'C') DEFAULT 'A',
  supervisor_id INT,
  join_date DATE,
  status ENUM('Aktif', 'Cuti', 'Keluar') DEFAULT 'Aktif',
  phone VARCHAR(20),
  email VARCHAR(100),
  last_training_date DATE,
  last_incident_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (division_id) REFERENCES divisions(id),
  FOREIGN KEY (work_area_id) REFERENCES work_areas(id),
  FOREIGN KEY (supervisor_id) REFERENCES employees(id)
);
```

---

## 6. Tabel: incidents

Untuk pencatatan insiden dan kecelakaan kerja.

```sql
CREATE TABLE incidents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  report_date DATE NOT NULL,
  incident_date DATETIME NOT NULL,
  employee_id INT NOT NULL,
  work_area_id INT NOT NULL,
  division_id INT NOT NULL,
  incident_type ENUM('Jatuh', 'Tertimpa', 'Alat Berat', 'Paparan Debu', 'Kebisingan', 'Longsor', 'Terpotong', 'Lainnya'),
  severity ENUM('Ringan', 'Sedang', 'Berat', 'Kritis'),
  description TEXT,
  root_cause TEXT,
  witnesses TEXT,
  immediate_action TEXT,
  preventive_action TEXT,
  photo_url VARCHAR(255),
  status ENUM('Open', 'In Progress', 'Closed') DEFAULT 'Open',
  reported_by INT,
  investigated_by INT,
  investigation_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (work_area_id) REFERENCES work_areas(id),
  FOREIGN KEY (division_id) REFERENCES divisions(id),
  FOREIGN KEY (reported_by) REFERENCES employees(id),
  FOREIGN KEY (investigated_by) REFERENCES employees(id)
);
```

---

## 7. Tabel: near_miss

Untuk pencatatan near miss (hampir terjadi kecelakaan).

```sql
CREATE TABLE near_miss (
  id INT PRIMARY KEY AUTO_INCREMENT,
  report_date DATE NOT NULL,
  employee_id INT NOT NULL,
  work_area_id INT NOT NULL,
  division_id INT NOT NULL,
  incident_type VARCHAR(100),
  description TEXT,
  potential_risk TEXT,
  potential_impact ENUM('Rendah', 'Sedang', 'Tinggi'),
  corrective_action TEXT,
  status ENUM('Open', 'Closed') DEFAULT 'Open',
  reported_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (work_area_id) REFERENCES work_areas(id),
  FOREIGN KEY (division_id) REFERENCES divisions(id),
  FOREIGN KEY (reported_by) REFERENCES employees(id)
);
```

---

## 8. Tabel: ppe_compliance

Untuk tracking kepatuhan penggunaan APD.

```sql
CREATE TABLE ppe_compliance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  check_date DATE NOT NULL,
  employee_id INT NOT NULL,
  work_area_id INT NOT NULL,
  division_id INT NOT NULL,
  helmet BOOLEAN DEFAULT FALSE,
  safety_vest BOOLEAN DEFAULT FALSE,
  safety_shoes BOOLEAN DEFAULT FALSE,
  gloves BOOLEAN DEFAULT FALSE,
  mask BOOLEAN DEFAULT FALSE,
  eye_protection BOOLEAN DEFAULT FALSE,
  earmuff BOOLEAN DEFAULT FALSE,
  other_ppe VARCHAR(255),
  compliance_status ENUM('Lengkap', 'Tidak Lengkap', 'Tidak Ada APD') DEFAULT 'Tidak Lengkap',
  checked_by INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (work_area_id) REFERENCES work_areas(id),
  FOREIGN KEY (division_id) REFERENCES divisions(id),
  FOREIGN KEY (checked_by) REFERENCES employees(id)
);
```

---

## 9. Tabel: inspections

Untuk pencatatan inspeksi alat dan area kerja.

```sql
CREATE TABLE inspections (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inspection_date DATE NOT NULL,
  inspection_type ENUM('Alat Berat', 'Kendaraan', 'Area Kerja', 'Fasilitas', 'Rambu-rambu'),
  work_area_id INT,
  equipment_id INT,
  inspector_id INT NOT NULL,
  division_id INT,
  findings TEXT,
  status ENUM('Lulus', 'Gagal', 'Perlu Perbaikan') DEFAULT 'Lulus',
  critical_issues TEXT,
  corrective_action_deadline DATE,
  photo_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (work_area_id) REFERENCES work_areas(id),
  FOREIGN KEY (equipment_id) REFERENCES equipment(id),
  FOREIGN KEY (inspector_id) REFERENCES employees(id),
  FOREIGN KEY (division_id) REFERENCES divisions(id)
);
```

---

## 10. Tabel: equipment

Untuk data alat berat dan kendaraan operasional.

```sql
CREATE TABLE equipment (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  equipment_type ENUM('Alat Berat', 'Kendaraan', 'Peralatan Kerja'),
  serial_number VARCHAR(100) UNIQUE,
  division_id INT NOT NULL,
  last_inspection_date DATE,
  next_inspection_date DATE,
  condition_status ENUM('Baik', 'Perlu Perbaikan', 'Kritis') DEFAULT 'Baik',
  maintenance_notes TEXT,
  operator_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (division_id) REFERENCES divisions(id),
  FOREIGN KEY (operator_id) REFERENCES employees(id)
);
```

---

## 11. Tabel: training

Untuk manajemen pelatihan karyawan.

```sql
CREATE TABLE training (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  training_type ENUM('K3', 'Teknis', 'SOP', 'Operator', 'Refresher'),
  duration_hours INT,
  trainer_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (trainer_id) REFERENCES employees(id)
);

-- Insert sample trainings
INSERT INTO training (name, training_type, duration_hours) VALUES
('Safety Induction', 'K3', 8),
('APD dan Emergency Response', 'K3', 4),
('Operator Alat Berat', 'Operator', 16),
('Hazard Communication', 'K3', 4);
```

---

## 12. Tabel: certifications

Untuk tracking sertifikasi dan pelatihan karyawan.

```sql
CREATE TABLE certifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  training_id INT NOT NULL,
  certification_date DATE NOT NULL,
  expiry_date DATE,
  certificate_number VARCHAR(100),
  status ENUM('Valid', 'Expired', 'Pending') DEFAULT 'Valid',
  score INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (training_id) REFERENCES training(id)
);
```

---

## 13. Tabel: risk_matrix

Untuk manajemen risk assessment dan mitigasi.

```sql
CREATE TABLE risk_matrix (
  id INT PRIMARY KEY AUTO_INCREMENT,
  work_area_id INT NOT NULL,
  hazard_type VARCHAR(100) NOT NULL,
  hazard_description TEXT,
  likelihood ENUM('Rendah', 'Sedang', 'Tinggi', 'Sangat Tinggi') DEFAULT 'Sedang',
  impact ENUM('Rendah', 'Sedang', 'Tinggi', 'Katastrofal') DEFAULT 'Sedang',
  risk_level ENUM('Rendah', 'Sedang', 'Tinggi', 'Kritis') DEFAULT 'Sedang',
  existing_control TEXT,
  additional_control TEXT,
  residual_risk ENUM('Rendah', 'Sedang', 'Tinggi', 'Kritis'),
  owner_id INT,
  review_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (work_area_id) REFERENCES work_areas(id),
  FOREIGN KEY (owner_id) REFERENCES employees(id)
);
```

---

## 14. Tabel: corrective_actions

Untuk tracking tindakan perbaikan dan follow-up.

```sql
CREATE TABLE corrective_actions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  incident_id INT,
  near_miss_id INT,
  inspection_id INT,
  action_type ENUM('Immediate', 'Short-term', 'Long-term'),
  description TEXT,
  root_cause TEXT,
  action_assigned_to INT NOT NULL,
  target_completion_date DATE,
  actual_completion_date DATE,
  status ENUM('Open', 'In Progress', 'Closed') DEFAULT 'Open',
  priority ENUM('Rendah', 'Sedang', 'Tinggi', 'Kritis') DEFAULT 'Sedang',
  effectiveness_check_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (incident_id) REFERENCES incidents(id),
  FOREIGN KEY (near_miss_id) REFERENCES near_miss(id),
  FOREIGN KEY (inspection_id) REFERENCES inspections(id),
  FOREIGN KEY (action_assigned_to) REFERENCES employees(id)
);
```

---

## 15. Tabel: audit_logs

Untuk pencatatan aktivitas audit dan sistem.

```sql
CREATE TABLE audit_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  action VARCHAR(255) NOT NULL,
  table_name VARCHAR(100),
  record_id INT,
  old_value JSON,
  new_value JSON,
  ip_address VARCHAR(50),
  user_agent VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 16. Tabel: notifications

Untuk notifikasi sistem.

```sql
CREATE TABLE notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  notification_type ENUM('Incident', 'Near Miss', 'Inspection', 'Training', 'Certification', 'Risk', 'Corrective Action', 'Alert'),
  title VARCHAR(255) NOT NULL,
  message TEXT,
  related_id INT,
  is_read BOOLEAN DEFAULT FALSE,
  priority ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## Relationship Diagram

```
users (1) ─── (N) employees
roles (1) ─── (N) users

divisions (1) ─── (N) employees
divisions (1) ─── (N) work_areas
divisions (1) ─── (N) equipment

work_areas (1) ─── (N) employees
work_areas (1) ─── (N) incidents
work_areas (1) ─── (N) near_miss
work_areas (1) ─── (N) ppe_compliance
work_areas (1) ─── (N) inspections
work_areas (1) ─── (N) risk_matrix

employees (1) ─── (N) incidents (as employee)
employees (1) ─── (N) near_miss (as employee)
employees (1) ─── (N) ppe_compliance (as employee)
employees (1) ─── (N) certifications

equipment (1) ─── (N) inspections
equipment (1) ─── (N) employees (as operator)

training (1) ─── (N) certifications
certifications (N) ─── (1) employees

incidents (1) ─── (N) corrective_actions
near_miss (1) ─── (N) corrective_actions
inspections (1) ─── (N) corrective_actions

risk_matrix (1) ─── (N) corrective_actions
```

---

## Indexes yang Disarankan

```sql
-- Performance indexes
CREATE INDEX idx_employees_division ON employees(division_id);
CREATE INDEX idx_employees_work_area ON employees(work_area_id);
CREATE INDEX idx_incidents_date ON incidents(incident_date);
CREATE INDEX idx_incidents_employee ON incidents(employee_id);
CREATE INDEX idx_incidents_division ON incidents(division_id);
CREATE INDEX idx_incidents_work_area ON incidents(work_area_id);
CREATE INDEX idx_near_miss_date ON near_miss(report_date);
CREATE INDEX idx_ppe_compliance_date ON ppe_compliance(check_date);
CREATE INDEX idx_ppe_compliance_employee ON ppe_compliance(employee_id);
CREATE INDEX idx_inspections_date ON inspections(inspection_date);
CREATE INDEX idx_certifications_employee ON certifications(employee_id);
CREATE INDEX idx_certifications_expiry ON certifications(expiry_date);
CREATE INDEX idx_corrective_actions_status ON corrective_actions(status);
CREATE INDEX idx_corrective_actions_date ON corrective_actions(target_completion_date);
```

---

## Views yang Berguna

### View 1: Dashboard Summary
```sql
CREATE VIEW dashboard_summary AS
SELECT 
  COUNT(DISTINCT e.id) as total_employees,
  COUNT(i.id) as total_incidents,
  COUNT(nm.id) as total_near_miss,
  COUNT(CASE WHEN c.status = 'Valid' THEN 1 END) as valid_certifications,
  COUNT(CASE WHEN c.status = 'Expired' THEN 1 END) as expired_certifications,
  ROUND(
    (COUNT(CASE WHEN pc.compliance_status = 'Lengkap' THEN 1 END) / 
     COUNT(DISTINCT pc.id)) * 100, 2
  ) as ppe_compliance_rate
FROM employees e
LEFT JOIN incidents i ON e.id = i.employee_id AND MONTH(i.incident_date) = MONTH(NOW())
LEFT JOIN near_miss nm ON e.id = nm.employee_id AND MONTH(nm.report_date) = MONTH(NOW())
LEFT JOIN certifications c ON e.id = c.employee_id
LEFT JOIN ppe_compliance pc ON e.id = pc.employee_id AND DATE(pc.check_date) = CURDATE();
```

### View 2: Incident Rate by Division
```sql
CREATE VIEW incident_rate_by_division AS
SELECT 
  d.name as division,
  COUNT(i.id) as incident_count,
  COUNT(DISTINCT i.employee_id) as affected_employees,
  COUNT(i.id) / COUNT(DISTINCT e.id) as incident_rate
FROM divisions d
LEFT JOIN employees e ON d.id = e.division_id
LEFT JOIN incidents i ON d.id = i.division_id AND MONTH(i.incident_date) = MONTH(NOW())
GROUP BY d.id, d.name;
```

### View 3: Pending Corrective Actions
```sql
CREATE VIEW pending_corrective_actions AS
SELECT 
  ca.id,
  ca.description,
  ca.priority,
  ca.target_completion_date,
  e.name as assigned_to,
  DATEDIFF(ca.target_completion_date, NOW()) as days_remaining
FROM corrective_actions ca
JOIN employees e ON ca.action_assigned_to = e.id
WHERE ca.status IN ('Open', 'In Progress')
ORDER BY ca.target_completion_date ASC;
```

---

## Catatan Implementasi

1. **Database Engine**: PostgreSQL atau MySQL 8.0+
2. **Character Set**: UTF-8MB4 (support Indonesian characters)
3. **Timezone**: Asia/Jakarta
4. **Backup**: Daily backup minimal
5. **Query Optimization**: Gunakan indexes untuk query yang sering dijalankan
6. **Data Retention**: Tentukan kebijakan retention untuk data lama
7. **Security**: Gunakan prepared statements untuk mencegah SQL injection
8. **Encryption**: Hash password dengan bcrypt atau argon2
9. **Audit Trail**: Catat semua perubahan penting di audit_logs

---

## Contoh Query KPI

### 1. Total Insiden Bulan Ini
```sql
SELECT COUNT(*) as total_incidents
FROM incidents
WHERE MONTH(incident_date) = MONTH(NOW())
AND YEAR(incident_date) = YEAR(NOW());
```

### 2. Kepatuhan APD
```sql
SELECT 
  ROUND(
    (COUNT(CASE WHEN compliance_status = 'Lengkap' THEN 1 END) / 
     COUNT(*)) * 100, 2
  ) as compliance_rate
FROM ppe_compliance
WHERE DATE(check_date) = CURDATE();
```

### 3. Sertifikasi akan Expired
```sql
SELECT COUNT(*) as expiring_certifications
FROM certifications
WHERE expiry_date BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 30 DAY)
AND status = 'Valid';
```

### 4. Corrective Actions Overdue
```sql
SELECT COUNT(*) as overdue_actions
FROM corrective_actions
WHERE status IN ('Open', 'In Progress')
AND target_completion_date < NOW();
```

---

Ini adalah struktur database lengkap untuk dashboard PT. KNE yang siap diimplementasikan dengan aplikasi web Anda.
