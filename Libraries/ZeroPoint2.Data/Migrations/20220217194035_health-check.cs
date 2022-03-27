using Microsoft.EntityFrameworkCore.Migrations;

namespace ZeroPoint2.Data.Migrations
{
    public partial class healthcheck : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductSpecification_Products_ProductId",
                table: "ProductSpecification");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductSpecification",
                table: "ProductSpecification");

            migrationBuilder.RenameTable(
                name: "ProductSpecification",
                newName: "ProductSpecifications");

            migrationBuilder.RenameIndex(
                name: "IX_ProductSpecification_ProductId",
                table: "ProductSpecifications",
                newName: "IX_ProductSpecifications_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductSpecifications",
                table: "ProductSpecifications",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductSpecifications_Products_ProductId",
                table: "ProductSpecifications",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductSpecifications_Products_ProductId",
                table: "ProductSpecifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductSpecifications",
                table: "ProductSpecifications");

            migrationBuilder.RenameTable(
                name: "ProductSpecifications",
                newName: "ProductSpecification");

            migrationBuilder.RenameIndex(
                name: "IX_ProductSpecifications_ProductId",
                table: "ProductSpecification",
                newName: "IX_ProductSpecification_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductSpecification",
                table: "ProductSpecification",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductSpecification_Products_ProductId",
                table: "ProductSpecification",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
