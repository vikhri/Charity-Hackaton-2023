// НЕ РАБОТАЕТ
// Надо привязать асинхроннуб функцию, читвющую инфу с БД,
// к логике сортировки массива и рендера его в таблицу.

const firebaseConfig = {
    apiKey: "AIzaSyBf87YKzUCb2LJhxV1_SZKFtF9YvKV5YAg",
    authDomain: "slider-game-database.firebaseapp.com",
    databaseURL: "https://slider-game-database-default-rtdb.firebaseio.com",
    projectId: "slider-game-database",
    storageBucket: "slider-game-database.appspot.com",
    messagingSenderId: "99994989759",
    appId: "1:99994989759:web:acb79d25a1d12fefea420a"
};

const usersDataDB = firebase.database().ref('usersData');

// Функция возвращает (промис) массив с объектами, в которых хранятся данные пользователей (имя, время)
const getUsersList = () => {
  return new Promise((resolve, reject) => {
    const usersList = [];
    usersDataDB.once('value').then(function(snapshot) {
      const usersData = snapshot.val();
      for (const userID in usersData) {
        usersList.push({ name: usersData[userID].name, time: usersData[userID].time });
      }
      resolve(usersList);
    }).catch((error) => {
      reject(error);
    });
  })
};

// Вспомогательная функция для сортировки
const getTimeInSeconds = (time) => {
  const [minutes, seconds] = time.split(':').map(Number);
  return minutes * 60 + seconds;
}

// Сортировка массива пользователей по времени
const sortedUsers = usersData.sort((a, b) => {
  const timeA = getTimeInSeconds(a.time);
  const timeB = getTimeInSeconds(b.time);
  return timeA - timeB;
});

  // Отображение первых семи элементов в таблице
const tableBody = document.querySelector('#leaderboard-table');
for (let i = 0; i < 7 && i < sortedUsers.length; i++) {
  const user = sortedUsers[i];
  const row = tableBody.insertRow();
  row.insertCell(0).textContent = i + 1;
  row.insertCell(1).textContent = user.name;
  row.insertCell(2).textContent = user.time;
}




  /*
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
  */