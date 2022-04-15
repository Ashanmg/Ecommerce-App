using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core;
using ZeroPoint2.Core.Dtos;
using ZeroPoint2.Core.Dtos.Admin;
using ZeroPoint2.Helper;

namespace ZeroPoint2.Services
{
    public interface IProductService
    {
        Task<ExecutionResponse<bool>> UploadSingleProduct(UploadProductForCreationDto productForCreationDto);
        Task<ExecutionResponse<List<ColorTypeforListDto>>> GetColorList();
        Task<ExecutionResponse<List<ProductForListDto>>> GetProductListByLazyLoad(int pageNumber, int pageSize);
        Task<ExecutionResponse<GridData<List<ProductListForViewDto>>>> GetAllProducts(int pageNumber, int pageSize);
        Task<ExecutionResponse<List<TaxCategoriesForSelectDto>>> GetTaxCategoriesForSelect();
        Task<ExecutionResponse<bool>> DeleteBulkProduct(ProductForDeleteDto productForDeleteDto);
        Task<ExecutionResponse<GetProductDetailForEditDto>> GetProductDetailForEdit(int id);
    }
}
