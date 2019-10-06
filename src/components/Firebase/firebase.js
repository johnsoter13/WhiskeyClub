import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBqENN-cv1-DF0ZRPNL7nVDE43NS8Vz1HI",
    authDomain: "liquorclub-4831f.firebaseapp.com",
    databaseURL: "https://liquorclub-4831f.firebaseio.com",
    projectId: "liquorclub-4831f",
    storageBucket: "liquorclub-4831f.appspot.com",
    messagingSenderId: "606395750090",
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

    user = uid => this.db.ref(`users/${uid}`);
  
    users = () => this.db.ref('users');
}

export default Firebase;