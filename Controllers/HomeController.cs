using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.ComponentModel;
using System.Data.Common;
using System.Data;
using System.Dynamic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Microsoft.Data.SqlClient;
using System.IO;
using System;
using Cureunity.Models;
using Cureunity.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.CodeAnalysis.Differencing;

namespace Cureunity.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _db;

        public HomeController(ApplicationDbContext db)
        {
            _db = db;
        }
        [Authorize]
        public IActionResult Index()
        {
            return View();
        }
        [Authorize]
        public IActionResult Home()
        {
            string User = HttpContext.Session.GetString("UserId");
            DataSet dtNew = new DataSet();
            using (var connection = _db.Database.GetDbConnection())
            {
                try
                {
                    connection.Open();
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = "VerifyAdmin";
                        command.CommandType = CommandType.StoredProcedure;


                        command.Parameters.Add(new SqlParameter("@UserID", User));
                        using (var reader = command.ExecuteReader())
                        {
                            var model = Read(reader);
                            DataTable dt1 = ToDataTable(model, "dtList");
                            dtNew.Tables.Add(dt1);
                            ViewBag.usertype = dtNew.Tables[0].Rows[0]["Admin"].ToString();


                        }
                    }
                }
                catch
                {

                }
                finally
                {
                    connection.Close();
                }

            }
            var list = JsonConvert.SerializeObject(dtNew, Formatting.None, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            });

            return View();
        }


        public IActionResult UpsertMedicine(string Medid, string medicine, string description, string image)
        {
            string User = HttpContext.Session.GetString("User");
            DataSet dtNew = new DataSet();
            using (var connection = _db.Database.GetDbConnection())
            {
                try
                {
                    connection.Open();
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = "UpsertMedicine";
                        command.CommandType = CommandType.StoredProcedure;


                        command.Parameters.Add(new SqlParameter("@MedicineID", 1));
                        command.Parameters.Add(new SqlParameter("@MedicineName", medicine));
                        command.Parameters.Add(new SqlParameter("@Description", description));
                        command.Parameters.Add(new SqlParameter("@DiseaseID", Medid));
                        command.Parameters.Add(new SqlParameter("@Image", image));
                        command.Parameters.Add(new SqlParameter("@userID", User));

                        using (var reader = command.ExecuteReader())
                        {
                            var model = Read(reader);
                            DataTable dt1 = ToDataTable(model, "dtList");
                            dtNew.Tables.Add(dt1);
                        }
                    }
                }
                catch
                {

                }
                finally
                {
                    connection.Close();
                }

            }
            var list = JsonConvert.SerializeObject(dtNew, Formatting.None, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            });
            return Content(list, "application/json");
        }


        public IActionResult MedicineNames()
        {
            DataSet dtNew = new DataSet();
            using (var connection = _db.Database.GetDbConnection())
            {
                try
                {
                    connection.Open();
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = "MedicineNames";
                        command.CommandType = CommandType.StoredProcedure;
                        using (var reader = command.ExecuteReader())
                        {
                            var model = Read(reader);
                            DataTable dt1 = ToDataTable(model, "dtList");
                            dtNew.Tables.Add(dt1);
                        }
                    }
                }
                catch
                {

                }
                finally
                {
                    connection.Close();
                }

            }
            var list = JsonConvert.SerializeObject(dtNew, Formatting.None, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            });
            return Content(list, "application/json");
        }


        public IActionResult GetMedicineByDisease(string Disease)
        {
            DataSet dtNew = new DataSet();
            using (var connection = _db.Database.GetDbConnection())
            {
                try
                {
                    connection.Open();
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = "GetMedicineByDisease";
                        command.CommandType = CommandType.StoredProcedure;


                        command.Parameters.Add(new SqlParameter("@Disease", Disease));

                        using (var reader = command.ExecuteReader())
                        {
                            var model = Read(reader);
                            DataTable dt1 = ToDataTable(model, "dtList");
                            dtNew.Tables.Add(dt1);
                        }
                    }
                }
                catch
                {

                }
                finally
                {
                    connection.Close();
                }

            }
            var list = JsonConvert.SerializeObject(dtNew, Formatting.None, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            });
            return Content(list, "application/json");
        }

        public IActionResult ProcessOrder(string MedicineID, string Quantity, string DeliveryAddress)
        {
            DataSet dtNew = new DataSet();
            using (var connection = _db.Database.GetDbConnection())
            {
                try
                {
                    connection.Open();
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = "ProcessOrder";
                        command.CommandType = CommandType.StoredProcedure;


                        command.Parameters.Add(new SqlParameter("@OrderID", 1));
                        command.Parameters.Add(new SqlParameter("@UserID", '1'));
                        command.Parameters.Add(new SqlParameter("@MedicineID", MedicineID));
                        command.Parameters.Add(new SqlParameter("@Quantity", Quantity));
                        command.Parameters.Add(new SqlParameter("@DeliveryAddress", DeliveryAddress));
                        command.Parameters.Add(new SqlParameter("@Status", '1'));

                        using (var reader = command.ExecuteReader())
                        {
                            var model = Read(reader);
                            DataTable dt1 = ToDataTable(model, "dtList");
                            dtNew.Tables.Add(dt1);
                        }
                    }
                }
                catch
                {

                }
                finally
                {
                    connection.Close();
                }

            }
            var list = JsonConvert.SerializeObject(dtNew, Formatting.None, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            });
            return Content(list, "application/json");
        }

        public IActionResult Chat_Support()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        #region ToDataTable
        public static List<Dictionary<string, object>> Read(DbDataReader reader)
        {
            List<Dictionary<string, object>> expandolist = new List<Dictionary<string, object>>();
            foreach (var item in reader)
            {
                IDictionary<string, object> expando = new ExpandoObject();
                foreach (PropertyDescriptor propertyDescriptor in TypeDescriptor.GetProperties(item))
                {
                    var obj = propertyDescriptor.GetValue(item);
                    expando.Add(propertyDescriptor.Name, obj);
                }
                expandolist.Add(new Dictionary<string, object>(expando));
            }
            return expandolist;
        }
        public static DataTable ToDataTable(List<Dictionary<string, object>> list, string TableName)
        {
            DataTable result = new DataTable(TableName);
            if (list.Count == 0)
                return result;

            var columnNames = list.SelectMany(dict => dict.Keys).Distinct();
            result.Columns.AddRange(columnNames.Select(c => new DataColumn(c)).ToArray());
            foreach (Dictionary<string, object> item in list)
            {
                var row = result.NewRow();
                foreach (var key in item.Keys)
                {
                    row[key] = item[key];
                }

                result.Rows.Add(row);
            }

            return result;
        }
        #endregion
    }
}