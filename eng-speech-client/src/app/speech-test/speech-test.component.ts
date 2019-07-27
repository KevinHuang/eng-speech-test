/** 
 *  此類別呼叫 Web API 進行語音辨識。
 *  利用此特性，進行英文口語練習。
 *  參考文件：
 *      https://github.com/kamiazya/ngx-speech-recognition
 *      https://github.com/m-hassan-tariq/WebSpeechAPIAngular2
 *      https://medium.com/@glauco.godoi/how-to-allow-your-app-to-listen-your-customers-angular-web-speech-api-2e904d2915e7
*/

import { Component, OnInit } from '@angular/core';
import {
  RxSpeechRecognitionService,
  resultList,
} from '@kamiazya/ngx-speech-recognition';

@Component({
  selector: 'app-speech-test',
  templateUrl: './speech-test.component.html',
  styleUrls: ['./speech-test.component.css'],
  providers: [
    RxSpeechRecognitionService,
  ],
})
export class SpeechTestComponent implements OnInit {
  message = '';

  constructor(
    public service: RxSpeechRecognitionService
  ) { }

  ngOnInit() {
  }

  listen() {
    this.service
    .listen()
    .pipe(resultList)
    .subscribe((list: SpeechRecognitionResultList) => {
      this.message = list.item(0).item(0).transcript;
      console.log(list, this.message);
    });
  }

}
