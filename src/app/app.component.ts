import { Component } from '@angular/core';
import { CurrencyapidataService } from './currencyapidata.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'currencycalculator';
  currjson: any = [];

  base = 'USD';
  cont2 = 'USD';
  result: string = '1'


  // Array to store conversion history
  conversionHistory: { base: string; target: string; result: string }[] = [];


  changebase(a:string){
    this.base = a;
    // console.log(this.base)
  }

  tocountry(b:string){
    this.cont2 = b;
    // console.log(this.cont2)
  }

  constructor(private currency: CurrencyapidataService) {}

  convert() {
    // console.log(this.base)
    // console.log(this.cont2)
    this.currency.getcurrencydata(this.base).subscribe(data => {
        // console.log(data);
      this.currjson = JSON.stringify(data);
      // console.log(this.currjson);
      this.currjson = JSON.parse(this.currjson);
      console.log(this.currjson);

      // this.result = this.currjson.rates.INR

      if (this.cont2 == 'USD'){
        this.result = this.currjson.rates.USD
      }

      if (this.cont2 == 'INR'){
        this.result = this.currjson.rates.INR
      }

      if (this.cont2 == 'EUR'){
        this.result = this.currjson.rates.EUR
      }


      // Add the conversion to the history
      this.conversionHistory.unshift({
        base: this.base,
        target: this.cont2,
        result: this.result,
      });

      // Keep only the last 3 conversions in the history
      if (this.conversionHistory.length > 3) {
        this.conversionHistory.pop();
      }


    })



  }
}
