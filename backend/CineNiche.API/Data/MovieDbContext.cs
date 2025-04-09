using Microsoft.EntityFrameworkCore;

namespace CineNiche.API.Data
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
        {
        }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<ShowIdSequence> ShowIdSequence { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>().ToTable("movies_titles");
            modelBuilder.Entity<ShowIdSequence>().ToTable("ShowIdSequence"); 
        }
    }
}
