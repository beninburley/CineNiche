using System.ComponentModel.DataAnnotations.Schema;

namespace CineNiche.API.Data
{
    [Table("collab_recs")]
    public class CollabRec
    {
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("recommended_show_id")]
        public string RecommendedShowId { get; set; }

        [Column("rank")]
        public int Rank { get; set; }
    }
}
