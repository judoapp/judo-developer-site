---
layout: page
title:  "Integrating with Analytics"
platform: Android
step: 3
pageSection: "Customization"
---
<section id="{{ page.title | slugify }}" markdown=1>
# Integrating with Analytics

The Judo SDK offers a notification you can subscribe to, 'Screen Viewed'. This is primarily useful for integrating with your own (or second-party) analytics tooling separate from Judo's own analytics features.

The Judo SDK offers it as a callback, with references to the SDK's model objects, and also references to the SDK's view controllers.
</section>
<section id="screen-viewed-callback" markdown=1>
## Screen Viewed Callback

The Screen Viewed callback is invoked whenever an Experience Screen is presented or navigated to.

The `Event.ScreenViewed` class' fields are as follows:

- `experience`: an `Experience` object
- `screen`: an `Screen` object
- `dataContext`: the data context (the data visible to the node with an action that launched this screen)

### Sample Code

```kotlin
Judo.addScreenViewedCallback { event ->
    // a common use case is to notify your own Analytics tooling that a Judo screen has been
    // displayed.
    Log.i(TAG, "Judo Screen Viewed: ${event.screen.name}")

    // Examples for a few common Analytics products follows:

    // Braze:
    //   val eventProperties = AppboyProperties()
    //   eventProperties.addProperty("name", "Judo / ${event.experience.name} / ${event.screen.name}")
    //   Appboy.getInstance(context).logCustomEvent("Screen Viewed", eventProperties)

    // Segment:
    //   Analytics.with(context).screen("Judo / ${event.experience.name} / ${event.screen.name}")

    // Amplitude:
    //   val eventProperties = JSONObject()
    //   try {
    //       eventProperties.put(
    //           "name",
    //           "Judo / ${event.experience.name} / ${event.screen.name}"
    //       )
    //   } catch (e: JSONException) {
    //       System.err.println("Invalid JSON")
    //       e.printStackTrace()
    //   }
    //   amplitudeClient.logEvent("Screen Viewed", eventProperties)

    // Firebase Analytics:
    analytics.logEvent(FirebaseAnalytics.Event.SCREEN_VIEW) {
        param(
            FirebaseAnalytics.Param.SCREEN_NAME,
            "Judo / ${event.experience.name} / ${event.screen.name}"
        )
    }
}
```
</section>
