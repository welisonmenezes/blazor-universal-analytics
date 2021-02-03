using System.Threading.Tasks;

public interface IBUA
{
    Task Initialize();

    Task TrackNavigation(string uri);

    Task TrackEventGtag(string eventName, string eventValue, string eventCategory = null, string eventLabel = null);

    Task TrackEventGtag(string eventName, object objectValue = null);

    Task TrackEventFacebookPixel(string eventName, object objectValue = null);

    Task TrackEventGTM(string eventName, object objectValue = null);
}