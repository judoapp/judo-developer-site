---
layout: page
title:  "API Authorizers"
platform: Android
step: 4
pageSection: "Customization"
---
<section id="{{ page.title | slugify }}" markdown=1>
# API Authorizers

When integrating one of your own Web APIs with Judo as a Data Source, it is usually the case that you need to pass an API key along.  The Judo SDK gives you a means to modify any outgoing Data Source Web API URLRequest being issued by the Judo SDK for your API.

Specify the hostname of your Data Source API (you can additionally glob multiple subdomains using asterisk `*` wildcards), and then give a closure that receives a `URLRequest` that you can modify as needed. You set up these authorizers on the Builder used to generate a Configuration object used to initialize the SDK.

For example, if you wish to match both `api.example.com` and `stats.example.com`, you may use the following:

```swift
val config = Judo.Configuration.Builder(
    accessToken = "<JUDO-ACCESS-TOKEN>",
    domain = "myapp.judo.app"
)

config.authorize("*.example.com") { request ->
    request.headers["X-My-Authorization"] = "my api key"
}

Judo.initialize(
    application = this,
    configuration = config.build()
)
```
</section>