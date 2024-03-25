# Steps to run the applicaton in Local

1. Take a `git clone https://github.com/mrr-bajaj/security-alarm-system.git`
2. Open the cloned repo in IDE (Ex. VS Code) (root as `security-alarm-sytem\`)
3. Run the command `npm run install-all` in the terminal

   It will install all the dependenices of client and server

4. Create `.env` file in client and server respectively

   In client `GOOGLE_MAP_API`='YOUR_GOOGLE_API_KEY'

   In server `MONGODB_URI` = 'MONGODB_ATLAS_URI'

5. Run the command `npm run start-app` in the terminal

   It will run the client and server in different terminal
