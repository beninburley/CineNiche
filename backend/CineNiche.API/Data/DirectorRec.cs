using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CineNiche.API.Data
{
    [Table("director_recs")]
    public class DirectorRec
    {
        
        [Column("user_id")]
        [Required]
        public int UserId { get; set; }

        [Column("director_name")]
        [Required]
        public string DirectorName { get; set; }

        [Column("recommended_show_id")]
        [Required]
        public string RecommendedShowId { get; set; }

        [Column("rank")]
        [Required]
        public int Rank { get; set; }
    }
}
