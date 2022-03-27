using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ZeroPoint2.Data.Migrations
{
    public partial class productrelatedchanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReturnInformation",
                table: "Products",
                newName: "UnitOfMeasure");

            migrationBuilder.RenameColumn(
                name: "MadeToOrder",
                table: "Products",
                newName: "MadeForOrder");

            migrationBuilder.RenameColumn(
                name: "CompanyName",
                table: "Products",
                newName: "ShippingNote");

            migrationBuilder.RenameColumn(
                name: "CompanyInformation",
                table: "Products",
                newName: "ShippingDescription");

            migrationBuilder.AlterColumn<int>(
                name: "TaxCategoryId",
                table: "Products",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<decimal>(
                name: "OrderMinimumQuantity",
                table: "Products",
                type: "decimal(18,4)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<decimal>(
                name: "OrderMaximumQuantity",
                table: "Products",
                type: "decimal(18,4)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "AllowedQuantity",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Discount",
                table: "Products",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "IsInventoryTracked",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IstaxIncluded",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "ProductSpecification",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SpecificationType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpecificationValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    CreatedOnUtc = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductSpecification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductSpecification_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_CompanyId",
                table: "Products",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_TaxCategoryId",
                table: "Products",
                column: "TaxCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductSpecification_ProductId",
                table: "ProductSpecification",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Companies_CompanyId",
                table: "Products",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_TaxCategories_TaxCategoryId",
                table: "Products",
                column: "TaxCategoryId",
                principalTable: "TaxCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Companies_CompanyId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_TaxCategories_TaxCategoryId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "ProductSpecification");

            migrationBuilder.DropIndex(
                name: "IX_Products_CompanyId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_TaxCategoryId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "AllowedQuantity",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IsInventoryTracked",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IstaxIncluded",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "UnitOfMeasure",
                table: "Products",
                newName: "ReturnInformation");

            migrationBuilder.RenameColumn(
                name: "ShippingNote",
                table: "Products",
                newName: "CompanyName");

            migrationBuilder.RenameColumn(
                name: "ShippingDescription",
                table: "Products",
                newName: "CompanyInformation");

            migrationBuilder.RenameColumn(
                name: "MadeForOrder",
                table: "Products",
                newName: "MadeToOrder");

            migrationBuilder.AlterColumn<int>(
                name: "TaxCategoryId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "OrderMinimumQuantity",
                table: "Products",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,4)");

            migrationBuilder.AlterColumn<int>(
                name: "OrderMaximumQuantity",
                table: "Products",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,4)");
        }
    }
}
