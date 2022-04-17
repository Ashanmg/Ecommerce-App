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

        public static string GenerateVariantSku(string stylecode, string colorName, string sizeName)
        {
            var variant = string.Empty;
            if (colorName.Length >= 2 && sizeName.Length >= 2)
            {
                variant = $"{colorName.Substring(0, 1)}{sizeName.Substring(0, 1)}";
            }
            else if (colorName.Length < 2 && sizeName.Length > 2)
            {
                var combination = $"{colorName}{sizeName}";
                variant =  combination.Substring(0, 3);
            }
            else if (colorName.Length > 2 && sizeName.Length < 2)
            {
                var combination = $"{colorName}{sizeName}";
                variant = combination.Substring(combination.Length - 4);
            }
            else
            {
                variant = $"{colorName}{sizeName}";
            }

            return string.Format("{0}-{1}", stylecode, variant);
        }
    }
}
