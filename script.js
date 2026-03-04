// ============================================
// ЕДИНЫЙ ФАЙЛ АНИМАЦИЙ ДЛЯ ВСЕГО САЙТА
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ОПРЕДЕЛЕНИЕ ТЕКУЩЕЙ СТРАНИЦЫ =====
    const currentPage = {
        isCatalog: window.location.pathname.includes('catalog') || document.querySelector('.catalog') !== null,
        isContacts: window.location.pathname.includes('contacts') || document.querySelector('.contacts-page') !== null,
        isProduct: window.location.pathname.includes('product') || document.querySelector('.product-page') !== null,
        isIndex: window.location.pathname === '/' || window.location.pathname.includes('index') || document.querySelector('.welcome') !== null,
        
        getProductType: function() {
            const title = document.querySelector('title')?.innerText || '';
            if (title.includes('Медвежонок')) return 'bear';
            if (title.includes('Зайчик')) return 'bunny';
            if (title.includes('Единорог')) return 'unicorn';
            if (title.includes('Слоненок')) return 'elephant';
            if (title.includes('Лисичка')) return 'fox';
            if (title.includes('Панда')) return 'panda';
            return null;
        }
    };
    
    console.log('✨ Сайт ожил! Текущая страница:', 
        currentPage.isCatalog ? 'Каталог' : 
        currentPage.isContacts ? 'Контакты' : 
        currentPage.isProduct ? 'Товар' : 
        currentPage.isIndex ? 'Главная' : 'Другая');
    
    // ===== 1. АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ =====
    const animateOnScroll = function() {
        const selectors = [];
        
        if (currentPage.isCatalog) selectors.push('.catalog-item');
        if (currentPage.isContacts) selectors.push('.contact-form-section, .contact-info-section, .map-container');
        if (currentPage.isProduct) selectors.push('.product-gallery, .product-info, .tech-table, .complex-table');
        if (currentPage.isIndex) selectors.push('.welcome, .btn');
        
        selectors.push('.footer-section');
        
        const elements = document.querySelectorAll(selectors.join(','));
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Устанавливаем начальные стили
    const setInitialStyles = function() {
        const selectors = [];
        
        if (currentPage.isCatalog) selectors.push('.catalog-item');
        if (currentPage.isContacts) selectors.push('.contact-form-section, .contact-info-section, .map-container');
        if (currentPage.isProduct) selectors.push('.product-gallery, .product-info, .tech-table, .complex-table');
        if (currentPage.isIndex) selectors.push('.welcome, .btn');
        
        selectors.push('.footer-section');
        
        const elements = document.querySelectorAll(selectors.join(','));
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    };
    
    setInitialStyles();
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // ===== 2. ПУЛЬСИРУЮЩАЯ КНОПКА =====
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes softPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); box-shadow: 0 5px 15px rgba(216,27,96,0.3); }
            100% { transform: scale(1); }
        }
        .btn-buy, .btn-buy-small, .btn-submit, .btn-details {
            animation: softPulse 2s infinite;
            transition: all 0.3s;
        }
        .btn-buy:hover, .btn-buy-small:hover, .btn-submit:hover, .btn-details:hover {
            animation: none;
            transform: scale(1.05);
            background-color: #d81b60;
            color: white;
        }
    `;
    document.head.appendChild(pulseStyle);
    
    // ===== 3. ЭФФЕКТЫ ПРИ НАВЕДЕНИИ НА КАРТОЧКИ =====
    const cards = document.querySelectorAll('.catalog-item, .product-card, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transition = 'transform 0.3s';
                img.style.transform = 'scale(1.08)';
            }
            
            const price = this.querySelector('.product-price, .current-price');
            if (price) {
                price.style.transition = 'color 0.3s';
                price.style.color = '#c2185b';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
            
            const price = this.querySelector('.product-price, .current-price');
            if (price) {
                price.style.color = '#d81b60';
            }
        });
    });
    
    // ===== 4. АНИМАЦИИ ДЛЯ КОНТАКТНОЙ СТРАНИЦЫ =====
    if (currentPage.isContacts) {
        console.log('📞 На странице контактов');
        
        // Анимация полей формы
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.transition = 'all 0.3s';
                this.style.transform = 'scale(1.02)';
                this.style.borderColor = '#d81b60';
                
                const label = this.closest('.form-group')?.querySelector('label');
                if (label) {
                    label.style.color = '#d81b60';
                    label.style.fontWeight = '700';
                }
            });
            
            input.addEventListener('blur', function() {
                this.style.transform = 'scale(1)';
                this.style.borderColor = '#ddd';
                
                const label = this.closest('.form-group')?.querySelector('label');
                if (label) {
                    label.style.color = '';
                    label.style.fontWeight = '';
                }
            });
        });
        
        // Анимация карты
        const mapContainer = document.querySelector('.map-container, .yandex-map');
        if (mapContainer) {
            mapContainer.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.01)';
                this.style.boxShadow = '0 10px 30px rgba(216,27,96,0.2)';
                this.style.transition = 'all 0.3s';
            });
            
            mapContainer.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            });
        }
        
        // Обработка формы
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('name')?.value || 'гость';
                showNotification(`✅ Спасибо, ${name}! Мы ответим вам в ближайшее время.`);
                this.reset();
            });
        }
    }
    
    // ===== 5. СПЕЦИАЛЬНЫЕ ЭФФЕКТЫ ДЛЯ ТОВАРОВ =====
    if (currentPage.isProduct) {
        const productType = currentPage.getProductType();
        console.log(`🧸 На странице товара: ${productType}`);
        
        // Увеличение изображения при наведении
        const mainImage = document.querySelector('.main-image img');
        if (mainImage) {
            mainImage.style.transition = 'transform 0.5s';
            
            mainImage.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            mainImage.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
        
        // Подсветка характеристик
        const chars = document.querySelectorAll('.characteristics-list li');
        chars.forEach((char, index) => {
            char.style.animation = `fadeIn 0.5s ${index * 0.1}s both`;
            
            char.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#fff0f3';
                this.style.paddingLeft = '35px';
                this.style.borderRadius = '5px';
                this.style.transition = 'all 0.3s';
            });
            
            char.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
                this.style.paddingLeft = '25px';
            });
        });
        
        // Спецэффекты для конкретных товаров
        switch(productType) {
            case 'unicorn': 
                createFloatingElements(['✨', '⭐', '🦄'], 12);
                break;
            case 'bunny': 
                createFloatingElements(['🥕', '🐰', '🌸'], 10);
                break;
            case 'elephant': 
                createFloatingElements(['💧', '🐘', '🌊'], 8);
                break;
            case 'fox': 
                createFloatingElements(['🍂', '🦊', '🌿'], 10);
                break;
            case 'panda': 
                createFloatingElements(['🎋', '🐼', '🎍'], 10);
                break;
            case 'bear':
                createFloatingElements(['🍯', '🐻', '🌸'], 8);
                break;
        }
    }
    
    // ===== 6. ФУНКЦИЯ ДЛЯ ПАРЯЩИХ ЭЛЕМЕНТОВ =====
    function createFloatingElements(elements, count) {
        const container = document.createElement('div');
        container.style.cssText = `
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none; z-index: 5; overflow: hidden;
        `;
        
        const productPage = document.querySelector('.product-page');
        if (productPage) {
            productPage.style.position = 'relative';
            productPage.appendChild(container);
            
            for (let i = 0; i < count; i++) {
                const el = document.createElement('div');
                el.innerHTML = elements[Math.floor(Math.random() * elements.length)];
                el.style.cssText = `
                    position: absolute;
                    font-size: ${Math.random() * 24 + 16}px;
                    opacity: 0.15;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: floatAround ${Math.random() * 15 + 15}s infinite;
                    transform: rotate(${Math.random() * 360}deg);
                `;
                container.appendChild(el);
            }
        }
    }
    
    // Добавляем стили для анимаций
    const animStyle = document.createElement('style');
    animStyle.textContent = `
        @keyframes floatAround {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(10deg); }
            66% { transform: translateY(20px) rotate(-10deg); }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
        }
    `;
    document.head.appendChild(animStyle);
    
    // ===== 7. КОНФЕТТИ ПРИ КЛИКЕ НА КУПИТЬ =====
    document.querySelectorAll('.btn-buy, .btn-buy-small').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const productName = document.querySelector('.product-title, .catalog-item h3')?.innerText || 'Товар';
            
            for (let i = 0; i < 12; i++) {
                const confetti = document.createElement('div');
                confetti.innerHTML = ['🎉', '✨', '🎈', '🧸', '🎊'][Math.floor(Math.random() * 5)];
                confetti.style.cssText = `
                    position: fixed;
                    left: ${e.clientX + Math.random() * 100 - 50}px;
                    top: ${e.clientY}px;
                    font-size: ${Math.random() * 20 + 15}px;
                    pointer-events: none;
                    z-index: 9999;
                    animation: flyAway ${Math.random() * 1 + 0.5}s forwards;
                `;
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 1000);
            }
            
            // Меняем текст кнопки
            const originalText = this.innerHTML;
            this.innerHTML = '✓ Добавлено';
            this.style.backgroundColor = '#4caf50';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = '#d81b60';
            }, 1500);
            
            // Показываем уведомление
            showNotification(`✅ ${productName} добавлен в корзину!`);
            
            // Обновляем счетчик корзины
            updateCartCounter();
        });
    });
    
    // ===== 8. УВЕДОМЛЕНИЯ =====
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px;
            background: #d81b60; color: white; padding: 12px 20px;
            border-radius: 8px; box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 10000; animation: slideIn 0.3s, fadeOut 0.3s 2.7s forwards;
            font-weight: 600;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
    
    // Стили для уведомлений
    const notifStyle = document.createElement('style');
    notifStyle.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes flyAway {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(notifStyle);
    
    // ===== 9. СЧЕТЧИК КОРЗИНЫ =====
    let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
    
    function updateCartCounter() {
        cartCount++;
        localStorage.setItem('cartCount', cartCount);
        updateCartDisplay();
    }
    
    function updateCartDisplay() {
        let cartIcon = document.querySelector('.cart-icon, .fa-shopping-cart')?.parentElement;
        
        if (!cartIcon) {
            // Создаем иконку корзины в меню
            const nav = document.querySelector('.nav ul');
            if (nav) {
                const cartLi = document.createElement('li');
                cartLi.innerHTML = `<a href="#" class="cart-link"><i class="fas fa-shopping-cart"></i> Корзина <span class="cart-badge">0</span></a>`;
                nav.appendChild(cartLi);
                cartIcon = cartLi.querySelector('a');
            }
        }
        
        if (cartIcon) {
            let badge = cartIcon.querySelector('.cart-badge, .cart-count');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'cart-badge';
                badge.style.cssText = `
                    position: absolute; top: -8px; right: -8px;
                    background: #d81b60; color: white; border-radius: 50%;
                    width: 20px; height: 20px; font-size: 12px;
                    display: flex; align-items: center; justify-content: center;
                `;
                cartIcon.style.position = 'relative';
                cartIcon.appendChild(badge);
            }
            
            badge.textContent = cartCount;
            badge.style.animation = 'bounce 0.3s';
            setTimeout(() => badge.style.animation = '', 300);
        }
    }
    
    // Инициализация счетчика при загрузке
    updateCartDisplay();
    
    // ===== 10. ПОДСВЕТКА АКТИВНОГО МЕНЮ =====
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav ul li a').forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPath || 
            (currentPath === '' && href === 'index.html') ||
            (currentPath.includes('product') && href === 'catalog.html' && currentPage.isProduct)) {
            
            link.classList.add('active');
        }
    });
    
    // ===== 11. АНИМАЦИЯ ЗАГОЛОВКОВ =====
    const titles = document.querySelectorAll('h1, h2, .page-title');
    
    titles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s';
            this.style.color = '#d81b60';
            this.style.transform = 'scale(1.02)';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.transform = 'scale(1)';
        });
    });
    
    // ===== 12. ПЛАВНОЕ ПОЯВЛЕНИЕ СТРАНИЦЫ =====
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // ===== 13. ДОБАВЛЕНИЕ КНОПКИ "НАВЕРХ" =====
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.style.cssText = `
        position: fixed; bottom: 30px; right: 30px;
        width: 50px; height: 50px; border-radius: 50%;
        background: #d81b60; color: white; border: none;
        font-size: 24px; cursor: pointer; opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 999;
    `;
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'scale(1)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'scale(0)';
        }
    });
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    console.log('✨ Все анимации успешно загружены!');
});
function updateCartLink() {
    const menuItems = document.querySelectorAll('.nav ul li a');
    let hasCartLink = false;
    
    menuItems.forEach(item => {
        if (item.getAttribute('href') === 'cart.html') {
            hasCartLink = true;
        }
    });
    
    if (!hasCartLink) {
        const nav = document.querySelector('.nav ul');
        if (nav) {
            const cartLi = document.createElement('li');
            cartLi.innerHTML = `<a href="cart.html"><i class="fas fa-shopping-cart"></i> Корзина</a>`;
            nav.appendChild(cartLi);
        }
    }
}

// Вызов функции при загрузке
updateCartLink();

// Добавление товара из каталога
document.querySelectorAll('.catalog-item .btn-details').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Ничего не делаем, просто переходим на страницу товара
    });
});

// Обработка для страницы товара
document.querySelectorAll('.product-info .btn-buy').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = window.location.pathname.split('/').pop();
        const productName = document.querySelector('.product-title')?.innerText || 'Товар';
        const productPriceText = document.querySelector('.current-price')?.innerText || '0';
        const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ''));
        const productImage = document.querySelector('.main-image img')?.src || '';
        
        if (window.cart) {
            window.cart.addItem({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage
            });
        }
    });
});

// Создаем глобальную ссылку на корзину
window.cart = cart;