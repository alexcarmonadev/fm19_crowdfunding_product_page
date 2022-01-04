/* ------------OVERLAY------------ */
const overlay = document.querySelector('.overlay'); // Oscurece el fondo

const overlayClose = () => {
  if (overlay.classList.contains('overlay--modal')) {
    closeModal();
  } else {
    toggleMenu();
  }
};

// close mobile menu and modals when clicking on the overlay
overlay.addEventListener('click', overlayClose);

/* ------------MOBILE MENU------------ */
const btnMenu = document.querySelector('.btn--menu'); // Boton contenedor de la hamburguesa
const btnMenuIcon = document.querySelector('.hamburger'); //Icono hamburguesa
const nav = document.querySelector('.nav-menu'); // Menu principal

const toggleMenu = () => {
  // toggle mobile nav and overlay visibility
  nav.classList.toggle('nav-menu__show');
  overlay.classList.toggle('overlay--hidden');
  document.body.classList.toggle('disable-scroll');

  // change menu button icon and aria-expanded
  if (nav.classList.contains('nav-menu__show')) {
    btnMenuIcon.src = '../assets/images/icon-close-menu.svg';
    btnMenu.setAttribute('aria-expanded', 'true');
  } else {
    btnMenuIcon.src = '../assets/images/icon-hamburger.svg';
    btnMenu.setAttribute('aria-expanded', 'false');
  }
};

btnMenu.addEventListener('click', toggleMenu);

/* ------------BOOKMARK BUTTON------------ */
const bookmark = document.querySelector('.bookmark'); // Boton redondo negro

// toggle bookmark active styles
const bookmarkProject = () => {
  bookmark.classList.toggle('bookmark--active');

  if (bookmark.classList.contains('bookmark--active')) {
    bookmark.setAttribute('aria-pressed', 'true');
  } else {
    bookmark.setAttribute('aria-pressed', 'false');
  }
};

bookmark.addEventListener('click', bookmarkProject);

/* ------------MODAL OPEN------------ */
const btnOne = document.querySelector('.s-intro__btn-one'); //Boton "Back this project"
const modal = document.getElementById('modal'); // Menu modal
const modalButton = document.querySelector('.modal-header__img'); // Cierra ventana modal "la x"

const openModal = () => {
  modal.classList.toggle('modal__show');
  overlay.classList.remove('overlay--hidden');
  overlay.classList.add('overlay--modal');
  /* overlay.classList.toggle("overlay--hidden"); */
};

btnOne.addEventListener('click', openModal);

/* ------------MODAL CLOSE------------ */
const closeModal = () => {
  modal.classList.toggle('modal__show');
  overlay.classList.toggle('overlay--hidden');
  subModels[0].style = 'display:none';
  subModels[1].style = 'display:none';
  subModels[2].style = 'display:none';
};

modalButton.addEventListener('click', closeModal);

/* ------------MODAL CARD OPEN ------------ */
const activos = document.querySelectorAll('.s-about-footer__btn'); // Botones inferiores "Select Reward"
const subModels = document.querySelectorAll('.modal-card-footer'); // Menus subModals

const toggleMenuClose = () => {
  // toggle mobile nav and overlay visibility
  nav.classList.remove('nav-menu__show');
  overlay.classList.remove('overlay--hidden');
  document.body.classList.remove('disable-scroll');
};

/* ------------SUBMODAL CARD OPEN ------------ */
activos.forEach((activo) => {
  activo.addEventListener('click', () => {
    modal.classList.toggle('modal__show');
    overlay.classList.toggle('overlay--hidden');

    if (activo == activos[0]) {
      subModels[1].style = 'display: block';
      subModels[2].style = 'display: none';
    } else if (activo == activos[1]) {
      subModels[2].style = 'display: block';
      subModels[1].style = 'display: none';
    } else {
      subModels[2].style = 'display: none';
      subModels[1].style = 'display: none';
    }
  });
});

/* ------------SUBMODAL CARD OPEN FROM RADIO INPUT ------------ */
const radioBtns = document.querySelectorAll('.modal-radio__input'); // Botones circulo del menu modal
radioBtns.forEach((radioBtn) => {
  radioBtn.addEventListener('click', () => {
    if (radioBtn == radioBtns[0]) {
      subModels[0].style = 'display: block';
      subModels[1].style = 'display: none';
      subModels[2].style = 'display: none';
      subModels[0].parentElement.classList.add('modal-card--border');
      subModels[1].parentElement.classList.remove('modal-card--border');
      subModels[2].parentElement.classList.remove('modal-card--border');
    } else if (radioBtn == radioBtns[1]) {
      subModels[1].style = 'display: block';
      subModels[0].style = 'display: none';
      subModels[2].style = 'display: none';
      subModels[1].parentElement.classList.add('modal-card--border');
      subModels[0].parentElement.classList.remove('modal-card--border');
      subModels[2].parentElement.classList.remove('modal-card--border');
    } else if (radioBtn == radioBtns[2]) {
      subModels[2].style = 'display: block';
      subModels[0].style = 'display: none';
      subModels[1].style = 'display: none';
      subModels[2].parentElement.classList.add('modal-card--border');
      subModels[0].parentElement.classList.remove('modal-card--border');
      subModels[1].parentElement.classList.remove('modal-card--border');
    } else {
      subModels[0].style = 'display: none';
      subModels[1].style = 'display: none';
      subModels[2].style = 'display: none';
      subModels[0].parentElement.classList.remove('modal-card--border');
      subModels[1].parentElement.classList.remove('modal-card--border');
      subModels[2].parentElement.classList.remove('modal-card--border');
    }
  });
});

/* ------------SUBMODAL CARD INPUT MONEY------------ */
const inputsMoney = document.querySelectorAll('.modal-card-footer__input'); // Input money from subModals
const btnsContinue = document.querySelectorAll('.modal-card__btn'); // Botón "Continue" from subModals

const thanks = document.querySelector('.thanks'); // Ventana thanks
const btnCloseThanks = document.querySelector('.thanks__link'); // Botón "Got it" para cerrar thanks

const backedTotal = document.getElementById('backed');
const backers = document.getElementById('backers');

const goal = 100000;
let totalBackend = parseInt(89914);
let totalBackers = parseInt(5007);

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/* ------------CUESTION DE NUMEROS------------ */
btnsContinue.forEach((btnContinue) => {
  btnContinue.addEventListener('click', (e) => {
    e.preventDefault();
    let parcialBackend = parseInt(btnContinue.previousElementSibling.value);

    // prevents that putting 0 or nothing results in NaN
    parcialBackend = parcialBackend || 0;

    backedTotal.innerHTML = `$${numberWithCommas(
      (totalBackend += parcialBackend)
    )}`;

    // increase total backers
    totalBackers++;
    backers.innerHTML = totalBackers;

    // calculate new percentage of goal from updated total
    const backedPorcentual = (totalBackend += parcialBackend);
    const percentageBacked = Math.floor((backedPorcentual / goal) * 100);

    // update slider width with new percentage
    const progressBar = document.querySelector('.s-stats__progress-bar');
    progressBar.style.width = `${percentageBacked}%`;

    closeModal();

    thanks.style = 'display: block';
    overlay.classList.toggle('overlay--hidden');
  });
});

/* ------------CIERRA THANKS------------ */
closeThanks = () => {
  thanks.style = 'display: none';
  overlay.classList.toggle('overlay--hidden');
};

btnCloseThanks.addEventListener('click', closeThanks);

/* ------------COUNTDOWN DAYS------------ */
const countDown = () => {
  let daysLeftElement = document.getElementById('daysLeft');
  const oneDay = 24 * 60 * 60 * 1000;
  let currentDate = Date.now();
  let endDate = Date.now() + 56 * oneDay;
  daysLeft = (endDate - currentDate) / oneDay;
  daysLeftElement.innerHTML = Math.floor(daysLeft);
};

countDown();
