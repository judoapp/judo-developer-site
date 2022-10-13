---
layout: page
title:  "Embedding"
platform: iOS
step: 6
pageSection: "Customization"
---
<section id="{{page.title | slugify }}" markdown=1>
# Embedding

The Judo SDK can also be embedded into another UIKit View Controller in order to nest Judo content within other UI in your app.

</section>
<section id="view-controller-containment" markdown=1>
## View Controller Containment

An experience may be embedded within another view controller, by adding the `ExperienceViewController` as a child view controller.  Once the view controller has been added as a child, its frame must be given a fixed size, then its view can be added to the parent.   Once the view has been added to the parent, call `ViewController.didMove(toParent:)`.   When done with the experience, call `ViewController.removeParent()`.

The `ExperienceViewController` does not support autosizing from content, so it will need to be given a fixed size.

Additional details are available at: [Implementing a Container View Controller](https://developer.apple.com/library/archive/featuredarticles/ViewControllerPGforiPhoneOS/ImplementingaContainerViewController.html)

### Sample Code

```swift
import UIKit
import JudoSDK

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        if let url = URL(string: "<Your Experience URL>") {
            let experienceVC = ExperienceViewController.init(url: url)
            addChild(experienceVC)
            experienceVC.view.frame = view.bounds //Fixed size is required here.
            view.addSubview(experienceVC.view)
            experienceVC.didMove(toParent: self)
        }
    }
}
```
</section>