using System.Threading.Tasks;

public interface IBUA
{
    Task Initialize();

    Task TrackNavigation(string uri);

    Task TrackEvent(string eventName, string eventValue, string eventCategory = null);
}