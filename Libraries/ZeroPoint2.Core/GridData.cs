using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core
{
    public class GridData<T>
    {
        public T Data { get; set; }
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }

        public GridData<T> CreateGridData(T result, int pageNumber, int pageSize, int totalCount)
        {
            return new GridData<T>()
            {
                Data = result,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount
            };
        }
    }
}
