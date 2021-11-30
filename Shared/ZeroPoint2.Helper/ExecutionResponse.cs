using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Helper
{
    public class ExecutionResponse<T>
    {
        public ExecutionStatus RequestStatus { get; set; }
        public T Result { get; set; }
        public Object ExceptionData { get; set; }
        public string Message { get; set; }

        public ExecutionResponse()
        {
            RequestStatus = ExecutionStatus.None;
        }
    }

    public enum ExecutionStatus
    {
        None = 0,
        Success = 1,
        Fail = 2,
        Error = 3
    }
}
