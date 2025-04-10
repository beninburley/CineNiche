using CineNiche.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CineNiche.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class RecommendationController : ControllerBase
    {
        private RecommendationDbContext _recommendationContext;

        public RecommendationController(RecommendationDbContext temp)
        {
            _recommendationContext = temp;
        }

        [HttpGet("actor/{userId}")]
        public IActionResult GetRecActors(int userId)
        {
            var recs = _recommendationContext.ActorRecs.Where(r => r.UserId == userId).OrderBy(r => r.Rank).ToList();

            if (recs == null || recs.Count == 0) return NotFound(); //This should be modified to return generic/top watched actors.
                

            return Ok(recs);
        }

        [HttpGet("director/{userId}")]
        public IActionResult GetRecDirectors(int userId)
        {
            var recs = _recommendationContext.DirectorRecs.Where(r => r.UserId == userId).OrderBy(r => r.Rank).ToList();

            if (recs == null || recs.Count == 0) return NotFound(); //This should be modified to return generic/top watched directors.

            return Ok(recs);
        }

        [HttpGet("collab/{userId}")]
        public IActionResult GetCollab(int userId)
        {
            var recs = _recommendationContext.CollabRecs.Where(r => r.UserId == userId).OrderBy(r => r.Rank).ToList();

            if (recs == null || recs.Count == 0) return NotFound(); //This should be modified to return generic/top rated movies.

            return Ok(recs);
        }

        [HttpGet("genre/{userId}")]
        public IActionResult GetRecGenre(int userId)
        {
            var recs = _recommendationContext.GenreRecs.Where(r => r.UserId == userId).OrderBy(r => r.Genre).ThenBy(r => r.Rank).ToList();

            if (recs == null || recs.Count == 0) return NotFound(); //This should be modified to return generic/top watched Genres.

            return Ok(recs);
        }

        [HttpGet("content/{showId}")]
        public IActionResult GetContent(string showId)
        {
            var recs = _recommendationContext.ContentRecs.Where(r => r.SeedShowId == showId).OrderBy(r => r.Rank).ToList();

            if (recs == null || recs.Count == 0) return NotFound(); //This should be modified to return generic/top watched .... something.

            return Ok(recs);
        }

        [HttpGet("hybrid/{userId}/{showId}")]
        public IActionResult GetHybrid(string showId, int userId)
        {
            var recs = _recommendationContext.HybridRecs.Where(r => r.SeedShowId == showId && r.UserId == userId).OrderBy(r => r.Rank).ToList();
            
            if (recs == null || recs.Count == 0) return NotFound();

            return Ok(recs);
        }
    }
}