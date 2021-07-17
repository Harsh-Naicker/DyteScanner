# DyteScanner
A simple clone of the CamScanner app that allows a user to scan documents and save them as images in the local storage.

## Task Status
- A screen to scan a new document from the live camera feed, and save that document as an image on the user's local storage. The user must be allowed to edit the name of the file before saving it. **COMPLETED**
- A screen to list all documents created by a user in a grid view. Clicking on a document should open it in the user's gallery application. **COMPLETED**

## Installation
- Clone the repository in your local machine.
- Navigate to the folder using the command line / terminal.
- Run the command 'npm install'. (Ensure that node is installed in your system)

## Running the app
- Open a command line/ terminal.
- Navigate to the cloned repository folder.
- Execute the command 'npx react-native start'
- Open another command line/terminal window and navigate to the cloned respository folder.
- Execute the command 'npx react-native run-android' or 'npx react-native run-ios'
- *Important*: The development was done on a Macbook Air M1 chip system. Although most configurations have been done, due to lack of an iOS device, iOS testing has not been done. Android testing has been done and all features have been tested. Certain code is specific to Android.

## Features
- Firebase phone autentication to securely authenticate a user.
- Document scanning: The module detects the edges of a document within frame automatically and captures the image. Following this, the user can choose to crop the image as per his/her convenience and then confirm the version of the document.
- Document saving: After a user crops the image as per his/her desire, the user can enter the name of the scanned document. Post this, the user can save the document.
- *Note*: The documents get stored in the internal storage of the Android device inside a directory named 'DyteScanner'. Also, once a document is scanned and saved, it is immediately available in the gallery application of the user's device.
- All scanned documents are listed in a grid view on the home screen of the app. When a user clicks on any of the documents, it is opened in the user's gallery application.

## Screenshots
Here is a drive link to the screenshots of the developed app. https://drive.google.com/drive/folders/1KFg8adhblH_I3u8-4ZJ9JVEfCY1bSbao?usp=sharing

## Demo Video
Here is a drive link to a demo video of the developed app. https://drive.google.com/file/d/1LJ4deW7ukz-xmLh7NIVPa5Uo3Z827m3T/view?usp=sharing


