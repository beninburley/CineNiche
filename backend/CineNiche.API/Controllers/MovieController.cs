using CineNiche.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public IEnumerable<Movie> GetMovies()
        {
            return _movieContext.Movies.ToList();
        }

        // other methods
    }
}
