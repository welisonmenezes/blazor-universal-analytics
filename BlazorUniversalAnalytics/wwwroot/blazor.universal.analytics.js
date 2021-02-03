export function BUAInitGlobals() {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
        window.gtag ||
        function () {
            dataLayer.push(arguments);
        };
    window.isGA = false;
    window.isFBP = false;
    window.isGTM = false;
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
    fbq("track", "PageView");
    window.isFBP = true;
}

export function BUAInitializeGoogleAnalytics(GAID) {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GAID;
    document.head.appendChild(script);
    gtag("js", new Date());
    gtag("config", GAID);
    window.isGA = true;
}

export function BUAInitializeGTM(GTMID) {
    (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js",
        });
        var f = d.getElementsByTagName("head")[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.appendChild(j, f);
        dataLayer.push({ event: "pageview" });
        window.isGTM = true;
    })(window, document, "script", "dataLayer", GTMID);
}

export function BUATrackNavigation(url, GAID) {
    GTMPageView(url);
    FacebookPixelPageView();
    GoogleAnalyticsPageView(url, GAID);
}

export function BUATrackEventsGtag(
    eventName,
    eventValue,
    eventCategory,
    eventLabel
) {
    gtag("event", eventName, {
        event_category: eventCategory,
        event_label: eventLabel,
        value: eventValue,
    });
}

export function BUATrackEventsGtagByObjectValue(eventName, objectValue) {
    gtag("event", eventName, objectValue);
}

export function BUATrackEventsFacebookPixel(eventName, objectValue) {
    if (typeof objectValue === "object" && objectValue !== null) {
        fbq("track", eventName, objectValue);
    } else {
        fbq("track", eventName);
    }
}

export function BUATrackEventsGTM(eventName, objectValue) {
    if (eventName !== null && objectValue !== null) {
        objectValue['event'] = eventName;
        dataLayer.push(objectValue);
    }
}

function GetPath(url) {
    return url.replace(window.location.origin, "");
}

function FacebookPixelPageView(callFromGTM = false) {
    if ((window.isFBP || callFromGTM) && typeof fbq == "function") {
        fbq("track", "PageView");
    }
}

function GoogleAnalyticsPageView(url, GAID, callFromGTM) {
    if ((window.isGA || callFromGTM) && typeof gtag == "function") {
        gtag("config", GAID, { page_path: GetPath(url) });
    }
}

function GTMPageView(url) {
    if (window.isGTM) {
        dataLayer.push({
            event: "pageview",
            page: {
                path: GetPath(url)
            }
        });
    }
}
