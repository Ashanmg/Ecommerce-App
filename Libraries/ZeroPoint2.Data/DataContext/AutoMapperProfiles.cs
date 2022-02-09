using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using ZeroPoint2.Core;
using ZeroPoint2.Core.Dtos;
using ZeroPoint2.Core.Dtos.Admin;
using ZeroPoint2.Core.Entities;

namespace ZeroPoint2.Data
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>();

            CreateMap<Category, CategoryForMenuDto>()
                .ForMember(des => des.CategoryImageUrl, opt =>
                    opt.MapFrom(src => src.ProductImage.ImageUrl))
                .ForMember(des => des.ChildCategoryList, opt =>
                    opt.Ignore());

            CreateMap<Category, CategoryForProductUploadDto>()
                .ForMember(des => des.ChildCategoryList, opt =>
                    opt.Ignore());

            CreateMap<UploadProductForCreationDto, Product>()
                .ForMember(des => des.ProductImages, opt =>
                    opt.Ignore());

            CreateMap<ProductImageForCreationDto, ProductImage>();

            CreateMap<ProductColorForCreationDto, ProductColor>();

            CreateMap<ColorType, ColorTypeforListDto>();

            CreateMap<Product, ProductForListDto>()
                .ForMember(des => des.Thumbnail, opt =>
                    opt.MapFrom(src => src.ProductImages.First(p => p.IsMain).ImageUrl))
                .ForMember(des => des.Price, opt =>
                    opt.MapFrom(src => string.Format("{0:C}", src.RetailPrice)));

            CreateMap<Product, ProductListForViewDto>()
                .ForMember(des => des.ProductImageUrls, opt =>
                    opt.MapFrom(src => src.ProductImages.Select(p => p.ImageUrl)))
                .ForMember(des => des.ProductColors, opt =>
                    opt.MapFrom(src => src.ProductColors.Select(p => p.ColorName)));

            CreateMap<GridData<List<Product>>, GridData<List<ProductListForViewDto>>>();

            CreateMap<Company, CompanyListForViewDto>()
                .ForMember(des => des.LogoImageUrl, opt =>
                    opt.MapFrom(src => src.LogoImage.ImageUrl));

            CreateMap<GridData<List<Company>>, GridData<List<CompanyListForViewDto>>>();

            CreateMap<CompanyForCreationDto, Company>();

            CreateMap<CompanyFeatureForCreationDto, CompanyFeature>();

            CreateMap<CompanyImageForCreationDto, CompanyImage>();
        }
    }
}
