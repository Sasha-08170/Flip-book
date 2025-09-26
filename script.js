document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentPage = 1; 
    const totalPages = pages.length;

    // Функция для обновления состояния книги
    function updateBook() {
        pages.forEach((page, index) => {
            const pageNum = parseInt(page.dataset.page, 10); // Указываем radix 10 для parseInt

            const isFlipped = pageNum <= currentPage;
            page.classList.toggle('flipped', isFlipped);

            // Определяем transform-origin
            // Нечетные страницы (правые) имеют transform-origin 'left'
            // Четные страницы (левые) имеют transform-origin 'right'
            page.style.transformOrigin = (pageNum % 2 !== 0) ? 'left' : 'right';

            // Управление z-index для правильного наложения
            // Страницы, которые уже перевернуты, должны быть выше
            // Страницы, которые еще не перевернуты, должны быть ниже
            page.style.zIndex = isFlipped ? (totalPages - pageNum + 1) : (totalPages - pageNum);
        });

        // Блокировка кнопок
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    // Обработчик для кнопки "Следующая"
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updateBook();
        }
    });

    // Обработчик для кнопки "Предыдущая"
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateBook();
        }
    });

    // Инициализация книги
    updateBook();
});
