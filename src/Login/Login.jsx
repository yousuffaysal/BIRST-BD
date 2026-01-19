import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

import SocialLogin from '../components/SocialLogin';
import { AuthContext } from '../Providers/AuthProvider';
import birstLogo from '../assets/BIRST_LOGO.svg';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        // Delay to ensure DOM is ready and explicit colors for contrast
        setTimeout(() => {
            loadCaptchaEnginge(6, 'white', 'black');
        }, 100);
    }, []);

    const onSubmit = (data) => {
        if (!termsAccepted) {
            Swal.fire({
                title: 'Terms Required',
                text: 'Please accept the terms and conditions to continue',
                icon: 'warning',
                confirmButtonColor: '#1FB6FF',
                background: '#0B2340',
                color: '#fff'
            });
            return;
        }

        setIsLoading(true);

        signIn(data.email, data.password)
            .then((result) => {
                Swal.fire({
                    title: 'Welcome Back!',
                    text: 'Login Successful',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#0B2340',
                    color: '#fff'
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                let errorMessage = error.message;
                Swal.fire({
                    title: 'Login Failed',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    confirmButtonColor: '#EF4444',
                    background: '#0B2340',
                    color: '#fff'
                });
            })
            .finally(() => setIsLoading(false));
    };

    const handleValidateCaptcha = (e) => {
        const captchaValue = e.target.value;
        if (captchaValue.length === 6) {
            if (validateCaptcha(captchaValue)) {
                setDisabled(false);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#0B2340',
                    color: '#fff',
                    iconColor: '#10B981'
                });
                Toast.fire({ icon: 'success', title: 'Captcha Verified' });
            } else {
                setDisabled(true);
            }
        } else {
            setDisabled(true);
        }
    };

    const inputClasses = "w-full pl-9 pr-3 py-2 bg-transparent border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#1FB6FF] transition-all duration-300 font-jakarta text-sm";

    return (
        <div className="min-h-screen w-full bg-[#0B2340] flex flex-col lg:flex-row relative font-jakarta">
            {/* Left Side - Visual & Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#06182c] items-center justify-center p-8 min-h-screen">
                {/* Abstract Background Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1FB6FF]/10 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#70C5D7]/10 rounded-full blur-[100px]" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 text-center max-w-lg"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6 aspect-square flex items-center justify-center"
                    >
                        <img src={birstLogo} alt="BIRSTBD" className="h-40 w-auto" />
                    </motion.div>

                    <h1 className="text-4xl lg:text-5xl font-bold text-white font-unbounded mb-4 leading-tight">
                        Research <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FB6FF] to-cyan-400">Excellence</span>
                    </h1>

                    <p className="text-gray-400 text-base leading-relaxed mb-6">
                        Join the premier platform for statistical <br /> training and research development.
                    </p>

                    <div className="flex justify-center gap-4">
                        <div className="h-1 w-12 bg-[#1FB6FF] rounded-full"></div>
                        <div className="h-1 w-3 bg-gray-600 rounded-full"></div>
                        <div className="h-1 w-3 bg-gray-600 rounded-full"></div>
                    </div>
                </motion.div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 relative bg-[#0B2340] py-12 lg:py-0">
                <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full max-w-sm"
                >
                    <div className="mb-6 text-center lg:text-left">
                        <img src={birstLogo} alt="BIRSTBD" className="h-10 w-auto lg:hidden mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white font-unbounded mb-1">Welcome Back</h2>
                        <p className="text-gray-400 text-sm">Please enter your details to sign in</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email Input */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider ml-1">Email</label>
                            <div className="relative group/input">
                                <Mail className="absolute left-0 top-2.5 w-4 h-4 text-gray-500 group-focus-within/input:text-[#1FB6FF] transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    {...register("email", { required: "Email is required" })}
                                    className={inputClasses}
                                />
                            </div>
                            {errors.email && (
                                <span className="text-red-400 text-[10px] mt-0.5 block">{errors.email.message}</span>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                                <Link to="/forgot-password" className="text-[10px] text-[#1FB6FF] hover:text-cyan-400 transition-colors">Forgot?</Link>
                            </div>
                            <div className="relative group/input">
                                <Lock className="absolute left-0 top-2.5 w-4 h-4 text-gray-500 group-focus-within/input:text-[#1FB6FF] transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("password", { required: "Password is required" })}
                                    className={inputClasses}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-2.5 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-red-400 text-[10px] mt-0.5 block">{errors.password.message}</span>
                            )}
                        </div>

                        {/* Captcha */}
                        <div className="bg-black/20 rounded-lg p-3 border border-white/5 space-y-2">
                            <div className="bg-white rounded p-1.5 flex justify-center">
                                <LoadCanvasTemplate reloadText="Reload Captcha" reloadColor="#1FB6FF" />
                            </div>
                            <div className="flex gap-2 relative">
                                <ShieldCheck className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    name="captcha"
                                    placeholder="Type captcha"
                                    onChange={handleValidateCaptcha}
                                    className="w-full pl-9 pr-3 py-1.5 bg-white/5 border border-white/10 rounded text-white text-xs focus:outline-none focus:border-[#1FB6FF] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Terms checkbox */}
                        <div className="flex items-center gap-2 group/terms cursor-pointer">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="w-3.5 h-3.5 rounded border-gray-600 bg-transparent text-[#1FB6FF] focus:ring-offset-[#0B2340] focus:ring-[#1FB6FF]"
                            />
                            <label htmlFor="terms" className="text-xs text-gray-400 group-hover/terms:text-gray-300 transition-colors cursor-pointer select-none">
                                I agree to the <Link to="/terms" className="text-[#1FB6FF] hover:underline">Terms & Conditions</Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={disabled || !termsAccepted || isLoading}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`w-full py-3 rounded-lg font-bold text-white text-sm shadow-lg flex items-center justify-center gap-2 transition-all duration-300 ${disabled || !termsAccepted
                                ? 'bg-[#1FB6FF]/50 text-white/50 cursor-not-allowed'
                                : 'bg-[#1FB6FF] hover:bg-[#0ea5e9] hover:shadow-[#1FB6FF]/25'
                                }`}
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight size={16} />
                                </>
                            )}
                        </motion.button>

                        <div className="relative flex py-1 items-center">
                            <div className="flex-grow border-t border-white/10"></div>
                            <span className="flex-shrink-0 mx-2 text-gray-500 text-[10px] uppercase tracking-widest">Or</span>
                            <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        {/* Social Login - Compact */}
                        <div className="[&>*]:w-full [&_button]:w-full [&_button]:bg-white/5 [&_button]:border-white/10 [&_button]:text-white [&_button]:hover:bg-white/10 [&_button]:py-2.5 [&_button]:text-sm">
                            <SocialLogin />
                        </div>

                        <p className="text-center text-xs text-gray-400 mt-2">
                            Don't have an account? <Link to="/signup" className="text-[#1FB6FF] hover:text-white transition-colors font-semibold">Sign up</Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;