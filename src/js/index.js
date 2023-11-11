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
  const usersDataDB = firebase.database().ref('userData');


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

  // Рендер данных
  const render = (state) => {
    document.querySelector('#player-name').textContent = `Ваше имя: ${state.playerName}`;
    document.querySelector('#leaderboard').appendChild(createLeaderboard());
  };

  // Где-то здесь - функция логики игры, меняющая стейт в зависимости от действий игрока
  const initGame = () => {
    state.playerName = prompt('Как вас зовут?');
    render(state);
  };
  initGame();

  // Добавление данных в БД по кнопке
document.querySelector('#save-game').addEventListener('click', (e) => {
  alert('Данные отправлены!');
  const newData = usersDataDB.push();
  newData.set(state);
});

// Получение списка пользователей из БД по кнопке
document.querySelector('#get-users').addEventListener('click', (e) => {
  usersDataDB.once('value')
    .then(function(snapshot) {
      const usersData = snapshot.val();
      for (const userID in usersData) {
        console.log(usersData[userID].playerName);
      }
    })
});