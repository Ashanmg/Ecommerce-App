using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZeroPoint2.Core;
using ZeroPoint2.Core.Dtos.Admin;
using ZeroPoint2.Helper;
using ZeroPoint2.Services;

namespace ZeroPoint2.Controllers.Admin
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        #region private fields
        private readonly ICompanyService _companyService;
        #endregion

        #region ctor
        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }
        #endregion

        #region public APIs
        [HttpGet]
        [Route("getallcompanies/{pageNumber}/{pagesize")]
        public async Task<IActionResult> GetAllCompanies(int pageNumber = 1, int pageSize = 20)
        {
            ExecutionResponse<GridData<List<CompanyListForViewDto>>> response = await _companyService.GetAllCompanies(pageNumber, pageSize);

            return Ok(response);
        }

        [HttpPost]
        [Route("registercompany")]
        public async Task<IActionResult> RegisterCompany([FromForm]CompanyForCreationDto companyForCreationDto)
        {
            ExecutionResponse<bool> response = await _companyService.RegisterCompany(companyForCreationDto);
            return Ok(response);
        }
        #endregion
    }
}
