import { useState } from "react";
import "./App.css";

// Hard-coded posts so the Admin "Delete Post" button has something to act on
const INITIAL_POSTS = [
  { id: 1, title: "Getting started with React hooks", author: "Meera", date: "12 Sep" },
  { id: 2, title: "Why keys matter in lists", author: "Arjun", date: "18 Sep" },
  { id: 3, title: "Redux Toolkit in 10 minutes", author: "Simran", date: "25 Sep" },
];

export default function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null); // { name, role } when logged in
  const [error, setError] = useState("");
  const [posts, setPosts] = useState(INITIAL_POSTS);

  const login = (role) => {
    const name = username.trim();
    if (!name) {
      setError("Enter a username to continue.");
      return;
    }
    setError("");
    setUser({ name, role });
  };

  const logout = () => {
    setUser(null);
    setUsername("");
    setError("");
  };

  const deletePost = (id) => setPosts((p) => p.filter((post) => post.id !== id));
  const isAdmin = user?.role === "Admin";

  return (
    <main className="shell">
      {/* Left panel: explains the two roles */}
      <aside className="side">
        <p className="brand">Post Desk</p>
        <h1>One sign-in, two levels of access.</h1>
        <ul className="roles">
          <li className="roles__item roles__item--admin">
            <strong>Admin</strong>
            <span>Can read and delete posts.</span>
          </li>
          <li className="roles__item roles__item--viewer">
            <strong>Viewer</strong>
            <span>Can read posts only.</span>
          </li>
        </ul>
      </aside>

      <section className="panel">
        {!user ? (
          <div className="card">
            <h2>Sign in</h2>
            <p className="muted">Pick a role to preview what that user can do.</p>

            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="e.g. simran"
              value={username}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login("Viewer")}
            />
            {error && <p className="error" role="alert">{error}</p>}

            <div className="actions">
              <button className="btn btn--admin" onClick={() => login("Admin")}>
                Login as Admin
              </button>
              <button className="btn btn--viewer" onClick={() => login("Viewer")}>
                Login as Viewer
              </button>
            </div>
          </div>
        ) : (
          <div className="card card--wide">
            <header className="dash-head">
              <div>
                <h2>Welcome, {user.name} ({user.role})</h2>
                <span className={`badge badge--${user.role.toLowerCase()}`}>{user.role}</span>
              </div>
              <button className="btn btn--ghost" onClick={logout}>Logout</button>
            </header>

            {!isAdmin && (
              <p className="notice">Read-only access</p>
            )}

            <ul className="posts">
              {posts.map((post) => (
                <li key={post.id} className="post">
                  <div>
                    <h3>{post.title}</h3>
                    <p className="muted">{post.author} · {post.date}</p>
                  </div>
                  {isAdmin && (
                    <button className="btn btn--danger" onClick={() => deletePost(post.id)}>
                      Delete Post
                    </button>
                  )}
                </li>
              ))}
              {posts.length === 0 && (
                <li className="empty">
                  No posts left.{" "}
                  <button className="link" onClick={() => setPosts(INITIAL_POSTS)}>
                    Restore posts
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
