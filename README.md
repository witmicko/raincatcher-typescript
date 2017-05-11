# raincatcher-typescript
Demo for new raincatcher architecture using typescript and DI

This repository using [Lerna](https://lernajs.io/ to manage independent node.js modules. 

## How to run

```
npm install -g lerna

## Install dependencies
npm install

## Bootstrap application

lerna boostrap

## Running demo apps

lerna run start --scope=apps/*