// Инициализация EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Замените на ваш публичный ключ EmailJS
})();

// Основной функционал
document.addEventListener('DOMContentLoaded', function() {
    
    // Плавная прокрутка для якорных ссылок
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анимации при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Добавляем класс fade-in к элементам для анимации
    const animateElements = document.querySelectorAll('.service-card, .contact-info, .contact-form, .stats .stat-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Обработка формы контактов
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем элементы формы
            const submitBtn = this.querySelector('button[type="submit"]');
            const spinner = submitBtn.querySelector('.spinner-border');
            const formData = new FormData(this);
            
            // Валидация формы
            const name = formData.get('name').trim();
            const phone = formData.get('phone').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();
            
            if (!name || !phone || !email || !message) {
                showNotification('Пожалуйста, заполните все поля', 'error');
                return;
            }
            
            // Валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Показываем состояние загрузки
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            spinner.classList.remove('d-none');
            
            // Подготавливаем данные для EmailJS
            const templateParams = {
                from_name: name,
                from_phone: phone,
                from_email: email,
                message: message,
                to_email: 'info@urconsultant.ru' // Замените на нужный email
            };
            
            // Отправляем email через EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showNotification('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showNotification('Произошла ошибка при отправке. Попробуйте еще раз или свяжитесь с нами по телефону.', 'error');
                })
                .finally(function() {
                    // Скрываем состояние загрузки
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    spinner.classList.add('d-none');
                });
        });
    }
    
    // Система уведомлений
    function showNotification(message, type = 'info') {
        // Удаляем существующие уведомления
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Определяем цвет уведомления
        let bgColor, textColor;
        switch(type) {
            case 'success':
                bgColor = 'var(--success-color)';
                textColor = 'white';
                break;
            case 'error':
                bgColor = 'var(--danger-color)';
                textColor = 'white';
                break;
            case 'warning':
                bgColor = 'var(--warning-color)';
                textColor = 'var(--dark-color)';
                break;
            default:
                bgColor = 'var(--info-color)';
                textColor = 'white';
        }
        
        const notification = document.createElement('div');
        notification.className = `notification alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
                <span>${message}</span>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Добавляем стили
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            border: none;
            border-radius: 10px;
            box-shadow: var(--shadow-lg);
        `;
        
        document.body.appendChild(notification);
        
        // Автоматическое скрытие через 5 секунд
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 150);
            }
        }, 5000);
    }
    
    // Параллакс эффект для героя секции
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Подсветка активного пункта меню при скролле
    const sectionsWithId = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sectionsWithId.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Анимация счетчиков в секции "О нас"
    const statNumbers = document.querySelectorAll('.stat-item h3');
    const statsSection = document.querySelector('.stats');
    
    if (statsSection && statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
        
        function animateCounters() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                const increment = target / 50;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + '+';
                }, 30);
            });
        }
    }
    
    // Анимация появления элементов при скролле
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => fadeObserver.observe(el));
    
    // Hover эффекты для карточек услуг
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Анимация для статистики
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('animate__animated', 'animate__fadeInUp');
    });
    
    // Плавная прокрутка для всех ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анимация для кнопок
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Оптимизация производительности при скролле
    let ticking = false;
    
    function updateOnScroll() {
        // Здесь можно добавить дополнительные эффекты при скролле
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Добавляем поддержку клавиатуры для навигации
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Закрываем все открытые модальные окна или меню
            const openModals = document.querySelectorAll('.modal.show');
            openModals.forEach(modal => {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            });
        }
    });
    
    // Инициализация Bootstrap компонентов
    // Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Анимация для контактной формы
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Добавляем анимацию для иконок в контактах
    const contactIcons = document.querySelectorAll('.contact-item i');
    contactIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Анимация для логотипа
    const logo = document.querySelector('.logo h2');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Добавляем анимацию для секций при загрузке
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Консоль сообщение для разработчиков
    console.log('%c🚀 Сайт Компании Советник загружен!', 'color: #0d6efd; font-size: 20px; font-weight: bold;');
    console.log('%c💡 Для настройки EmailJS замените YOUR_PUBLIC_KEY, YOUR_SERVICE_ID и YOUR_TEMPLATE_ID на ваши данные', 'color: #6c757d; font-size: 14px;');
});

// Функция для тестирования EmailJS (удалите в продакшене)
function testEmailJS() {
    const testParams = {
        from_name: 'Тест',
        from_phone: '+7 (900) 000-00-00',
        from_email: 'test@example.com',
        message: 'Это тестовое сообщение',
        to_email: 'info@urconsultant.ru'
    };
    
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', testParams)
        .then(function(response) {
            console.log('Тест успешен!', response.status, response.text);
            alert('Тест EmailJS прошел успешно!');
        }, function(error) {
            console.log('Тест не прошел:', error);
            alert('Тест EmailJS не прошел. Проверьте консоль для деталей.');
        });
}
