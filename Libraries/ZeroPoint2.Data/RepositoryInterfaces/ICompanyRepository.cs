using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core;
using ZeroPoint2.Core.Entities;

namespace ZeroPoint2.Data
{
    public interface ICompanyRepository
    {
        Task<GridData<List<Company>>> GetAllProducts(int pageNumber, int pageSize);
        Task<Company> InsertCompanyDataAsync(Company company);
        Task<List<CompanyFeature>> InsertCompanyFeatureDataAsync(List<CompanyFeature> companyFeatureList, int companyId);
        Task<bool> InsertCompanyImageDataAsync(List<CompanyImage> companyImageList);
    }
}
