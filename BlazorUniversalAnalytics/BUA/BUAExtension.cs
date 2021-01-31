using Microsoft.Extensions.DependencyInjection;

public static class BUAExtensions
{
    public static IServiceCollection AddBUA(this IServiceCollection services) => AddBUA(services, null, null, null);
    public static IServiceCollection AddBUA(this IServiceCollection services, string GAID) => AddBUA(services, GAID, null, null);
    public static IServiceCollection AddBUA(this IServiceCollection services, string GAID, string FBPID) => AddBUA(services, GAID, FBPID, null);

    public static IServiceCollection AddBUA(
        this IServiceCollection services,
        string GAID,
        string FBPID,
        string GTMID)
    {
        return services.AddScoped<IBUA>(p =>
        {
            var BUA = ActivatorUtilities.CreateInstance<BUAStrategy>(p);

            BUA.Configure(GAID, FBPID, GTMID);

            return BUA;
        });
    }
}