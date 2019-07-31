import { Component, OnInit } from '@angular/core';
import { GadgetService } from '../gadget.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  head: string;
  accessPoint: string;
  schoolInfo: any;
  loading: boolean;
  error: any;

  langs = ['英文', '中文', '日文'];

  opened : boolean;
  events = [];

  constructor(
    private gadget: GadgetService) {
  }

  async ngOnInit() {

    this.head = '英文口說練習，請按左邊「開始練習」按鈕開始';

    // try {
    //   this.loading = true;

    //   // 取得 contract 連線。
    //   const contract = await this.gadget.getContract('basic.public');

    //   this.accessPoint = contract.getAccessPoint;

    //   // 呼叫 service。
    //   this.schoolInfo = await contract.send('beta.GetSystemConfig', {
    //     Name: '學校資訊'
    //   });

    // } catch (err) {
    //   this.error = err;
    // } finally {
    //   this.loading = false;
    // }
    
  }
}
