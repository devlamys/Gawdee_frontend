import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Phone, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { ApiPost } from '@/helper/axios';
const logo = "/imges/Logo-green-text.png";

export function LoginModal({ isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState('mobile');
  const [mobile, setMobile] = useState('');
  const [otpArray, setOtpArray] = useState(['', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const otpAbortControllerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setStep('mobile');
      setMobile('');
      setOtpArray(['', '', '', '', '']);
      setLoading(false);
      setErrorMsg('');
      otpAbortControllerRef.current?.abort();
    }
  }, [isOpen]);

  const fillOtpAndVerify = (code) => {
    const cleanCode = code.replace(/\D/g, '').slice(0, 5);
    if (cleanCode.length !== 5) return;
    const newOtp = cleanCode.split('');
    setOtpArray(newOtp);
    setTimeout(() => {
      handleVerifyOtp(cleanCode);
    }, 100);
  };

  const handleSendOtp = async () => {
    if (mobile.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');

      const res = await ApiPost('/auth/send-otp', {
        mobileNumber: mobile,
        countryCode: '+91',
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Failed to send OTP');
      }

      setStep('otp');

      const fetchedOtp = res.data?.otp;
      if (fetchedOtp) {
        fillOtpAndVerify(String(fetchedOtp));
      }
    } catch (err) {
      console.error('OTP Error:', err);
      setErrorMsg(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (directOtp) => {
    const finalOtp = directOtp || otpArray.join('');
    if (finalOtp.length !== 5) {
      setErrorMsg('Please enter a complete 5-digit OTP');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');

      const res = await ApiPost('/auth/verify-otp', {
        mobileNumber: mobile,
        otp: finalOtp,
        countryCode: '+91',
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Invalid OTP');
      }

      if (res.data?.token) {
        localStorage.setItem('gawdee_token', res.data?.token);
        localStorage.setItem('token', res.data?.token);
      }

      const userData = res?.data?.user || {
        name: 'Gawdee Customer',
        phone: mobile,
      };

      localStorage.setItem('gawdee_user', JSON.stringify(userData));
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem(
        'userId',
        res.data?.userId || res.data?.user?._id || res.data?.user?.id || ''
      );
      localStorage.setItem('gawdee_logged_in', 'true');
      localStorage.setItem('isLoggedIn', 'true');

      // Dispatch custom cart/auth sync event
      window.dispatchEvent(new CustomEvent('cart-updated'));

      onClose?.();
      setTimeout(() => {
        onSuccess?.();
      }, 100);
    } catch (err) {
      console.error('Verify OTP Error:', err);
      setErrorMsg(err.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[50000] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => !loading && onClose?.()}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-gray-100"
        >
          {/* Header Banner */}
          <div className="relative bg-[#113826] p-8 text-white text-center overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-2xl pointer-events-none" />
            <button
              onClick={() => !loading && onClose?.()}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl backdrop-blur-md mb-3 border border-white/10">
              <Sparkles className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <h2 className="text-2xl font-bold font-serif">Welcome to Gawdee</h2>
            <p className="text-white/80 text-xs mt-1 font-medium">Pure A2 Ghee & Ethical Indian Food Products</p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                {errorMsg}
              </div>
            )}

            {step === 'mobile' ? (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C2421]/70 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-sm font-semibold text-gray-500 border-r border-gray-200 pr-2.5">
                      +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Enter 10-digit number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      onKeyDown={(e) => e.key === 'Enter' && mobile.length === 10 && handleSendOtp()}
                      className="w-full pl-16 pr-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-[#1C2421] focus:border-[#113826] focus:ring-2 focus:ring-[#113826]/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSendOtp}
                  disabled={mobile.length !== 10 || loading}
                  className="w-full bg-[#113826] hover:bg-[#1b4d3e] text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    'Get Login OTP'
                  )}
                </button>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-4 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#113826]" /> 100% Safe & Secure
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#113826]" /> Instant Sign-in
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="text-center">
                  <p className="text-xs text-gray-500">OTP sent to</p>
                  <p className="text-sm font-bold text-[#113826] mt-0.5">
                    +91 {mobile.slice(0, 2)}******{mobile.slice(-2)}
                    <button
                      onClick={() => setStep('mobile')}
                      className="ml-2 text-xs text-[#D4AF37] hover:underline font-normal"
                    >
                      Edit
                    </button>
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  {otpArray.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        const newOtp = [...otpArray];
                        newOtp[idx] = val;
                        setOtpArray(newOtp);
                        if (val && idx < 4) {
                          document.getElementById(`otp-input-${idx + 1}`)?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !digit && idx > 0) {
                          document.getElementById(`otp-input-${idx - 1}`)?.focus();
                        }
                      }}
                      className="w-12 h-12 text-center text-lg font-bold border border-gray-200 rounded-xl focus:border-[#113826] focus:ring-2 focus:ring-[#113826]/20 focus:outline-none transition-all"
                    />
                  ))}
                </div>

                <button
                  onClick={() => handleVerifyOtp()}
                  disabled={otpArray.join('').length !== 5 || loading}
                  className="w-full bg-[#113826] hover:bg-[#1b4d3e] text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Proceed'
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
