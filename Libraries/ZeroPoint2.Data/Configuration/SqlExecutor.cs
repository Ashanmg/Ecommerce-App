using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using ZeroPoint2.Core;

namespace ZeroPoint2.Data.Configuration
{
    public class SqlExecutor : ISqlExecutor
    {
        private readonly string connectionString;

        public SqlExecutor(IConfiguration config)
        {
            connectionString = config.GetValue<string>("ConnectionConfig:SQLConnection:ConnectionString");
        }

        public async Task ExecuteSQLAsync(Func<IDbConnection, Task> action, IDbCommand command = null, object data = null)
        {
            await ActionRetryer.RetryWhenExceptionAsync(async () =>
            {
                using (var con = new SqlConnection { ConnectionString = connectionString })
                {
                    con.Open();

                    await action(con);
                }
            },
               IsRetryable
            );
        }

        public bool IsRetryable(Exception exceptionTrown)
        {
            return
                (
                    new List<Type>
                    {
                        typeof(SqlException)
                    }
                )
                .Any(e => e == exceptionTrown.GetType());
        }
    }
}
