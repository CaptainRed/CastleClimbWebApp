using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Amazon.Lambda.Core;
using Amazon.Lambda.AspNetCoreServer;
using MongoDB.Driver;
using MongoRestAWS.DataAccess;
using MongoRestAWS.Models;
using Newtonsoft.Json;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace MongoRestAWS
{
    public class Function
    {

        private static readonly IWebHostBuilder HostBuilder = new WebHostBuilder()
            .UseStartup<Startup>()
            .UseLambdaServer();

        public async Task<APIGatewayProxyResponse> FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
        {
            var webHost = HostBuilder.Build();
            var serviceProvider = webHost.Services;

            WeaponDataAccess db = new WeaponDataAccess();
            var weapons = db.GetAllWeapons();
            var response = new
            {
                weapons = weapons
            };
            var responseJson = JsonConvert.SerializeObject(response);

            //Console.WriteLine(responseJson);

            return new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Body = responseJson,
                Headers = new Dictionary<string, string> 
                {
                    { "Access-Control-Allow-Origin", "http://localhost:3000/CastleClimbWebApp" },
                    { "Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token" },
                    { "Access-Control-Allow-Methods", "OPTIONS,POST,GET" },
                    { "Content-Type", "application/json" } 
                }
            };

            //var function = serviceProvider.GetRequiredService<APIGatewayHttpApiV2ProxyFunction>();
            //return await function.FunctionHandlerAsync(request, context);
        }

    }
}
