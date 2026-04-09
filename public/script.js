// Auto-detect API URL based on current location
const currentLocation = window.location.origin;
const API_BASE_URL = `${currentLocation}/api/users`;

console.log('🔧 API Base URL:', API_BASE_URL);
console.log('📍 Current Location:', currentLocation);

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const usersGrid = document.getElementById('usersGrid');
const createUserForm = document.getElementById('createUserForm');
const editUserForm = document.getElementById('editUserForm');
const editModal = document.getElementById('editModal');
const closeModalBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const refreshBtn = document.getElementById('refreshBtn');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const toast = document.getElementById('toast');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎉 DOM Loaded - Initializing app');
  initTheme();
  initNavigation();
  loadUsers();
  checkServerHealth();
});

// Check Server Health
async function checkServerHealth() {
  try {
    const response = await fetch(`${currentLocation}/health`);
    const data = await response.json();
    console.log(' Server Health:', data);
  } catch (error) {
    console.error('❌ Server health check failed:', error);
    showToast('⚠️ Unable to connect to server. Make sure it is running!', 'error');
  }
}

// Theme Toggle
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.style.colorScheme = savedTheme;
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  console.log('🎨 Theme initialized:', savedTheme);
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-theme');
  const theme = isDark ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  document.documentElement.style.colorScheme = theme;
  themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  console.log('🎨 Theme changed to:', theme);
});

// Navigation
function initNavigation() {
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      showSection(section);

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

function showSection(sectionName) {
  sections.forEach(section => section.classList.remove('active'));

  switch (sectionName) {
    case 'users':
      document.getElementById('users-section').classList.add('active');
      loadUsers();
      break;
    case 'create':
      document.getElementById('create-section').classList.add('active');
      createUserForm.reset();
      clearFormErrors();
      break;
    case 'search':
      document.getElementById('search-section').classList.add('active');
      break;
    case 'docs':
      document.getElementById('docs-section').classList.add('active');
      break;
  }
}

// Load All Users
async function loadUsers() {
  try {
    usersGrid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading users...</div>';
    
    console.log('📤 Fetching users from:', API_BASE_URL);
    
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('📥 Response Status:', response.status);
    console.log('📥 Response OK:', response.ok);

    const data = await response.json();
    console.log('📥 Response Data:', data);

    if (!response.ok) {
      throw new Error(data.error || `HTTP Error: ${response.status}`);
    }

    if (data.data.length === 0) {
      usersGrid.innerHTML = `
        <div style="grid-column: 1/-1;">
          <div class="empty-state">
            <i class="fas fa-users"></i>
            <p>No users found. Create one to get started!</p>
          </div>
        </div>
      `;
      return;
    }

    usersGrid.innerHTML = data.data.map(user => createUserCard(user)).join('');
    attachUserCardListeners();
    console.log('✅ Users loaded successfully:', data.count);
  } catch (error) {
    console.error('❌ Error loading users:', error);
    showToast('❌ Failed to load users: ' + error.message, 'error');
    usersGrid.innerHTML = `
      <div style="grid-column: 1/-1;">
        <div class="empty-state">
          <i class="fas fa-exclamation-circle"></i>
          <p>Error: ${error.message}</p>
          <p style="font-size: 0.875rem; margin-top: 1rem; color: var(--text-light);">
            Make sure the server is running at ${API_BASE_URL}
          </p>
        </div>
      </div>
    `;
  }
}

// Create User Card
function createUserCard(user) {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const createdDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return `
    <div class="user-card" data-user-id="${user.id}">
      <div class="user-card-header">
        <div class="user-avatar">${initials}</div>
        <div class="user-info">
          <h3>${escapeHtml(user.name)}</h3>
          <p class="user-email">${escapeHtml(user.email)}</p>
        </div>
      </div>
      <div class="user-details">
        <div class="detail-item">
          <i class="fas fa-phone"></i>
          <span>${escapeHtml(user.phone)}</span>
        </div>
        <div class="detail-item">
          <i class="fas fa-calendar"></i>
          <span>${createdDate}</span>
        </div>
      </div>
      <div class="user-actions">
        <button class="btn btn-edit btn-edit-user" data-user-id="${user.id}">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="btn btn-danger btn-delete-user" data-user-id="${user.id}">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
  `;
}

// Attach event listeners to user cards
function attachUserCardListeners() {
  document.querySelectorAll('.btn-edit-user').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const userId = btn.dataset.userId;
      openEditModal(userId);
    });
  });

  document.querySelectorAll('.btn-delete-user').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const userId = btn.dataset.userId;
      if (confirm('Are you sure you want to delete this user?')) {
        await deleteUser(userId);
      }
    });
  });
}

// Create User Form
createUserForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearFormErrors();

  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim()
  };

  console.log('📝 Creating user:', formData);

  if (!validateForm(formData)) {
    return;
  }

  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    console.log('📥 Create Response Status:', response.status);

    const data = await response.json();
    console.log('📥 Create Response Data:', data);

    if (!response.ok) {
      throw new Error(data.error || `HTTP Error: ${response.status}`);
    }

    showToast(`✅ User ${formData.name} created successfully!`, 'success');
    createUserForm.reset();
    showSection('users');
    loadUsers();
  } catch (error) {
    console.error('❌ Error creating user:', error);
    showToast('❌ Failed to create user: ' + error.message, 'error');
  }
});

// Refresh Button
refreshBtn.addEventListener('click', () => {
  console.log('🔄 Refreshing users...');
  loadUsers();
});

// Search Users
searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (!query) {
    showToast('⚠️ Please enter a search term', 'warning');
    return;
  }

  console.log('🔍 Searching for:', query);

  try {
    const searchUrl = `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`;
    console.log('📤 Search URL:', searchUrl);

    const response = await fetch(searchUrl);
    const data = await response.json();

    console.log('📥 Search Response:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Search failed');
    }

    const searchResults = document.getElementById('searchResults');
    if (data.data.length === 0) {
      searchResults.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-search"></i>
          <p>No users found matching your search.</p>
        </div>
      `;
      return;
    }

    searchResults.innerHTML = `
      <div class="users-grid">
        ${data.data.map(user => createUserCard(user)).join('')}
      </div>
    `;
    attachUserCardListeners();
    showToast(`✅ Found ${data.data.length} user(s)`, 'success');
  } catch (error) {
    console.error('❌ Error searching users:', error);
    showToast('❌ Search failed: ' + error.message, 'error');
  }
});

// Enter key on search input
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

// Open Edit Modal
async function openEditModal(userId) {
  try {
    const fetchUrl = `${API_BASE_URL}/${userId}`;
    console.log('📤 Fetching user:', fetchUrl);

    const response = await fetch(fetchUrl);
    const data = await response.json();

    console.log('📥 User Data:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Failed to load user');
    }

    const user = data.data;
    document.getElementById('editUserId').value = user.id;
    document.getElementById('editName').value = user.name;
    document.getElementById('editEmail').value = user.email;
    document.getElementById('editPhone').value = user.phone;

    editModal.classList.add('active');
  } catch (error) {
    console.error('❌ Error loading user:', error);
    showToast('❌ Failed to load user: ' + error.message, 'error');
  }
}

// Close Modal
function closeEditModalHandler() {
  editModal.classList.remove('active');
  editUserForm.reset();
  clearFormErrors();
}

closeModalBtn.addEventListener('click', closeEditModalHandler);
cancelBtn.addEventListener('click', closeEditModalHandler);

// Edit User Form
editUserForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearFormErrors();

  const userId = document.getElementById('editUserId').value;
  const formData = {
    name: document.getElementById('editName').value.trim(),
    email: document.getElementById('editEmail').value.trim(),
    phone: document.getElementById('editPhone').value.trim()
  };

  console.log('📝 Updating user:', userId, formData);

  if (!validateForm(formData)) {
    return;
  }

  try {
    const updateUrl = `${API_BASE_URL}/${userId}`;
    console.log('📤 Update URL:', updateUrl);

    const response = await fetch(updateUrl, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    console.log('📥 Update Response Status:', response.status);

    const data = await response.json();
    console.log('📥 Update Response Data:', data);

    if (!response.ok) {
      throw new Error(data.error || `HTTP Error: ${response.status}`);
    }

    showToast(`✅ User ${formData.name} updated successfully!`, 'success');
    closeEditModalHandler();
    loadUsers();
  } catch (error) {
    console.error('❌ Error updating user:', error);
    showToast('❌ Failed to update user: ' + error.message, 'error');
  }
});

// Delete User
async function deleteUser(userId) {
  try {
    const deleteUrl = `${API_BASE_URL}/${userId}`;
    console.log('📤 Delete URL:', deleteUrl);

    const response = await fetch(deleteUrl, {
      method: 'DELETE'
    });

    console.log('📥 Delete Response Status:', response.status);

    const data = await response.json();
    console.log('📥 Delete Response Data:', data);

    if (!response.ok) {
      throw new Error(data.error || `HTTP Error: ${response.status}`);
    }

    showToast('✅ User deleted successfully!', 'success');
    loadUsers();
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    showToast('❌ Failed to delete user: ' + error.message, 'error');
  }
}

// Form Validation
function validateForm(formData) {
  const errors = {};

  if (!formData.name || formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = 'Invalid email address';
  }

  if (!formData.phone || formData.phone.length < 10) {
    errors.phone = 'Phone number must be at least 10 digits';
  }

  if (Object.keys(errors).length > 0) {
    showFormErrors(errors);
    console.warn('⚠️ Validation errors:', errors);
    return false;
  }

  return true;
}

// Show Form Errors
function showFormErrors(errors) {
  for (const [field, message] of Object.entries(errors)) {
    const errorElement = document.getElementById(`${field}Error`) || 
                        document.getElementById(`edit${field.charAt(0).toUpperCase() + field.slice(1)}Error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }
}

// Clear Form Errors
function clearFormErrors() {
  document.querySelectorAll('.error-message').forEach(el => {
    el.textContent = '';
    el.classList.remove('show');
  });
}

// Show Toast
function showToast(message, type = 'info') {
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  console.log(`📢 Toast [${type}]:`, message);

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Log initialization complete
console.log('✅ Script loaded successfully');