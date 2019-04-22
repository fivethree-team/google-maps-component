# @fivethree/google-maps

[![npm version](https://badge.fury.io/js/%40fivethree%2Fgoogle-maps.svg)](https://www.npmjs.com/@fivethree/google-maps)

!!! Work in Progress !!!

## 📦 Installation
To get started, install the package from npm. The latest version supports Ionic v4 and Angular/RX 6.

```bash
npm install @fivethree/google-maps --save

# or if you are using yarn
yarn add @fivethree/google-maps
```

then in `app.module.ts`, import the `GoogleMapsModule`:

```TS
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@fivethree/google-maps';

@NgModule({
  imports: [
    GoogleMapsModule
  ]
})
export class AppModule {}
```