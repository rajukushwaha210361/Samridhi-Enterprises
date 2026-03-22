import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ADMIN_API } from "../../constant/constant.js";

// ── ICONS ──────────────────────────────────────────────────────
const emailIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const lockIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
const otpIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

// ── REUSABLE COMPONENTS — bahar define karo ────────────────────
const Field = ({ label, icon, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-black mb-1">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
      <input className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" {...props} />
    </div>
  </div>
);

const Btn = ({ label, loading }) => (
  <button type="submit" disabled={loading}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition mt-2 disabled:opacity-60">
    {loading
      ? <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Please wait...
        </span>
      : label}
  </button>
);

const Card = ({ title, subtitle, error, success, children }) => (
  <div className="min-h-screen bg-gray-500 flex items-center justify-center px-4">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5 text-center">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-lg mb-5 text-center">
          {success}
        </div>
      )}
      {children}
    </div>
  </div>
);

// ── MAIN COMPONENT ─────────────────────────────────────────────
const AdminLogin = () => {
  const [step, setStep] = useState("login");

  const [formData, setFormData]       = useState({ email: "", password: "" });
  const [fpEmail, setFpEmail]         = useState("");
  const [otp, setOtp]                 = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const clear = () => { setError(""); setSuccess(""); };

  // ── LOGIN ────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); clear();
    try {
      const res = await axios.post(`${ADMIN_API}/login`, formData);
      localStorage.setItem("token", res.data.token);
      navigate("/admin/home");
    } catch {
      setError("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  // ── SEND OTP ─────────────────────────────────────────────────
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    setLoading(true); clear();
    try {
      const res = await axios.post(`${ADMIN_API}/forgot-password`, { email: fpEmail });
      setSuccess(res.data.message);
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // ── RESET PASSWORD ───────────────────────────────────────────
  const handleReset = async (e) => {
    e.preventDefault(); clear();
    if (newPassword !== confirmPass) return setError("Passwords do not match!");
    if (newPassword.length < 6)      return setError("Min. 6 characters required!");
    setLoading(true);
    try {
      const res = await axios.post(`${ADMIN_API}/reset-password`, {
        email: fpEmail, otp, newPassword
      });
      setSuccess(res.data.message);
      setTimeout(() => {
        setStep("login"); clear();
        setOtp(""); setNewPassword(""); setConfirmPass("");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // ── STEP: LOGIN ──────────────────────────────────────────────
  if (step === "login") return (
    <Card title="Admin Login" subtitle="Samridhi Enterprise" error={error} success={success}>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Field label="Email" type="email" name="email" placeholder="admin@example.com"
          icon={emailIcon} value={formData.email}
          onChange={(e) => { setFormData({ ...formData, email: e.target.value }); clear(); }} required />

        <Field label="Password" type="password" name="password" placeholder="••••••••"
          icon={lockIcon} value={formData.password}
          onChange={(e) => { setFormData({ ...formData, password: e.target.value }); clear(); }} required />

        <div className="text-right -mt-2">
          <button type="button" onClick={() => { setStep("forgot"); clear(); }}
            className="text-xs text-blue-600 hover:underline">
            Forgot Password?
          </button>
        </div>

        <Btn label="Login" loading={loading} />
      </form>
    </Card>
  );

  // ── STEP: FORGOT ─────────────────────────────────────────────
  if (step === "forgot") return (
    <Card title="Forgot Password" subtitle="OTP will be sent to your email" error={error} success={success}>
      <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
        <Field label="Admin Email" type="email" placeholder="admin@example.com"
          icon={emailIcon} value={fpEmail}
          onChange={(e) => { setFpEmail(e.target.value); clear(); }} required />

        <Btn label="Send OTP" loading={loading} />

        <p className="text-center text-sm text-gray-500">
          <button type="button" onClick={() => { setStep("login"); clear(); }}
            className="text-blue-600 hover:underline">← Back to Login</button>
        </p>
      </form>
    </Card>
  );

  // ── STEP: OTP + NEW PASSWORD ─────────────────────────────────
  if (step === "otp") return (
    <Card title="Reset Password" subtitle={`OTP sent to: ${fpEmail}`} error={error} success={success}>
      <form onSubmit={handleReset} className="flex flex-col gap-4">
        <Field label="Enter OTP" type="text" placeholder="6-digit OTP"
          icon={otpIcon} value={otp} maxLength={6}
          onChange={(e) => { setOtp(e.target.value); clear(); }} required />

        <Field label="New Password" type="password" placeholder="Min. 6 characters"
          icon={lockIcon} value={newPassword}
          onChange={(e) => { setNewPassword(e.target.value); clear(); }} required />

        <Field label="Confirm Password" type="password" placeholder="Re-enter password"
          icon={lockIcon} value={confirmPass}
          onChange={(e) => { setConfirmPass(e.target.value); clear(); }} required />

        <Btn label="Reset Password" loading={loading} />

        <p className="text-center text-sm text-gray-500">
         Didn't find the OTP?{" "}
          <button type="button" onClick={handleSendOtp} className="text-blue-600 hover:underline">
            Resend OTP
          </button>
        </p>
      </form>
    </Card>
  );
};

export default AdminLogin;