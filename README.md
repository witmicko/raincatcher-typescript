# raincatcher-typescript
Demo for new raincatcher architecture using typescript and DI.
Repository contains experiments that aren't part of the official RainCatcher solution.
This repository using [Lerna](https://lernajs.io/ to manage independent node.js modules. 


## How to run

```
npm install -g lerna

## Install dependencies
npm install

## Bootstrap application

lerna boostrap

## Running demo cloud

lerna run start --scope=@raincatcher/cloud