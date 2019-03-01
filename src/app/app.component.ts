import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService } from './service/database/database.service';
import { TranslateService } from '@ngx-translate/core';
import { ThemeswitcherService } from './service/themeswitcher/themeswitcher.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  public themeClass: string = 'fullcontrol';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _translate: TranslateService,
    private _theme: ThemeswitcherService
  ) {
    this._initTranslate();
    this.initializeApp();
  }

  ngOnInit() {
    this.setTema();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();

      if (window.cordova) {
        let db = new DatabaseService();
        db.createDatabase()
          .then(() => this.abrirAplicativo(this.splashScreen))
          .catch(() => this.abrirAplicativo(this.splashScreen));
      } else {
        this.splashScreen.hide();
      }

    });
  }

  abrirAplicativo(splashScreen: SplashScreen) {
    splashScreen.hide();
  }

  private _initTranslate() {
    // Set the default language for translation strings, and the current language.

    let traducao = window.localStorage.getItem('traducao');

    if (traducao == null) {
      window.localStorage.setItem('traducao', 'br');
      this._translate.setDefaultLang('br');
      this._translate.use('br');
      return;
    }

    this._translate.setDefaultLang(traducao);
    this._translate.use(traducao);
    //this.setTema('')
    window.localStorage.setItem('tema','fullcontrol');

    // this._theme.setTheme('night');

    // if (this._translate.getBrowserLang() !== undefined) {
    //   this._translate.use(this._translate.getBrowserLang());
    // }
    // else {
    //    // Set your language here
    // }

  }

  setTema() {
    let tema = window.localStorage.getItem('tema');
    require("style-loader!../theme/" + tema + ".css");
  }

}
