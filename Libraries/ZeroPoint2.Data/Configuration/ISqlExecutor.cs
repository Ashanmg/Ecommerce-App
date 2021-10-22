using System;
using System.Data;
using System.Threading.Tasks;

namespace ZeroPoint2.Data.Configuration
{
    public interface ISqlExecutor
    {
        Task ExecuteSQLAsync(Func<IDbConnection, Task> action, IDbCommand command = null, object data = null);

        bool IsRetryable(Exception exceptionTrown);
    }
}
