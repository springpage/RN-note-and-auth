# note-and-auth
a react native project

## Demo for app
- Youtube: https://www.youtube.com/watch?v=bEqOizpeC3g
- Expo: https://expo.io/@spring6166/my-secret

## About this app
- In this app, user can try to login by 3 ways, by email-password, by phone or by facebook account. After login, user can make some note and save that note to firebase database.
- Next time user login, user will get the note and can change it and save it again.

## Introduce
- This app is built in expo. You can try my app in expo in both android and ios.
- For facebook login, I implement facebook authentication feature from expo.
- Phone verification: I make 3 small functions and uploaded to google cloud functions. The functions connect with firebase and twilio API.
- The functions then help user to make account in firebase, generate 4-digit random code, tell twilio to send code to user's phone.
And compare the code it generate with the code user submit. If the code is true, user will be generated a token to access to firebase and make note.
- Theme by native base. I used react-navigation for navigating, and axios to make network requests.

## Please note
- I used trial Twilio account, so it can send sms to only my phone number. You will have to change the twilio API in the functions if you want to make it work in your project.
- The same for facebook authentication, my fb App ID is work only for my facebook account because the App is still in development and not live yet.
Just change the fb App Id with your fb App ID and it will work.
- Login by email and password works well by just create account and then login.
- And I made this app in a short time so I didn't spend time to make validation or clean up code yet.

