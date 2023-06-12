using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CastleServerlessAWS.Models;
using MongoDB.Driver;


namespace CastleServerlessAWS.DataAccess
{
    public class WeaponDataAccess
    {
        private const string ConnectionString = "mongodb+srv://sdavis9428:castleclimb@cluster0.o04ygfi.mongodb.net/test";
        private const string DatabaseName = "CastleClimb";
        private const string WeaponCollection = "WeaponCollection";
        private const string CharacterCollection = "CharacterCollection";

        // Access the database
        private IMongoCollection<T> ConnectToMongo<T>(in string collection)
        {
            var client = new MongoClient(ConnectionString);
            var db = client.GetDatabase(DatabaseName);
            return db.GetCollection<T>(collection);
        }

        // Find all items in the weapon collection
        public async Task<List<WeaponModel>> GetAllWeapons()
        {
            var weaponCollection = ConnectToMongo<WeaponModel>(WeaponCollection);
            var results = await weaponCollection.FindAsync(_ => true);
            return results.ToList();
        }

        public async Task<List<WeaponModel>> GetSpecificWeapon(WeaponModel weapon)
        {
            var weaponCollection = ConnectToMongo<WeaponModel>(WeaponCollection);
            var results = await weaponCollection.FindAsync(w => w.Id == weapon.Id);
            return results.ToList();
        }

        // insert new weapon into the database
        public Task CreateWeapon(WeaponModel weapon)
        {
            var weaponCollection = ConnectToMongo<WeaponModel>(WeaponCollection);
            return weaponCollection.InsertOneAsync(weapon);
        }

        public Task UpdateWeapon(WeaponModel weapon)
        {
            var weaponCollection = ConnectToMongo<WeaponModel>(WeaponCollection);
            var filter = Builders<WeaponModel>.Filter.Eq("Id", weapon.Id);
            return weaponCollection.ReplaceOneAsync(filter, weapon, new ReplaceOptions { IsUpsert = true });
        }

        public Task DeleteWeapon(WeaponModel weapon)
        {
            var weaponCollection = ConnectToMongo<WeaponModel>(WeaponCollection);
            return weaponCollection.DeleteOneAsync(w => w.Id == weapon.Id);
        }
    }
}
