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
    public interface IProductRepository
    {
        Task<Product> InsertSingleProductDataAsync(Product product);
        Task<bool> InsertProductImageDataAsync(List<ProductImage> productImages);
        Task<List<ProductColor>> InsertProductColorData(List<ProductColor> productColors, int productId);
        Task<bool> InsertProductSizeData(List<ProductSize> productSizeList);
        Task<bool> InsertProductCombinationData(List<ProductCombination> productCombinationList);
        Task<List<ColorType>> GetColorList();
        Task<List<Product>> GetProductListByLazyLoad(int pageNumber, int pageSize);
        Task<GridData<List<Product>>> GetAllProducts(int pageNumber, int pageSize);
        Task<List<TaxCategory>> GetTaxCategoriesForSelect();
        Task<bool> InsertProductSpecificationDataAsync(List<ProductSpecification> productSpecificationList);
        Task<bool> DeleteBulkProduct(ProductForDeleteDto productForDeleteDto);
        Task<Product> GetProductDetailForEditByProductId(int id);
        Task<Product> UpdateSingleProductDataAsync(Product product);
        Task<List<ProductColor>> DeleteAndUpdateProductColorData(List<ProductColor> productColors, int productId);
        Task<bool> UpdateProductCombinationData(List<ProductCombination> productCombinationList, int productId);
        Task<List<ProductImage>> GetProductImagesByProductId(int productId);
        Task<bool> UpdateProductImageDataAsync(List<ProductImage> productImagesList, List<ProductImage> existingImages);
        Task<bool> UpdateProductSpecificationDataAsync(List<ProductSpecification> productSpecificationList, int productId);
    }
}
