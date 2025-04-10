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
        public DbSet<UserLink> UserLinks { get; set; }
        public DbSet<MovieUser> Users { get; set; }
        public DbSet<Rating> Ratings { get; set; }





        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>().ToTable("movies_titles");
            modelBuilder.Entity<ShowIdSequence>().ToTable("ShowIdSequence");
            modelBuilder.Entity<UserLink>().ToTable("UserLink");
            modelBuilder.Entity<MovieUser>().ToTable("movies_users");
            modelBuilder.Entity<Rating>().ToTable("movies_ratings");
            modelBuilder.Entity<Rating>()
                .HasKey(r => new { r.UserId, r.ShowId });

        }
    }
}
