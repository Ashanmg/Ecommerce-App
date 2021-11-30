using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core.Dtos;
using ZeroPoint2.Data;
using ZeroPoint2.Helper;

namespace ZeroPoint2.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<ExecutionResponse<List<CategoryForMenuDto>>> GetTopMenuCategoriesAsync()
        {
            ExecutionResponse<List<CategoryForMenuDto>> response = new ExecutionResponse<List<CategoryForMenuDto>>();
            try
            {
                var result = await _categoryRepository.GetTopMenuCategoriesAsync();

                var mainCategories = result.Where(c => c.ParentCategoryId == 0).ToList();

                var mainCategoryDtoList = _mapper.Map<List<CategoryForMenuDto>>(mainCategories);

                foreach (var category in mainCategoryDtoList)
                {
                    var secondCategories = result.Where(s => s.ParentCategoryId == category.Id).ToList();

                    category.ChildCategoryList = _mapper.Map<List<CategoryForMenuDto>>(secondCategories);

                    if (category.ChildCategoryList != null && category.ChildCategoryList.Count > 0)
                    {
                        foreach(var childCategory in category.ChildCategoryList)
                        {
                            var childCategories = result.Where(s => s.ParentCategoryId == childCategory.Id).ToList();

                            childCategory.ChildCategoryList = _mapper.Map<List<CategoryForMenuDto>>(childCategories);
                        }
                    }
                }
                response.RequestStatus = ExecutionStatus.Success;
                response.Result = mainCategoryDtoList;
            }
            catch (Exception ex)
            {
                response.Message = "Internal server error.";
                response.ExceptionData = ex.Message;
                response.RequestStatus = ExecutionStatus.Error;
            }

            return response;
        }
    }
}
