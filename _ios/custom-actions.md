---
layout: page
title:  "Handling Custom Actions"
platform: iOS
step: 8
pageSection: "Customization"
---

<section id="{{ page.title | slugify }}" markdown=1>
# Handling Custom Actions

Judo layers support a custom type for actions alongside the Open URL, Present URL, and Close action types. This can be used to implement the behavior for custom buttons in your own code.

The SDK provides an API for you to register a callback to be notified of a custom action being activated (typically by a user's tap).

<p class="note">
<span class="bold">Note: </span>
Version 1.7.0 or later of the Judo SDK is required for this feature.
</p>

</section>

<section id="usage" markdown=1>
## Usage

Implementing a Custom Action will require coordinating the setup of the actions in your Judo experiences and callback handler in your app.

A typical way to do this is to set some metadata properties fields on the same layer as the action.  This can include identifying which behavior to invoke. For example, a property called `behavior` could added and then set to something like `switchToLibraryTab`, `openReviewPrompt`, or perhaps even `startPurchase`.

Note that all data context (including that from Web API data sources and URL query parameters) is made available to your callback, but additional non-dynamic fields can just be directly added to the node's metadata at design-time.

</section>

<section id="registering-a-callback" markdown=1>
## Registering a Callback

Call the `Judo.sharedInstance.addCustomActionCallback` SDK method to register a callback to handle any activated (tapped) actions. The following example shows the approach to delegating behavior on the basis of a metadata property field.

```swift
Judo.sharedInstance.registerCustomActionCallback { (actionEvent: CustomActionActivationEvent) in
    switch actionEvent.metadata?.properties["behavior"] {
        case "openWebsite":
            UIApplication.shared.open(URL(string: "https://www.judo.app/")!)
        case "printLogMessage":
            os_log(.default, "Hello from Judo!")
        default:
            os_log(.error, "🤷‍♂️")
    }
}
```

The `CustomActionActivationEvent` provides the context of the action activation (tap), including:

* `node`: the Judo layer with the Action modifier user tapped.
* `experience`: the entire Judo experience itself.
* `metadata`: an accessor for `node.metadata`, for convenience.
* `data`: JSON data from a Web API data source.
* `urlParameters`: URL query parameters included with the URL that launched the experience.
* `userInfo`: an accessor for `Judo.userInfo` for convenience.
* `viewController`: a reference to the view controller presenting the experience, which can be used to present new view controllers, or be dismissed.
</section>
