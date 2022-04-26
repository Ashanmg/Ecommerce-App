using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZeroPoint2.Core;
using ZeroPoint2.Core.Dtos.Admin;
using ZeroPoint2.Core.Entities;

namespace ZeroPoint2.Data
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly DataContext _context;

        #region constructor
        public CompanyRepository(DataContext context)
        {
            _context = context;
        }
        #endregion

        #region Public data services
        public async Task<GridData<List<Company>>> GetAllProducts(int pageNumber, int pageSize)
        {
            var query = _context.Companies.Include(src => src.LogoImage).OrderByDescending(p => p.Id);

            var productlist = await query
                    .Skip(pageSize * (pageNumber - 1))
                    .Take(pageSize)
                    .ToListAsync();

            return new GridData<List<Company>>().CreateGridData(productlist, pageNumber, pageSize, query.Count());
        }

        public async Task<Company> InsertCompanyDataAsync(Company company)
        {
            await _context.Companies.AddAsync(company);
            await _context.SaveChangesAsync();

            return company;
        }

        public async Task<List<CompanyFeature>> InsertCompanyFeatureDataAsync(List<CompanyFeature> companyFeatureList, int companyId)
        {
            foreach (var companyFeature in companyFeatureList)
            {
                companyFeature.CompanyId = companyId;
                companyFeature.CreatedOnUtc = DateTime.UtcNow;
                await _context.CompanyFeatures.AddAsync(companyFeature);
            }
            await _context.SaveChangesAsync();

            return companyFeatureList;
        }

        public async Task<bool> InsertCompanyImageDataAsync(List<CompanyImage> companyImageList)
        {
            foreach (var companyImage in companyImageList)
            {
                await _context.CompanyImages.AddAsync(companyImage);
            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Company>> GetCompanyListForSelect()
        {
            return await _context.Companies.OrderByDescending(p => p.Id).ToListAsync();
        }

        public async Task<bool> DeleteBulkCompany(CompanyForDeleteDto companyForDeleteDto)
        {
            foreach (var companyId in companyForDeleteDto.CompanyIdList)
            {
                // delete the company
                var company = await _context.Companies.Where(c => c.Id == companyId).FirstAsync();
                _context.Companies.Remove(company);
            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Company> GetCompanyDetails(int id)
        {
            return await _context.Companies.Where(c => c.Id == id).Include(c => c.LogoImage).ThenInclude(l => l.CompanyFeature).FirstOrDefaultAsync();
        }

        public async Task<List<CompanyFeature>> GetCompanyFeaturesByCompanyId(int id)
        {
            return await _context.CompanyFeatures.Where(cf => cf.CompanyId == id).ToListAsync();
        }

        public async Task<CompanyImage> GetCompanyImageByCompanyFeatureId(int id)
        {
            return await _context.CompanyImages.Where(ci => ci.CompanyFeatureId == id).FirstOrDefaultAsync();
        }

        public async Task<bool> AreProductsAssignedToGivenCompany(List<int> companyIdList)
        {
            return await _context.Products.Where(p => companyIdList.Contains(p.CompanyId)).CountAsync() > 0;
        }

        public async Task<List<CompanyImage>> GetCompanyImagesToDelete(List<int> companyIdList)
        {
            var companyFeatures = _context.CompanyFeatures.Where(p => companyIdList.Contains(p.CompanyId)).Select(p => p.Id).ToList();

            var existingImages = await _context.CompanyImages.Where(p => companyIdList.Contains((int)p.CompanyId) || companyFeatures.Contains((int)p.CompanyFeatureId)).ToListAsync();

            return existingImages;
        }

        public async Task<bool> DeleteCompanyImages(List<CompanyImage> existingImages)
        {
            _context.CompanyImages.RemoveRange(existingImages);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteCompanyFeatureByCompany(List<int> companyIdList)
        {
            var companyFeatures = _context.CompanyFeatures.Where(p => companyIdList.Contains(p.CompanyId)).ToList();

            if (companyFeatures.Any())
            {
                _context.CompanyFeatures.RemoveRange(companyFeatures);
                return await _context.SaveChangesAsync() > 0;
            }
            return true;
        }
        #endregion
    }
}
