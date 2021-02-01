Blazor extensions for Analytics. Supported platforms: Google Analytics, GTAG, GTM and Facebook Pixel.
AspNetCore Version: 5.0

# NuGet Package
https://www.nuget.org/packages/BlazorUniversalAnalytics/

# GitHub Repository
https://github.com/welisonmenezes/blazor-universal-analytics

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
+   <BUANavigationTracker />
```

## Setting up Analytics

Inside your main `Startup`/`Program`, call `AddBUA`. This will configure your GTAG_ID automatically.

```diff
+   builder.Services.AddBUA("YOUR_GTAG_ID", "YOUR_FBPIXEL_ID", "YOUR_GTM_ID");
```

If YOUR_GTM_ID is set, YOUR_GTAG_ID and YOUR_FBPIXEL_ID will be ignored as GTM will manage this for you. Pageview events will be heard if the embed of such scripts exists.

# How to trigger an Analytics Event

See below an example:

```
@page "/counter"
@using Demo.Shared

<h1>Counter</h1>

<p>Current count: @currentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    [Inject]
    protected IBUA Analytics { get; set; }

    private WeatherForecast SampleData = new WeatherForecast
    {
        Date = DateTime.Now,
        TemperatureC = 30,
        Summary = "It's a hot day"
    };

    private void IncrementCount()
    {
        currentCount++;

        Analytics.TrackEventGtag("event-name", "event-value", "event-category", "event-label");

        // IMPORTANT: The object SampleDate are used below just as an example.
        // You must to check the correct object properties on respective Analytic tool you are using.

        Analytics.TrackEventGtag("event-name", SampleData);
        Analytics.TrackEventFacebookPixel("event-name", SampleData);
    }
}
```

# 