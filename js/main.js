const mMenuToggle = document.querySelector(".mobile-menu-toggle");
const menu = document.querySelector(".mobile-menu");

const openMenu = (event) => { // Функция открыванию меню
  menu.classList.add("is-open"); // вешает класс is-open
  mMenuToggle.classList.add("close-menu");
  document.body.style.overflow = "hidden"; //запрещает прокрутку сайта под меню
};

const closeMenu = (event) => { // Функция закрытия меню
  menu.classList.remove("is-open"); // убирает класс is-open
  mMenuToggle.classList.remove("close-menu");
  document.body.style.overflow = ""; //возвращает прокрутку сайта под меню
};


mMenuToggle.addEventListener("click", (event) => {
  event.preventDefault();
  menu.classList.contains('is-open') ? closeMenu() : openMenu();
});




/* Создаем префикс +7, даже если вводят 8 или 9 */
const prefixNumber = (str) => {
  /* если вводят семерку, добавляем ей скобку */
  if (str === "7") {
    return "7 (";
  }
  /* если вводят восьмерку, ставим вместо нее +7 ( */
  if (str === "8") {
    return "+7 (";
  }
  /* если пишут девятку, заменяем на +7 (9  */
  if (str === "9") {
    return "7 (9";
  }
  /* в других случаях просто 7 (  */
  return "7 (";
};
 /* профикс в любом раскладе будет +7 () */

// ======================================
/* Ловим события ввода в любом поле */
document.addEventListener("input", (e) => {
  /* Проверяем, что это поле имеет класс phone-mask */
  if (e.target.classList.contains("phone-mask")) {
    /* поле с телефоном помещаем в переменную input */
    const input = e.target;
    /* вставляем плюс в начале номера */
    const value = input.value.replace(/\D+/g, "");
    /* длинна номера 11 символов */
    const numberLength = 11;

    /* Создаем переменную, куда будем записывать номер */
    let result;
    /* Если пользователь ввел 8... */
    if (input.value.includes("+8") || input.value[0] === "8") {
      /* Стираем восьмерку */
      result = "";
    } else {
      /* Оставляем плюсик в поле */
      result = "+";
    }

    //
    /* Запускаем цикл, где переберем каждую цифру от 0 до 11 */
    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 0:
          /* в самом начале ставим префикс +7 ( */
          result += prefixNumber(value[i]);
          continue;
        case 4:
          /* добавляем после "+7 (" круглую скобку ")" */
          result += ") ";
          break;
        case 7:
          /* дефис после 7 символа */
          result += "-";
          break;
        case 9:
          /* еще дефис  */
          result += "-";
          break;
        default:
          break;
      }
      /* на каждом шаге цикла добавляем новую цифру к номеру */
      result += value[i];
    }
    /* итог: номер в формате +7 (999) 123-45-67 */
    input.value = result;
  }
});





// let input = document.querySelector('.input');
// let label = document.querySelector('.input-label[for="user-phone"]');
// input.addEventListener('focus', () => {
//   label.style.visibility = 'hidden';
// });
// input.addEventListener('blur', () => {
//   label.style.visibility = 'visible';
// });


const modal = document.querySelector('.modal');
const modalDialog = document.querySelector('.modal-dialog');
const modalClose = document.querySelector('.modal-close');

document.addEventListener('click', (event) => {
  if (
    event.target.dataset.toggle == 'modal' || 
    event.target.parentNode.dataset.toggle == 'modal' ||
    (!event.composedPath().includes(modalDialog) &&
    modal.classList.contains('is-open'))

  ) {
    event.preventDefault();
    modal.classList.toggle('is-open');
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key == 'Escape' && modal.classList.contains('is-open')) {
    modal.classList.toggle('is-open');
  };
});
modalClose.addEventListener('click', (event) => {
  event.preventDefault();
  modal.classList.remove("is-open");
});





function sendFormHandler(form) {
  const formData = new FormData(form); //данные из нашей формы
  const ajaxSend = (formData) => {
    fetch(form.getAttribute("action"), {
      method: form.getAttribute("method"),
      body: formData,
  }).then((response) => {
      if (response.ok) {
        form.reset();
        alert("Форма отправлена!");


      } else {
         alert(response.statusText);
      }
  });
    };
    ajaxSend(formData);
}




const form1 = document.querySelector('.form1');
const form1Validation = new JustValidate(form1, {
    errorFieldCssClass: "is-invalid",
});
form1Validation
    .addField("[name=userphone]", [
        {
            rule: 'required',
            errorMessage: "Введите номер",
        },
    ])
    .addField("[name=send]", [
        {
            rule: 'required',
            errorMessage: "поставьте флажок"
        },
    ])
    .onSuccess((event) => {
        sendFormHandler(event.target)
    });


const form2 = document.querySelector('.form2');
const form2Validation = new JustValidate(form2, {
    errorFieldCssClass: "is-invalid",
});
form2Validation
  .addField("[name=userphone]", [
    {
      rule: 'required',
      errorMessage: "Введите номер",
    },
])
  .addField("[name=send]", [
    {
      rule: 'required',
      errorMessage: "поставьте флажок"
    },
])
  .onSuccess((event) => {
      sendFormHandler(event.target)
});


const form3 = document.querySelector('.form3');
const form3Validation = new JustValidate(form3, {
    errorFieldCssClass: "is-invalid",
});
form3Validation
  .addField('[name=useremail]', [
  {
    rule: 'required',
    errorMessage: 'Введите Email',
  },
  {
    rule: 'email',
    errorMessage: 'Неверное значение',
  },
  ])
  .onSuccess((event) => {
    sendFormHandler(event.target)
});




















