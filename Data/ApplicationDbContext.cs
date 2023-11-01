using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Cureunity.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
         // => optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=Fundraise;Encrypt=False;Trusted_Connection=True;");
         => optionsBuilder.UseSqlServer("Server=LAPTOP-0H2423G4\\SQLEXPRESS;Database=CureUnity;Encrypt=False;Trusted_Connection=True;");
    }
}