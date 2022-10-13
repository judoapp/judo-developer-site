---
layout: page
title:  "API Authorizers"
platform: iOS
step: 4
pageSection: "Customization"
---
<section id="{{ page.title | slugify }}" markdown=1>
# API Authorizers

When integrating one of your own Web APIs with Judo as a Data Source, it is usually the case that you need to pass an API key along.  The Judo SDK gives you a means to modify any outgoing Data Source Web API URLRequest being issued by the Judo SDK for your API.

Specify the hostname of your Data Source API (you can additionally glob multiple subdomains using asterisk `*` wildcards), and then give a closure that receives a a `URLRequest` that you can modify as needed.  You set up these authorizers on the Configuration object used initialize the SDK.

For example, if you wish to match both `api.example.com` and `stats.example.com`, you may use the following.

```swift
configuration.authorize("*.example.com", with: { request in
    request.setValue("xxx", forHTTPHeaderField: "Example-Token")
})
```
</section>