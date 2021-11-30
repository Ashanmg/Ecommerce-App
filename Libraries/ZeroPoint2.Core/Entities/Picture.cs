﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Entities
{
    public class Picture
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string MimeType { get; set; }
        public string SeoFileName { get; set; }
        public string PublicId { get; set; }
        public DateTime DateAddedOnUtc { get; set; }
    }
}
