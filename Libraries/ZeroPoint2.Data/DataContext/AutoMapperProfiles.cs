﻿using AutoMapper;
using ZeroPoint2.Core.Dtos;
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
        }
    }
}
