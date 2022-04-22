using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core;
using ZeroPoint2.Core.Dtos;
using ZeroPoint2.Core.Dtos.Admin;
using ZeroPoint2.Core.Entities;
using ZeroPoint2.Data;
using ZeroPoint2.Helper;

namespace ZeroPoint2.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly Cloudinary _cloudinary;
        #region fields
        #endregion

        #region constructor
        public ProductService(IProductRepository productRepository,
            ICategoryRepository categoryRepository,
            IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }
        #endregion

        #region public services
        public async Task<ExecutionResponse<bool>> UploadSingleProduct(UploadProductForCreationDto productForCreationDto)
        {
            ExecutionResponse<bool> response = new ExecutionResponse<bool>();

            try
            {
                // insert the product details
                var product = _mapper.Map<Product>(productForCreationDto);

                product.DisplayOrder = 1;
                product.Published = true;
                product.Sku = SkuGenerator.GenerateStyleCode(9);
                product.CreatedOnUtc = DateTime.UtcNow;

                product = await _productRepository.InsertSingleProductDataAsync(product);

                if (product.Id == 0)
                {
                    response.Result = false;
                    response.RequestStatus = ExecutionStatus.Error;
                    response.Message = "Product details could not be inserted successfully.";

                    return response;
                }
                // then insert the colors and sizes if the product is variant
                if (product.IsVariant)
                {
                    var productColors = _mapper.Map<List<ProductColor>>(productForCreationDto.Colors);

                    productColors = await _productRepository.InsertProductColorData(productColors, product.Id);

                    if (productColors.Any(pc => pc.Id == 0))
                    {
                        response.Result = false;
                        response.RequestStatus = ExecutionStatus.Error;
                        response.Message = "Product colors could not be inserted successfully.";

                        return response;
                    }

                    if (!string.IsNullOrEmpty(productForCreationDto.Sizes))
                    {
                        var sizeList = productForCreationDto.Sizes.Split(",");

                        var productSizeList = new List<ProductSize>();
                        var productCombinationList = new List<ProductCombination>();

                        foreach (var color in productColors)
                        {
                            foreach (var size in sizeList)
                            {
                                var productSize = new ProductSize();
                                var productCombination = new ProductCombination();

                                // create product size data
                                productSize.Size = size;
                                productSize.ProductColorId = color.Id;
                                productSize.CreatedOnUtc = DateTime.UtcNow;

                                // create product combination data
                                productCombination.ColorName = color.ColorName;
                                productCombination.ColorValue = color.ColorHashValue;
                                productCombination.ProductId = product.Id;
                                productCombination.Size = size;
                                productCombination.Sku = SkuGenerator.GenerateVariantSku(product.Sku, color.ColorName, size);
                                productCombination.CreatedOnUtc = DateTime.UtcNow;

                                productSizeList.Add(productSize);
                                productCombinationList.Add(productCombination);
                            }
                        }

                        // insert product sizes
                        response.Result = await _productRepository.InsertProductSizeData(productSizeList);

                        if (!response.Result)
                        {
                            response.RequestStatus = ExecutionStatus.Error;
                            response.Message = "Product sizes could not be inserted successfully.";

                            return response;
                        }

                        // insert product combinations
                        response.Result = await _productRepository.InsertProductCombinationData(productCombinationList);
                        if (!response.Result)
                        {
                            response.RequestStatus = ExecutionStatus.Error;
                            response.Message = "Product combinations could not be inserted successfully.";

                            return response;
                        }
                    }
                }

                // then upload images to cloudinary and get the public ids
                var fileList = productForCreationDto.ProductImages;

                var productImagesList = new List<ProductImage>();

                if (fileList != null)
                {
                    foreach (var file in fileList)
                    {
                        var uploadResult = new ImageUploadResult();

                        var productImagesForCreationDto = new ProductImageForCreationDto();

                        if (file.Length > 0)
                        {
                            using (var stream = file.OpenReadStream())
                            {
                                var uploadParams = new ImageUploadParams()
                                {
                                    File = new FileDescription(file.Name, stream),
                                    Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                                };

                                uploadResult = await _cloudinary.UploadAsync(uploadParams);
                            }
                        }

                        productImagesForCreationDto.ImageUrl = uploadResult.Url.ToString();
                        productImagesForCreationDto.PublicId = uploadResult.PublicId;
                        productImagesForCreationDto.DateAddedOnUtc = DateTime.UtcNow;
                        productImagesForCreationDto.ProductId = product.Id;

                        var productImage = _mapper.Map<ProductImage>(productImagesForCreationDto);

                        if (!productImagesList.Any(p => p.IsMain))
                        {
                            productImage.IsMain = true;
                        }

                        productImagesList.Add(productImage);
                    }

                    response.Result = await _productRepository.InsertProductImageDataAsync(productImagesList);

                    if (!response.Result)
                    {
                        response.RequestStatus = ExecutionStatus.Error;
                        response.Message = "Product images could not be inserted successfully.";

                        return response;
                    }
                }


                // then insert product specification
                List<ProductSpecification> productSpecificationList = new List<ProductSpecification>();

                if (!string.IsNullOrEmpty(productForCreationDto.SizeGuide))
                {
                    ProductSpecification productSpecification = new ProductSpecification()
                    {
                        SpecificationType = "SizeGuide",
                        SpecificationValue = productForCreationDto.SizeGuide,
                        CreatedOnUtc = DateTime.UtcNow,
                        ProductId = product.Id
                    };

                    productSpecificationList.Add(productSpecification);
                }

                if (!string.IsNullOrEmpty(productForCreationDto.ProductSpecification))
                {
                    ProductSpecification productSpecification = new ProductSpecification()
                    {
                        SpecificationType = "ProductSpecification",
                        SpecificationValue = productForCreationDto.ProductSpecification,
                        CreatedOnUtc = DateTime.UtcNow,
                        ProductId = product.Id
                    };

                    productSpecificationList.Add(productSpecification);
                }

                if (productSpecificationList.Count > 0)
                {
                    response.Result = await _productRepository.InsertProductSpecificationDataAsync(productSpecificationList);

                    if (!response.Result)
                    {
                        response.RequestStatus = ExecutionStatus.Error;
                        response.Message = "Product specifications could not be inserted successfully.";

                        return response;
                    }
                }

                response.RequestStatus = ExecutionStatus.Success;
                response.Message = "Product data were inserted successfully.";
            }
            catch (Exception ex)
            {
                response.Message = "Internal server error.";
                response.ExceptionData = ex.Message;
                response.RequestStatus = ExecutionStatus.Error;
            }

            return response;
        }

        public async Task<ExecutionResponse<List<ColorTypeforListDto>>> GetColorList()
        {
            ExecutionResponse<List<ColorTypeforListDto>> response = new ExecutionResponse<List<ColorTypeforListDto>>();

            try
            {
                List<ColorType> colorsList = await _productRepository.GetColorList();

                response.Result = _mapper.Map<List<ColorTypeforListDto>>(colorsList);
                response.RequestStatus = ExecutionStatus.Success;
            }
            catch (Exception ex)
            {
                response.Message = "Internal server error.";
                response.ExceptionData = ex.Message;
                response.RequestStatus = ExecutionStatus.Error;
            }

            return response;
        }

        public async Task<ExecutionResponse<List<ProductForListDto>>> GetProductListByLazyLoad(int pageNumber, int pageSize)
        {
            ExecutionResponse<List<ProductForListDto>> response = new ExecutionResponse<List<ProductForListDto>>();
            try
            {
                List<Product> productList = await _productRepository.GetProductListByLazyLoad(pageNumber, pageSize);

                response.Result = _mapper.Map<List<ProductForListDto>>(productList);
                response.RequestStatus = ExecutionStatus.Success;
            }
            catch (Exception ex)
            {
                response.Message = "Internal server error.";
                response.ExceptionData = ex.Message;
                response.RequestStatus = ExecutionStatus.Error;
            }

            return response;
        }

        public async Task<ExecutionResponse<GridData<List<ProductListForViewDto>>>> GetAllProducts(int pageNumber, int pageSize)
        {
            ExecutionResponse<GridData<List<ProductListForViewDto>>> response = new ExecutionResponse<GridData<List<ProductListForViewDto>>>();
            try
            {
                GridData<List<Product>> productList = await _productRepository.GetAllProducts(pageNumber, pageSize);

                response.Result = _mapper.Map<GridData<List<ProductListForViewDto>>>(productList);
                response.RequestStatus = ExecutionStatus.Success;
            }
            catch (Exception ex)
            {
                response.Message = "Internal server error.";
                response.ExceptionData = ex.Message;
                response.RequestStatus = ExecutionStatus.Error;
            }

            return response;
        }

        public async Task<ExecutionResponse<List<TaxCategoriesForSelectDto>>> GetTaxCategoriesForSelect()
        {
            ExecutionResponse<List<TaxCategoriesForSelectDto>> response = new ExecutionResponse<List<TaxCategoriesForSelectDto>>();
            try
            {
                List<TaxCategory> taxCategories = await _productRepository.GetTaxCategoriesForSelect();

                response.Result = _mapper.Map<List<TaxCategoriesForSelectDto>>(taxCategories);
                response.RequestStatus = ExecutionStatus.Success;
            }
            catch (Exception ex)
            {
                response.Message = "Internal server error.";
                response.ExceptionData = ex.Message;
                response.RequestStatus = ExecutionStatus.Error;
            }

            return response;
        }

        public async Task<ExecutionResponse<bool>> DeleteBulkProduct(ProductForDeleteDto productForDeleteDto)
        {
            ExecutionResponse<bool> response = new ExecutionResponse<bool>();
            try
            {
                bool isDeleted = await _productRepository.DeleteBulkProduct(productForDeleteDto);

                if (isDeleted)
                {
                    response.Result = isDeleted;
                    response.RequestStatus = ExecutionStatus.Success;
                }
                else
                {
                    response.Result = isDeleted;
                    response.RequestStatus = ExecutionStatus.Fail;
                    response.Message = "One or more company can not be deleted. Please try again.";
                }
            }
            catch (Exception ex)
            {
                response.Message = "Internal server error.";
                response.ExceptionData = ex.Message;
                response.RequestStatus = ExecutionStatus.Error;
            }

            return response;
        }

        public async Task<ExecutionResponse<GetProductDetailForEditDto>> GetProductDetailForEdit(int id)
        {
            ExecutionResponse<GetProductDetailForEditDto> response = new ExecutionResponse<GetProductDetailForEditDto>();
            try
            {
                Product prodcutDetails = await _productRepository.GetProductDetailForEditByProductId(id);

                if (prodcutDetails != null)
                {
                    var detailDto = new GetProductDetailForEditDto();

                    // product information mapping
                    detailDto.ProductInformation = await GetProductInformationDto(prodcutDetails);

                    // product shipping
                    detailDto.Shipping = GetShippingDto(prodcutDetails);

                    // product price mapping
                    detailDto.Price = GetPriceDto(prodcutDetails);

                    // product inventory mapping
                    detailDto.Inventory = GetInventoryDto(prodcutDetails);

                    // product images mapping
                    detailDto.Images = GetProductImageDto(prodcutDetails);

                    // product specification mapping
                    detailDto.ProductAttributes = GetProductAttributeDto(prodcutDetails);

                    response.Result = detailDto;
                    response.RequestStatus = ExecutionStatus.Success;
                }
                else
                {
                    response.RequestStatus = ExecutionStatus.Fail;
                    response.Message = "Product can not be found. Please try again.";
                }
            }
            catch (Exception ex)
            {
                response.Message = "Internal server error.";
                response.ExceptionData = ex.Message;
                response.RequestStatus = ExecutionStatus.Error;
            }

            return response;
        }

        public async Task<ExecutionResponse<bool>> UpdateProduct(UploadProductForCreationDto productForCreationDto)
        {
            ExecutionResponse<bool> response = new ExecutionResponse<bool>();

            try
            {
                //validate the product id is existed
                var currentProductDetails = await _productRepository.GetProductDetailForEditByProductId(productForCreationDto.Id);

                if (currentProductDetails != null)
                {
                    // insert the product details
                    var product = _mapper.Map<UploadProductForCreationDto, Product>(productForCreationDto, currentProductDetails);

                    product = await _productRepository.UpdateSingleProductDataAsync(product);

                    // then update the colors and sizes if the product is variant
                    if (product.IsVariant)
                    {
                        
                        var productColors = _mapper.Map<List<ProductColor>>(productForCreationDto.Colors);

                        // delete existing product colors and Insert update data.
                        productColors = await _productRepository.DeleteAndUpdateProductColorData(productColors, product.Id);

                        if (productColors.Any(pc => pc.Id == 0))
                        {
                            response.Result = false;
                            response.RequestStatus = ExecutionStatus.Error;
                            response.Message = "Product colors could not be updated successfully.";

                            return response;
                        }

                        if (!string.IsNullOrEmpty(productForCreationDto.Sizes))
                        {
                            var sizeList = productForCreationDto.Sizes.Split(",");

                            var productSizeList = new List<ProductSize>();
                            var productCombinationList = new List<ProductCombination>();

                            foreach (var color in productColors)
                            {
                                foreach (var size in sizeList)
                                {
                                    var productSize = new ProductSize();
                                    var productCombination = new ProductCombination();

                                    // create product size data
                                    productSize.Size = size;
                                    productSize.ProductColorId = color.Id;
                                    productSize.CreatedOnUtc = DateTime.UtcNow;

                                    // create product combination data
                                    productCombination.ColorName = color.ColorName;
                                    productCombination.ColorValue = color.ColorHashValue;
                                    productCombination.ProductId = product.Id;
                                    productCombination.Size = size;
                                    productCombination.Sku = SkuGenerator.GenerateVariantSku(product.Sku, color.ColorName, size);
                                    productCombination.CreatedOnUtc = DateTime.UtcNow;

                                    productSizeList.Add(productSize);
                                    productCombinationList.Add(productCombination);
                                }
                            }

                            // insert product sizes
                            response.Result = await _productRepository.InsertProductSizeData(productSizeList);

                            if (!response.Result)
                            {
                                response.RequestStatus = ExecutionStatus.Error;
                                response.Message = "Product sizes could not be updated successfully.";

                                return response;
                            }

                            // update product combinations
                            response.Result = await _productRepository.UpdateProductCombinationData(productCombinationList, product.Id);
                            if (!response.Result)
                            {
                                response.RequestStatus = ExecutionStatus.Error;
                                response.Message = "Product combinations could not be updated successfully.";

                                return response;
                            }
                        }
                    }

                    // delete existing product images from db and cloudinary
                    List<ProductImage> existingImages = await _productRepository.GetProductImagesByProductId(product.Id);

                    if (existingImages != null && existingImages.Count > 0)
                    {
                        // first delete the images from cloudinary
                        foreach(var image in existingImages)
                        {
                            DeletionParams destroyParams = new DeletionParams(image.PublicId)
                            {
                                ResourceType = ResourceType.Image
                            };

                            DeletionResult destroyResult = _cloudinary.Destroy(destroyParams);
                        }
                    }

                    // then upload images to cloudinary and get the public ids
                    var fileList = productForCreationDto.ProductImages;

                    var productImagesList = new List<ProductImage>();

                    foreach (var file in fileList)
                    {
                        var uploadResult = new ImageUploadResult();

                        var productImagesForCreationDto = new ProductImageForCreationDto();

                        if (file.Length > 0)
                        {
                            using (var stream = file.OpenReadStream())
                            {
                                var uploadParams = new ImageUploadParams()
                                {
                                    File = new FileDescription(file.Name, stream),
                                    Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                                };

                                uploadResult = await _cloudinary.UploadAsync(uploadParams);
                            }
                        }

                        productImagesForCreationDto.ImageUrl = uploadResult.Url.ToString();
                        productImagesForCreationDto.PublicId = uploadResult.PublicId;
                        productImagesForCreationDto.DateAddedOnUtc = DateTime.UtcNow;
                        productImagesForCreationDto.ProductId = product.Id;

                        var productImage = _mapper.Map<ProductImage>(productImagesForCreationDto);

                        if (!productImagesList.Any(p => p.IsMain))
                        {
                            productImage.IsMain = true;
                        }

                        productImagesList.Add(productImage);
                    }

                    response.Result = await _productRepository.UpdateProductImageDataAsync(productImagesList, existingImages);

                    if (!response.Result)
                    {
                        response.RequestStatus = ExecutionStatus.Error;
                        response.Message = "Product images could not be updated successfully.";

                        return response;
                    }

                    // then update product specification
                    List<ProductSpecification> productSpecificationList = new List<ProductSpecification>();

                    if (!string.IsNullOrEmpty(productForCreationDto.SizeGuide))
                    {
                        ProductSpecification productSpecification = new ProductSpecification()
                        {
                            SpecificationType = "SizeGuide",
                            SpecificationValue = productForCreationDto.SizeGuide,
                            CreatedOnUtc = DateTime.UtcNow,
                            ProductId = product.Id
                        };

                        productSpecificationList.Add(productSpecification);
                    }

                    if (!string.IsNullOrEmpty(productForCreationDto.ProductSpecification))
                    {
                        ProductSpecification productSpecification = new ProductSpecification()
                        {
                            SpecificationType = "ProductSpecification",
                            SpecificationValue = productForCreationDto.ProductSpecification,
                            CreatedOnUtc = DateTime.UtcNow,
                            ProductId = product.Id
                        };

                        productSpecificationList.Add(productSpecification);
                    }

                    if (productSpecificationList.Count > 0)
                    {
                        response.Result = await _productRepository.UpdateProductSpecificationDataAsync(productSpecificationList, product.Id);

                        if (!response.Result)
                        {
                            response.RequestStatus = ExecutionStatus.Error;
                            response.Message = "Product specifications could not be updated successfully.";

                            return response;
                        }
                    }

                    response.RequestStatus = ExecutionStatus.Success;
                    response.Message = "Product data were inserted successfully.";
                }
                else
                {

                }
                
            }
            catch (Exception ex)
            {
                response.Message = "Internal server error.";
                response.ExceptionData = ex.Message;
                response.RequestStatus = ExecutionStatus.Error;
            }

            return response;
        }
        #endregion

        #region private Mapping
        private async Task<ProductInformationDto> GetProductInformationDto(Product product)
        {
            var productInformationDto = new ProductInformationDto();

            productInformationDto.Id = product.Id;
            productInformationDto.Name = product.Name;
            productInformationDto.FullDescription = product.FullDescription;
            productInformationDto.MetaDescription = product.MetaDescription;
            productInformationDto.ShortDescription = product.ShortDescription;
            productInformationDto.SupplierProductCode = product.SupplierProductCode;
            productInformationDto.MetaKeywords = product.MetaKeywords;
            productInformationDto.AvailableQuantity = product.AvailableQuantity;
            productInformationDto.CompanyId = product.CompanyId;
            productInformationDto.MadeForOrder = product.MadeForOrder;
            productInformationDto.UnitOfMeasure = product.UnitOfMeasure;
            productInformationDto.ProductionTime = product.ProductionTime;
            productInformationDto.ProductType = product.IsVariant ? "variant" : "simple";
            productInformationDto.ShowOnHomePage = product.ShowOnHomePage;

            // category mapping
            productInformationDto.ProductChildCategoryId = product.CategoryId;
            productInformationDto.ProductSubCategoryId = await _categoryRepository.GetParentCategoryIdByChildId(product.CategoryId);
            productInformationDto.ProductCategoryId = await _categoryRepository.GetParentCategoryIdByChildId(productInformationDto.ProductSubCategoryId);

            return productInformationDto;
        }

        private PriceDto GetPriceDto(Product product)
        {
            var priceDto = new PriceDto();

            priceDto.RetailPrice = product.RetailPrice;
            priceDto.WholeSalePrice = product.WholeSalePrice;
            priceDto.IstaxIncluded = product.IstaxIncluded;
            priceDto.Discount = product.Discount;
            priceDto.TaxCategoryId = product.TaxCategoryId;

            return priceDto;
        }

        private ShippingDto GetShippingDto(Product product)
        {
            var shippingDto = new ShippingDto();

            shippingDto.ShippingDescription = product.ShippingDescription;
            shippingDto.ShippingNote = product.ShippingNote;
            shippingDto.Length = product.Length;
            shippingDto.Width = product.Width;
            shippingDto.Weight = product.Weight;
            shippingDto.Height = product.Height;
            shippingDto.LengthWidthHeightType = product.LengthWidthHeightType;
            shippingDto.WeightType = product.WeightType;

            return shippingDto;
        }

        private InventoryDto GetInventoryDto(Product product)
        {
            var inventoryDto = new InventoryDto();

            inventoryDto.IsInventoryTracked = product.IsInventoryTracked;
            inventoryDto.IsReturnable = product.NotReturnable;
            inventoryDto.MaxCartQuantity = product.OrderMaximumQuantity;
            inventoryDto.MinCartQuantity = product.OrderMinimumQuantity;
            inventoryDto.AllowedQuantity = product.AllowedQuantity;

            return inventoryDto;
        }

        private List<ProductImageDto> GetProductImageDto(Product product)
        {
            var list = new List<ProductImageDto>();

            foreach(var productImage in product.ProductImages)
            {
                var dto = new ProductImageDto();

                dto.Id = productImage.Id;
                dto.ImageUrl = productImage.ImageUrl;

                list.Add(dto);
            }

            return list;
        }

        private ProductAttributeDto GetProductAttributeDto(Product product)
        {
            ProductAttributeDto productAttributeDto = new ProductAttributeDto();

            foreach(var specification in product.ProductSpecifications)
            {
                if(specification.SpecificationType == "SizeGuide")
                {
                    productAttributeDto.SizeGuide = specification.SpecificationValue;
                }

                if (specification.SpecificationType == "ProductSpecification")
                {
                    productAttributeDto.ProductSpecification = specification.SpecificationValue;
                }
            }
            
            if (product.IsVariant)
            {
                productAttributeDto.Colors = _mapper.Map<List<ProductColorForCreationDto>>(product.ProductColors);

                if (product.ProductColors.Count > 0)
                {
                    var sizeList = product.ProductColors.FirstOrDefault().ProductSizes.Select(ps => ps.Size).ToList();

                    productAttributeDto.Sizes = String.Join(",", sizeList);
                }
            }

            return productAttributeDto;
        }
        #endregion
    }
}
