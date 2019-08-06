/** 
 *  此類別呼叫 Web API 進行語音辨識。
 *  利用此特性，進行英文口語練習。
 *  參考文件：
 *      https://github.com/GlaucoGodoi/TalkApp/tree/master/Code/src/app/modules/speech-support
 *      https://github.com/kamiazya/ngx-speech-recognition
 *      https://github.com/m-hassan-tariq/WebSpeechAPIAngular2
 *      https://medium.com/@glauco.godoi/how-to-allow-your-app-to-listen-your-customers-angular-web-speech-api-2e904d2915e7
*/

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { getTreeMissingMatchingNodeDefError } from '@angular/cdk/tree';

import Speech from 'speak-tts'

@Component({
  selector: 'app-speech-test',
  templateUrl: './speech-test.component.html',
  styleUrls: ['./speech-test.component.css'],
})
export class SpeechTestComponent implements OnInit {
  message = '';
  currentQ: any;         // 目前的題目
  // currentQIndex = 0;
  // currentQContent = '';
  isRecording = false;    // 是否正在錄音中
  isAnswerRight = false;  // 是否答對
  answerStatus: number = AnswerStatus.noAnswer;
  speech: any;

  // questions = [
  //   { index: 1, content: "Apple", ans_status: AnswerStatus.noAnswer },
  //   { index: 2, content: "self-confidence", ans_status: AnswerStatus.noAnswer },
  //   { index: 3, content: "Learn", ans_status: AnswerStatus.noAnswer },
  //   { index: 4, content: "Free", ans_status: AnswerStatus.noAnswer },
  //   { index: 5, content: "Forum", ans_status: AnswerStatus.noAnswer },
  //   { index: 6, content: "News", ans_status: AnswerStatus.noAnswer },
  //   { index: 7, content: "Search", ans_status: AnswerStatus.noAnswer },
  //   { index: 8, content: "Tutorial", ans_status: AnswerStatus.noAnswer },
  //   { index: 9, content: "Command", ans_status: AnswerStatus.noAnswer },
  //   { index: 10, content: "Animation", ans_status: AnswerStatus.noAnswer }
  // ];

  questions = [
    { index: 1, content: "neighbor", ans_status: AnswerStatus.noAnswer },
    { index: 2, content: "neighborhood", ans_status: AnswerStatus.noAnswer },
    { index: 3, content: "settle in", ans_status: AnswerStatus.noAnswer },
    { index: 4, content: "the scoop", ans_status: AnswerStatus.noAnswer },
    { index: 5, content: "tip", ans_status: AnswerStatus.noAnswer },
    { index: 6, content: "take a rain check", ans_status: AnswerStatus.noAnswer },
    { index: 7, content: "social event", ans_status: AnswerStatus.noAnswer },
    { index: 8, content: "joiner", ans_status: AnswerStatus.noAnswer },
    // { index: 9, content: "keep to oneself", ans_status: AnswerStatus.noAnswer },
    // { index: 10, content: "appoint oneself", ans_status: AnswerStatus.noAnswer },
    // { index: 11, content: "resident", ans_status: AnswerStatus.noAnswer },
    // { index: 12, content: "inundate", ans_status: AnswerStatus.noAnswer },
    // { index: 13, content: "fend off", ans_status: AnswerStatus.noAnswer },
    // { index: 14, content: "suit yourself", ans_status: AnswerStatus.noAnswer },
    // { index: 15, content: "turn down", ans_status: AnswerStatus.noAnswer },
    // { index: 16, content: "reputation", ans_status: AnswerStatus.noAnswer },
    // { index: 17, content: "recluse", ans_status: AnswerStatus.noAnswer },
    // { index: 18, content: "busybody", ans_status: AnswerStatus.noAnswer }
  ]
  constructor(
    
    private ref: ChangeDetectorRef
  ) { }



  ngOnInit() {
    this.currentQ = this.questions[0];
    this.showQ(this.currentQ);

    this.speech = new Speech() // will throw an exception if not browser supported
    if (this.speech.hasBrowserSupport()) { // returns a boolean
      console.log("speech synthesis supported")
    }

    this.speech.init({
      'volume': 1,
      'lang': 'en-US',
      'rate': 1,
      'pitch': 1,
      'splitSentences': true,
      'listeners': {
        'onvoiceschanged': (voices) => {
          console.log("Event voiceschanged", voices)
        }
      }
    })
  }

  listen() {
    
  }

  speak() {
    console.log(`speak current q : ${this.currentQ}`);
    this.speech.speak({
      text: this.currentQ.content,
    }).then(() => {
      console.log("Success !")
    }).catch(e => {
      console.error("An error occurred :", e)
    })
  }

  showQ(q) {
    this.currentQ = q;
    this.message = '';         // reset ...
    this.listen();
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

    if (q.index === this.currentQ.index) {
      className = `${className} current`;
    }
    return className;
  }

  startRecording(q) {
    
  }

  stopRecording(q) {
    
  }

  checkAnswer() {
    console.log(`${this.message.toLowerCase()} vs ${this.currentQ.content.toLowerCase()}`);
    this.currentQ.stud_ans = this.message;
    const isAnswerRight: boolean = (this.message.replace("-", " ").toLowerCase() === this.currentQ.content.replace("-", " ").toLowerCase());
    this.answerStatus = isAnswerRight ? AnswerStatus.answerRight : AnswerStatus.answerWrong;
    this.currentQ.ans_status = this.answerStatus;

    if (isAnswerRight) {
      console.log("go to next question after 3 secs later ....");
      setTimeout(this.nextQ.bind(this), 1000);
    }

    console.log(isAnswerRight);
    console.log(this.answerStatus);
  }

  nextQ() {
    let currentQIndex: number = this.currentQ.index + 1;
    console.log(`currentQIndex : ${currentQIndex}`);
    if (currentQIndex > this.questions.length) {
      currentQIndex = 1;
    }
    const q = this.questions[currentQIndex - 1];
    this.currentQ = q;
    this.showQ(q);
    this.ref.detectChanges();   // 手動啟動偵測變數改變，才能反映在畫面上
  }

  prevQ() {
    let currentQIndex: number = this.currentQ.index - 1;
    console.log(`currentQIndex : ${currentQIndex}`);

    if (currentQIndex < 1) {
      currentQIndex = this.questions.length;
    }
    const q = this.questions[currentQIndex - 1];
    this.currentQ = q;
    this.showQ(q);
    this.ref.detectChanges();   // 手動啟動偵測變數改變，才能反映在畫面上
  }

  openTranslate() {
    const url = `https://translate.google.com.tw/?hl=zh-TW#view=home&op=translate&sl=en&tl=zh-TW&text=${encodeURIComponent(this.currentQ.content)}`;
    window.open(url);
  }



}


enum AnswerStatus {
  noAnswer = 1,
  answerRight = 2,
  answerWrong = 3
}



