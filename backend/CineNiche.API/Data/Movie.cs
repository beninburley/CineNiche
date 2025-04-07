using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CineNiche.API.Data
{
    public class Movie
    {
        [Key]
        public string? show_id { get; set; }
        public string? type { get; set; }
        public string? title { get; set; }
        public string? director { get; set; }
        public string? cast { get; set; }
        public string? country { get; set; }
        public int? release_year { get; set; }
        public string? rating { get; set; }
        public string? duration { get; set; }
        public string? description { get; set; }

        public bool? Action { get; set; }
        public bool? Adventure { get; set; }

        [Column("Anime Series International TV Shows")]
        public bool? AnimeSeriesInternationalTVShows { get; set; }

        [Column("British TV Shows Docuseries International TV Shows")]
        public bool? BritishDocuseriesInternationalTVShows { get; set; }

        public bool? Children { get; set; }
        public bool? Comedies { get; set; }

        [Column("Comedies Dramas International Movies")]
        public bool? ComediesDramasInternationalMovies { get; set; }

        [Column("Comedies International Movies")]
        public bool? ComediesInternationalMovies { get; set; }

        [Column("Comedies Romantic Movies")]
        public bool? ComediesRomanticMovies { get; set; }

        [Column("Crime TV Shows Docuseries")]
        public bool? CrimeTVShowsDocuseries { get; set; }

        public bool? Documentaries { get; set; }

        [Column("Documentaries International Movies")]
        public bool? DocumentariesInternationalMovies { get; set; }

        public bool? Docuseries { get; set; }
        public bool? Dramas { get; set; }

        [Column("Dramas International Movies")]
        public bool? DramasInternationalMovies { get; set; }

        [Column("Dramas Romantic Movies")]
        public bool? DramasRomanticMovies { get; set; }

        [Column("Family Movies")]
        public bool? FamilyMovies { get; set; }

        public bool? Fantasy { get; set; }

        [Column("Horror Movies")]
        public bool? HorrorMovies { get; set; }

        [Column("International Movies Thrillers")]
        public bool? InternationalMoviesThrillers { get; set; }

        [Column("International TV Shows Romantic TV Shows TV Dramas")]
        public bool? InternationalTVRomanticDramas { get; set; }

        [Column("Kids' TV")]
        public bool? KidsTV { get; set; }

        [Column("Language TV Shows")]
        public bool? LanguageTVShows { get; set; }

        public bool? Musicals { get; set; }

        [Column("Nature TV")]
        public bool? NatureTV { get; set; }

        [Column("Reality TV")]
        public bool? RealityTV { get; set; }

        public bool? Spirituality { get; set; }

        [Column("TV Action")]
        public bool? TVAction { get; set; }

        [Column("TV Comedies")]
        public bool? TVComedies { get; set; }

        [Column("TV Dramas")]
        public bool? TVDramas { get; set; }

        [Column("Talk Shows TV Comedies")]
        public bool? TalkShowsTVComedies { get; set; }

        public bool? Thrillers { get; set; }

        [NotMapped]
        public List<string> Categories
        {
            get
            {
                var categories = new List<string>();
                if (Action == true) categories.Add("Action");
                if (Adventure == true) categories.Add("Adventure");
                if (AnimeSeriesInternationalTVShows == true) categories.Add("Anime Series International TV Shows");
                if (BritishDocuseriesInternationalTVShows == true) categories.Add("British TV Shows Docuseries International TV Shows");
                if (Children == true) categories.Add("Children");
                if (Comedies == true) categories.Add("Comedies");
                if (ComediesDramasInternationalMovies == true) categories.Add("Comedies Dramas International Movies");
                if (ComediesInternationalMovies == true) categories.Add("Comedies International Movies");
                if (ComediesRomanticMovies == true) categories.Add("Comedies Romantic Movies");
                if (CrimeTVShowsDocuseries == true) categories.Add("Crime TV Shows Docuseries");
                if (Documentaries == true) categories.Add("Documentaries");
                if (DocumentariesInternationalMovies == true) categories.Add("Documentaries International Movies");
                if (Docuseries == true) categories.Add("Docuseries");
                if (Dramas == true) categories.Add("Dramas");
                if (DramasInternationalMovies == true) categories.Add("Dramas International Movies");
                if (DramasRomanticMovies == true) categories.Add("Dramas Romantic Movies");
                if (FamilyMovies == true) categories.Add("Family Movies");
                if (Fantasy == true) categories.Add("Fantasy");
                if (HorrorMovies == true) categories.Add("Horror Movies");
                if (InternationalMoviesThrillers == true) categories.Add("International Movies Thrillers");
                if (InternationalTVRomanticDramas == true) categories.Add("International TV Shows Romantic TV Shows TV Dramas");
                if (KidsTV == true) categories.Add("Kids' TV");
                if (LanguageTVShows == true) categories.Add("Language TV Shows");
                if (Musicals == true) categories.Add("Musicals");
                if (NatureTV == true) categories.Add("Nature TV");
                if (RealityTV == true) categories.Add("Reality TV");
                if (Spirituality == true) categories.Add("Spirituality");
                if (TVAction == true) categories.Add("TV Action");
                if (TVComedies == true) categories.Add("TV Comedies");
                if (TVDramas == true) categories.Add("TV Dramas");
                if (TalkShowsTVComedies == true) categories.Add("Talk Shows TV Comedies");
                if (Thrillers == true) categories.Add("Thrillers");

                return categories;
            }
        }

        [NotMapped]
        public string CategoriesString => string.Join(", ", Categories);
    }
}
