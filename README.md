# push-crew
An app to demonstrate push notifications using Service Workers.

## Quick Links
* [Authors](https://github.com/dnyaneshlb/push-crew/blob/master/README.md#authors)
* [How to Run this app?](https://github.com/dnyaneshlb/push-crew/blob/master/README.md#how-to-run-this-app)


## How to run this app?
* Run this app on your local http server. Simply you can download "**Web Server**" app chrome extensions store/ brackets extension/ node js http server or any web server of your choice.

* Click on  "Enable Push Notification" button.

* Click on allow to subscribe to notifications. Copy the key generated after clicking allow.

* Open [Google Push Companion](https://web-push-codelab.glitch.me//)

* Paste key into "Subscription to Send To" textarea

* Add your message in below format in "Text to Send" testarea.
```
   {"title" : "Dnyanesh says..", "body" : "Hey checkout this and that"}
```   
  
* Enjoy the rest. :+1:

* Bonus : You can modify the service worker to read link you want to redirect to when user clicks on notification.


## Authors

*Based on initial work @* [Google Codelabs](https://codelabs.developers.google.com/codelabs/push-notifications/)

*Me [@dnyaneshlb](https://github.com/dnyaneshlb) with  :heart:  for javascript*





