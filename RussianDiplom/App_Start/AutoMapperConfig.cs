namespace RussianDiplom.App_Start
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using AutoMapper;
    using DAL;
    using RussianDiplom.WebApi.Models;

    public class AutoMapperConfig
    {
        public static void Register()
        {
            Mapper.CreateMap<tClassNumber, ClassNumber>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.pk))
                .ForMember(dest => dest.NumberOfClass, opt => opt.MapFrom(src => src.numberOfClass))
                .ForMember(dest => dest.Deleted, opt => opt.MapFrom(src => src.deleted));

            Mapper.CreateMap<tUserInfo, UserInfo>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.pk))
                .ForMember(dest => dest.FkUser, opt => opt.MapFrom(src => src.fkUser))
                .ForMember(dest => dest.Info, opt => opt.MapFrom(src => src.info))
                .ForMember(dest => dest.Money, opt => opt.MapFrom(src => src.money))
                .ForMember(dest => dest.Deleted, opt => opt.MapFrom(src => src.deleted));

        }
    }
}