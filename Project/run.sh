echo "Entering destination folder"
cd /home/student/310Project/csci310_Spring_P1/Project

echo "Running frequencySort Testing"
phpunit ./tests/frequencySortTest.php

echo "Runnin wordcountTest Testing"
phpunit ./tests/wordcountTest.php

echo "Running javascript Testing"
mocha ./tests/request.test.js
