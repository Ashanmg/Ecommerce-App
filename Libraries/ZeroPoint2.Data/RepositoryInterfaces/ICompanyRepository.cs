using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core;
using ZeroPoint2.Core.Dtos.Admin;
using ZeroPoint2.Core.Entities;

namespace ZeroPoint2.Data
{
    public interface ICompanyRepository
    {
        Task<GridData<List<Company>>> GetAllProducts(int pageNumber, int pageSize);
        Task<Company> InsertCompanyDataAsync(Company company);
        Task<List<CompanyFeature>> InsertCompanyFeatureDataAsync(List<CompanyFeature> companyFeatureList, int companyId);
        Task<bool> InsertCompanyImageDataAsync(List<CompanyImage> companyImageList);
        Task<List<Company>> GetCompanyListForSelect();
        Task<bool> DeleteBulkCompany(CompanyForDeleteDto companyForDeleteDto);
        Task<Company> GetCompanyDetails(int id);
        Task<List<CompanyFeature>> GetCompanyFeaturesByCompanyId(int id);
        Task<CompanyImage> GetCompanyImageByCompanyFeatureId(int id);
        Task<bool> AreProductsAssignedToGivenCompany(List<int> companyIdList);
        Task<List<CompanyImage>> GetCompanyImagesToDelete(List<int> companyIdList);
        Task<bool> DeleteCompanyImages(List<CompanyImage> existingImages);
        Task<bool> DeleteCompanyFeatureByCompany(List<int> companyIdList);
    }
}
