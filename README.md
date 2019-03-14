# 消費税計算アプリAPIサーバー

## About
消費税の設定を保存するAPIサーバーです.
REST APIのような設定になっています.

## Attention
- SSLによるHTTPS化は行っていません.
こちらについては
  - Apacheの`httpd.conf`等で(鍵暗号のファイルを指定して)直接設定する.
  - AWSのサービス(Route53等)を用いてHTTPSの設定をする.
 等の方法で設定する事になるかと思います.
- 開発環境の都合等でMYSQLとほぼ同等で互換性のあるMariaDBを利用しています.
  ただ, 基本的にこのアプリに関しては差は無いですのでどちらを利用しても問題ありません.

## Requirement
- `npm`(or `yarn`)
- [`pm2`](http://pm2.keymetrics.io/docs/usage/quick-start/) - Manager of js prosess
- npm packages written in `package.json`
  - [`mysql2`](https://github.com/sidorares/node-mysql2) - mysql for javascript
  - [`express`](https://expressjs.com/ja/) - web server for javascript
  - [`body-parser`](https://github.com/expressjs/body-parser) - middleware to parse body and views
  - [`dotenv`](https://github.com/motdotla/dotenv) - environment file
- MYSQL Database

## Install and deploy
はじめにgitやscp等でファイルの配備をして下さい.
### Initialize database
以下の手順でDBを用意して下さい.
1. はじめにmysqlのUserを用意する.
2. `create database innovation;` で `innovation` DBを作成. 
2. userにdatabase作成の権限を与える.
3. `cp ./.env.example ./.env` を実行し, `.env` の中身を環境に合わせて変更する.
4. `mysql -u (userの名前) -p < ./lib/initialize.sql` を実行する.

### Apache Config
Debian系, CentOS 等によりconfigの設定の仕方が違うので合わせて参照して下さい.
どの環境でも proxy モジュールをインストールして下さい.
#### Devian
`lib/innovation.conf.example` をsites-availableの任意のconfファイルにコピーして
サイト名等を編集, a2ensiteをして `(ROOT URL)/api` に接続されるようにしてください.
#### CentOS等
`httpd.conf` のLocationの部分に`lib/innovation.conf.example` のLocationの部分をコピー

### deploy node programs
clone したディレクトリで以下のコマンドを実行して下さい.
pm2 に関しては[公式Doc](http://pm2.keymetrics.io/docs/usage/startup/)等も参照して下さい.
1. `$ npm install yarn pm2 -g`
2. `$ yarn global add pm2`
3. `$ yarn`
4. `$ pm2 start app.json`
5. `$ pm2 startup (環境名)`
 -> コマンドラインの出力に従って作業
6. `$ pm2 save`
7. サーバーのrestart
以上で`localhost:3000` に配備されるので,上記Apacheの設定が適切であれば
`(Apache のURL)/api`からリバースプロキシで接続されます.

### development
動作を確認したい場合は,手元に落としてから
project rootディレクトリ(このファイルのあるディレクトリ)で
以下のコマンドを実行して下さい.
1. 上記 `Initialize database` の手順を実行する.
2. `npm install` or `yarn` を実行
3. `yarn(または npm) start` を実行
これにより `localhost:3000`で動作を確認出来ます.

## Usage
### API
#### GET: (root_url)
jsonでDBに保存されている全ての税率のデータを返します.

`(root_URL)` -> `[{id:1, start_date: "1998-01-17", rate:"0.03"},{id:2, start_date: "2011-11-03", rate:"0.08"}]`

#### GET: (root_url)/:id
jsonでDBに保存されている税率のデータを返します.
今回はクライアント側では使用していません.

`(root_URL)/1` -> `[{id:1, start_date: "1998-01-17", rate:"0.03"}]`

#### POST: (root_url)
jsonで渡された税率のデータをDBに保存します.
空白や負の値,undefinedの時は例外を返します.
登録成功したら200番が返ります.

`(root_URL)?start_date=2001-01-05&rate=0.08`

#### POST: (root_url)/:id
指定された税率のデータをDBから削除します.
削除成功したら200番が返ります.

`(root_URL)/1`

## Use
- OS -> Raspbian GNU/Linux 9.8 
- Apache Web server -> version 2.4.25
- MYSQL DB -> mysql  Ver 15.1 Distrib 10.1.37-MariaDB
- node -> v11.10.1
- npm -> 6.7.0

## Licence
[MIT](https://github.com/kkiyama117/innovation_server/blob/master/LICENSE)

## Author
[kkiyama117](https://github.com/kkiyama117/)
