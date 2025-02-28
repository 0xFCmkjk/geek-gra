
![project-banner](https://socialify.git.ci/0xFCmkjk/geek-gra/image?custom_description=Miko%C5%82aj+Kr%C3%B3l%2C+Micha%C5%82+Bartoszcze&description=1&language=1&name=1&owner=1&theme=Dark)

# nodebreaker-game

[![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/0xfcmkjk/nodebreaker-game)](https://img.shields.io/github/v/release/0xfcmkjk/nodebreaker-game)
[![GitHub last commit](https://img.shields.io/github/last-commit/0xfcmkjk/nodebreaker-game)](https://img.shields.io/github/last-commit/0xfcmkjk/nodebreaker-game)
[![GitHub issues or pull requests](https://img.shields.io/github/issues/0xfcmkjk/nodebreaker-game)](https://img.shields.io/github/issues/0xfcmkjk/nodebreaker-game)
[![GitHub](https://img.shields.io/github/license/0xfcmkjk/nodebreaker-game)](https://img.shields.io/github/license/0xfcmkjk/nodebreaker-game)

You are on a spaceship. You play the role of a hacker. In order to complete the tasks you have to change the operation of the game. You have several programming puzzles to solve that require you to have problem-solving skills and seek help from documentation. Later, three lessons on cybersecurity and social engineering await you with a different perspective on the world of information security than usual. The knowledge is conveyed concisely, and everything is led by a pastel atmosphere and indie game style.

# Quick Start Demo

LINK TO YT

# Table of Contents
- [Quick Start Demo](#quick-start-demo)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)


# Installation

> **Note**: These instructions are for development purposes. If you just want to play the game, use the website instead:
URL TO WEBSITE

First of all, you need to install Node.js v22 or newer with npm as a package manager.
Then, you can clone the repo:
```shell
git clone https://github.com/0xFCmkjk/nodebreaker-game
```
Change directory to the cloned folder, install and run in development mode.
```shell
cd nodebreaker-game
npm install
npm run dev
```


# Usage

As mentioned in the quickstart guide, after opening the website either locally or  on the deployed website you should see the main menu of the game. Your progress saves in the local storage of the browser. To clear it, use "Reset Game" button or clear local storage in your browser's dev tools.

When you start the game, the narrator will welcome you and guide through basics of the game. Use arrow keys to move. Next to the clock there is a map that can help you visualize the game. 

On the bottom of the website there are three buttons. 

Code Editor is a simple in-game console with access to current scene object that runs every entered code with ``eval()`` method. Be careful with usage of the console, as it can crash the game. You will need it for 5 out of 8 tasks.

Task Info displays what should you do/what is available in the current task.

Phaser Docs opens a new tab with Phaser API Reference which is useful in task 4 and 5.


# Contribute

If you spot an issue, a bug or have a excelent idea on how to improve our game: open an issue! We will be happy to see our community grow and improve the game. Also you can implement your own features, just clone the repo and play with the code!


# License

[MIT license](./LICENSE)


