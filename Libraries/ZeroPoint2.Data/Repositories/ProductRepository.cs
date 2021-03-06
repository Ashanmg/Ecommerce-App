using Microsoft.EntityFrameworkCore;
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
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;

        #region constructor
        public ProductRepository(DataContext context)
        {
            _context = context;
        }
        #endregion

        #region public data services
        public async Task<Product> InsertSingleProductDataAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<bool> InsertProductImageDataAsync(List<ProductImage> productImages)
        {
            foreach(var productImage in productImages)
            {
                await _context.ProductImages.AddAsync(productImage);
            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<ProductColor>> InsertProductColorData(List<ProductColor> productColors, int productId)
        {
            foreach (var productColor in productColors)
            {
                productColor.ProductId = productId;
                productColor.CreatedOnUtc = DateTime.UtcNow;
                await _context.ProductColors.AddAsync(productColor);
            }
            await _context.SaveChangesAsync();

            return productColors;
        }

        public async Task<bool> InsertProductSizeData(List<ProductSize> productSizeList)
        {
            foreach (var productSize in productSizeList)
            {
                await _context.productSizes.AddAsync(productSize);
            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> InsertProductCombinationData(List<ProductCombination> productCombinationList)
        {
            foreach (var productCombination in productCombinationList)
            {
                await _context.ProductCombinations.AddAsync(productCombination);
            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<ColorType>> GetColorList()
        {
            return await _context.ColorTypes.ToListAsync();
        }

        public async Task<List<Product>> GetProductListByLazyLoad(int pageNumber, int pageSize)
        {
            if (pageNumber != 0)
            {             
                return await _context.Products.Include(src => src.ProductImages).
                    Where(p => p.ShowOnHomePage)
                    .OrderByDescending(p => p.Id)
                    .Skip(pageSize * (pageNumber - 1))
                    .Take(pageSize)
                    .ToListAsync();
            }
            else
            {
                return await _context.Products.OrderBy(p => p.Id).ToListAsync();
            }
        }

        public async Task<GridData<List<Product>>> GetAllProducts(int pageNumber, int pageSize)
        {
            var query = _context.Products.Include(src => src.ProductImages).Include(src => src.ProductColors).OrderByDescending(p => p.Id);

            var productlist = await query
                    .Skip(pageSize * (pageNumber - 1))
                    .Take(pageSize)
                    .ToListAsync();

            return new GridData<List<Product>>().CreateGridData(productlist, pageNumber, pageSize, query.Count());
        }

        public async Task<List<TaxCategory>> GetTaxCategoriesForSelect()
        {
            return await _context.TaxCategories.ToListAsync();
        }

        public async Task<bool> InsertProductSpecificationDataAsync(List<ProductSpecification> productSpecificationList)
        {
            foreach (var productSpecification in productSpecificationList)
            {
                await _context.ProductSpecifications.AddAsync(productSpecification);
            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteBulkProduct(ProductForDeleteDto productForDeleteDto)
        {
            foreach (var productId in productForDeleteDto.ProductIdList)
            {
                var product = await _context.Products.Where(p => p.Id == productId).FirstAsync();
                _context.Products.Remove(product);
            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Product> GetProductDetailForEditByProductId(int id)
        {
            return await _context.Products.Where((p) => p.Id == id)
                .Include(p => p.ProductImages)
                .Include(p => p.ProductColors)
                .ThenInclude(p => p.ProductSizes)
                .Include(p => p.ProductSpecifications)
                .FirstOrDefaultAsync();
        }

        public async Task<Product> UpdateSingleProductDataAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<List<ProductColor>> DeleteAndUpdateProductColorData(List<ProductColor> productColors, int productId)
        {
            var existingProductColors = await _context.ProductColors.Where(pc => pc.ProductId == productId).ToListAsync();

            var existingSizesList = await _context.productSizes
                .Where(ps => existingProductColors.Select(p => p.Id).Contains(ps.ProductColorId)).ToListAsync();
            _context.productSizes.RemoveRange(existingSizesList);
            _context.ProductColors.RemoveRange(existingProductColors);

            foreach (var productColor in productColors)
            {
                productColor.ProductId = productId;
                productColor.CreatedOnUtc = DateTime.UtcNow;
                await _context.ProductColors.AddAsync(productColor);
            }
            await _context.SaveChangesAsync();

            return productColors;
        }

        public async Task<bool> UpdateProductCombinationData(List<ProductCombination> productCombinationList, int productId)
        {
            var existingProductCombinations = await _context.ProductCombinations.Where( pc => pc.ProductId == productId).ToListAsync();

            _context.ProductCombinations.RemoveRange(existingProductCombinations);

            foreach (var productCombination in productCombinationList)
            {
                await _context.ProductCombinations.AddAsync(productCombination);
            }

            return await _context.SaveChangesAsync() > 0;
        }

        public Task<List<ProductImage>> GetProductImagesByProductId(int productId)
        {
             return _context.ProductImages.Where(pc => pc.ProductId == productId).ToListAsync();
        }

        public async Task<bool> UpdateProductImageDataAsync(List<ProductImage> productImagesList, List<ProductImage> existingImages)
        {
            _context.ProductImages.RemoveRange(existingImages);

            foreach (var productImage in productImagesList)
            {
                await _context.ProductImages.AddAsync(productImage);
            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateProductSpecificationDataAsync(List<ProductSpecification> productSpecificationList, int productId)
        {
            var existingSpecifications = await _context.ProductSpecifications.Where(pc => pc.ProductId == productId).ToListAsync();
            _context.ProductSpecifications.RemoveRange(existingSpecifications);

            foreach (var productSpecification in productSpecificationList)
            {
                await _context.ProductSpecifications.AddAsync(productSpecification);
            }

            return await _context.SaveChangesAsync() > 0;
        }
        #endregion
    }
}
