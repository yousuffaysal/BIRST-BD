





// import React, { useEffect, useState, useRef, useContext } from 'react';

// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
// import Swal from 'sweetalert2';

// import SocialLogin from '../components/SocialLogin';
// import { AuthContext } from '../Providers/AuthProvider';

// const Login = () => {
//     const [disabled, setDisabled] = useState(true);
//     const [termsAccepted, setTermsAccepted] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const emailRef = useRef(null);
//     const passwordRef = useRef(null);

//     const { signIn } = useContext(AuthContext);

//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || "/";

//     useEffect(() => {
//         loadCaptchaEnginge(6);
//     }, []);

//     const handleLogin = (event) => {
//         event.preventDefault();

//         if (!termsAccepted) {
//             Swal.fire({
//                 title: 'Terms & Conditions Required',
//                 text: 'Please accept the terms and conditions to continue',
//                 icon: 'warning',
//                 confirmButtonText: 'Ok'
//             });
//             return;
//         }

//         const form = event.target;
//         const email = form.email.value;
//         const password = form.password.value;

//         signIn(email, password)
//             .then((result) => {
//                 Swal.fire({
//                     title: 'Login Successful!',
//                     icon: 'success',
//                     showClass: { popup: 'animate__animated animate__fadeInDown' },
//                     hideClass: { popup: 'animate__animated animate__fadeOutUp' },
//                 });
//                 navigate(from, { replace: true });
//             })
//             .catch((error) => {
//                 let errorMessage = error.message;
//                 Swal.fire({
//                     title: 'Login Failed',
//                     text: errorMessage,
//                     icon: 'error',
//                     confirmButtonText: 'OK',
//                     confirmButtonColor: '#0A3D91'
//                 });
//             });
//     };

//     const handleValidateCaptcha = (e) => {
//         const captchaValue = e.target.value;
//         if (validateCaptcha(captchaValue)) {
//             setDisabled(false);
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Captcha Validated!',
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         } else {
//             setDisabled(true);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Invalid Captcha',
//                 text: 'Please try again',
//                 confirmButtonText: 'Ok'
//             });
//         }
//     };

//     return (
//         <div className="min-h-screen w-full bg-gradient-to-br from-deep-teal to-mint-green flex fixed inset-0">
//             {/* Left Section with Illustration */}
//             <div className="hidden lg:flex lg:w-1/2 bg-warm-beige items-center justify-center p-12 relative overflow-hidden">
//                 {/* Background Pattern */}
//                 <div className="absolute inset-0 opacity-10">
//                     <div className="absolute top-10 left-10 w-20 h-20 bg-mint-green/30 rounded-full animate-float"></div>
//                     <div className="absolute bottom-20 right-20 w-16 h-16 bg-deep-teal/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
//                     <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-light-sky-blue/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
//                 </div>

//                 <div className="max-w-lg relative z-10">
//                     {/* Logo */}
//                     <div className="mb-8">
//                         <img
//                             src="/src/assets/logo_lebas.png"
//                             alt="The Lebas Buying"
//                             className="h-16 w-auto mx-auto mb-4"
//                         />
//                         <h2 className="text-4xl font-bold font-space-grotesk text-charcoal text-center">
//                             Welcome Back to <span className="text-deep-teal">The Lebas Buying</span>
//                         </h2>
//                     </div>

//                     <p className="text-xl font-dm-sans text-charcoal/80 mb-8 leading-relaxed text-center">
//                         Crafting Quality<br className="hidden sm:inline" />Garments with Precision
//                     </p>

//                     {/* Sign Up Button */}
//                     <div className="text-center">
//                         <p className="text-charcoal/70 font-dm-sans mb-4">Don't have an account?</p>
//                         <Link 
//                             to="/signup" 
//                             className="btn-elevated px-8 py-4 rounded-xl"
//                         >
//                             Sign Up Here
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             {/* Right Section with Form */}
//             <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 overflow-y-auto">
//                 <div className="w-full max-w-md space-y-8">
//                     {/* Logo and Welcome Text */}
//                     <div className="text-center">
//                         <img
//                             src="/src/assets/logo_lebas.png"
//                             alt="The Lebas Buying"
//                             className="h-12 w-auto mx-auto mb-4 lg:hidden"
//                         />
//                         <h1 className="text-3xl font-bold font-space-grotesk text-deep-teal mb-2">Welcome!</h1>
//                         <p className="text-charcoal/70 font-dm-sans">It's really nice to see you</p>
//                     </div>

//                     {/* Login Form */}
//                     <form onSubmit={handleLogin} className="space-y-6">
//                         <div className="space-y-4">
//                             <div>
//                                 <input
//                                     ref={emailRef}
//                                     type="email"
//                                     name="email"
//                                     placeholder="Your email address *"
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-mint-green text-charcoal transition-colors"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <div className="relative">
//                                     <input
//                                         ref={passwordRef}
//                                         type={showPassword ? "text" : "password"}
//                                         name="password"
//                                         placeholder="Enter password *"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-mint-green text-charcoal transition-colors"
//                                         required
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal/60 hover:text-charcoal transition-colors"
//                                     >
//                                         {showPassword ? (
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                                                 <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
//                                             </svg>
//                                         ) : (
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
//                                                 <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
//                                             </svg>
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Captcha Section */}
//                             <div className="space-y-3 p-4 bg-warm-beige rounded-lg border border-gray-300">
//                                 <LoadCanvasTemplate />
//                                 <div className="flex gap-2">
//                                     <input
//                                         type="text"
//                                         name="captcha"
//                                         id="captcha"
//                                         placeholder="Enter captcha *"
//                                         className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-mint-green text-charcoal transition-colors"
//                                         required
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => handleValidateCaptcha({ target: document.getElementById('captcha') })}
//                                         className="px-6 py-3 bg-soft-sand hover:bg-soft-sand/80 text-charcoal font-medium rounded-lg transition-all font-dm-sans"
//                                     >
//                                         Verify
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Terms and Conditions */}
//                         <div className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 id="terms"
//                                 checked={termsAccepted}
//                                 onChange={(e) => setTermsAccepted(e.target.checked)}
//                                 className="w-4 h-4 border-gray-300 rounded text-deep-teal focus:ring-deep-teal"
//                             />
//                             <label htmlFor="terms" className="ml-2 text-sm text-charcoal/70 font-dm-sans">
//                                 I have read and agree to all{' '}
//                                 <Link to="/terms" className="text-deep-teal hover:text-mint-green transition-colors" target="_blank">
//                                     Terms & conditions
//                                 </Link>
//                             </label>
//                         </div>

//                         {/* Login Button */}
//                         <button
//                             type="submit"
//                             disabled={disabled || !termsAccepted}
//                             className="w-full py-3 px-6 btn-elevated rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-dm-sans"
//                         >
//                             <span>Sign in</span>
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                             </svg>
//                         </button>

//                         {/* Google Sign In */}
//                         <SocialLogin />

//                         {/* Sign Up Link */}
//                         <div className="flex items-center justify-between mt-6 text-sm">
//                             <Link to="/signup" className="text-deep-teal hover:text-mint-green font-medium transition-colors font-dm-sans">
//                                 Sign up
//                             </Link>
//                             <Link to="/forgot-password" className="text-deep-teal hover:text-mint-green transition-colors font-dm-sans">
//                                 Lost password?
//                             </Link>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;




// import React, { useEffect, useState, useRef, useContext } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
// import Swal from 'sweetalert2';

// import SocialLogin from '../components/SocialLogin';
// import { AuthContext } from '../Providers/AuthProvider';
// // import { AuthContext } from '../providers/AuthProvider';
// // import imge1 from '../assets/img-signup-PhotoRoom.png';

// const Login = () => {
//     const [disabled, setDisabled] = useState(true);
//     const [termsAccepted, setTermsAccepted] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const emailRef = useRef(null);
//     const passwordRef = useRef(null);

//     const { signIn } = useContext(AuthContext);

//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || "/";

//     useEffect(() => {
//         loadCaptchaEnginge(6);
//     }, []);

//     const handleLogin = (event) => {
//         event.preventDefault();

//         if (!termsAccepted) {
//             Swal.fire({
//                 title: 'Terms & Conditions Required',
//                 text: 'Please accept the terms and conditions to continue',
//                 icon: 'warning',
//                 confirmButtonText: 'Ok'
//             });
//             return;
//         }

//         const form = event.target;
//         const email = form.email.value;
//         const password = form.password.value;

//         signIn(email, password)
//             .then((result) => {
//                 Swal.fire({
//                     title: 'Login Successful!',
//                     icon: 'success',
//                     showClass: { popup: 'animate__animated animate__fadeInDown' },
//                     hideClass: { popup: 'animate__animated animate__fadeOutUp' },
//                 });
//                 navigate(from, { replace: true });
//             })
//             .catch((error) => {
//                 let errorMessage = error.message;
//                 Swal.fire({
//                     title: 'Login Failed',
//                     text: errorMessage,
//                     icon: 'error',
//                     confirmButtonText: 'OK',
//                     confirmButtonColor: '#DA3A60'
//                 });
//             });
//     };

//     const handleValidateCaptcha = (e) => {
//         const captchaValue = e.target.value;
//         if (validateCaptcha(captchaValue)) {
//             setDisabled(false);
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Captcha Validated!',
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         } else {
//             setDisabled(true);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Invalid Captcha',
//                 text: 'Please try again',
//                 confirmButtonText: 'Ok'
//             });
//         }
//     };

//     return (
//         <div className="min-h-screen w-full bg-[#005482] flex fixed inset-0">
//             {/* Left Section with Illustration */}
//             <div className="hidden lg:flex lg:w-1/2 bg-[#70C5D7] items-center justify-center p-12">
//                 <div className="max-w-lg">
//                     <h2 className="text-4xl font-bold text-white mb-6">Yes! we're making progress</h2>
//                     <p className="text-xl text-white/90">every minute & every second</p>
//                     {/* <div className="mt-8">
//                         <img 
//                             src={imge1} 
//                             alt="Progress Illustration"
//                             className="w-full max-w-md mx-auto"
//                         />
//                     </div> */}
//                 </div>
//             </div>

//             {/* Right Section with Form */}
//             <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 overflow-y-auto">
//                 <div className="w-full max-w-md space-y-8">
//                     {/* Logo and Welcome Text */}
//                     <div className="text-center">
//                         <h1 className="text-3xl font-bold text-[#005482] mb-2">Welcome!</h1>
//                         <p className="text-gray-600">It's really nice to see you</p>
//                     </div>

//                     {/* Login Form */}
//                     <form onSubmit={handleLogin} className="space-y-6">
//                         <div className="space-y-4">
//                             <div>
//                                 <input
//                                     ref={emailRef}
//                                     type="email"
//                                     name="email"
//                                     placeholder="Your email address *"
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7] text-[#005482]"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <div className="relative">
//                                     <input
//                                         ref={passwordRef}
//                                         type={showPassword ? "text" : "password"}
//                                         name="password"
//                                         placeholder="Enter password *"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7] text-[#005482]"
//                                         required
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                                     >
//                                         {showPassword ? (
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                                                 <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
//                                             </svg>
//                                         ) : (
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
//                                                 <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
//                                             </svg>
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Captcha Section */}
//                             <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
//                                 <LoadCanvasTemplate />
//                                 <div className="flex gap-2">
//                                     <input
//                                         type="text"
//                                         name="captcha"
//                                         id="captcha"
//                                         placeholder="Enter captcha *"
//                                         className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7] text-[#005482]"
//                                         required
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => handleValidateCaptcha({ target: document.getElementById('captcha') })}
//                                         className="px-6 py-3 bg-[#FCBB45] hover:bg-[#FCBB45]/90 text-white font-medium rounded-lg transition-all"
//                                     >
//                                         Verify
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Terms and Conditions */}
//                         <div className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 id="terms"
//                                 checked={termsAccepted}
//                                 onChange={(e) => setTermsAccepted(e.target.checked)}
//                                 className="w-4 h-4 border-gray-300 rounded text-[#DA3A60] focus:ring-[#DA3A60]"
//                             />
//                             <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
//                                 I have read and agree to all{' '}
//                                 <Link to="/terms" className="text-[#70C5D7] hover:text-[#005482]" target="_blank">
//                                     Terms & conditions
//                                 </Link>
//                             </label>
//                         </div>

//                         {/* Login Button */}
//                         <button
//                             type="submit"
//                             disabled={disabled || !termsAccepted}
//                             className="w-full py-3 px-6 bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                         >
//                             <span>Sign in</span>
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                             </svg>
//                         </button>

//                         {/* Google Sign In */}
//                         <SocialLogin />

//                         {/* Sign Up Link */}
//                         <div className="flex items-center justify-between mt-6 text-sm">
//                             <Link to="/signup" className="text-[#005482] hover:text-[#70C5D7] font-medium">
//                                 Sign up
//                             </Link>
//                             <Link to="/forgot-password" className="text-[#005482] hover:text-[#70C5D7]">
//                                 Lost password?
//                             </Link>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2';

import SocialLogin from '../components/SocialLogin';
import { AuthContext } from '../Providers/AuthProvider';
import birstLogo from '../assets/BIRST_LOGO.svg';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const { signIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();

        if (!termsAccepted) {
            Swal.fire({
                title: 'Terms & Conditions Required',
                text: 'Please accept the terms and conditions to continue',
                icon: 'warning',
                confirmButtonText: 'Ok'
            });
            return;
        }

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((result) => {
                Swal.fire({
                    title: 'Login Successful!',
                    icon: 'success',
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                let errorMessage = error.message;
                Swal.fire({
                    title: 'Login Failed',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#0A3D91'
                });
            });
    };

    const handleValidateCaptcha = (e) => {
        const captchaValue = e.target.value;
        if (validateCaptcha(captchaValue)) {
            setDisabled(false);
            Swal.fire({
                icon: 'success',
                title: 'Captcha Validated!',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            setDisabled(true);
            Swal.fire({
                icon: 'error',
                title: 'Invalid Captcha',
                text: 'Please try again',
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-deep-teal to-mint-green flex fixed inset-0">
            {/* Left Section with Illustration */}
            <div className="hidden lg:flex lg:w-1/2 bg-warm-beige items-center justify-center p-12 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-mint-green/30 rounded-full animate-float"></div>
                    <div className="absolute bottom-20 right-20 w-16 h-16 bg-deep-teal/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-light-sky-blue/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
                </div>

                <div className="max-w-lg relative z-10">
                    {/* Logo */}
                    <div className="mb-8">
                        <img
                            src={birstLogo}
                            alt="BIRSTBD"
                            className="h-16 w-auto mx-auto mb-4"
                        />
                        <h2 className="text-4xl font-bold font-space-grotesk text-charcoal text-center">
                            Welcome Back to <span className="text-deep-teal">BIRSTBD</span>
                        </h2>
                    </div>

                    <p className="text-xl font-dm-sans text-charcoal/80 mb-8 leading-relaxed text-center">
                        Crafting Quality<br className="hidden sm:inline" />Garments with Precision
                    </p>

                    {/* Sign Up Button */}
                    <div className="text-center">
                        <p className="text-charcoal/70 font-dm-sans mb-4">Don't have an account?</p>
                        <Link
                            to="/signup"
                            className="btn-elevated px-8 py-4"
                        >
                            Sign Up Here
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Section with Form */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 overflow-y-auto">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo and Welcome Text */}
                    <div className="text-center">
                        <img
                            src={birstLogo}
                            alt="BIRSTBD"
                            className="h-12 w-auto mx-auto mb-4 lg:hidden"
                        />
                        <h1 className="text-3xl font-bold font-space-grotesk text-deep-teal mb-2">Welcome!</h1>
                        <p className="text-charcoal/70 font-dm-sans">It's really nice to see you</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <input
                                    ref={emailRef}
                                    type="email"
                                    name="email"
                                    placeholder="Your email address *"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-mint-green text-charcoal transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <div className="relative">
                                    <input
                                        ref={passwordRef}
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter password *"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-mint-green text-charcoal transition-colors"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal/60 hover:text-charcoal transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Captcha Section */}
                            <div className="space-y-3 p-4 bg-warm-beige rounded-lg border border-gray-300">
                                <LoadCanvasTemplate />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="captcha"
                                        id="captcha"
                                        placeholder="Enter captcha *"
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-mint-green text-charcoal transition-colors"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleValidateCaptcha({ target: document.getElementById('captcha') })}
                                        className="px-6 py-3 bg-soft-sand hover:bg-soft-sand/80 text-charcoal font-medium rounded-lg transition-all font-dm-sans"
                                    >
                                        Verify
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="w-4 h-4 border-gray-300 rounded text-deep-teal focus:ring-deep-teal"
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-charcoal/70 font-dm-sans">
                                I have read and agree to all{' '}
                                <Link to="/terms" className="text-deep-teal hover:text-mint-green transition-colors" target="_blank">
                                    Terms & conditions
                                </Link>
                            </label>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={disabled || !termsAccepted}
                            className="w-full py-3 px-6 btn-elevated disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <span>Sign in</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {/* Google Sign In */}
                        <SocialLogin />

                        {/* Sign Up Link */}
                        <div className="flex items-center justify-between mt-6 text-sm">
                            <Link to="/signup" className="text-deep-teal hover:text-mint-green font-medium transition-colors font-dm-sans">
                                Sign up
                            </Link>
                            <Link to="/forgot-password" className="text-deep-teal hover:text-mint-green transition-colors font-dm-sans">
                                Lost password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;