export function BUAInitGlobals() {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
        window.gtag ||
        function () {
            dataLayer.push(arguments);
        };
}

export function BUAInitializeFacebookPixel(FBPID) {
    !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
            n.callMethod
                ? n.callMethod.apply(n, arguments)
                : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName("head")[0];
        s.appendChild(t, s);
    })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
    );
    fbq("init", FBPID);
}

export function BUAInitializeGoogleAnalytics(GAID) {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GAID;
    document.head.appendChild(script);
    gtag("js", new Date());
    gtag("config", GAID);
}

export function BUATrackNavigation(url, GAID) {
    if (typeof fbq == "function") {
        fbq("track", "PageView");
    }

    if (typeof gtag == "function") {
        var path = url.replace(window.location.origin, "");
        gtag("config", GAID, { page_path: path });
    }
}

export function BUATrackEventsGtag(
    eventName,
    eventValue,
    eventCategory,
    eventLabel
) {
    gtag('event', eventName, {
        'event_category': eventCategory,
        'event_label': eventLabel,
        'value': eventValue,
    });
}

export function BUATrackEventsGtagByObjectValue(
    eventName,
    objectValue
) {
    gtag('event', eventName, objectValue);
}

export function BUATrackEventsFacebookPixel(
    eventName,
    objectValue
) {
    if (typeof objectValue === 'object' && objectValue !== null) {
        fbq('track', eventName, objectValue);
    } else {
        fbq('track', eventName);
    }
}
