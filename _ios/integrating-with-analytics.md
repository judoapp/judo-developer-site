---
layout: page
title:  "Integrating with Analytics"
platform: iOS
step: 3
pageSection: "Customization"
---
<section id="{{page.title | slugify }}" markdown=1>
# Integrating with Analytics

The Judo SDK offers a notification you can subscribe to, 'Screen Viewed'. This is primarily useful for integrating with your own (or second-party) analytics tooling separate from Judo's own analytics features.

The Judo SDK broadcasts it onto iOS' Notification Center, with references to the SDK's model objects, and also references to the SDK's view controllers.

For more information about the Notification Center, see the [Apple Documentation](https://developer.apple.com/documentation/foundation/notificationcenter).
</section>
<section id="screen-viewed-notification" markdown=1>
## Screen Viewed Notification

The Screen Viewed notification is emitted from whenever an Experience Screen is presented or navigated to.

Note that you need to store the observer 'chit' NSObject returned by `addObserver()` at a scope that will retain it for the duration you desire to have the observer active.

The NSNotification object's [userInfo property](https://developer.apple.com/documentation/foundation/nsnotification/1409222-userinfo) contains the following fields:

- `experience`: a JudoModel.Experience object
- `screen`: a JudoModel.Screen object
- `data`: the data context (the data visible to the node with an action that launched this screen)
- `screenViewController`: the JudoSDK.ScreenViewController that is presenting the screen
- `experienceViewController` the underlying JudoSDK.ExperienceViewController

### Sample Code

```swift
import JudoSDK
import JudoModel

// use an object reference property on your AppDelegate (or similar) to store the chit you get back from `NotificationCenter.default.addObserver`
private var judoObserverChit: NSObjectProtocol!

// and then, at a convenient point in your startup procedure (such as `application:didFinishLaunchingWithOptions:`), add an observer to iOS' Notification Center for the Judo Screen Viewed notification:
judoObserverChit = NotificationCenter.default.addObserver(
    forName: Judo.screenViewedNotification,
    object: nil,
    queue: OperationQueue.main,
    using: { notification in
        let screen = notification.userInfo!["screen"] as! Screen
        let experience = notification.userInfo!["experience"] as! Experience
        let properties = [
            "screenID": screen.id,
            "screenName": screen.name ?? "Screen",
            "experienceID": experience.id,
            "experienceName": experience.name
        ]
        
        // Amplitude
        // Amplitude.instance().logEvent("judo screen viewed", withEventProperties: properties)
        
        // Braze
        // Appboy.sharedInstance()?.logCustomEvent("Judo Screen Viewed", withProperties: properties)
        
        // Segment
        // let screenTitle = "\(experience.name) / \(screen.name ?? "Screen")"
        // Analytics.shared().screen(screenTitle, category: "Judo", properties: properties)
        
        print("Screen tracked: \(properties)")
    }
)
```
</section>
