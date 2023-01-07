<h1>&#128736; QA test Celenois readme &#128736;</h1>

<h2>One time setup:</h2>
Please set the username and password for your application as environment variables

"$user" for your username

"$password" for your password

After setting the environment variables restart the IDE.
Note: keep in mind that the environment variables are in small letters



<h2>Steps to run the suite.</h2>

1. Setting up credentials and chrome driver dependencies.
   *  `npm install`
   * `npm run setdependencies`

2. Setting up headless mode.

   * Set preferred headless mode: `npm run setheadlessvalue --headless=yes` OR `npm run setheadlessvalue --headless=no`
3. Single test case run
   * Start the execution: `npm run selecttest --select=T-1`  ( change the test case ID as per your requirements )

  <h3>or</h3>
3. Run whole suite
   * Start the execution: `npm run test `  


4. Results for your run will be stored in the root folder of selenium inside "Jest-stare" folder.

