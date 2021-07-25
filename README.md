> This application will login to Hypixel using Mineflayer which is not a normal Minecraft client, this could result in your Minecraft account getting banned from Hypixel, so use this application at your own risk.

<hr>

## Table of Content

- [Installation](#installation)
  - [Requirements](#requirements)
  - [Setup Guide](#setup-guide)

## Installation using NodeJS

### Requirements

- Git
- NodeJS >= 14
- Yarn >= 1.2
- A Minecraft account

### Setup Guide

To get started, clone down the repository using:

    git clone https://github.com/KlaasNiphaas/guild-bridge-template.git

Next go into the `guild-bridge-template` folder and install all the dependencies using Yarn.

    yarn

While the dependencies are being installed you can copy the configuration file.

    copy config.example.json config.json

Next edit and setup the config file with a proper Minecraft and Discord settings, once you're done you can start the app.

    node index.js

