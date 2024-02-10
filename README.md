# Astro x Vue3 Starter Kit: Basics


```sh
[/]> cd app
[/app]> npm ci
```
### 基本環境のパッケージバージョンに関して
基本的にnpm ciによる package-lock.jsonからの正確なバージョンのパッケージをインストールする。

#### 但し、Nodeバージョンによってパッケージが利用できない場合は以下の２通りでたい

1. Nodeバージョンを切り替える
   nvm:nodeのバージョンを管理する
   nvm use 18
2. バージョンアップして個々に対応する

#### グローバルインストールされたパッケージを削除する。

コマンド:npm uninstall -g XXXX
手動：C:\Users\eve\AppData\Roaming\npm\node_modules/以下を削除

---

#### プロジェクト内のバージョン管理（全体のバージョンアップなどでも利用）


現在のライブラリのversionを確認

> npm outdated
> npm-check-updatesを利用し、マイナーバージョンのみアップデートを実施

※npm-check-updatesはグローバル環境にインストール(npm i -g npm-check-update)

ncu -u --target minor
※package.jsonが更新されたので、その状態でnpm install コマンドを実行
> npm install

もし、npm installでerrorを吐く場合

依存関係が解決できずエラーになってしまった場合は、npm audit fix --forceコマンドで自動的に修正してくれます。（との事）
> npm audit fix --force

---

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
