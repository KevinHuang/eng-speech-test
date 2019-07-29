/** 
 *  此類別呼叫 Web API 進行語音辨識。
 *  利用此特性，進行英文口語練習。
 *  參考文件：
 *      https://github.com/kamiazya/ngx-speech-recognition
 *      https://github.com/m-hassan-tariq/WebSpeechAPIAngular2
 *      https://medium.com/@glauco.godoi/how-to-allow-your-app-to-listen-your-customers-angular-web-speech-api-2e904d2915e7
*/

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  RxSpeechRecognitionService,
  SpeechRecognitionLang,
  SpeechRecognitionMaxAlternatives,
  SpeechRecognitionGrammars,
  resultList,
} from '@kamiazya/ngx-speech-recognition';
import { getTreeMissingMatchingNodeDefError } from '@angular/cdk/tree';

@Component({
  selector: 'app-speech-test',
  templateUrl: './speech-test.component.html',
  styleUrls: ['./speech-test.component.css'],
  providers: [
    {
      provide: SpeechRecognitionLang,
      useValue: 'en-US',
    },
    {
      provide: SpeechRecognitionMaxAlternatives,
      useValue: 1,
    },
    RxSpeechRecognitionService,
  ],
})
export class SpeechTestComponent implements OnInit {
  message = '';
  currentQ: any ;         // 目前的題目
  // currentQIndex = 0;
  // currentQContent = '';
  isRecording = false;    // 是否正在錄音中
  isAnswerRight = false;  // 是否答對
  answerStatus: number = AnswerStatus.noAnswer;

  questions = [
    { index: 1, content: "Apple", ans_status: AnswerStatus.noAnswer },
    { index: 2, content: "self-confidence", ans_status: AnswerStatus.noAnswer },
    { index: 3, content: "Learn", ans_status: AnswerStatus.noAnswer },
    { index: 4, content: "Free", ans_status: AnswerStatus.noAnswer },
    { index: 5, content: "Forum", ans_status: AnswerStatus.noAnswer },
    { index: 6, content: "News", ans_status: AnswerStatus.noAnswer },
    { index: 7, content: "Search", ans_status: AnswerStatus.noAnswer },
    { index: 8, content: "Tutorial", ans_status: AnswerStatus.noAnswer },
    { index: 9, content: "Command", ans_status: AnswerStatus.noAnswer },
    { index: 10, content: "Animation", ans_status: AnswerStatus.noAnswer }
  ];

  constructor(
    public service: RxSpeechRecognitionService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.currentQ = this.questions[0];
    this.showQ(this.currentQ);
  }

  listen() {
    this.service
      .listen()
      .pipe(resultList)
      .subscribe((list: SpeechRecognitionResultList) => {
        this.message = list.item(0).item(0).transcript;
        if (list.item(0).isFinal) {
          this.isRecording = false;
          this.checkAnswer();
        }
        console.log(list, this.message);
      });
  }

  showQ(q) {
    this.currentQ = q ;
    this.message = '';         // reset ...
    // this.currentQIndex = q.index;
    // this.currentQContent = q.content;
    // this.answerStatus = AnswerStatus.noAnswer;
    // this.isAnswerRight = false;
    console.log(`showQ : ${JSON.stringify(q)}`);
    console.log(`currentQContent : ${this.currentQ.content}`);
  }

  getCssClass(q) {
    let className = 'noAnswer';
    if (q.ans_status === AnswerStatus.answerRight) {
      className = "right";
    }
    else if (q.ans_status === AnswerStatus.answerWrong) {
      className = "wrong";
    }

    // if (q.index % 3 === 1) {
    //   className = 'right';
    // }
    // else if (q.index % 3 === 2) {
    //   className = 'wrong';
    // }

    if (q.index === this.currentQ.index) {
      className = `${className} current`;
    }
    return className;
  }

  startRecording(q) {
    this.isRecording = true;
    this.listen();
  }

  stopRecording(q) {
    this.isRecording = false;
  }

  checkAnswer() {
    console.log(`${this.message.toLowerCase()} vs ${this.currentQ.content.toLowerCase()}`);
    this.currentQ.stud_ans = this.message ;
    const isAnswerRight: boolean = (this.message.toLowerCase() === this.currentQ.content.replace("-"," ").toLowerCase());
    this.answerStatus = isAnswerRight ? AnswerStatus.answerRight : AnswerStatus.answerWrong;
    this.currentQ.ans_status = this.answerStatus ;

    if (isAnswerRight) {
      console.log("go to next question after 3 secs later ....");
      setTimeout(this.nextQ.bind(this), 2000 );
    }

    console.log(isAnswerRight);
    console.log(this.answerStatus);
  }

  nextQ() {
    const currentQIndex : number = this.currentQ.index + 1;
    console.log(`currentQIndex : ${currentQIndex}`);
    if (currentQIndex <= this.questions.length) {
      const q = this.questions[currentQIndex - 1];
      this.currentQ = q ;
      this.showQ(q);
      this.ref.detectChanges();   // 手動啟動偵測變數改變，才能反映在畫面上
    }
  }



}


enum AnswerStatus {
  noAnswer = 1,
  answerRight = 2,
  answerWrong = 3
}



