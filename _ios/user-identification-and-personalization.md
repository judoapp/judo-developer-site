---
layout: page
title:  "User Identification and Personalization"
platform: iOS
step: 2
pageSection: "Customization"
---
<section id="{{page.title | slugify }}" markdown=1>
# User Identification and Personalization

You can identify your current user to Judo to enable personalization (of text copy and dynamic URLs on Actions, Images, WebViews, etc.) and also associate and attribute them in Judo's analytics.
</section>
<section id="identifying-a-user-and-setting-traits" markdown=1>
## Identifying a User and setting Traits

On the `Judo.sharedInstance` singleton, there is an `identify()` method you can call with an optional `userID` and a `traits`.

`userID` is a unique identifier for your user, constant across time. Don't use a user's email address here; that could potentially change if the user updates their email address in your app, for example.

`traits` is expected to be JSON-compatible data, so anything that conforms to `Codable` is accepted here. You can use a `Dictionary<String, Any>` or your own Codable-conformant struct.

The `traits` dictionary is exposed as the `user.` data in the Experiences themselves.

```swift
// Pass user ID and custom properties to Judo for personalization
struct UserTraits: Codable {
    let name: String
    let pointsBalance: Int
    let premiumTier: Bool
    let tags: [String]
}

Judo.sharedInstance.identify(
    // NB: don't use an email address here!
    userID: "1234567",
    traits: UserTraits(
        name: "John Doe",
        email: "john@example.com",
        pointsBalance: 50_000,
        premiumTier: true,
        tags: ["foo", "bar", "baz"]
    )
)
```

This information is persisted across app restarts, but naturally we recommend calling it every time your user data changes (such as logging in, logging out, profile updates, etc).  Duplicate Identify events, provided they are not called to excess, are fine. Calling it every app start is a good idea, which will particularly help with the case where the user was previously logged in before you ship an update which includes the Judo integration.
</section>
<section id="usage-within-an-experience" markdown=1>
## Usage within an Experience

The designer can then consume these values in several different ways using Judo's interpolation syntax, prefixed with `user.`. In a text field, they can use something like the following in a Text layer:

    Good morning, {{ user.name }}.

And a URL in an Image layer might be something like:

    http://myapi.example.com/v1/users/{{ user.id }}/avatar.jpg

NB. The `userID` you provided to Identify is mixed into the userInfo data as `userID` and is also available. If you set a value named `userID` in traits directly (not recommended), it will be shadowed.
</section>
<section id="resetting-user-datalogging-out" markdown=1>
## Resetting User Data/Logging Out

Call `Judo.sharedInstance.reset()` to clear the User ID, traits, and cycle the Anonymous ID.
</section>