'use strict';

window.addEventListener('load', () => {
  // Получаем все кнопки для регулирования класса active
  let btnPractica = document.querySelector('.btn-practica');
  let btnStatistica = document.querySelector('.btn-statistica');
  let btnSettings = document.querySelector('.btn-settings');
  let btnGeneral = document.querySelector('.general-btn');
  let btnGeneralCirclePosition = document.querySelector('.circle-position');
  let btnGeneralCircleCheck = document.querySelector(
    '.general-btn__circle-check'
  );
  let btnCircle = document.querySelector('.general-btn__circle');

  // ===---===---===---===
  // ===---===---===---===

  // Обработка кликов, устанавливает правила стилей кнопок меню
  menuBtnActive();

  // На входе сразу делаем кнопку Практика (там где находится пользователь) активной
  btnPractica.classList.add('btn-active');

  // Загружаем карточки с видеоконтентом
  loadTheCards();

  // Обработчик тача
  handleTouch();

  // Обработчик главной кнопки
  btnGeneral.addEventListener('click', btnGeneralActioned);

  // ===---===---===---===
  // ===---===---===---===

  // Правила назначения классов кнопкам меню
  function menuBtnActive() {
    btnPractica.addEventListener('click', () => {
      btnPractica.classList.add('btn-active');
      btnStatistica.classList.remove('btn-active');
      btnSettings.classList.remove('btn-active');
    });
    btnStatistica.addEventListener('click', () => {
      btnPractica.classList.remove('btn-active');
      btnStatistica.classList.add('btn-active');
      btnSettings.classList.remove('btn-active');
    });
    btnSettings.addEventListener('click', () => {
      btnPractica.classList.remove('btn-active');
      btnStatistica.classList.remove('btn-active');
      btnSettings.classList.add('btn-active');
    });
  }

  // Делаем обработку стилей главной кнопки при нажатии
  function btnGeneralActioned(ev) {
    // Если параметр touch, то отрабатывает как тач (без изменения класса ..position)
    if (ev == 'touch') {
      btnGeneral.classList.toggle('general-btn-active');
      btnGeneralCirclePosition.classList.toggle('circle-position-active');
      btnGeneralCircleCheck.classList.toggle(
        'general-btn__circle-check-active'
      );
    } else {
      // Если параметр click или пустая строка, то отрабатывает как клик (добавляем класс ..position-active)
      btnCircle.style.left = '';
      btnGeneral.classList.toggle('general-btn-active');
      btnGeneralCirclePosition.classList.toggle('circle-position-active');
      btnGeneralCircleCheck.classList.toggle(
        'general-btn__circle-check-active'
      );
    }
  }

  // Обработака touch события по кнопки
  function handleTouch() {
    let boxleft, // положение блока по левой стороне
      startx, // стартовая точка соприкосновения по x в блоке
      endx = 281, // конечная точка соприкосновения по x в блоке
      dist = 0, // расстояние перемещения точки
      touchobj = null; // содержимое объекта перемещения

    btnCircle.addEventListener('touchstart', handleTouchStart, false);
    btnCircle.addEventListener('touchmove', handleTouchMovie, false);
    btnCircle.addEventListener('touchend', handleTouchEnd, false);

    function handleTouchStart(e) {
      touchobj = e.changedTouches[0]; // первая точка соприкосновения для этого события
      boxleft = parseInt(window.getComputedStyle(btnCircle).left); // положение блока по левой стороне
      startx = parseInt(touchobj.clientX); // получение координаты по x точки соприкосновения
      e.preventDefault(); // отключаем реакцию элементов по умолчанию в браузере
    }

    function handleTouchMovie(e) {
      touchobj = e.changedTouches[0]; // первая точка соприкосновения для этого события
      dist = parseInt(touchobj.clientX) - startx; // подсчет расстояния перемещения
      // перемещение блока от стартовой позиции + дистанция
      // выставляем лимит, чтобы блок не выходил за пределы от startx до endx
      btnCircle.style.left =
        (boxleft + dist > endx
          ? endx
          : boxleft + dist < 2
          ? 2
          : boxleft + dist) + 'px';
      e.preventDefault();
    }

    function handleTouchEnd(e) {
      /*
        Если пользователь протащил кнопку на расстояние > половины, то дотягиваем до конца
        и кнопку переводим в активное состояние (и наоборот). Если меньше половины, то
        возвращаем кнопку в начальное положение.
        */
      if (Math.abs(dist) >= endx / 2 && dist > 0) {
        btnCircle.style.left = `${endx}px`;
        btnGeneralActioned('touch');
      }
      if (Math.abs(dist) >= endx / 2 && dist < 0) {
        btnCircle.style.left = `2px`;
        btnGeneralActioned('touch');
      }
      if (Math.abs(dist) < endx / 2 && dist > 0) {
        btnCircle.style.left = `2px`;
      }
      if (Math.abs(dist) < endx / 2 && dist < 0) {
        btnCircle.style.left = `${endx}px`;
      }
      e.preventDefault();
    }
  }

  /*
    Организовываем отображение данных (циклом)
    Данные это объект (например полученный по AJAX), которые формируют карточку.
  */
  function loadTheCards() {
    // Массив объектов данных. Сделал свой, но его можно получать по AJAX
    let cardsForBeginner = [
      {
        id: 1,
        videoLink: './static/video.png',
        text: 'Комплекс асан на баланс 12 видео',
        min: 30,
        disable: false,
      },
      {
        id: 2,
        videoLink: './static/video.png',
        text: 'Комплекс и разбор асаны: Кармасана',
        min: 20,
        disable: false,
      },
      {
        id: 3,
        videoLink: './static/video.png',
        text: 'Комплекс асан 4 видео',
        min: 15,
        disable: false,
      },
      {
        id: 4,
        videoLink: './static/video.png',
        text: 'Асаны 4 видео',
        min: 60,
        disable: true,
      },
      {
        id: 5,
        videoLink: './static/video.png',
        text: 'Круасаны 6 видео',
        min: 25,
        disable: true,
      },
      {
        id: 6,
        videoLink: './static/video.png',
        text: 'Пармезаны',
        min: 11,
        disable: true,
      },
    ];
    let cardsForRastyjka = []; // Пустой массив, чтобы отобразить не карточки, а сообщение
    let tab1 = document.querySelector('#content-tab1');
    let tab2 = document.querySelector('#content-tab2');
    let tab3 = document.querySelector('#content-tab3');

    // Массивы карточек отображаем в табах
    showListForTab(cardsForBeginner, tab1);
    showListForTab(cardsForBeginner, tab2);
    showListForTab(cardsForRastyjka, tab3);

    function showListForTab(dataList, tab) {
      // Если список не пуст, то отображаем его
      if (dataList.length > 0) {
        dataList.forEach((item, i) => {
          let disable = '';
          if (item.disable) {
            disable = ' card-disabled';
          }
          tab.innerHTML += `<div class="cards-list">
                <div class="card${disable}">                            
                <div class="card__video">
                    <img src="${item.videoLink}" alt="">
                </div>
                <div class="card__content">
                    <p>${item.text}</p>
                </div>
                <div class="card__time">
                    <p>${item.min} мин</p>
                </div>
                </div>
                </div>`;
        });
      } else {
        tab.innerHTML += `<div class="cards-list">
        <p>Видео нет</p>
        </div`;
      }
    }
  }
});
