using CineNiche.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CineNiche.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private MovieDbContext _movieContext;

        public MovieController(MovieDbContext temp)
        {
            _movieContext = temp;
        }

        [HttpGet("AllMovies")]
        public IActionResult GetMovies(int pageSize = 5, int pageNum = 1, [FromQuery(Name = "movieTypes")] List<string>? selectedCategories = null)
        {
            var query = _movieContext.Movies.AsQueryable();

            // Filter by selected genre categories
            if (selectedCategories != null && selectedCategories.Any())
            {
                foreach (var category in selectedCategories)
                {
                    var propName = Camelize(category);
                    var prop = typeof(Movie).GetProperty(propName);
                    if (prop != null)
                    {
                        query = query.Where(m => EF.Property<bool?>(m, propName) == true);
                    }
                }
            }

            var totalNumMovies = query.Count();

            var results = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var response = new
            {
                movies = results,
                totalNumMovies = totalNumMovies
            };

            return Ok(response);
        }

        [HttpGet("GetMovieTypes")]
        public IActionResult GetMovieTypes()
        {
            var allCategories = new List<string>
            {
                "Action", "Adventure", "Anime Series International TV Shows", "British TV Shows Docuseries International TV Shows",
                "Children", "Comedies", "Comedies Dramas International Movies", "Comedies International Movies",
                "Comedies Romantic Movies", "Crime TV Shows Docuseries", "Documentaries", "Documentaries International Movies",
                "Docuseries", "Dramas", "Dramas International Movies", "Dramas Romantic Movies", "Family Movies", "Fantasy",
                "Horror Movies", "International Movies Thrillers", "International TV Shows Romantic TV Shows TV Dramas",
                "Kids' TV", "Language TV Shows", "Musicals", "Nature TV", "Reality TV", "Spirituality",
                "TV Action", "TV Comedies", "TV Dramas", "Talk Shows TV Comedies", "Thrillers"
            };

            return Ok(allCategories);
        }

        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] Movie newMovie)
        {
            if (newMovie == null)
                return BadRequest("Movie data is required.");

            _movieContext.Movies.Add(newMovie);
            _movieContext.SaveChanges();
            return Ok(newMovie);
        }

        [HttpPut("UpdateMovie/{show_id}")]
        public IActionResult UpdateMovie(string show_id, [FromBody] Movie updatedMovie)
        {
            var existingMovie = _movieContext.Movies.FirstOrDefault(m => m.show_id == show_id);
            if (existingMovie == null)
                return NotFound();

            _movieContext.Entry(existingMovie).CurrentValues.SetValues(updatedMovie);
            _movieContext.SaveChanges();

            return Ok(updatedMovie);
        }

        [HttpDelete("DeleteMovie/{show_id}")]
        public IActionResult DeleteMovie(string show_id)
        {
            var movie = _movieContext.Movies.FirstOrDefault(m => m.show_id == show_id);
            if (movie == null)
                return NotFound(new { message = "Movie not found" });

            _movieContext.Movies.Remove(movie);
            _movieContext.SaveChanges();

            return NoContent();
        }

        private string Camelize(string category)
        {
            return string.Concat(
                category
                    .Replace("'", "")
                    .Split(' ', StringSplitOptions.RemoveEmptyEntries)
                    .Select((word, i) =>
                        i == 0
                            ? char.ToLower(word[0]) + word.Substring(1)
                            : char.ToUpper(word[0]) + word.Substring(1))
            );
        }

        [HttpPost("batch")]
        public IActionResult GetMoviesByIds([FromBody] List<string> showIds)
        {
            var movies = _movieContext.Movies
                .Where(m => showIds.Contains(m.show_id))
                .ToList();

            return Ok(movies);
        }

    }
}
