using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CineNiche.API.Data
{
    public class MovieUser
    {
        [Key]
        [Column("user_id")]
        public int user_id { get; set; }
        public string? Name { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public int? Age { get; set; }
        public string? Gender { get; set; }

        // Platform preferences
        public int? Netflix { get; set; }
        [Column("Amazon Prime")]
        public int? AmazonPrime { get; set; }
        [Column("Disney+")]
        public int? Disney { get; set; }
        [Column("Paramount+")]
        public int? Paramount { get; set; }
        public int? Max { get; set; }
        public int? Hulu { get; set; }
        [Column("Apple TV+")]
        public int? AppleTV { get; set; }
        public int? Peacock { get; set; }

        // Location
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Zip { get; set; }
    }

}
