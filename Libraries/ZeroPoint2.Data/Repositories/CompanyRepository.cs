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
                var company = await _context.Companies.Where(c => c.Id == companyId).FirstAsync();
                _context.Companies.Remove(company);
            }

            return await _context.SaveChangesAsync() > 0;
        }
        #endregion
    }
}
