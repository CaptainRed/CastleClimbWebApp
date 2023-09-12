using System.Net;
using System.Text.Json;
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using CastleServerlessAWS.DataAccess;
using CastleServerlessAWS.Models;
using MongoDB.Bson.IO;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace CastleServerlessAWS;

public class Functions
{
    /// <summary>
    /// Default constructor that Lambda will invoke.
    /// </summary>
    public Functions()
    {
    }

    /*public async Task<APIGatewayProxyResponse> Handler(APIGatewayProxyRequest request, ILambdaContext context)
    {
        var startup = new Startup();

        var lambdaFunction = startup.Configure(this);

        return await lambdaFunction.FunctionHandlerAsync(request, context);
    }*/

    /// <summary>
    /// A Lambda function to respond to HTTP Get methods from API Gateway
    /// </summary>
    /// <param name="request"></param>
    /// <returns>The API Gateway response.</returns>
    public async Task<APIGatewayProxyResponse> Get(APIGatewayProxyRequest request, ILambdaContext context)
    {
        context.Logger.LogInformation("Get Request\n");

        WeaponDataAccess accWeapons = new WeaponDataAccess();

        List<WeaponModel> weapons = await accWeapons.GetAllWeapons();

        var response = new APIGatewayProxyResponse
        {
            StatusCode = (int)HttpStatusCode.OK,
            Body = JsonSerializer.Serialize(weapons),
            Headers = new Dictionary<string, string> {
                { "Access-Control-Allow-Origin", "*" },
                { "Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token" },
                { "Access-Control-Allow-Methods", "OPTIONS,GET" },
                { "Content-Type", "application/json" } }
        };

        return response;
    }

    public async Task<APIGatewayProxyResponse> Delete(APIGatewayProxyRequest request, ILambdaContext context)
    {
        //context.Logger.LogInformation("Delete Request\n");

        WeaponDataAccess accWeapons = new WeaponDataAccess();

        string weapId = request.QueryStringParameters["Id"];

        WeaponModel temp = new WeaponModel();
        temp.Id = weapId;

        await accWeapons.DeleteWeapon(temp);

        var response = new APIGatewayProxyResponse
        {
            StatusCode = (int)HttpStatusCode.OK,
            Body = JsonSerializer.Serialize(weapId),
            Headers = new Dictionary<string, string> {
                //{ "Access-Control-Allow-Origin", "*" },
                //{ "Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token" },
                //{ "Access-Control-Allow-Methods", "DELETE" },
                { "Access-Control-Allow-Origin", "*" }, // Allow requests from any origin
                { "Access-Control-Allow-Methods", "DELETE" }, // Allow only DELETE method
                { "Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token" },
                { "Content-Type", "application/json" } }
        };

        return response;
    }

    public async Task<APIGatewayProxyResponse> Post(APIGatewayProxyRequest request, ILambdaContext context)
    {
        WeaponDataAccess accWeapons = new WeaponDataAccess();

        LambdaLogger.Log($"Request Body: {request.Body}");

        if (string.IsNullOrEmpty(request.Body))
        {
            return new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Body = "Request body is missing or empty.",
                Headers = new Dictionary<string, string>
            {
                { "Content-Type", "text/plain" }
            }
            };
        }

        var requestBodyJson = JsonSerializer.Deserialize<JsonElement>(request.Body);

        if (!requestBodyJson.TryGetProperty("Name", out var nameProperty) ||
            !requestBodyJson.TryGetProperty("Description", out var descriptionProperty))
        {
            return new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Body = "Invalid JSON data. Required fields 'Name' and 'Description' are missing.",
                Headers = new Dictionary<string, string>
                {
                    { "Content-Type", "text/plain" }
                }
            };
        }

        var name = nameProperty.GetString();
        var description = descriptionProperty.GetString();

        WeaponModel newWeapon = new WeaponModel();
        newWeapon.Name = name;
        newWeapon.Desc = description;

        /*WeaponModel newWeapon = new WeaponModel();
        newWeapon.Name = request.QueryStringParameters["Name"];
        newWeapon.Desc = request.QueryStringParameters["Description"];*/

        await accWeapons.CreateWeapon(newWeapon);

        var response = new APIGatewayProxyResponse
        {
            StatusCode = (int)HttpStatusCode.OK,
            Body = JsonSerializer.Serialize(newWeapon),
            Headers = new Dictionary<string, string> {
                { "Access-Control-Allow-Origin", "*" }, // Allow requests from any origin
                { "Access-Control-Allow-Methods", "OPTIONS,POST" }, // Allow only DELETE method
                { "Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token" },
                { "Content-Type", "application/json" } }
        };

        return response;

    }
}