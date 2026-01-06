import React from "react";
import { Check } from "lucide-react";

const MembershipSection = () => {
    return (
        <section className="py-24 bg-[var(--color-birst-light)]">
            <div className="container px-4 mx-auto">
                <div className="max-w-3xl mx-auto mb-16 text-center">
                    <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold tracking-wider uppercase text-[var(--color-birst-primary)] bg-blue-50 rounded-full">
                        Pricing Plans
                    </span>
                    <h2 className="mb-6 text-3xl font-bold lg:text-4xl text-[var(--color-birst-dark)]" style={{ fontFamily: 'var(--font-family-space-grotesk)' }}>
                        Choose Your Learning Path
                    </h2>
                    <p className="text-lg text-gray-600">
                        Whether you are just starting or looking for advanced tools, we have a plan for you.
                    </p>
                </div>

                <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-3">
                    {/* Free Plan */}
                    <div className="p-8 transition-all bg-white shadow-sm rounded-2xl hover:shadow-xl hover:-translate-y-1">
                        <div className="mb-4 text-xl font-bold text-gray-800">Student Starter</div>
                        <div className="mb-6 text-4xl font-bold text-[var(--color-birst-dark)]">Free</div>
                        <p className="mb-8 text-sm text-gray-500">Essential resources for beginners.</p>
                        <ul className="mb-8 space-y-4">
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <Check className="w-5 h-5 text-green-500" />
                                Access to free webinars
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <Check className="w-5 h-5 text-green-500" />
                                Basic Research Templates
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <Check className="w-5 h-5 text-green-500" />
                                Community Forum Access
                            </li>
                        </ul>
                        <button className="w-full btn-elevated">Get Started</button>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative p-8 transition-all transform bg-white shadow-2xl rounded-2xl hover:-translate-y-1 md:scale-105 border-2 border-[var(--color-birst-primary)]">
                        <div className="absolute top-0 px-3 py-1 text-xs font-bold text-white uppercase -translate-x-1/2 bg-[var(--color-birst-primary)] rounded-b-lg left-1/2">
                            Most Popular
                        </div>
                        <div className="mb-4 text-xl font-bold text-[var(--color-birst-primary)]">Researcher Pro</div>
                        <div className="mb-6 text-4xl font-bold text-[var(--color-birst-dark)]">৳500<span className="text-lg font-normal text-gray-400">/mo</span></div>
                        <p className="mb-8 text-sm text-gray-500">For serious researchers needing AI support.</p>
                        <ul className="mb-8 space-y-4">
                            <li className="flex items-center gap-3 text-sm text-gray-800 font-medium">
                                <Check className="w-5 h-5 text-[var(--color-birst-primary)]" />
                                All Free features
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-800 font-medium">
                                <Check className="w-5 h-5 text-[var(--color-birst-primary)]" />
                                Unlimited AI Tool Usage
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-800 font-medium">
                                <Check className="w-5 h-5 text-[var(--color-birst-primary)]" />
                                Priority Seminar Registration
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-800 font-medium">
                                <Check className="w-5 h-5 text-[var(--color-birst-primary)]" />
                                Verified Certificates
                            </li>
                        </ul>
                        <button className="w-full text-white btn-srcbd bg-[var(--color-birst-primary)] hover:bg-[var(--color-birst-accent)] shadow-lg shadow-blue-200">Subscribe Now</button>
                    </div>

                    {/* Premium Plan */}
                    <div className="p-8 transition-all bg-white shadow-sm rounded-2xl hover:shadow-xl hover:-translate-y-1">
                        <div className="mb-4 text-xl font-bold text-gray-800">Institution</div>
                        <div className="mb-6 text-4xl font-bold text-[var(--color-birst-dark)]">Custom</div>
                        <p className="mb-8 text-sm text-gray-500">For universities and organizations.</p>
                        <ul className="mb-8 space-y-4">
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <Check className="w-5 h-5 text-gray-400" />
                                Bulk Student Access
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <Check className="w-5 h-5 text-gray-400" />
                                Custom Workshops
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <Check className="w-5 h-5 text-gray-400" />
                                Dedicated Support
                            </li>
                        </ul>
                        <button className="w-full px-6 py-3 font-semibold transition-colors border rounded-xl border-gray-200 hover:border-[var(--color-birst-dark)] text-gray-700">Contact Sales</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MembershipSection;