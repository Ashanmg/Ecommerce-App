using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Helper
{
    public static class SkuGenerator
    {
        private static Random random = new Random();
        public static string GenerateStyleCode(int length)
        {
            const string characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(characters, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public static string GenerateVariantSku(string stylecode)
        {
            const string characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var variant = new string(Enumerable.Repeat(characters, 4)
              .Select(s => s[random.Next(s.Length)]).ToArray());

            return string.Format("{0}-{1}", stylecode, variant);
        }
    }
}
