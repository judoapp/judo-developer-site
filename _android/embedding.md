---
layout: page
title:  "Embedding a Fragment"
platform: Android
step: 5
pageSection: "Customization"
---
<section id="{{page.title | slugify }}" markdown=1>
# Embedding a Fragment

The Judo SDK can also be embedded into another Android view in order to nest Judo content within other UI in your app. This is done using the `ExperienceFragment`.

</section>
<section id="view-controller-containment" markdown=1>
### Preparing and Adding the Fragment

A `Fragment` holding a Judo experience may be embedded within an `Activity` or another `Fragment` by adding `ExperienceFragment` as a child view.

There are a number of different ways of going about structuring and adding Fragments. Here we'll be using the `FragmentContainerView` to hold the Judo SDK's `Fragment`, similar to Google's own [AndroidX documentation](https://developer.android.com/guide/fragments/create), and loading the `Fragment` to the currently displayed `AppCompatActivity`.

When adding the `ExperienceFragment`, keep in mind that it may not auto size its contents in the same way you'd expect the `ExperienceActivity` to, as the `ExperienceFragment`'s children may not participate meaningfully in the overall layout. In some situations, such as using Judo experiences as row or tiles, you might want to set your container's width and height properties to a hardcoded value.

With that said, using the default options for sizing up your `Fragment` container (such as `match_parent`) should work in most cases.

Inside our `Activity`'s XML:

```xml
<androidx.fragment.app.FragmentContainerView
    android:id="@+id/fragment_container_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

Judo comes with a handy method for creating intents based on a given experience url: `Judo.makeIntent`. You can use this to easily populate intents with the relevant experience data inside your `AppCompatActivity`, for example:

```kotlin
val intent = Judo.makeIntent(
    context = this,
    url = url
)
```

Then, we'll instantiate our fragment, passing in the intent arguments from above. This fragment will be added via `supportFragmentManager`:

```kotlin
val fragment = ExperienceFragment().applyArguments(intent)

supportFragmentManager
    .beginTransaction()
    .add(R.id.fragment_container_view, fragment)
    .commit()
```

Remember to change up the resource id in the code above depending on your own XML and comitting the transaction. As this is a rather simple example, you may prefer to either [commit it in some different way](https://developer.android.com/guide/fragments/transactions) or directly utilize the `fragmentManager.commit { }` helper.

Finally, when done with the experience, you should manually remove the `Fragment` through `supportFragmentManager` as such:

```kotlin
val fragment =
    supportFragmentManager.findFragmentById(R.id.fragment_container_view) ?: TODO()

supportFragmentManager
    .beginTransaction()
    .remove(fragment)
    .commit()
```

And there you have it! Your `ExperienceFragment` should successfully display its contents.

### Sample Code

`activity_example.xml`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    ...>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:gravity="center">

        <Button
            android:id="@+id/launch_experience_button"
            android:text="@string/label_launch_experience"
            ... />

        <Button
            android:id="@+id/remove_experience_button"
            android:text="@string/label_remove_experience" 
            ... />

        <androidx.fragment.app.FragmentContainerView
            android:id="@+id/fragment_container_view"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />
    </LinearLayout>
    
</androidx.constraintlayout.widget.ConstraintLayout>
```

`ExampleMainActivity.kt`:
```kotlin
class ExampleMainActivity : AppCompatActivity() {
    ...

    override fun onCreate(savedInstanceState: Bundle?) {
        ...

        launchButton.setOnClickListener {
            val intent = Judo.makeIntent(
                context = this,
                url = url
            )

            val fragment = ExperienceFragment().applyArguments(intent)

            supportFragmentManager
                .beginTransaction()
                .add(R.id.fragment_container_view, fragment)
                .commit()
        }

        removeButton.setOnClickListener {
            val fragment = supportFragmentManager.findFragmentById(R.id.fragment_container_view)
                ?: TODO()

            supportFragmentManager.beginTransaction().remove(fragment).commit()
        }

        ...
```

</section>
