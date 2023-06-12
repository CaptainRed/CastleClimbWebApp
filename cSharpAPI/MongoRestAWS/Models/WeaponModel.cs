using System;
using System.Collections.Generic;
using System.Text;

using MongoDB.Driver;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson; // 21:20

namespace MongoRestAWS.Models
{
    public class WeaponModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; }
    }
}
