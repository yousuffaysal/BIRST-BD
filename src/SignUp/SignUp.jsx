import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, User, Image as ImageIcon, Upload } from 'lucide-react';

import SocialLogin from "../components/SocialLogin";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { getAuth, signOut } from 'firebase/auth';
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import birstLogo from "../assets/BIRST_LOGO.svg";

const SignUp = () => {
    const [disabled, setDisabled] = useState(true);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const auth = getAuth();

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    useEffect(() => {
        setTimeout(() => {
            loadCaptchaEnginge(6, 'white', 'black');
        }, 100);
    }, []);

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

    const handleImageUpload = async (photo) => {
        const formData = new FormData();
        formData.append('image', photo);

        try {
            const response = await fetch(image_hosting_api, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            return data.data.url;
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        }
    };

    const onSubmit = async (data) => {
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

        try {
            let photoURL = data.photoURL;
            if (data.photo && data.photo[0]) {
                setUploadingImage(true);
                photoURL = await handleImageUpload(data.photo[0]);
                setUploadingImage(false);

                if (!photoURL) {
                    throw new Error("Image upload failed");
                }
            }

            const result = await createUser(data.email, data.password);
            await updateUserProfile(data.name, photoURL);

            const userInfo = {
                uid: result.user.uid,
                name: data.name,
                email: data.email,
                photoURL: photoURL,
                emailVerified: false
            };

            const res = await axiosPublic.post("/users", userInfo);

            if (res.data.insertedId) {
                reset();
                await signOut(auth);

                await Swal.fire({
                    title: 'Account Created!',
                    text: 'Please check your email to verify your account.',
                    icon: 'success',
                    background: '#0B2340',
                    color: '#fff',
                    confirmButtonColor: '#1FB6FF'
                });

                navigate("/login");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            Swal.fire({
                title: 'Signup Failed',
                text: error.message,
                icon: 'error',
                background: '#0B2340',
                color: '#fff',
                confirmButtonColor: '#EF4444'
            });
        } finally {
            setIsLoading(false);
            setUploadingImage(false);
        }
    };

    const inputClasses = "w-full pl-9 pr-3 py-2 bg-transparent border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#1FB6FF] transition-all duration-300 font-jakarta text-sm";

    return (
        <div className="h-screen w-full bg-[#0B2340] flex flex-col lg:flex-row relative overflow-hidden font-jakarta">
            {/* Left Side - Visual & Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#06182c] items-center justify-center p-8 overflow-hidden h-full">
                {/* Abstract Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
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
                        Join the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FB6FF] to-cyan-400">Community</span>
                    </h1>

                    <p className="text-gray-400 text-base leading-relaxed mb-6">
                        Create an account to start your journey in <br /> statistical research and training.
                    </p>

                    <div className="flex justify-center gap-4">
                        <div className="h-1 w-3 bg-gray-600 rounded-full"></div>
                        <div className="h-1 w-12 bg-[#1FB6FF] rounded-full"></div>
                        <div className="h-1 w-3 bg-gray-600 rounded-full"></div>
                    </div>
                </motion.div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 relative bg-[#0B2340] h-full overflow-y-auto">
                <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full max-w-sm my-auto py-8"
                >
                    <div className="mb-6 text-center lg:text-left">
                        <img src={birstLogo} alt="BIRSTBD" className="h-10 w-auto lg:hidden mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white font-unbounded mb-1">Create Account</h2>
                        <p className="text-gray-400 text-sm">Please fill in the details below</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name Input */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                            <div className="relative group/input">
                                <User className="absolute left-0 top-2.5 w-4 h-4 text-gray-500 group-focus-within/input:text-[#1FB6FF] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    {...register("name", { required: "Name is required" })}
                                    className={inputClasses}
                                />
                            </div>
                            {errors.name && (
                                <span className="text-red-400 text-[10px] mt-0.5 block">{errors.name.message}</span>
                            )}
                        </div>

                        {/* Photo Input (Dual Mode) */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider ml-1">Profile Photo</label>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <label className="flex-1 cursor-pointer relative group/input">
                                        <div className={`flex items-center gap-2 w-full px-3 py-2 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition-colors ${watch('photo')?.[0] ? 'border-[#1FB6FF]' : ''}`}>
                                            <Upload className="w-4 h-4 text-[#1FB6FF]" />
                                            <span className="text-xs text-gray-300 truncate">
                                                {watch('photo')?.[0]?.name || "Upload File"}
                                            </span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            {...register("photo")}
                                            className="hidden"
                                        />
                                    </label>
                                    <span className="text-xs text-gray-500 py-2">OR</span>
                                </div>

                                <div className="relative group/input">
                                    <ImageIcon className="absolute left-0 top-2.5 w-4 h-4 text-gray-500 group-focus-within/input:text-[#1FB6FF] transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Paste image URL of your facebook profile"
                                        {...register("photoURL")}
                                        className={inputClasses}
                                    />
                                </div>
                            </div>
                        </div>

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
                            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                            <div className="relative group/input">
                                <Lock className="absolute left-0 top-2.5 w-4 h-4 text-gray-500 group-focus-within/input:text-[#1FB6FF] transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Min 6 chars" },
                                        pattern: {
                                            value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                            message: "Strong password required (A-Z, 0-9, !@#)"
                                        }
                                    })}
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
                                <LoadCanvasTemplate reloadText="Reload" reloadColor="#1FB6FF" />
                            </div>
                            <div className="flex gap-2 relative">
                                <ShieldCheck className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
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
                            className={`w-full py-3 rounded-lg font-bold text-white text-sm shadow-lg flex items-center justify-center gap-2 transition-all duration-300 ${disabled || !termsAccepted || isLoading
                                ? 'bg-[#1FB6FF]/50 text-white/50 cursor-not-allowed'
                                : 'bg-[#1FB6FF] hover:bg-[#0ea5e9] hover:shadow-[#1FB6FF]/25'
                                }`}
                        >
                            {isLoading || uploadingImage ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Account <ArrowRight size={16} />
                                </>
                            )}
                        </motion.button>

                        <div className="relative flex py-1 items-center">
                            <div className="flex-grow border-t border-white/10"></div>
                            <span className="flex-shrink-0 mx-2 text-gray-500 text-[10px] uppercase tracking-widest">Or</span>
                            <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        {/* Social Login */}
                        <div className="[&>*]:w-full [&_button]:w-full [&_button]:bg-white/5 [&_button]:border-white/10 [&_button]:text-white [&_button]:hover:bg-white/10 [&_button]:py-2.5 [&_button]:text-sm">
                            <SocialLogin />
                        </div>

                        <p className="text-center text-xs text-gray-400 mt-2">
                            Already have an account? <Link to="/login" className="text-[#1FB6FF] hover:text-white transition-colors font-semibold">Sign in</Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default SignUp;