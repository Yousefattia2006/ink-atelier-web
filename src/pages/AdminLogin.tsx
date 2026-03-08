import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { Lock, ArrowLeft } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(username.trim(), password)) {
      navigate("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </button>

        <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-6 mx-auto">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-center mb-1">Admin Login</h1>
          <p className="font-body text-sm text-muted-foreground text-center mb-6">
            Sign in to manage your website
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-body text-sm text-muted-foreground mb-1.5 block">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-text-dim focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="font-body text-sm text-muted-foreground mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-text-dim focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter password"
              />
            </div>
            {error && (
              <p className="font-body text-sm text-destructive text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
