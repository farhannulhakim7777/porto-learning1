
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800, // Durasi animasi dalam ms
        once: true,    // Animasi hanya berjalan sekali
        offset: 100,   // Offset (jarak dari bawah) sebelum animasi dimulai
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navUl = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle'); // ID target

    // Fungsi untuk mengubah tema
    const setTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
        themeToggle.querySelector('i').className = `fas ${icon}`;
        localStorage.setItem('theme', theme);
    };

    // ... (Logika deteksi tema tersimpan)

    // Listener tombol tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Toggle Navbar Menu: Menampilkan/menyembunyikan menu dan mengubah ikon hamburger
    if (navToggle && navUl) {
        navToggle.addEventListener('click', () => {
            navUl.classList.toggle('nav-open');
            navToggle.classList.toggle('active');
        });
    }

    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) { 
                navUl.classList.remove('nav-open');
                navToggle.classList.remove('active');
            }
        });
    });
});