英語口說練習測驗
====

## 呼叫 Web Speech API, 便是使用者說出的英語內容，進行口語練習測驗。 

## 前置要求
* 安裝 Node.js
* 安裝 Yarn (建議安裝)
* 安裝 VSCode
* 安裝 Angular CLI (`yarn global add @angular/cli`)。

## 開始開發
* `git clone https://github.com/KevinHuang/eng-speech-test.git `
* `cd eng-speech-test/eng-speech-client`
* `yarn` #安裝套件
* `yarn start` ＃啟動 angular server。
* 連到 `http://localhost:4200` 開始 使用

## 部署
* `yarn build`
* 把 dist 目錄所有檔案部署出去。

## Questions
### 如何放置 Gadget 專有資源，例如圖片、Word 檔…  
將檔案放到 `src/assets` 裡面即可，例如檔案「`src/assets/img/icon.png`」實際路徑是「`assets/img/icon.png`」。

### 如何加入 JQuery
通常在 angualr 不使用 jquery，但仍然可以使用，先「`yarn add jquery`」安裝 jquery，然後在「`.angular.json`」加入設定。
```json
...
    "scripts": [
        "../node_modules/jquery/dist/jquery.min.js"
    ],
...
```
這作法會將 jquery 打包進 bundle 裡面，如果不要打包，可以直接放在 `assets` 目錄裡，然後在 `index.html` 直接引用。

## 參考
### Speech Recognition 使用之套件：https://github.com/kamiazya/ngx-speech-recognition

