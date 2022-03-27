﻿using System;

namespace ZeroPoint2.Core.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public int UserRoleId { get; set; }
        public DateTime CreatedOnUtc { get; set; }
        public DateTime LastActiveOnUtc { get; set; }
        public UserRole UserRole { get; set; }
    }
}
