using System.ComponentModel.DataAnnotations.Schema;

namespace CineNiche.API.Data
{
    [Table("hybrid_recs")]
    public class HybridRec
    {
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("recommended_show_id")]
        public string RecommendedShowId { get; set; }

        [Column("rank")]
        public int Rank { get; set; }

        [Column("seed_show_id")]
        public string SeedShowId {get; set;}
    }
}
