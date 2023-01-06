#!/bin/bash
cd lib
envsubst < config.js
envsubst < configLayout.js> config.js