import firebase from 'firebase';

export class AuthService {
    signup(email: string, password: string) {
        return firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);
    }

    signin(email: string, password: string) {

        return firebase.auth().signInWithEmailAndPassword(email, password);

    // Behind the scenes, send HTTP request to Firebase containing data
    // doing validation on the Firebase server, 
    // potentially sending back a success message or an error handling this.
    // In the end, this gives us a promise where we can listen to success case or a error in catch()
    }

    logout() {
        firebase.auth().signOut();
        // token will be deleted
    }

    // TODO: give me the currently authenticated user properties 
    getActiveUser() {
        return firebase.auth().currentUser;
    }
    
}