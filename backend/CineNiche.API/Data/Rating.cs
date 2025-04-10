

using System.ComponentModel.DataAnnotations.Schema;

namespace CineNiche.API.Data
{
    public class Rating
    {
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("show_id")]
        public string ShowId { get; set; } = string.Empty;

        [Column("rating")]
        public int Value { get; set; }
    }
}

