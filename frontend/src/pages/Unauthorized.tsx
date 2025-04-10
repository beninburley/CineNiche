export default function Unauthorized() {
  return (
    <div style={{ padding: '2rem', color: 'red' }}>
      <h2>🚫 You do not have permission to view this page.</h2>
    </div>
  );
}

// returns this page if an unauthorized user tries to access a site that they dont have permission to access (specifically adminMovies)
