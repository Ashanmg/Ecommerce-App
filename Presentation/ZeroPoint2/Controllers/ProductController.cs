using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ZeroPoint2.Core;
using ZeroPoint2.Core.Dtos;
using ZeroPoint2.Core.Dtos.Admin;
using ZeroPoint2.Helper;
using ZeroPoint2.Services;

namespace ZeroPoint2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        #region fields
        #endregion

        #region constructor
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }
        #endregion

        #region public API methods
        [HttpPost]
        [Route("uploadproduct")]
        //[Authorize(Roles = "Administrators, ContentWriters")]
        public async Task<IActionResult> UploadSingleProduct([FromForm]UploadProductForCreationDto productForCreationDto)
        {
            ExecutionResponse<bool> response = await _productService.UploadSingleProduct(productForCreationDto);
            return Ok(response);
        }

        [HttpGet]
        [Route("getcolors")]
        public async Task<IActionResult> GetColorList()
        {
            ExecutionResponse<List<ColorTypeforListDto>> response = await _productService.GetColorList();
            return Ok(response);
        }

        [HttpGet]
        [Route("getproductlist/{pageNumber}/{pagesize}")]
        public async Task<IActionResult> GetProductListByLazyLoad(int pageNumber = 0, int pagesize = 18)
        {
            ExecutionResponse<List<ProductForListDto>> response = await _productService.GetProductListByLazyLoad(pageNumber, pagesize);
            return Ok(response);
        }

        [HttpGet]
        [Route("{productId}")]
        public async Task<IActionResult> GetProductDetail(int productId)
        {
            return Ok();
        }

        [HttpGet]
        [Route("getallproducts/{pageNumber}/{pagesize}")]
        //[Authorize(Roles = "Administrators")]
        public async Task<IActionResult> GetAllProducts(int pageNumber = 1, int pageSize = 20)
        {
            ExecutionResponse<GridData<List<ProductListForViewDto>>> response = await _productService.GetAllProducts(pageNumber, pageSize);

            return Ok(response);
        }

        [HttpGet]
        [Route("gettaxcategories")]
        public async Task<IActionResult> GetTaxCategoriesForSelect()
        {
            ExecutionResponse<List<TaxCategoriesForSelectDto>> response = await _productService.GetTaxCategoriesForSelect();
            return Ok(response);
        }
        #endregion
    }
}
