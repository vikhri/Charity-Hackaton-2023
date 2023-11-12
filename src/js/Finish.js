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

const sendUserData = (state) => {
    const newData = usersDataDB.push();
    newData.set(state);
};

export default sendUserData;