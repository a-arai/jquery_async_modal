## Issue

ロジックのソースが記載されているファイル
https://github.com/a-arai/jquery_async_modal/blob/master/src/js/index.js

1.画面が読み込まれた時にデータを取得して本のリスト一覧を作成します。
（データを取得しリストのDOMを作成）

2.本の一覧の詳細を押すとモーダルが表示され、モーダル内に本の詳細が表示されます。
(詳細のデータを取得し、詳細のDOMを作成)

3.モーダル内の「＜」「＞」を押すと、インデックスの次の本、前の本の詳細が表示されます。
(表示していた詳細データに非表示クラスを付与し、表示予定のDOMが画面に存在していたら、
非表示クラスを削除し表示させる。存在していなかったら詳細データを取得し、詳細のDOMを作成。
データを取得しDOMを作成するのは必要最低限にするように心がけた。無駄な通信はしない。)


## Install

npm 5.6.0+

`npm install`

## Usage

`npm start`

## Resources

- 本の一覧: `GET /api/books`
- 本の詳細: `GET /api/book/:id`

```
http://localhost:8080/api/books
http://localhost:8080/api/book/3
```
