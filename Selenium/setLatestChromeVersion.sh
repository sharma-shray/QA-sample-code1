#!/bin/bash
webdriver-manager update
cd node_modules/webdriver-manager/selenium
cp $(ls chromedriver*.exe | sort -Vr | head -1) $(pwd)/../../chromedriver/lib/chromedriver/chromedriver.exe
