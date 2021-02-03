using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace Demo.Client
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });


            // Parameters (GAID, FACEBOOKPIXELID, GTMID)
            //builder.Services.AddBUA("UA-XXXXXXXX-X", "XXXXXXXXXXXXXXX", null);
            builder.Services.AddBUA(null, null, "GTM-XXXXXXX");

            await builder.Build().RunAsync();
        }
    }
}
