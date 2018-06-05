import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase/app";
import { HttpClient } from "@angular/common/http";
import { Geolocation } from "@ionic-native/geolocation";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  displayName;
  credentials: any;
  accessToken: string;
  loc: string;
  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public afAuth: AngularFireAuth,
    private http: HttpClient
  ) {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        let lat = resp.coords.latitude.toString();
        let lng = resp.coords.longitude.toString();
        this.loc = lat + "," + lng;
        afAuth.authState.subscribe(user => {
          if (!user) {
            this.displayName = null;
            return;
          } else {
            this.displayName = user.displayName;
            this.accessToken = user.refreshToken;
            console.log(this.accessToken);
            setTimeout(this.getPlaces(this.accessToken), 2000);
            console.log(user);
          }
        });
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }

  signInWithFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
      this.credentials = res;
      this.accessToken = this.credentials.credential.accessToken;
      this.getPlaces(this.accessToken);
    });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  getPlaces(accessToken) {
    let url =
      "https://graph.facebook.com/search?type=place&access_token=" +
      accessToken +
      "&fields=name,checkins,picture&center=" +
      this.loc +
      "&distance=1000";
    console.log(url);
    this.http.get(url).subscribe(res => {
      console.log(res);
    });
  }
}
