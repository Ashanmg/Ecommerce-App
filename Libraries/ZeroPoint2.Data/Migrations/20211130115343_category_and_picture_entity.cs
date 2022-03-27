using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ZeroPoint2.Data.Migrations
{
    public partial class category_and_picture_entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastActive",
                table: "Users",
                newName: "LastActiveOnUtc");

            migrationBuilder.RenameColumn(
                name: "Created",
                table: "Users",
                newName: "CreatedOnUtc");

            migrationBuilder.CreateTable(
                name: "Picture",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MimeType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SeoFileName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PublicId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateAddedOnUtc = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Picture", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MetaKeywords = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MetaTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MetaDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParentCategoryId = table.Column<int>(type: "int", nullable: false),
                    IncludeInTopMenu = table.Column<bool>(type: "bit", nullable: false),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false),
                    PictureId = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedOnUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedOnUtc = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Categories_Picture_PictureId",
                        column: x => x.PictureId,
                        principalTable: "Picture",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_PictureId",
                table: "Categories",
                column: "PictureId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Picture");

            migrationBuilder.RenameColumn(
                name: "LastActiveOnUtc",
                table: "Users",
                newName: "LastActive");

            migrationBuilder.RenameColumn(
                name: "CreatedOnUtc",
                table: "Users",
                newName: "Created");
        }
    }
}
