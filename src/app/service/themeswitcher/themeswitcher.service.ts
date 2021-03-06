import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomController } from '@ionic/angular';
import * as $ from "jquery";

interface Theme {
  name: string;
  styles: ThemeStyle[];
  class: ThemeClass[]
}

interface ThemeStyle {
  themeVariable: string;
  value: string;
}

interface ThemeClass {
  name: string;
  value: string[];
}

@Injectable({
  providedIn: 'root'
})

export class ThemeswitcherService {

  private themes: Theme[] = [];
  private currentTheme: number = 0;

  constructor(
    private domCtrl: DomController,
    @Inject(DOCUMENT) private document
  ) {

    this.themes = [
      {
        name: 'day',
        styles: [
          { themeVariable: '--ion-color-primary', value: '#f8383a' },
          { themeVariable: '--ion-color-primary-rgb', value: '248,56,58' },
          { themeVariable: '--ion-color-primary-contrast', value: '#ffffff' },
          { themeVariable: '--ion-color-primary-contrast-rgb', value: '255,255,255' },
          { themeVariable: '--ion-color-primary-shade', value: '#da3133' },
          { themeVariable: '--ion-color-primary-tint', value: '#f94c4e' },
          { themeVariable: '--ion-item-ios-background-color', value: '#ffffff' },
          { themeVariable: '--ion-item-md-background-color', value: '#ffffff' },
          { themeVariable: '--ion-tabbar-background-color', value: '#fff' },
          { themeVariable: '--ion-tabbar-ios-text-color-active', value: '#000000' },
          { themeVariable: '--ion-tabbar-md-text-color-active', value: '#000000' },
          { themeVariable: '--ion-background-color', value: '#f94c4e' }
        ],
        class: []
      },
      {
        name: 'night',
        styles: [
          { themeVariable: '--ion-color-primary', value: '#222428' },
          { themeVariable: '--ion-color-primary-rgb', value: '34,34,34' },
          { themeVariable: '--ion-color-primary-contrast', value: '#ffffff' },
          { themeVariable: '--ion-color-primary-contrast-rgb', value: '255,255,255' },
          { themeVariable: '--ion-color-primary-shade', value: '#1e2023' },
          { themeVariable: '--ion-color-primary-tint', value: '#383a3e' },
          { themeVariable: '--ion-item-ios-background-color', value: '#717171' },
          { themeVariable: '--ion-item-md-background-color', value: '#717171' },
          { themeVariable: '--ion-tabbar-background-color', value: '#222428' },
          { themeVariable: '--ion-tabbar-ios-text-color-active', value: '#ffffff' },
          { themeVariable: '--ion-tabbar-md-text-color-active', value: '#ffffff' },
          { themeVariable: '--ion-background-color', value: '#383838' },
        ],
        class: [
          {
            name: 'fundo-aplicativo',
            value: ['background-color:blue!important', 'color:red']
          }
        ]
      }
    ]



  }

  cycleTheme(): void {

    if (this.themes.length > this.currentTheme + 1) {
      this.currentTheme++;
    } else {
      this.currentTheme = 0;
    }

    this.setTheme(this.themes[this.currentTheme].name);

  }

  setTheme(name): void {

    let theme = this.themes.find(theme => theme.name === name);
    if (typeof (theme) === 'undefined') {
      return;
    }

    this.domCtrl.write(() => {
      theme.styles.forEach(style => {
        document.documentElement.style.setProperty(style.themeVariable, style.value);
      });
      theme.class.forEach(classe => {

        let classStyle = document.documentElement.querySelectorAll('.' + classe.name);
        let estilo = '';

        classe.value.forEach(value => {
          let style = value.split(':');
          estilo += "'" + style[0] + "':" + "'" + style[1] + "',"
        })


      });

    });

  }

}
