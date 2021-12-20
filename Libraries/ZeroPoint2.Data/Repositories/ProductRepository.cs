using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
        #endregion
    }
}
