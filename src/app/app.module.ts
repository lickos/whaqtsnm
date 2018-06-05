import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { HttpClientModule } from "@angular/common/http";
import { Geolocation } from "@ionic-native/geolocation";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";

export const firebaseConfig = {
  apiKey: "AIzaSyCba12QLFvjUpH5yDVtOUICrtJzhnQuX3U",
  authDomain: "whatsnearme-204220.firebaseapp.com",
  databaseURL: "https://whatsnearme-204220.firebaseio.com",
  projectId: "whatsnearme-204220",
  storageBucket: "whatsnearme-204220.appspot.com",
  messagingSenderId: "418998884987"
};

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [StatusBar, SplashScreen, Geolocation, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule {}
