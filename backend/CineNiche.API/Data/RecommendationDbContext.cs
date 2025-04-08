using Microsoft.EntityFrameworkCore;

namespace CineNiche.API.Data
{
    public class RecommendationDbContext : DbContext
    {
        public RecommendationDbContext(DbContextOptions<RecommendationDbContext> options) : base(options) {}

        public DbSet<ActorRec> ActorRecs { get; set; }
        public DbSet<DirectorRec> DirectorRecs { get; set; }
        public DbSet<CollabRec> CollabRecs { get; set; }
        public DbSet<GenreRec> GenreRecs { get; set; }
        public DbSet<ContentRec> ContentRecs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Composite Keys (since these tables have no primary keys)

            modelBuilder.Entity<ActorRec>()
                .HasKey(ar => new { ar.UserId, ar.RecommendedShowId });

            modelBuilder.Entity<DirectorRec>()
                .HasKey(dr => new { dr.UserId, dr.RecommendedShowId });

            modelBuilder.Entity<CollabRec>()
                .HasKey(cr => new { cr.UserId, cr.RecommendedShowId });

            modelBuilder.Entity<GenreRec>()
                .HasKey(gr => new { gr.UserId, gr.RecommendedShowId });

            modelBuilder.Entity<ContentRec>()
                .HasKey(cr => new { cr.SeedShowId, cr.RecommendedShowId });
        }
    }
}
