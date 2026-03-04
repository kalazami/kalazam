

class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.totalPrice = 0;
        this.itemCount = 0;
        this.deliveryCost = 300;
        this.freeDeliveryThreshold = 3000;
        this.init();
    }

    init() {
        this.updateCounters();
        this.createCartIcon();
        this.addStyles();
    }

    // Добавление товара с проверкой изображения
    addItem(product) {
        // Проверяем, есть ли изображение, если нет - ставим заглушку
        if (!product.image || product.image === '') {
            product.image = this.getDefaultImage(product.id);
        }
        
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCounters();
        this.showNotification(`✅ ${product.name} добавлен в корзину`);
        return this.items;
    }

    // Получение изображения по умолчанию для товара
    getDefaultImage(productId) {
        const defaultImages = {
            'product1.html': 'https://avatars.mds.yandex.net/get-mpic/3590777/2a000001930ab9c73d527e9405d1f074e08f/orig',
            'product2.html': 'https://avatars.mds.yandex.net/get-mpic/13225615/2a00000196d559bbf540c3996274c9d61470/orig',
            'product3.html': 'https://avatars.mds.yandex.net/get-mpic/1360852/2a00000192af02aae628514eb69144bb17a7/orig',
            'product4.html': 'https://avatars.mds.yandex.net/get-mpic/16406747/2a0000019b2b40620c9ada8fe195dddf1888/orig',
            'product5.html': 'https://avatars.mds.yandex.net/i?id=c913011b4d82f920366d0590e30677a80fb791be-13222423-images-thumbs&n=13',
            'product6.html': 'https://avatars.mds.yandex.net/i?id=e2f948b972e548c9c8c3013467cb6d134fae279a-5586428-images-thumbs&n=13'
        };
        
        return defaultImages[productId] || 'https://via.placeholder.com/300x300/FFB6C1/000?text=Игрушка';
    }

    // Удаление товара
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCounters();
        this.showNotification('🗑 Товар удален из корзины');
    }

    // Изменение количества
    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCounters();
            }
        }
    }

    // Очистка корзины
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCounters();
        this.showNotification('🔄 Корзина очищена');
    }

    // Получение общей суммы
    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Получение количества товаров
    getTotalCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Проверка на бесплатную доставку
    isFreeDelivery() {
        return this.getTotalPrice() >= this.freeDeliveryThreshold;
    }

    // Получение стоимости доставки
    getDeliveryCost() {
        return this.isFreeDelivery() ? 0 : this.deliveryCost;
    }

    // Получение итоговой суммы
    getFinalPrice() {
        return this.getTotalPrice() + this.getDeliveryCost();
    }

    // Сохранение в localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // Обновление счетчиков на странице
    updateCounters() {
        const count = this.getTotalCount();
        
        document.querySelectorAll('.cart-count, .cart-badge').forEach(el => {
            el.textContent = count;
            if (count > 0) {
                el.style.display = 'flex';
                el.style.animation = 'bounce 0.3s';
                setTimeout(() => el.style.animation = '', 300);
            } else {
                el.style.display = 'none';
            }
        });

        const cartTotal = document.getElementById('cart-total');
        if (cartTotal) {
            cartTotal.textContent = this.getTotalPrice().toLocaleString() + ' ₽';
        }

        const finalTotal = document.getElementById('final-total');
        if (finalTotal) {
            finalTotal.textContent = this.getFinalPrice().toLocaleString() + ' ₽';
        }

        const deliveryInfo = document.getElementById('delivery-info');
        if (deliveryInfo) {
            if (this.isFreeDelivery()) {
                deliveryInfo.innerHTML = '🚚 Доставка бесплатно';
                deliveryInfo.style.color = '#4caf50';
            } else {
                const remaining = this.freeDeliveryThreshold - this.getTotalPrice();
                deliveryInfo.innerHTML = `🚚 Доставка: ${this.deliveryCost} ₽ (до бесплатной доставки осталось ${remaining.toLocaleString()} ₽)`;
                deliveryInfo.style.color = '#ff9800';
            }
        }
    }

    // Показать уведомление
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // Создание иконки корзины
    createCartIcon() {
        const nav = document.querySelector('.nav ul');
        if (!nav) return;

        if (document.querySelector('.cart-icon-container')) return;

        const cartLi = document.createElement('li');
        cartLi.className = 'cart-icon-container';
        cartLi.innerHTML = `
            <a href="cart.html" class="cart-link">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-badge">${this.getTotalCount()}</span>
            </a>
        `;
        nav.appendChild(cartLi);
    }

    // Оформление заказа
    checkout() {
        if (this.items.length === 0) {
            this.showNotification('❌ Корзина пуста');
            return false;
        }

        const orderData = {
            items: this.items,
            total: this.getTotalPrice(),
            delivery: this.getDeliveryCost(),
            finalTotal: this.getFinalPrice(),
            date: new Date().toISOString(),
            orderNumber: '#' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
        };

        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('lastOrder', JSON.stringify(orderData));

        this.showNotification('🎉 Заказ оформлен!');
        this.clearCart();
        
        setTimeout(() => {
            window.location.href = 'order-confirmed.html';
        }, 1000);
        
        return true;
    }

    // Добавление стилей
    addStyles() {
        if (document.getElementById('cart-styles')) return;

        const style = document.createElement('style');
        style.id = 'cart-styles';
        style.textContent = `
            .cart-icon-container { position: relative; }
            .cart-badge {
                position: absolute; top: -8px; right: -8px;
                background: #d81b60; color: white; border-radius: 50%;
                width: 20px; height: 20px; font-size: 12px;
                display: flex; align-items: center; justify-content: center;
                font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            }
            .cart-notification {
                position: fixed; top: 20px; right: 20px;
                background: #d81b60; color: white; padding: 15px 25px;
                border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                z-index: 10000; animation: slideIn 0.3s, fadeOut 0.3s 2.7s forwards;
                font-weight: 600;
            }
            @keyframes slideIn {
                from { transform: translateX(100px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes bounce {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.3); }
            }
            
            /* Стили для корзины */
            .cart-page { padding: 30px 0; }
            .cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
            .cart-title { color: #d81b60; font-size: 32px; }
            .clear-cart { background: none; border: 2px solid #ddd; color: #666; padding: 10px 20px; border-radius: 5px; cursor: pointer; transition: all 0.3s; }
            .clear-cart:hover { border-color: #d81b60; color: #d81b60; }
            .cart-items { background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); padding: 20px; margin-bottom: 30px; }
            
            .cart-item {
                display: flex;
                align-items: center;
                gap: 20px;
                padding: 20px;
                border-bottom: 1px solid #eee;
                animation: slideIn 0.3s;
            }
            .cart-item:last-child { border-bottom: none; }
            .cart-item-image { 
                width: 100px; 
                height: 100px; 
                object-fit: cover; 
                border-radius: 10px;
                border: 2px solid #ffb6c1;
                transition: transform 0.3s;
            }
            .cart-item-image:hover { transform: scale(1.05); }
            .cart-item-info { flex: 2; }
            .cart-item-title { font-size: 18px; margin-bottom: 5px; }
            .cart-item-price { color: #d81b60; font-weight: 600; }
            
            .cart-item-quantity {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
            }
            .quantity-btn {
                width: 30px; height: 30px;
                border: 1px solid #ddd; background: white;
                border-radius: 5px; cursor: pointer;
                transition: all 0.3s;
            }
            .quantity-btn:hover { background: #ffb6c1; border-color: #d81b60; }
            .quantity-value { font-size: 16px; font-weight: 600; min-width: 30px; text-align: center; }
            
            .cart-item-total {
                font-size: 18px; font-weight: 700;
                color: #d81b60; min-width: 100px;
                text-align: right; flex: 1;
            }
            .cart-item-remove {
                background: none; border: none;
                color: #999; cursor: pointer;
                transition: all 0.3s; padding: 10px;
            }
            .cart-item-remove:hover { color: #d81b60; transform: scale(1.1); }

            .cart-summary {
                background: white; border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.05); padding: 30px;
            }
            .summary-title { font-size: 24px; color: #333; margin-bottom: 20px; }
            .summary-row {
                display: flex; justify-content: space-between;
                margin-bottom: 15px; padding: 10px 0;
                border-bottom: 1px solid #eee;
            }
            .summary-row.total {
                font-size: 20px; font-weight: 700;
                color: #d81b60; border-bottom: none;
            }
            .delivery-status { color: #ff9800; font-size: 14px; margin-bottom: 10px; }
            .checkout-btn {
                width: 100%; background: #d81b60; color: white;
                border: none; padding: 15px; font-size: 18px;
                font-weight: 600; border-radius: 5px; cursor: pointer;
                transition: all 0.3s; margin-top: 20px;
            }
            .checkout-btn:hover {
                background: #c2185b; transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(216,27,96,0.3);
            }

            .empty-cart {
                text-align: center; padding: 60px;
                background: white; border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            }
            .empty-cart h2 { color: #333; margin-bottom: 10px; }
            .empty-cart p { color: #999; }

            @media (max-width: 768px) {
                .cart-item { flex-wrap: wrap; }
                .cart-item-image { width: 80px; height: 80px; }
                .cart-item-info { flex: 1 1 100%; }
                .cart-item-quantity { flex: 0 0 auto; }
                .cart-item-total { text-align: left; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Инициализация корзины
const cart = new ShoppingCart();

// Глобальная функция для добавления в корзину
window.addToCart = function(productId, productName, productPrice, productImage) {
    cart.addItem({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
    });
};

// Функция для рендеринга страницы корзины
window.renderCartPage = function() {
    const cartContainer = document.getElementById('cart-items-container');
    if (!cartContainer) return;

    if (cart.items.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart" style="font-size: 80px; color: #ddd; margin-bottom: 20px;"></i>
                <h2>Корзина пуста</h2>
                <p>Добавьте товары из каталога, чтобы сделать заказ</p>
                <a href="catalog.html" class="btn" style="margin-top: 20px;">Перейти в каталог</a>
            </div>
        `;
        document.querySelector('.cart-summary').style.display = 'none';
        return;
    }

    let html = '';
    cart.items.forEach(item => {
        html += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" 
                     onerror="this.src='https://via.placeholder.com/100x100/FFB6C1/000?text=${encodeURIComponent(item.name)}'">
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-price">${item.price.toLocaleString()} ₽</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-total">
                    ${(item.price * item.quantity).toLocaleString()} ₽
                </div>
                <button class="cart-item-remove" onclick="cart.removeItem('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    cartContainer.innerHTML = html;
    
    document.getElementById('cart-subtotal').textContent = cart.getTotalPrice().toLocaleString() + ' ₽';
    
    if (cart.isFreeDelivery()) {
        document.getElementById('cart-delivery').textContent = '0 ₽';
        document.getElementById('delivery-status').innerHTML = '🚚 Бесплатная доставка';
    } else {
        document.getElementById('cart-delivery').textContent = cart.deliveryCost.toLocaleString() + ' ₽';
        const remaining = cart.freeDeliveryThreshold - cart.getTotalPrice();
        document.getElementById('delivery-status').innerHTML = 
            `🚚 До бесплатной доставки осталось ${remaining.toLocaleString()} ₽`;
    }
    
    document.getElementById('cart-total-sum').textContent = cart.getFinalPrice().toLocaleString() + ' ₽';
    document.querySelector('.cart-summary').style.display = 'block';
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
    }

    // Обработчики для кнопок покупки
    document.querySelectorAll('.btn-buy, .btn-buy-small').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const productCard = this.closest('.product-info') || this.closest('.catalog-item');
            if (!productCard) return;

            const productId = window.location.pathname.split('/').pop() || 'product';
            const productName = productCard.querySelector('.product-title, h3')?.innerText || 'Товар';
            const productPriceText = productCard.querySelector('.current-price, .product-price')?.innerText || '0';
            const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ''));
            
            // Получаем изображение товара
            let productImage = productCard.querySelector('img')?.src || '';
            
            // Если изображения нет, используем заглушку
            if (!productImage) {
                productImage = cart.getDefaultImage(productId);
            }

            addToCart(productId, productName, productPrice, productImage);
            
            const originalText = this.innerHTML;
            this.innerHTML = '✓ Добавлено';
            this.style.backgroundColor = '#4caf50';
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = '#d81b60';
            }, 1500);
        });
    });
});