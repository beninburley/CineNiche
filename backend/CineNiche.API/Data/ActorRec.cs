using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CineNiche.API.Data
{
    [Table("actor_recs")]
    public class ActorRec
    {
        [Column("user_id")]
        [Required]
        public int UserId { get; set; }

        [Column("actor_name")]
        [Required]
        public string ActorName { get; set; }

        [Column("recommended_show_id")]
        [Required]
        public string RecommendedShowId { get; set; }

        [Column("rank")]
        [Required]
        public int Rank { get; set; }
    }
}
