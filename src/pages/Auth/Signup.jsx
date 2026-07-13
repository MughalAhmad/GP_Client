// import { Link, useNavigate } from "react-router-dom";
// import AuthLayout from "../../layouts/AuthLayout";
// import Input from "../../components/ui/Input";
// import Button from "../../components/ui/Button";

// import {
//   FaUser,
//   FaEnvelope,
//   FaLock,
//   FaArrowRight,
//   FaGoogle,
//   FaGithub,
//   FaEye,
//   FaEyeSlash,
// } from "react-icons/fa";

// import { useState } from "react";

// export default function Signup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agree: false,
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/login"); // Redirect to dashboard after successful signup
//     console.log(formData);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   return (
//     <AuthLayout
//       title="Create Account 🚀"
//       subtitle="Create your Email Finder account."
//     >
//       <div className="relative mb-10 flex flex-col items-center">
//         <div className="absolute -inset-4 opacity-20 blur-3xl">
//           <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
//         </div>

//         <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-5xl shadow-2xl transition duration-300 hover:rotate-6 hover:scale-110">
//           📧
//         </div>

//         <h2 className="mt-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl md:text-4xl font-bold text-transparent">
//           Email Finder
//         </h2>

//         <p className="mt-2 text-center text-slate-500">
//           Create your account in less than a minute.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <Input
//           label="Full Name"
//           name="fullName"
//           value={formData.fullName}
//           onChange={handleChange}
//           placeholder="John Doe"
//           icon={<FaUser />}
//           required
//         />

//         <Input
//           label="Email Address"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="john@example.com"
//           icon={<FaEnvelope />}
//           required
//         />

//         <div className="relative">
//           <Input
//             label="Password"
//             name="password"
//             type={showPassword ? "text" : "password"}
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="••••••••"
//             icon={<FaLock />}
//             required
//           />

//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-[42px] text-slate-400 hover:text-slate-700"
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </button>
//         </div>

//         <div className="relative">
//           <Input
//             label="Confirm Password"
//             name="confirmPassword"
//             type={showConfirmPassword ? "text" : "password"}
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             placeholder="••••••••"
//             icon={<FaLock />}
//             required
//           />

//           <button
//             type="button"
//             onClick={() =>
//               setShowConfirmPassword(!showConfirmPassword)
//             }
//             className="absolute right-3 top-[42px] text-slate-400 hover:text-slate-700"
//           >
//             {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//           </button>
//         </div>

//         <label className="flex items-start gap-3 text-sm text-slate-600">
//           <input
//             type="checkbox"
//             name="agree"
//             checked={formData.agree}
//             onChange={handleChange}
//             className="mt-1 accent-blue-600"
//           />

//           <span>
//             I agree to the{" "}
//             <span className="cursor-pointer font-semibold text-blue-600 hover:underline">
//               Terms & Conditions
//             </span>{" "}
//             and{" "}
//             <span className="cursor-pointer font-semibold text-blue-600 hover:underline">
//               Privacy Policy
//             </span>
//             .
//           </span>
//         </label>

//         <Button
//           type="submit"
//           className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-lg transition hover:scale-[1.02]"
//         >
//           Create Account

//           <FaArrowRight className="ml-2 transition group-hover:translate-x-2" />

//           <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-1000 group-hover:translate-x-[100%]" />
//         </Button>

//         <div className="relative py-2">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t"></div>
//           </div>

//           <div className="relative flex justify-center">
//             <span className="bg-white px-4 text-sm text-slate-400">
//               Or sign up with
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <button
//             type="button"
//             className="flex h-12 items-center justify-center gap-3 rounded-xl border-2 transition hover:-translate-y-1 hover:border-red-400 hover:shadow-lg"
//           >
//             <FaGoogle className="text-red-500" />
//             Google
//           </button>

//           <button
//             type="button"
//             className="flex h-12 items-center justify-center gap-3 rounded-xl border-2 transition hover:-translate-y-1 hover:border-slate-400 hover:shadow-lg"
//           >
//             <FaGithub />
//             GitHub
//           </button>
//         </div>

//         <p className="pt-3 text-center text-sm text-slate-500">
//           Already have an account?

//           <Link
//             to="/login"
//             className="ml-2 font-semibold text-blue-600 hover:text-indigo-700"
//           >
//             Sign In →
//           </Link>
//         </p>
//       </form>
//     </AuthLayout>
//   );
// }


import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { authService } from "../../services/authService";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaGoogle,
  FaGithub,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

import { useState } from "react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: "",
  });

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Terms agreement
    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms and conditions";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare data for API
      const userData = {
        fullName: formData.fullName.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      };

      // Call API
      const response = await authService.signup(userData);

      if (!response.hasError) {
        setSuccess(true);
        setError("");
        
        // Show success message and redirect after delay
        setTimeout(() => {
          navigate("/login", { 
            state: { 
              message: "Account created successfully! Please sign in." 
            }
          });
        }, 2000);
      } else {
        setError(response.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      
      // Handle specific error messages
      if (err.response?.status === 409) {
        setError("An account with this email already exists. Please sign in.");
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.message || "Invalid input. Please check your information.");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(err.message || "Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear general error
    if (error) {
      setError("");
    }
  };

  return (
    <AuthLayout
      title="Create Account 🚀"
      subtitle="Create your Email Finder account."
    >
      <div className="relative mb-10 flex flex-col items-center">
        <div className="absolute -inset-4 opacity-20 blur-3xl">
          <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </div>

        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-5xl shadow-2xl transition duration-300 hover:rotate-6 hover:scale-110">
          📧
        </div>

        <h2 className="mt-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          Email Finder
        </h2>

        <p className="mt-2 text-center text-slate-500">
          Create your account in less than a minute.
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
          <FaCheckCircle className="text-xl" />
          <div>
            <p className="font-semibold">Account created successfully!</p>
            <p className="text-sm">Redirecting to login...</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <FaExclamationCircle className="text-xl" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            icon={<FaUser />}
            required
            disabled={loading || success}
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div>
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            icon={<FaEnvelope />}
            required
            disabled={loading || success}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              icon={<FaLock />}
              required
              disabled={loading || success}
              className={errors.password ? "border-red-500" : ""}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] text-slate-400 transition hover:text-slate-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
          {formData.password && !errors.password && (
            <div className="mt-2 flex flex-wrap gap-2">
              <span className={`text-xs ${formData.password.length >= 6 ? 'text-emerald-600' : 'text-slate-400'}`}>
                {formData.password.length >= 6 ? '✅' : '⬜'} Min 6 chars
              </span>
              <span className={`text-xs ${/(?=.*[A-Z])/.test(formData.password) ? 'text-emerald-600' : 'text-slate-400'}`}>
                {/(?=.*[A-Z])/.test(formData.password) ? '✅' : '⬜'} Uppercase
              </span>
              <span className={`text-xs ${/(?=.*[a-z])/.test(formData.password) ? 'text-emerald-600' : 'text-slate-400'}`}>
                {/(?=.*[a-z])/.test(formData.password) ? '✅' : '⬜'} Lowercase
              </span>
              <span className={`text-xs ${/(?=.*[0-9])/.test(formData.password) ? 'text-emerald-600' : 'text-slate-400'}`}>
                {/(?=.*[0-9])/.test(formData.password) ? '✅' : '⬜'} Number
              </span>
            </div>
          )}
        </div>

        <div>
          <div className="relative">
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              icon={<FaLock />}
              required
              disabled={loading || success}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[42px] text-slate-400 transition hover:text-slate-700"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
          )}
          {formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword && (
            <p className="mt-1 text-sm text-emerald-600">✅ Passwords match</p>
          )}
        </div>

        <div>
          <label className="flex items-start gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              disabled={loading || success}
              className={`mt-1 accent-blue-600 ${errors.agree ? 'border-red-500' : ''}`}
            />

            <span>
              I agree to the{" "}
              <span className="cursor-pointer font-semibold text-blue-600 transition hover:text-indigo-700 hover:underline">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="cursor-pointer font-semibold text-blue-600 transition hover:text-indigo-700 hover:underline">
                Privacy Policy
              </span>
              .
            </span>
          </label>
          {errors.agree && (
            <p className="mt-1 text-sm text-red-600">{errors.agree}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading || success}
          className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></span>
              Creating Account...
            </>
          ) : success ? (
            "Account Created! ✅"
          ) : (
            <>
              Create Account
              <FaArrowRight className="ml-2 transition group-hover:translate-x-2" />
            </>
          )}

          <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-1000 group-hover:translate-x-[100%]" />
        </Button>

        <p className="pt-3 text-center text-sm text-slate-500">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 font-semibold text-blue-600 transition hover:text-indigo-700"
          >
            Sign In →
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}