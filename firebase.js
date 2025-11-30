/* Replace the placeholder values below with your real Firebase config from Project Settings -> Web App.
   Important: storageBucket must end with .appspot.com and databaseURL must be your Realtime Database URL.
   Example:
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "yourproj.firebaseapp.com",
     databaseURL: "https://yourproj-default-rtdb.firebaseio.com",
     projectId: "yourproj",
     storageBucket: "yourproj.appspot.com",
     messagingSenderId: "....",
     appId: "1:...:web:..."
   };
*/
(function(){
  // Use Firebase v8 namespace for simplicity (global 'firebase')
  var s1 = document.createElement('script'); s1.src = "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"; document.head.appendChild(s1);
  var s2 = document.createElement('script'); s2.src = "https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"; document.head.appendChild(s2);
  s2.onload = function(){
    // IMPORTANT: replace these values with your project's config
    window.firebaseConfig = {
      apiKey: "REPLACE_WITH_YOUR_API_KEY",
      authDomain: "REPLACE_WITH_AUTH_DOMAIN",
      databaseURL: "REPLACE_WITH_DATABASE_URL",
      projectId: "REPLACE_WITH_PROJECT_ID",
      storageBucket: "REPLACE_WITH_STORAGE_BUCKET",
      messagingSenderId: "REPLACE_WITH_MSG_ID",
      appId: "REPLACE_WITH_APP_ID"
    };
    firebase.initializeApp(window.firebaseConfig);
    window.db = firebase.database();
  };
})();
