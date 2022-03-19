using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core;
using ZeroPoint2.Core.Dtos.Admin;
using ZeroPoint2.Helper;

namespace ZeroPoint2.Services
{
    public interface ICompanyService
    {
        Task<ExecutionResponse<GridData<List<CompanyListForViewDto>>>> GetAllCompanies(int pageNumber, int pageSize);
        Task<ExecutionResponse<bool>> RegisterCompany(CompanyForCreationDto companyForCreationDto);
        Task<ExecutionResponse<List<CompanyListForSelectDto>>> GetCompanyListForSelect();
        Task<ExecutionResponse<bool>> DeleteBulkCompany(CompanyForDeleteDto companyForDeleteDto);
    }
}
