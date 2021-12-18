using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZeroPoint2.Services;

namespace ZeroPoint2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        [Route("getcategoriesfortopmenu")]
        public async Task<IActionResult> GetCategoryDataForTopMenu()
        {
            var response = await _categoryService.GetTopMenuCategoriesAsync();

            return Ok(response);
        }

        [HttpGet]
        [Route("getcategoriesforproductupload")]
        public async Task<IActionResult> GetCategoryDataForUploadProducts()
        {
            var response = await _categoryService.GetCategoryDataForUploadProducts();

            return Ok(response);
        }
    }
}
