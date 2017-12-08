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

/* eslint-env browser, es6 */

'use strict';

const applicationServerPublicKey = 'BB1VYk07Dcgh_asQstQxSBaAala-TsStrthRB7mJsN4zlxnfbIm3E8lWiuY07XFWdZSfEESw2dWULjo0kRvwCsU';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;


registerServiceWorker();

function registerServiceWorker()
{
    if('serviceWorker' in navigator && 'PushManager' in window)
    {
        console.log("Service Workers are supported in your browser");
        
        navigator.serviceWorker.register('sw.js')
        .then(function(worker){
            console.log("Service Worker registered successfully");
            swRegistration = worker;
            initiUI();
        })
        .catch(function(exception){
            console.error("Exception while regestering Service worker "+ exception);
        })
    }
    else 
    {
        console.error("Damn you..update your bloody browser!!");
    }
    
}

function initiUI()
{
    
    pushButton.addEventListener('click', function(event){
       pushButton.disabled = true;
           
       if(isSubscribed){
           //Things to unsubscribe user
           unsubscribeUser();
       } 
       else{
            subscribeUser();       
       }
    });
    
    
    if(swRegistration)
    {
        swRegistration.pushManager.getSubscription()
        .then(function(subscription){
            isSubscribed = !(subscription === null);
            
            //send user subscription to backend. This is not required step in demo app.
            updateSubscriptionOnServer();
            
            if(isSubscribed){
                console.log("User is Subscribed for push notification");
            }
            else{
                console.log("User is not Subscribed for push notification");
            }
        });
        
        updateButton();
    }
}


function updateSubscriptionOnServer(subscription)
{
      // TODO: Send subscription to application server

      const subscriptionJson = document.querySelector('.js-subscription-json');
      const subscriptionDetails =
      document.querySelector('.js-subscription-details');

      if (subscription) 
      {
        subscriptionJson.textContent = JSON.stringify(subscription);
        subscriptionDetails.classList.remove('is-invisible');
      }
      else 
      {
        subscriptionDetails.classList.add('is-invisible');
      }
}


function subscribeUser()
{
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
    .then(function(subscription){
        //things to do when user click on allow subscription
        console.log("User is now subscribed");
        updateSubscriptionOnServer(subscription);
        
        isSubscribed = true;
        
        updateButton();
    })
    .catch(function(err){
        console.log("User clicked on deny for subscription.");
        updateButton();
    })
}


function unsubscribeUser()
{
    swRegistration.pushManager.getSubscription()
    .then(function(subscription){
        if(subscription){
            return subscription.unsubscribe();
        }
    })
    .catch(function(error){
        console.error("Error Occired in unsubscribing : "+ error);
    })
    .then(function(){
        //if user unsubscribed then update server for the same info
        updateSubscriptionOnServer(null);
        console.log("User is unsubscribed");
        isSubscribed = false;
        updateButton();
    })
}





function updateButton()
{
    if(Notification.permission === 'denied'){
        pushButton.textContent = "Push Messaging is blocked by user";
        pushButton.disabled = true;
        
        updateSubscriptionOnServer(null);
        return;
    }
    
    if(isSubscribed){
        pushButton.textContent = "Disable Push Messaging";
    }
    else{
        pushButton.textContent = " Enable Push Messaging";
    } 
    pushButton.disabled = false;
}


function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
