---
layout: page
title:  "Installation and Initializations"
platform: Android
step: 0
pageSection: "Getting Started"
---
<section id="{{ page.title | slugify }}" markdown=1>
# Installation and Initialization

The Judo SDK allows you to present Experiences in your Android mobile app.

While the SDK may be linked with apps that have minimum Android SDK level of 19 (4.4 Kit Kat), Judo content can only be displayed on Android API 23 and greater (6.0 Marshmallow).

You need your app's Judo Access Token (found at the [Judo web interface](https://www.judo.app/login)).  You will need to configure (if your team has not done so already) an Android app in the Judo settings. Once you have done so, there you will find the app's Access Token.

You will also need a Domain configured in the Judo settings as well. These domains are subdomains within the `.judo.app` top-level domain.

(Note that the SDK requires the `android.permission.INTERNET` permission, naturally enough.)
</section>
<section id="install-the-sdk" markdown=1>
## Install the SDK

To add the dependency to your project's `build.gradle`. First, add these GitHub repositories as a Maven-format repository:

**Groovy**:
```groovy
// (Note that repositories may need to be set in settings.gradle)
repositories {
    // ...
    maven {
        url 'https://judoapp.github.io/judo-maven/maven'
    }
}

// Add the following in app-level build.gradle:
dependencies {
    implementation 'app.judo:judo-sdk:1.8.4'
}
```

**Kotlin KTS**:

```kotlin
// (Note that repositories may need to be set in settings.gradle.kts)
repositories {
    // ...
    maven {
        url = uri("https://judoapp.github.io/judo-maven/maven")
    }
}

// Add the following in app-level build.gradle.kts:
dependencies {
    implementation("app.judo:judo-sdk:1.8.4")
}
```

Then, if you are using Android Studio, re-run Gradle Sync.
</section>
<section id="initialize-the-sdk" markdown=1>
## Initialize the SDK

For the next steps you will need your Access Token (discussed above) and an App Domain. Note that Judo supports multiple domains.

In your Application class's `onCreate` template method, add the following lines (note you will need `import app.judo.sdk.api.Judo` to import the SDK's main module):

```kotlin
// Initialize the Judo SDK itself.
Judo.initialize(
    application = this,
    accessToken = "<ACCESS TOKEN HERE>",
    "<APP-DOMAIN-HERE>"
)

```
</section>
<section id="troubleshooting" markdown=1>
## Troubleshooting

You can request the Judo SDK will log additional information about its behavior by adding this to your `onCreate`:

```kotlin
import app.judo.sdk.api.logs.LogLevel

// the following before Judo.initialize:
Judo.logLevel = LogLevel.Verbose
```

If the `JUDO_VERBOSE` environment variable is set to 1 (you can do so in your Target's Scheme in Xcode), the Judo SDK will log additional information about its behaviour.
</section>
<section id="getting-help" markdown=1>
## Getting Help

See the [Judo Forum](https://forum.judo.app/c/sdk-integration).
</section>
