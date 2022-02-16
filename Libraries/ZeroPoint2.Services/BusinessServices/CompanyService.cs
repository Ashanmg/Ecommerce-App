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
using ZeroPoint2.Core.Dtos.Admin;
using ZeroPoint2.Core.Entities;
using ZeroPoint2.Data;
using ZeroPoint2.Helper;

namespace ZeroPoint2.Services
{
    public class CompanyService : ICompanyService
    {
        #region private fields
        private readonly ICompanyRepository _companyRepository;
        private readonly IMapper _mapper;
        private readonly Cloudinary _cloudinary;
        #endregion

        #region ctor
        public CompanyService(ICompanyRepository companyRepository,
            IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _companyRepository = companyRepository;
            _mapper = mapper;
            var _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }
        #endregion

        #region Public Methods
        public async Task<ExecutionResponse<GridData<List<CompanyListForViewDto>>>> GetAllCompanies(int pageNumber, int pageSize)
        {
            ExecutionResponse<GridData<List<CompanyListForViewDto>>> response = new ExecutionResponse<GridData<List<CompanyListForViewDto>>>();
            try
            {
                GridData<List<Company>> productList = await _companyRepository.GetAllProducts(pageNumber, pageSize);

                response.Result = _mapper.Map<GridData<List<CompanyListForViewDto>>>(productList);
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

        public async Task<ExecutionResponse<bool>> RegisterCompany(CompanyForCreationDto companyForCreationDto)
        {
            ExecutionResponse<bool> response = new ExecutionResponse<bool>();

            try
            {
                // insert the company details
                var company = _mapper.Map<Company>(companyForCreationDto);

                company.IsPublished = true;
                company.CreatedOnUtc = DateTime.UtcNow;

                company = await _companyRepository.InsertCompanyDataAsync(company);

                if (company.Id == 0)
                {
                    response.Result = false;
                    response.RequestStatus = ExecutionStatus.Error;
                    response.Message = "Company details could not be inserted successfully.";

                    return response;
                }

                var companyImageList = new List<CompanyImage>();

                // then upload logo image to cloudinary and get the public id.
                var file = companyForCreationDto.CompanyLogoImage;

                var uploadResult = new ImageUploadResult();

                var productImagesForCreationDto = new CompanyImageForCreationDto();

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
                productImagesForCreationDto.CompanyId = company.Id;
                productImagesForCreationDto.IsLogo = true;

                var companyImage = _mapper.Map<CompanyImage>(productImagesForCreationDto);
                companyImage.DateAddedOnUtc = DateTime.UtcNow;
                companyImageList.Add(companyImage);

                // then insert company feature details
                var companyFeatureList = _mapper.Map<List<CompanyFeature>>(companyForCreationDto.CompanyFeatures);

                companyFeatureList = await _companyRepository.InsertCompanyFeatureDataAsync(companyFeatureList, company.Id);

                foreach(var companyFeature in companyFeatureList)
                {
                    file = companyForCreationDto.CompanyLogoImage;

                    uploadResult = new ImageUploadResult();

                    var productImagesForCreationDto2 = new CompanyImageForCreationDto();

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

                    productImagesForCreationDto2.ImageUrl = uploadResult.Url.ToString();
                    productImagesForCreationDto2.PublicId = uploadResult.PublicId;
                    productImagesForCreationDto2.CompanyFeatureId = companyFeature.Id;
                    productImagesForCreationDto.IsLogo = false;

                    var companyImage2 = _mapper.Map<CompanyImage>(productImagesForCreationDto2);
                    companyImage2.DateAddedOnUtc = DateTime.UtcNow;
                    companyImageList.Add(companyImage2);
                }

                // then insert company images.
                response.Result = await _companyRepository.InsertCompanyImageDataAsync(companyImageList);

                if (!response.Result)
                {
                    response.RequestStatus = ExecutionStatus.Error;
                    response.Message = "Company images could not be inserted successfully.";

                    return response;
                }

                response.RequestStatus = ExecutionStatus.Success;
                response.Message = "Company data were inserted successfully.";
            }
            catch (Exception ex)
            {
                response.Message = "Internal server error.";
                response.ExceptionData = ex.Message;
                response.RequestStatus = ExecutionStatus.Error;
            }

            return response;
        }


        public async Task<ExecutionResponse<List<CompanyListForSelectDto>>> GetCompanyListForSelect()
        {
            ExecutionResponse<List<CompanyListForSelectDto>> response = new ExecutionResponse<List<CompanyListForSelectDto>>();
            try
            {
                List<Company> productList = await _companyRepository.GetCompanyListForSelect();

                response.Result = _mapper.Map<List<CompanyListForSelectDto>>(productList);
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
        #endregion
    }
}
