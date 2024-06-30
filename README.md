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
以下の内容にてhypv.batを作成し、管理者にて実行する。
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
(Fedoraの公式サイト)[https://fedoraproject.org/en/workstation/download]より.isoファイルをダウンロードする。
※Fedora-Workstation-Live-x86_64-40-1.14.isoのようなファイル名