import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
// var config = {
//   apiKey: "AIzaSyDsId1IO77YJD3zpgik0pYpVx5RudtA6fY",
//   authDomain: "ionic-messenger-20fe9.firebaseapp.com",
//   databaseURL: "https://ionic-messenger-20fe9.firebaseio.com",
//   projectId: "ionic-messenger-20fe9",
//   storageBucket: "ionic-messenger-20fe9.appspot.com",
//   messagingSenderId: "143374214715"
// };
// firebase.initializeApp(config);
// const messaging = firebase.messaging();
