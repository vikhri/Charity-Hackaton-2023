import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyBf87YKzUCb2LJhxV1_SZKFtF9YvKV5YAg",
    authDomain: "slider-game-database.firebaseapp.com",
    databaseURL: "https://slider-game-database-default-rtdb.firebaseio.com",
    projectId: "slider-game-database",
    storageBucket: "slider-game-database.appspot.com",
    messagingSenderId: "99994989759",
    appId: "1:99994989759:web:acb79d25a1d12fefea420a"
};

firebase.initializeApp(firebaseConfig);
const usersDataDB = firebase.database().ref('usersData');

// Логика приложения в функции app
// Был бы рад, если бы кто-то разнёс месиво внутри по MVC
const app = () => {
  // Стейт конкретной сессии
  const state = {
    playerName: null,
    stepsCount: null,
    timePassed: null,
  };

    // Получение списка пользователей из БД
  const getUsersList = () => {
    return new Promise((resolve, reject) => {
      const usersList = [];
      usersDataDB.once('value').then(function(snapshot) {
        const usersData = snapshot.val();
        for (const userID in usersData) {
          usersList.push(usersData[userID].playerName);
        }
        resolve(usersList);
      }).catch((error) => {
        reject(error);
      });
    });
  };

    // Создание элемента-лидерборда
  const createLeaderboard = () => {
    const ulEl = document.createElement('ul');
    ulEl.classList.add('ul-el', 'user-list');
    getUsersList().then((usersList) => {
      usersList.forEach((userName) => {
        const liEl = document.createElement('li');
        liEl.classList.add('li-el', 'user-list');
        liEl.textContent = userName;
        ulEl.appendChild(liEl);
      });
    });
    return ulEl;
  };

  // Внесение имени игрока
  state.playerName = prompt('Как вас зовут?');
  
  // Инициирующий рендер
  const initRender = (state) => {
    document.querySelector('#player-name').textContent = `Ваше имя: ${state.playerName ?? 'Аноним'}`;
    document.querySelector('#leaderboard').appendChild(createLeaderboard());
    document.addEventListener("DOMContentLoaded", function () {
      let startDate = new Date();
      const updateTimer = () => {
        const currentDate = new Date();
        const passedSeconds = Math.floor((currentDate - startDate) / 1000);
        const formattedTime = `${Math.floor(passedSeconds / 60)}:${(passedSeconds % 60) < 10 ? '0' : ''}${passedSeconds % 60}`;
        state.timePassed = formattedTime;
        render(state);
      }
      setInterval(updateTimer, 1000);
    });
    document.querySelector('#start-game-button').addEventListener('click', (e) => {
      alert('Данные отправлены!');
      const newData = usersDataDB.push();
      newData.set(state);
    });
  };
  initRender(state);

  // Рендер, регулярно обновляющий вью
  const render = (state) => {
    document.querySelector('.timer').textContent = state.timePassed;
  };

};
app();

export default app;