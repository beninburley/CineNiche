using System.ComponentModel.DataAnnotations.Schema;

namespace CineNiche.API.Data
{
    [Table("genre_recs")]
    public class GenreRec
    {
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("genre")]
        public string Genre { get; set; }

        [Column("recommended_show_id")]
        public string RecommendedShowId { get; set; }

        [Column("rank")]
        public int Rank { get; set; }
    }
}
