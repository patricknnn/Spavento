import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { User } from '../models/user';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userState: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private swalService: SwalService
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  signIn(email, password): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user).then(() => {
          this.router.navigate(['admin/dashboard']);
        });
      }).catch((error) => {
        this.swalService.errorSwal(error.message);
      });
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  signUp(email, password): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user);
      }).catch((error) => {
        this.swalService.errorSwal(error.message);
      })
  }

  sendVerificationMail(): Promise<void> {
    return this.afAuth.currentUser.then((u) => {
      u.sendEmailVerification();
    }).then(() => {
      this.swalService.successSwal("Verificatie email verstuurd");
    });
  }

  forgotPassword(passwordResetEmail): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.swalService.successSwal("Wachtwoord reset email verstuurd, bekijk je mailbox.");
      }).catch((error) => {
        this.swalService.errorSwal(error.message);
      });
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null) ? true : false;
  }

  setUserData(user): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userState, {
      merge: true
    });
  }

  updateProfile(displayName: string, photoURL: string): Promise<any> {
    return this.afAuth.currentUser.then((user) => {
      user.updateProfile({
        displayName: displayName,
        photoURL: photoURL
      })
    })
  };

}
