using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using CastleServerlessAWS.DataAccess;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace CastleServerlessAWS
{
    public class Startup
    {

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder.AllowAnyOrigin() // You can also specify specific origins here
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });
        }

        public void Configure(IApplicationBuilder app)
        {

            app.UseRouting();

            app.UseEndpoints(endpoints =>
                endpoints.MapGet("/weapons", async context =>
                {
                    var myService = context.RequestServices.GetRequiredService<WeaponDataAccess>();
                    var objects = await myService.GetAllWeapons();
                    await context.Response.WriteAsJsonAsync(objects);
                })



            );
            // Use CORS policy
            app.UseCors("CorsPolicy");
        }
    }
}
