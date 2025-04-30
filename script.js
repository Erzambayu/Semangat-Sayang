// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

// Check saved theme preference
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Floating hearts animation
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.getElementById('hearts-container').appendChild(heart);
    
    setTimeout(() => heart.remove(), 5000);
}

setInterval(createHeart, 3000);

// Confetti effect for completed tasks
function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Load saved data from localStorage
function loadSavedData() {
    // Load goals
    const savedGoals = JSON.parse(localStorage.getItem('goals') || '[]');
    savedGoals.forEach(goal => addGoal(goal.text, goal.completed));
    
    // Load diary entries
    const savedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    savedEntries.forEach(entry => {
        const entryDiv = createDiaryEntryElement(entry);
        diaryEntries.insertBefore(entryDiv, diaryEntries.firstChild);
    });

    // Load notification preference
    const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';
    const notificationBtn = document.getElementById('enable-notifications');
    if (notificationsEnabled) {
        notificationBtn.classList.add('active');
        notificationBtn.textContent = 'Notifikasi Aktif';
    }

    // Load progress
    updateProgress();
}

// Save goals to localStorage
function saveGoals() {
    const goals = [];
    document.querySelectorAll('.goal-item:not(.add-goal)').forEach(item => {
        const label = item.querySelector('label');
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (label && checkbox) {
            goals.push({
                text: label.textContent,
                completed: checkbox.checked
            });
        }
    });
    localStorage.setItem('goals', JSON.stringify(goals));
    updateProgress();
}

// Add goal functionality
const newGoalInput = document.getElementById('new-goal');
const addGoalBtn = document.getElementById('add-goal-btn');
const goalsList = document.querySelector('.goals-list');

function addGoal(text, completed = false) {
    const goalItem = document.createElement('div');
    goalItem.className = 'goal-item animate__animated animate__fadeIn';
    goalItem.innerHTML = `
        <input type="checkbox" ${completed ? 'checked' : ''}>
        <label>${text}</label>
        <button class="delete-btn" aria-label="Hapus target">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    goalsList.insertBefore(goalItem, document.querySelector('.add-goal'));
    
    const checkbox = goalItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) showConfetti();
        saveGoals();
    });
    
    const deleteBtn = goalItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        goalItem.remove();
        saveGoals();
    });
    
    saveGoals();
}

addGoalBtn.addEventListener('click', () => {
    const text = newGoalInput.value.trim();
    if (text) {
        addGoal(text);
        newGoalInput.value = '';
    }
});

newGoalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const text = newGoalInput.value.trim();
        if (text) {
            addGoal(text);
            newGoalInput.value = '';
        }
    }
});

// Update progress bar
function updateProgress() {
    const totalGoals = document.querySelectorAll('.goal-item').length;
    const completedGoals = document.querySelectorAll('.goal-item input:checked').length;
    const progressPercent = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
    
    document.getElementById('weekly-progress').style.width = `${progressPercent}%`;
    document.querySelector('.progress-text').textContent = `${Math.round(progressPercent)}% Tercapai`;
}

// Diary functionality
const diaryForm = document.querySelector('.diary-form');
const diaryEntries = document.getElementById('diaryEntries');

document.getElementById('saveDiary').addEventListener('click', function() {
    const entry = document.getElementById('diaryEntry').value;
    if (entry.trim()) {
        saveDiaryEntry(entry);
        document.getElementById('diaryEntry').value = '';
        showConfetti();
    }
});

// Save diary entry
function saveDiaryEntry(text) {
    const now = new Date();
    const entry = {
        id: Date.now(),
        text: text,
        date: now.toLocaleDateString('id-ID') + ' ' + now.toLocaleTimeString('id-ID')
    };
    
    const entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    entries.unshift(entry);
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
    
    const entryDiv = createDiaryEntryElement(entry);
    diaryEntries.insertBefore(entryDiv, diaryEntries.firstChild);
}

// Create diary entry element
function createDiaryEntryElement(entry) {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'diary-entry animate__animated animate__fadeIn';
    entryDiv.dataset.id = entry.id;
    entryDiv.innerHTML = `
        <button class="delete-entry-btn" aria-label="Hapus catatan">
            <i class="fas fa-times"></i>
        </button>
        <p class="entry-text">${entry.text}</p>
        <p class="entry-date">${entry.date}</p>
    `;

    // Add delete functionality
    const deleteBtn = entryDiv.querySelector('.delete-entry-btn');
    deleteBtn.addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
            deleteDiaryEntry(entry.id);
            entryDiv.classList.add('animate__fadeOut');
            setTimeout(() => entryDiv.remove(), 500);
        }
    });

    return entryDiv;
}

// Delete diary entry
function deleteDiaryEntry(id) {
    let entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    entries = entries.filter(entry => entry.id !== id);
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
}

// Messages array
const messages = [
    "Sayang, aku selalu mendukungmu dalam setiap langkahmu. Aku bangga dengan usaha dan kerja kerasmu selama ini. Teruslah berjuang, dan ingat bahwa aku selalu ada untukmu. Kamu hebat!",
    "Setiap hari melihatmu berjuang membuatku semakin mencintaimu. Kamu adalah inspirasi terbesar dalam hidupku. Aku tahu kadang kamu merasa lelah, tapi ingatlah bahwa aku selalu di sini untukmu.",
    "Kamu adalah orang yang paling kuat yang aku kenal. Setiap tantangan yang kamu hadapi membuatmu semakin berharga. Aku bangga menjadi bagian dari perjalanan hidupmu.",
    "Ingatlah bahwa setiap langkah kecil yang kamu ambil hari ini adalah investasi untuk masa depan yang lebih baik. Aku percaya padamu, dan aku tahu kamu bisa mencapai semua impianmu."
];

// Display random message
function displayRandomMessage() {
    const messageElement = document.getElementById('random-message');
    const randomIndex = Math.floor(Math.random() * messages.length);
    messageElement.textContent = messages[randomIndex];
}

displayRandomMessage();

// Quotes array
const quotes = [
    "Jangan bandingkan perjalananmu dengan orang lain. Setiap orang memiliki waktunya masing-masing.",
    "Keberhasilan adalah hasil dari kesempurnaan, kerja keras, belajar dari kegagalan, loyalitas, dan ketekunan.",
    "Cintamu adalah sumber kekuatanku untuk terus maju dan berkembang setiap hari.",
    "Jangan pernah menyerah pada mimpimu, karena aku tidak akan pernah menyerah padamu."
];

// New quote button functionality
document.getElementById('new-quote-btn').addEventListener('click', function() {
    const quoteText = document.getElementById('quote-text');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = `"${quotes[randomIndex]}"`;
});

// Update current date and time
function updateDateTime() {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('id-ID', dateOptions);
    document.getElementById('current-time').textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

// Global variable to store all holidays and current month
let allHolidays = [];
let currentDisplayMonth = new Date().getMonth();
let currentDisplayYear = new Date().getFullYear();

// Show/hide loading indicator
function toggleLoading(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const holidayList = document.getElementById('holidayList');
    
    if (show) {
        loadingIndicator.classList.add('show');
        holidayList.style.display = 'none';
    } else {
        loadingIndicator.classList.remove('show');
        holidayList.style.display = 'flex';
    }
}

// Update back to current month button visibility
function updateBackToCurrentButton() {
    const backBtn = document.getElementById('backToCurrentMonth');
    const currentDate = new Date();
    const isCurrentMonth = currentDisplayMonth === currentDate.getMonth() && 
                         currentDisplayYear === currentDate.getFullYear();
    
    backBtn.classList.toggle('hidden', isCurrentMonth);
}

// Back to current month functionality
function backToCurrentMonth() {
    const currentDate = new Date();
    currentDisplayMonth = currentDate.getMonth();
    currentDisplayYear = currentDate.getFullYear();
    displayHolidays();
    updateMonthTitle();
    updateBackToCurrentButton();
}

// Fetch and store holidays
async function fetchHolidays() {
    toggleLoading(true);
    try {
        const currentYear = new Date().getFullYear();
        const response = await fetch(`https://script.google.com/macros/s/AKfycbxTj7WY21RLM8RO6biCeobN5BGAzRUgvfzGxvGJ-Scww6rsgXZWIbK0WSpMjhac5vxs/exec?tahun=${currentYear}`);
        const data = await response.json();
        
        if (data.status === 'success') {
            allHolidays = data.data;
            displayHolidays();
            updateMonthTitle();
            updateBackToCurrentButton();
        }
    } catch (error) {
        console.error('Error fetching holidays:', error);
        document.getElementById('holidayList').innerHTML = '<p class="error-message">Gagal memuat data hari libur</p>';
    } finally {
        toggleLoading(false);
    }
}

// Update month title
function updateMonthTitle() {
    const monthTitle = document.getElementById('currentMonth');
    const date = new Date(currentDisplayYear, currentDisplayMonth);
    monthTitle.textContent = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
}

// Display holidays for selected month
function displayHolidays() {
    const holidayList = document.getElementById('holidayList');
    holidayList.innerHTML = '';
    
    // Get month in Indonesian format (Jan, Feb, etc)
    const targetMonth = new Date(currentDisplayYear, currentDisplayMonth)
        .toLocaleString('id-ID', { month: 'short' });
    
    // Filter holidays for target month
    const monthHolidays = allHolidays.filter(holiday => holiday.bulan === targetMonth);
    
    if (monthHolidays.length === 0) {
        holidayList.innerHTML = '<p class="no-holiday">Tidak ada hari libur di bulan ini</p>';
        return;
    }
    
    monthHolidays.forEach(holiday => {
        const holidayItem = document.createElement('div');
        holidayItem.className = 'holiday-item animate__animated animate__fadeIn';
        holidayItem.innerHTML = `
            <div class="holiday-date">
                <span class="holiday-day">${holiday.tanggal}</span>
                <span class="holiday-month">${holiday.bulan}</span>
            </div>
            <div class="holiday-title">${holiday.title}</div>
        `;
        holidayList.appendChild(holidayItem);
    });

    // Update navigation buttons state
    updateNavigationState();
}

// Update navigation buttons state
function updateNavigationState() {
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    // Disable previous button if we're at January of the current year
    prevBtn.disabled = currentDisplayMonth === 0 && currentDisplayYear === currentYear;
    
    // Disable next button if we're at December of the current year
    nextBtn.disabled = currentDisplayMonth === 11 && currentDisplayYear === currentYear;
}

// Navigate to previous month
function navigateToPrevMonth() {
    if (currentDisplayMonth === 0) {
        currentDisplayMonth = 11;
        currentDisplayYear--;
    } else {
        currentDisplayMonth--;
    }
    displayHolidays();
    updateMonthTitle();
    updateBackToCurrentButton();
}

// Navigate to next month
function navigateToNextMonth() {
    if (currentDisplayMonth === 11) {
        currentDisplayMonth = 0;
        currentDisplayYear++;
    } else {
        currentDisplayMonth++;
    }
    displayHolidays();
    updateMonthTitle();
    updateBackToCurrentButton();
}

// Add event listeners for navigation buttons
document.getElementById('prevMonth').addEventListener('click', navigateToPrevMonth);
document.getElementById('nextMonth').addEventListener('click', navigateToNextMonth);
document.getElementById('backToCurrentMonth').addEventListener('click', backToCurrentMonth);

// Check for month change
function checkMonthChange() {
    const currentMonth = new Date().getMonth();
    const lastCheckedMonth = parseInt(localStorage.getItem('lastCheckedMonth') || '-1');
    
    if (currentMonth !== lastCheckedMonth) {
        localStorage.setItem('lastCheckedMonth', currentMonth);
        currentDisplayMonth = currentMonth;
        currentDisplayYear = new Date().getFullYear();
        fetchHolidays();
    }
}

// Weekly reset functionality
function checkWeeklyReset() {
    const lastReset = localStorage.getItem('lastReset');
    const now = new Date();
    const today = now.getDay(); // 0 = Sunday

    if (today === 0) { // If it's Sunday
        if (lastReset !== now.toDateString()) {
            // Reset goals
            document.querySelectorAll('.goal-item:not(.add-goal)').forEach(item => item.remove());
            localStorage.setItem('goals', '[]');
            localStorage.setItem('lastReset', now.toDateString());
            updateProgress();
        }
    }
}

// Notification functionality
const notificationBtn = document.getElementById('enable-notifications');

notificationBtn.addEventListener('click', async () => {
    if (!('Notification' in window)) {
        alert('Browser Anda tidak mendukung notifikasi');
        return;
    }

    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            notificationBtn.textContent = 'Notifikasi Aktif';
            notificationBtn.classList.add('active');
            localStorage.setItem('notificationsEnabled', 'true');
            new Notification('Notifikasi Diaktifkan', {
                body: 'Anda akan menerima pengingat untuk target mingguan Anda'
            });
        } else {
            notificationBtn.textContent = 'Aktifkan Notifikasi';
            notificationBtn.classList.remove('active');
            localStorage.setItem('notificationsEnabled', 'false');
        }
    } catch (error) {
        console.error('Error requesting notification permission:', error);
    }
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    fetchHolidays();
    checkWeeklyReset();
    setInterval(checkWeeklyReset, 1000 * 60 * 60); // Check every hour
    setInterval(updateDateTime, 1000);
    setInterval(checkMonthChange, 1000 * 60 * 60); // Check every hour
    updateDateTime();
}); 