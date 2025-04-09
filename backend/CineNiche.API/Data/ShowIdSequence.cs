namespace CineNiche.API.Data
{
    public class ShowIdSequence
    {
        public int Id { get; set; } // EF requires a primary key
        public int LastId { get; set; }
    }
}
