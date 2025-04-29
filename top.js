// Функция для вычисления номера текущей учебной недели
function calculateCurrentWeek() {
    // Укажите дату начала 1-й учебной недели (понедельник)
    const firstWeekDate = new Date('2025-02-09'); // Пример: 10 февраля 2025
    
    const now = new Date();
    
    // Убедимся, что расчет идет с понедельника
    const dayOfWeek = now.getDay(); // 0 - воскресенье, 1 - понедельник...
    const calcDate = new Date(now);
    calcDate.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    calcDate.setHours(0, 0, 0, 0);
    
    // Разница в миллисекундах
    const diffTime = calcDate - firstWeekDate;
    
    // Разница в неделях (1 неделя = 7 дней)
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    
    // Текущая неделя = 1 (начальная) + прошедшие недели
    return 1 + diffWeeks;
  }
  
  // Функция для вычисления дней до лета (1 июня)
  function calculateDaysToSummer() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Дата начала лета (1 июня текущего года)
    let summerStart = new Date(currentYear, 5, 1); // 5 = июнь (месяцы 0-11)
    
    // Если лето уже прошло, берем следующий год
    if (now > summerStart) {
      summerStart = new Date(currentYear + 1, 5, 1);
    }
    
    // Разница в миллисекундах
    const diffTime = summerStart - now;
    
    // Разница в днях (округляем вверх)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  
  // Обновляем данные на странице
  function updateData() {
    document.getElementById('currentWeek').textContent = calculateCurrentWeek();
    document.getElementById('daysToSummer').textContent = calculateDaysToSummer();
  }
  
  // Инициализация при загрузке страницы
  window.onload = updateData;


//   { en: "applicant", ru: "кандидат, претендент, соискатель", transcription: "" },
//   { en: "career", ru: "карьера, профессия, профессиональная деятельность", transcription: "" },
//   { en: "competencies", ru: "профессиональные качества", transcription: "" },
//   { en: "concise", ru: "краткий (лаконичный)", transcription: "" },
//   { en: "cover letter", ru: "сопроводительное письмо", transcription: "" },
//   { en: "competitor", ru: "конкурент, соперник", transcription: "" },
//   { en: "confidence", ru: "уверенность", transcription: "" },
//   { en: "crucial", ru: "важный", transcription: "" },
//   { en: "CV (Curriculum vitae)", ru: "резюме (краткая биография)", transcription: "" },
//   { en: "employee", ru: "сотрудник", transcription: "" },
//   { en: "employer", ru: "работодатель", transcription: "" },
//   { en: "experience", ru: "опыт", transcription: "" },
//   { en: "HR (Human Resources)", ru: "отдел кадров", transcription: "" },
//   { en: "interview", ru: "собеседование", transcription: "" },
//   { en: "job description", ru: "должностные обязанности", transcription: "" },
//   { en: "key achievements", ru: "основные достижения", transcription: "" },
//   { en: "marital status", ru: "семейное положение", transcription: "" },
//   { en: "position", ru: "должность", transcription: "" },
//   { en: "recruitment", ru: "набор персонала, трудоустройство", transcription: "" },
//   { en: "salary", ru: "ежемесячная зарплата, оклад", transcription: "" },
//   { en: "to apply for a job", ru: "подавать заявление о приёме на работу", transcription: "" },
//   { en: "to be responsible for", ru: "быть ответственным за", transcription: "" },
//   { en: "to compete", ru: "конкурировать", transcription: "" },
//   { en: "to employ", ru: "нанимать", transcription: "" },
//   { en: "to fire", ru: "увольнять", transcription: "" },
//   { en: "to get a job", ru: "устроиться на работу", transcription: "" },
//   { en: "to offer", ru: "предлагать", transcription: "" },
//   { en: "to qualify", ru: "соответствовать требованиям, приобретать специальность", transcription: "" },
//   { en: "to require", ru: "требовать", transcription: "" },
//   { en: "vacancy", ru: "вакансия", transcription: "" },
  