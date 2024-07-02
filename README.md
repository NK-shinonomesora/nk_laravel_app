# Laravelのローカル開発環境構築手順

## 環境構成
+ ホストOS：Windows11 Home
+ ゲストOS：Fedora（Workstation 40）
+ 仮想化ソフトウェア：Hyper-V
+ DBエンジン：MySQL
+ Webサーバ：Nginx
+ ファイルサーバ：samba
+ Webアプリケーションフレームワーク：Laravel
+ フロントエンド：React + TypeScript

*MySQL、Nginx、LaravelのプロジェクトはゲストOSのFedoraに構築する。*

*ゲストOSにファイルサーバ（samba）を構築し、ホストOSからマウントする。*

*Webアプリケーションとフロントエンドの繋ぎこみはInertiaを使用する。*

## Hyper-Vのインストール
以下の内容にてhypv.batを作成し、管理者として実行する。
```
pushd "%~dp0"
dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
del hyper-v.txt
Dism /online /enable-feature /featurename:Microsoft-Hyper-V -All /LimitAccess /ALL
pause
```

## Hyper-VにFedoraをインストール
ゲストOSとしてHyper-VにFedora（Workstation 40）をインストールし、サーバとして利用する。

### Fedoraのダウンロード
[Fedoraの公式サイト](https://fedoraproject.org/en/workstation/download)より.isoファイルをダウンロードする。
※Fedora-Workstation-Live-x86_64-40-1.14.isoのようなファイル名

### Fedoraのインストール
[こちらの記事](https://yuworks.blog/hyper-v-llinux/)を参考に、Hyper-VにFedoraをインストールする。

## Nginxのインストール
ゲストOSのFedoraを起動する。
[Nginxの公式サイト](https://nginx.org/en/linux_packages.html#RHEL)のRHEL系へのインストール手順を参考に実施していく。
まず、前提条件をインストールする。
```
sudo yum install yum-utils
```
yumのリポジトリをセットアップするため、/etc/yum.repos.d/nginx.repoを以下の内容で作成する。
```
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```
以下のコマンドにてnginxをインストールする。
```
sudo yum install nginx
```
以下のコマンドを順に実行し、nginxが自動で起動するように設定する。
```
sudo systemctl start nginx
sudo systemctl enable nginx
```

## ネットワークの設定
ホストOS（Windows11）とゲストOS（Fedora）間でネットワーク接続できるようにする。
さらに、ゲストOSはホストOSのネットワークを使用して、外部ネットワークに接続できるようにする。

### ゲストOSに固定IPアドレスを割り振る
[こちらの記事](https://isleofhoso.com/linux-nmcli-ipsetting)を参考に、ゲストOSに静的IPアドレスを設定する。
*ここ結構手こずったので、注意点をいくつか記載*
+ NWインターフェースの「DEVICE」と「NAME」は「eth0」とする。
+ DNSは「8.8.8.8」にする。
+ 設定するIPアドレスについては任意だが、ゲストOSには「192.168.137.55/24」、デフォルトゲートウェイには「192.168.137.1」を設定したものとする。

### Hyper-Vのネットワーク設定を行う
[こちらの記事](https://sikata777.com/hyper-v_network/)を参考に、Hyper-Vに内部仮想スイッチ、
ホストOS側でIPアドレスやNATの設定を行う。先に設定したゲストOSに合わせて、以下の設定とする。
+ IPアドレス：192.168.137.1
+ サブネットマスク：255.255.255.0
+ NATサブネットプレフィクス：192.168.137.0/24

### ホストOSとゲストOSの疎通確認
ホストOSからゲストOSにHTTPでアクセスを試み、ゲストOSで起動しているNginxが応答を返すことを確認する。
何故かデフォルトのポート80だと疎通不可のため、/etc/nginx/nginx.confを開き、以下の箇所を書き換える。
```
server {
    listen: 8080
}
```
ブラウザを開き、http://192.168.137.55:8080/にアクセスし、nginxのルートページが表示されることを確認する。

## samba(ファイルサーバ)の構築
[こちらのサイト](https://docs.fedoraproject.org/en-US/quick-docs/samba/)の「Install and enable Samba」と「Sharing a directory inside /home」を実施すればOK。
サイトでは"/home/jane/share"を共有ディレクトリにしているが、ここは任意のpathを設定する。
*以後は、ここで"/home/hoge/share"を設定したものとする。*
これにより、ホストOS（Windows11）のファイルエクスプローラーから"\\192.168.137.55\share"でアクセス可能となる。
*ネットワークドライブの割り当てを実施しておくと便利*

## Laravelのプロジェクト作成
ゲストOSにLaravelのプロジェクトを作成していく。

### phpとcomposerのインストール
[Fedoraのサイト](https://developer.fedoraproject.org/tech/languages/php/php-installation.html)を参考に、以下を実行してインストールする。
```
sudo dnf install php-cli
sudo dnf install phpunit composer
```

### プロジェクトの作成
先ほど共有ディレクトリに設定した"/home/hoge/share"に移動し、以下を実行する。
```
composer create-project laravel/laravel example-app
```
これにより、"example-app"が作成される。このディレクトリに移動して以下を実行するとlaravelのサーバが立ち上がる。
```
php artisan serve
```
但し、nginx経由でアクセスさせたいので、追加の設定を行っていく。

## phpモジュールのインストール
Laravelプロジェクトを動作させるために必要なphpモジュールをインストールする。
```
sudo dnf install php-pdo php-fpm
```

## セッションドライバの変更
デフォルトではセッションドライバがデータベースになっているため、プロジェクトのルートに存在する.envを開いて以下に変更する。
```
SESSION_DRIVER=file
```
これにより、セッション情報がデータベースではなくファイルシステムに保存される。

## nginxの設定ファイルの書き換え
nginx経由でLaravelプロジェクトを動作させるため、[Laravel公式のnginxの設定例](https://laravel.com/docs/11.x/deployment#nginx)と、
[php-fpmに関する記事](https://qiita.com/P2eFR6RU/items/a7c89cd7b2c5ab67acd4)を参考に、nginx.confファイルの書き換えなどを行う。

## nginxプロセスがLaravelプロジェクトのディレクトリを読み込めるようにする
デフォルトではユーザのホームディレクトリ（/home）はアクセス権が700となっているため、nginxプロセスに読み取り権がない。
そのため、以下のコマンドによりその他のユーザに読み取り権を付与する。
```
sudo chmod 701 /home/hoge
```

## SELinuxの無効化
SELinuxが有効化されているとnginxがプロジェクトを読み込むことができないため、
[こちらの記事](https://qiita.com/hanaita0102/items/5d3675e4dc1530b255ba)などを参考に無効化する。

## Node.jsのインストール
[Node.jsの公式サイト](https://nodejs.org/en/download/package-manager)などを参考にインストールする。

## Inertiaの設定
Inertia公式の[サーバサイド](https://inertiajs.com/server-side-setup)と[クライアントサイド](https://inertiajs.com/server-side-setup)や、
[こちらの記事](https://qiita.com/reirev2913/items/5c3e9f8c9532fe951efc)を参考に実施する。

## React + TypeScriptのインストール
[こちらの記事](https://tanmaydas.com/posts/configure-vite-in-a-laravel-project/)を参考に実施する。

## MySQLのインストール
[こちらの記事](https://docs.fedoraproject.org/en-US/quick-docs/installing-mysql-mariadb/)の「Install from Oracle MySQL」を参考にインストールする。
Laravelプロジェクト直下に存在する.envファイルを開き、mysqlの設定を行う。
最後に、以下のコマンドにより依存モジュールをインストールする。
```
sudo dnf install php-mysqlnd
```
