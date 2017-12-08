/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, serviceworker, es6 */

'use strict';


self.addEventListener('push', function(event){
    console.log("[Service Worker] push received"); 
    console.log("[Service Worker] push has this data : "+ event.data.text());
    console.log("[Service Worker] event : " + event.data);
    
    console.log("[Service Worker] push has this data : "+ event.data.json().title);
    
    const serverJSONdata = event.data.json();
    
    const title = serverJSONdata.title;
    const options = {
        body : serverJSONdata.body,
        icon : 'images/icon.png',
        badge : 'images/badge.png'
    };
    
    const notificationPromise = self.registration.showNotification(title, options);
    
    // the waitUntil method is used to tell the browser not to terminate the service worker until the promise passed to 
    // waitUntil is either resolved or rejected.
    event.waitUntil(notificationPromise);
    
});


self.addEventListener('notificationclick', function(event){
    console.log("[Service Worker] notification clicked");
    console.log("[Service Worker] notificationclick has this data : "+ event);
    console.log("[Service Worker] notificationclick event : " + event.data);
    
    console.log(event.notification);
    
    event.notification.close();
    
    event.waitUntil(clients.openWindow('https://github.com/dnyaneshlb'));
});




