using CineNiche.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CineNiche.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
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
        [Authorize(Roles = "Administrator")]
        public IActionResult AddMovie([FromBody] Movie newMovie)
        {
            if (newMovie == null)
                return BadRequest("Movie data is required.");

            // Get the current sequence row (should only be one row in the table)
            var sequence = _movieContext.ShowIdSequence.FirstOrDefault();
            if (sequence == null)
            {
                return StatusCode(500, "Show ID sequence is not initialized.");
            }

            // Increment the last ID and generate the new show_id
            sequence.LastId += 1;
            newMovie.show_id = $"s{sequence.LastId}";

            // Save movie and update the sequence
            _movieContext.Movies.Add(newMovie);
            _movieContext.ShowIdSequence.Update(sequence);
            _movieContext.SaveChanges();

            return Ok(newMovie);
        }


        [HttpPut("UpdateMovie/{show_id}")]
        [Authorize(Roles = "Administrator")]
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
        [Authorize(Roles = "Administrator")]
        public IActionResult DeleteMovie(string show_id)
        {
            var movie = _movieContext.Movies.FirstOrDefault(m => m.show_id == show_id);
            if (movie == null)
                return NotFound(new { message = "Movie not found" });

            _movieContext.Movies.Remove(movie);
            _movieContext.SaveChanges();

            return NoContent();
        }

        [HttpGet("{show_id}")]
        public IActionResult GetMovieById(string show_id)
        {
            var movie = _movieContext.Movies.FirstOrDefault(m => m.show_id == show_id);

            if (movie == null)
            {
                return NotFound(new { message = "Movie not found." });
            }

            return Ok(movie);
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


        [HttpGet("SuggestedMovies")]
        [AllowAnonymous]
        public IActionResult GetSuggestedMovies(int count = 5)
        {
            // Fetch all movies (or a reasonable subset) into memory before applying the random order
            var moviesList = _movieContext.Movies.ToList();

            // Apply the random order and take 4 movies in-memory
            var randomMovies = moviesList
                .OrderBy(r => Guid.NewGuid())
                .Take(count)
                .ToList();

            return Ok(randomMovies);
        }



        [HttpPost("batch")]
        public IActionResult GetMoviesByIds([FromBody] List<string> showIds)
        {
            var movies = _movieContext.Movies
                .Where(m => showIds.Contains(m.show_id))
                .ToList();

            return Ok(movies);
        }

        [HttpGet("GetRecommenderId")]
        public async Task<IActionResult> GetRecommenderUserId()
        {
            var email = User.FindFirstValue(ClaimTypes.Email); // Get logged-in user's email

            if (email == null)
            {
                return Unauthorized("User email not found.");
            }

            // Try to find the matching user in your movie database by email
            var user = await _movieContext.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return NotFound("No matching movie user found for this email.");
            }

            return Ok(new { recommenderId = user.user_id });
        }

        [HttpPost("rate")]
        public async Task<IActionResult> RateMovie([FromBody] RateRequest request)
        {
            // Get the email of the logged-in user
            var email = User.FindFirstValue(ClaimTypes.Email);

            if (email == null)
                return Unauthorized("User email not found.");

            // Find matching user in movie database
            var movieUser = await _movieContext.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (movieUser == null)
                return NotFound("No matching movie user found for this email.");

            int movieUserId = movieUser.user_id;

            // Check if this user already rated the movie
            var existingRating = await _movieContext.Ratings
                .FirstOrDefaultAsync(r => r.UserId == movieUserId && r.ShowId == request.MovieId);

            if (existingRating != null)
            {
                existingRating.Value = request.Rating;
            }
            else
            {
                var rating = new Rating
                {
                    UserId = movieUserId,
                    ShowId = request.MovieId,
                    Value = request.Rating
                };
                _movieContext.Ratings.Add(rating);
            }

            await _movieContext.SaveChangesAsync();
            return Ok(new { message = "Rating saved." });
        }
        // DTO to receive frontend POST body
        public class RateRequest
        {
            public string MovieId { get; set; } = string.Empty;
            public int Rating { get; set; }
        }







    }
}
