    // Все слова в одном массиве
    const allWords = [
        // Новые слова (добавлены по вашему списку)
        { en: "applicant", ru: "кандидат, претендент, соискатель", transcription: "" },
        { en: "career", ru: "карьера, профессия, профессиональная деятельность", transcription: "" },
        { en: "competencies", ru: "профессиональные качества", transcription: "" },
        { en: "concise", ru: "краткий (лаконичный)", transcription: "" },
        { en: "cover letter", ru: "сопроводительное письмо", transcription: "" },
        { en: "competitor", ru: "конкурент, соперник", transcription: "" },
        { en: "confidence", ru: "уверенность", transcription: "" },
        { en: "crucial", ru: "важный", transcription: "" },
        { en: "CV (Curriculum vitae)", ru: "резюме (краткая биография)", transcription: "" },
        { en: "employee", ru: "сотрудник", transcription: "" },
        { en: "employer", ru: "работодатель", transcription: "" },
        { en: "experience", ru: "опыт", transcription: "" },
        { en: "HR (Human Resources)", ru: "отдел кадров", transcription: "" },
        { en: "interview", ru: "собеседование", transcription: "" },
        { en: "job description", ru: "должностные обязанности", transcription: "" },
        { en: "key achievements", ru: "основные достижения", transcription: "" },
        { en: "marital status", ru: "семейное положение", transcription: "" },
        { en: "position", ru: "должность", transcription: "" },
        { en: "recruitment", ru: "набор персонала, трудоустройство", transcription: "" },
        { en: "salary", ru: "ежемесячная зарплата, оклад", transcription: "" },
        { en: "to apply for a job", ru: "подавать заявление о приёме на работу", transcription: "" },
        { en: "to be responsible for", ru: "быть ответственным за", transcription: "" },
        { en: "to compete", ru: "конкурировать", transcription: "" },
        { en: "to employ", ru: "нанимать", transcription: "" },
        { en: "to fire", ru: "увольнять", transcription: "" },
        { en: "to get a job", ru: "устроиться на работу", transcription: "" },
        { en: "to offer", ru: "предлагать", transcription: "" },
        { en: "to qualify", ru: "соответствовать требованиям, приобретать специальность", transcription: "" },
        { en: "to require", ru: "требовать", transcription: "" },
        { en: "vacancy", ru: "вакансия", transcription: "" }
    ];

    // Глобальные переменные
    let currentLanguage = 'en';
    let darkMode = false;
    let testWords = [];
    let userAnswers = [];

    // Инициализация при загрузке страницы
    document.addEventListener('DOMContentLoaded', function() {
        // Загрузка темы из localStorage
        loadTheme();
        
        // Инициализация вкладок
        initTabs();
        
        // Инициализация карточек
        renderFlashcards();
        
        // Инициализация теста
        initTest();
        
        // Обработчики событий для переключения языка
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentLanguage = this.dataset.lang;
                renderFlashcards();
            });
        });
        
        // Кнопка проверки теста
        document.getElementById('check-test').addEventListener('click', checkTest);
        
        // Кнопка нового теста
        document.getElementById('new-test').addEventListener('click', initTest);
        
        // Кнопка переключения темы
        document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    });

    // Функция загрузки темы
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            enableDarkMode();
        }
    }

    // Функция переключения темы
    function toggleTheme() {
        if (darkMode) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        document.getElementById('themeIcon').textContent = '☀️';
        document.getElementById('themeText').textContent = 'Светлая';
        darkMode = true;
        localStorage.setItem('theme', 'dark');
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        document.getElementById('themeIcon').textContent = '🌙';
        document.getElementById('themeText').textContent = 'Тёмная';
        darkMode = false;
        localStorage.setItem('theme', 'light');
    }

    // Функция инициализации вкладок
    function initTabs() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Убираем активный класс у всех кнопок и вкладок
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
                
                // Добавляем активный класс текущей кнопке и вкладке
                this.classList.add('active');
                const tabId = this.dataset.tab;
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Функция отрисовки карточек
    function renderFlashcards() {
        const container = document.getElementById('flashcards-container');
        container.innerHTML = '';
        
        // Создаем карточки для каждого слова
        allWords.forEach(word => {
            const card = document.createElement('div');
            card.className = 'flashcard';
            card.innerHTML = `
                <div class="flashcard-inner">
                    <div class="flashcard-front">
                        <div class="word">${currentLanguage === 'en' ? word.en : word.ru}</div>
                        <div class="transcription">${word.transcription}</div>
                        <div class="translation">${currentLanguage === 'en' ? "Нажмите, чтобы увидеть перевод" : "Click to see in English"}</div>
                    </div>
                    <div class="flashcard-back">
                        <div class="word">${currentLanguage === 'en' ? word.ru : word.en}</div>
                        <div class="transcription">${word.transcription}</div>
                        <div class="translation">${currentLanguage === 'en' ? "Перевод" : "English"}</div>
                    </div>
                </div>
            `;
            
            // Добавляем обработчик клика для переворота карточки
            card.addEventListener('click', function() {
                this.classList.toggle('flipped');
            });
            
            container.appendChild(card);
        });
    }

    // Функция инициализации теста
    function initTest() {
        const container = document.getElementById('test-questions');
        container.innerHTML = '';
        userAnswers = [];
        
        // Перемешиваем слова
        testWords = shuffleArray([...allWords]);
        
        // Ограничиваем количество вопросов
        testWords = testWords.slice(0, 10);
        
        // Создаем вопросы
        testWords.forEach((word, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'test-question';
            questionDiv.innerHTML = `
                <p>${index + 1}. Как переводится "${word.en}"?</p>
                <div class="test-options" id="options-${index}"></div>
            `;
            container.appendChild(questionDiv);
            
            // Создаем варианты ответов
            const optionsContainer = document.getElementById(`options-${index}`);
            
            // Получаем 3 случайных неправильных варианта
            const wrongOptions = shuffleArray(allWords
                .filter(w => w.ru !== word.ru)
                .map(w => w.ru))
                .slice(0, 3);
            
            // Добавляем правильный вариант
            const options = shuffleArray([...wrongOptions, word.ru]);
            
            // Создаем кнопки вариантов
            options.forEach(option => {
                const optionBtn = document.createElement('div');
                optionBtn.className = 'test-option';
                optionBtn.textContent = option;
                optionBtn.dataset.index = index;
                optionBtn.dataset.option = option;
                optionBtn.addEventListener('click', function() {
                    selectTestOption(this, index, option === word.ru);
                });
                optionsContainer.appendChild(optionBtn);
            });
        });
        
        // Сбрасываем прогресс
        document.getElementById('test-progress').style.width = '0%';
        document.getElementById('test-result').classList.add('hidden');
    }

    // Функция выбора варианта в тесте
    function selectTestOption(element, questionIndex, isCorrect) {
        // Снимаем выделение с других вариантов в этом вопросе
        const options = document.querySelectorAll(`#options-${questionIndex} .test-option`);
        options.forEach(opt => {
            opt.classList.remove('correct', 'incorrect', 'selected');
        });
        
        // Добавляем классы в зависимости от правильности ответа
        if (isCorrect) {
            element.classList.add('correct');
        } else {
            element.classList.add('incorrect');
            // Находим и подсвечиваем правильный ответ
            options.forEach(opt => {
                if (opt.dataset.option === testWords[questionIndex].ru) {
                    opt.classList.add('correct');
                }
            });
        }
        
        element.classList.add('selected');
        
        // Сохраняем ответ пользователя
        userAnswers[questionIndex] = {
            isCorrect,
            userAnswer: element.dataset.option,
            correctAnswer: testWords[questionIndex].ru
        };
        
        // Обновляем прогресс
        updateTestProgress();
    }

    // Функция обновления прогресса теста
    function updateTestProgress() {
        const answered = userAnswers.filter(a => a !== undefined).length;
        const total = testWords.length;
        const progress = (answered / total) * 100;
        document.getElementById('test-progress').style.width = `${progress}%`;
    }

    // Функция проверки теста
    function checkTest() {
        const total = testWords.length;
        const correct = userAnswers.filter(a => a && a.isCorrect).length;
        const percentage = Math.round((correct / total) * 100);
        
        const resultDiv = document.getElementById('test-result');
        resultDiv.textContent = `Результат: ${correct} из ${total} (${percentage}%)`;
        resultDiv.className = percentage >= 70 ? 'test-result good' : 'test-result bad';
        resultDiv.classList.remove('hidden');
    }

    // Вспомогательная функция для перемешивания массива
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }