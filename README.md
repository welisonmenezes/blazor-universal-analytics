Blazor extensions for Analytics. Supported platforms: Google Analytics, GTAG, GTM and Facebook Pixel.<br/>
AspNetCore Version: 5.0

# NuGet Package
https://www.nuget.org/packages/BlazorUniversalAnalytics/

# Configuration

## For Every Tracker

First, import the namespaces in `_Imports.razor`

```
@using BlazorUniversalAnalytics
@using BlazorUniversalAnalytics.BUA
```

Then, add the `BUANavigationTracker` component below your Router in `App.razor`.<br/>
The tracker listens to every navigation change while it's rendered on a page.

```diff
    <Router ... />
+   <NavigationTracker />
```

## Setting up Analytics

Inside your main `Startup`/`Program`, call `AddGoogleAnalytics`. This will configure your GTAG_ID automatically.

```diff
+   builder.Services.AddBUA("YOUR_GTAG_ID", "YOUR_FBPIXEL_ID", "YOUR_GTM_ID");
```

If YOUR_GTM_ID is set, YOUR_GTAG_ID and YOUR_FBPIXEL_ID will be ignored as GTM will manage this for you. Pageview events will be heard if the embed of such scripts exists.

# How to trigger an Analytics Event

```
[Inject]
protected IBUA Analytics { get; set; }

private void IncrementCount()
{
    currentCount++;
    Analytics.TrackEvent("", "", "");
}
```

# 