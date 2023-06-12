using System;
using System.Collections.Generic;
using System.Text;

using MongoDB.Driver;
using MongoDataAccess.DataAccess;
using MongoDataAccess.Models;

WeaponDataAccess db = new WeaponDataAccess();

//await db.CreateWeapon(new WeaponModel() { Name = "Fire Sword", Desc = "a sword that is on fire"});
var weapons = await db.GetAllWeapons();
/*foreach(var e in weapons)
{
    Console.WriteLine(e.Name);
}*/
//Console.WriteLine(weapons);