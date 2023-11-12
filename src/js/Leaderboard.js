const getUsersList = () => {
  return new Promise((resolve, reject) => {
    const usersList = [];
    const usersDataDB = firebase.database().ref('usersData');
    usersDataDB.once('value').then(function (snapshot) {
      const usersData = snapshot.val();
      for (const userID in usersData) {
        usersList.push({ name: usersData[userID].name, time: usersData[userID].time });
      }
      resolve(usersList);
    }).catch((error) => {
      reject(error);
    });
  });
};

const renderTable = (sortedUsers) => {
  const tableBody = document.querySelector('#tbody');
  tableBody.innerHTML = '';
  for (let i = 0; i < 7 && i < sortedUsers.length; i++) {
    const user = sortedUsers[i];
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = i + 1;
    row.insertCell(1).textContent = user.name;
    row.insertCell(2).textContent = user.time;
  }
};

const leaderboardController = () => {
  getUsersList()
    .then(usersData => {
      const sortedUsers = usersData.sort((a, b) => {
        const timeA = getTimeInSeconds(a.time);
        const timeB = getTimeInSeconds(b.time);
        return timeA - timeB;
      });
      renderTable(sortedUsers);
    })
    .catch(error => {
      console.error("Error getting users list:", error);
    });
};

const getTimeInSeconds = (time) => {
  const [minutes, seconds] = time.split(':').map(Number);
  return minutes * 60 + seconds;
};

export default leaderboardController;