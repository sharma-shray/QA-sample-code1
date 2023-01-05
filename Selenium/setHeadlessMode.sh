#!/bin/bash
headlessState=$1
configFileName="config.js"
cd lib
sed -i "s/.*headless.*/headless: '$headlessState'/" $configFileName