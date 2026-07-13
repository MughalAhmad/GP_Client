import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { authService } from "../../services/authService";
import { 
  FaEnvelope, 
  FaLock, 
  FaArrowRight, 
  FaGoogle, 
  FaGithub,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle
} from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      // Call login API
      const response = await authService.signin({
        email: formData.email,
        password: formData.password
      });

      if (response.success) {
        setSuccess("Login successful! Redirecting...");
        
        // Store user data if remember me is checked
        if (formData.rememberMe) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        
        // Redirect to dashboard after short delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setError(response.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      
      // Handle different error scenarios
      if (err.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else if (err.response?.status === 404) {
        setError("Account not found. Please sign up first.");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Failed to login. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (error) setError("");
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to continue managing your Email Finder."
    >
      <div className="relative mb-10 flex flex-col items-center">
        {/* Animated background glow */}
        <div className="absolute -inset-4 blur-3xl opacity-20">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
        </div>
        
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-5xl font-bold text-white shadow-2xl transform transition-transform hover:scale-110 hover:rotate-6 duration-300">
          <span className="relative z-10">📧</span>
          <div className="absolute inset-0 rounded-3xl bg-white/20 blur-sm"></div>
        </div>

        <h2 className="mt-6 text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Email Finder
        </h2>

        <p className="mt-2 text-center text-slate-500 max-w-sm">
          Welcome back! Please login to your account.
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
          <FaCheckCircle className="text-xl flex-shrink-0" />
          <p>{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <FaExclamationCircle className="text-xl flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <div className="group relative">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              icon={<FaEnvelope className="text-slate-400 group-focus-within:text-blue-600 transition-colors" />}
              className="pl-11 py-3 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all duration-300"
              required
              disabled={loading}
            />
          </div>

          <div className="group relative">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              icon={<FaLock className="text-slate-400 group-focus-within:text-blue-600 transition-colors" />}
              className="pl-11 py-3 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all duration-300"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] text-slate-400 hover:text-slate-600 transition-colors"
              disabled={loading}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 rounded border-2 border-slate-300 accent-blue-600 cursor-pointer transition-all hover:scale-110"
              disabled={loading}
            />
            <span>Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="font-medium text-blue-600 transition-all hover:text-indigo-700 hover:underline-offset-4 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="relative z-10 flex items-center">
            {loading ? (
              <>
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></span>
                Signing In...
              </>
            ) : (
              <>
                Sign In
                <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </Button>

        <p className="text-center text-xs md:text-sm text-slate-500 pt-2">
          Don't have an account?
          <Link
            to="/signup"
            className="ml-2 font-semibold text-blue-600 transition-all hover:text-indigo-700 hover:underline-offset-2 hover:underline"
          >
            Create Account →
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
