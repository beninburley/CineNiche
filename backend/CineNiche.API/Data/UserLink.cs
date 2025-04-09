using System.ComponentModel.DataAnnotations;

namespace CineNiche.API.Data
{
    public class UserLink
    {
        [Key]
        public string IdentityUserId { get; set; }

        public int RecommenderUserId { get; set; }
    }


}
