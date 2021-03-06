using System;
using System.Threading.Tasks;
using Microsoft.JSInterop;

public sealed class BUAStrategy : IBUA
{
    private readonly IJSRuntime _jsRuntime;

    private string _GAID = null;
    private string _FBPID = null;
    private string _GTMID = null;
    public bool _isInitialized = false;

    private Task<IJSObjectReference> _module;
    private Task<IJSObjectReference> Module => _module ??= _jsRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BlazorUniversalAnalytics/blazor.universal.analytics.js").AsTask();

    public BUAStrategy(
        IJSRuntime jsRuntime)
    {
        _jsRuntime = jsRuntime;
    }

    public void Configure(string GAID, string FBPID, string GTMID)
    {
        _GAID = GAID;
        _FBPID = FBPID;
        _GTMID = GTMID;
    }

    public async Task Initialize()
    {
        var module = await Module;

        await module.InvokeAsync<string>("BUAInitGlobals");

        if (HasToStartFacebookPixel())
        {
            await module.InvokeAsync<string>("BUAInitializeFacebookPixel", _FBPID);
        }

        if (HasToStartGoogleAnalytics())
        {
            await module.InvokeAsync<string>("BUAInitializeGoogleAnalytics", _GAID);
        }

        if (HasToStartGTM())
        {
            await module.InvokeAsync<string>("BUAInitializeGTM", _GTMID);
        }
    }

    public async Task TrackNavigation(string uri)
    {
        var module = await Module;
        await module.InvokeAsync<string>("BUATrackNavigation", uri, _GAID);
    }

    public async Task TrackEventGtag(
        string eventName,
        string eventValue,
        string eventCategory = null,
        string eventLabel = null)
    {
        var module = await Module;
        await module.InvokeAsync<string>("BUATrackEventsGtag", eventName, eventValue, eventCategory, eventLabel);
    }

    public async Task TrackEventGtag(
        string eventName,
        object objectValue = null)
    {
        var module = await Module;
        await module.InvokeAsync<string>("BUATrackEventsGtagByObjectValue", eventName, objectValue);
    }

    public async Task TrackEventFacebookPixel(
        string eventName,
        object objectValue = null)
    {
        var module = await Module;
        await module.InvokeAsync<string>("BUATrackEventsFacebookPixel", eventName, objectValue);
    }

    public async Task TrackEventGTM(
        string eventName,
        object objectValue = null)
    {
        var module = await Module;
        await module.InvokeAsync<string>("BUATrackEventsGTM", eventName, objectValue);
    }

    private bool HasToStartFacebookPixel()
    {
        return !String.IsNullOrEmpty(_FBPID);
    }

    private bool HasToStartGoogleAnalytics()
    {
        return !String.IsNullOrEmpty(_GAID);
    }

    private bool HasToStartGTM()
    {
        return !String.IsNullOrEmpty(_GTMID);
    }
}
