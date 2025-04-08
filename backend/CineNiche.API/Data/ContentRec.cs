using System.ComponentModel.DataAnnotations.Schema;

namespace CineNiche.API.Data
{
    [Table("content_recs")]
    public class ContentRec
    {
        [Column("seed_show_id")]
        public string SeedShowId { get; set; }

        [Column("recommended_show_id")]
        public string RecommendedShowId { get; set; }

        [Column("rank")]
        public int Rank { get; set; }
    }
}
