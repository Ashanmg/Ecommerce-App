using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core.Dtos;
using ZeroPoint2.Core.Entities;
using ZeroPoint2.Data;
using ZeroPoint2.Helper;

namespace ZeroPoint2.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly Cloudinary _cloudinary;
        #region fields
        #endregion

        #region constructor
        public ProductService(IProductRepository productRepository,
            IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _productRepository = productRepository;
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

                if (productForCreationDto.Colors?.Count > 0)
                {
                    product.IsVariant = true;
                }

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
                                productCombination.Sku = SkuGenerator.GenerateVariantSku(product.Sku);
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
            #endregion
        }
    }
}
