// src/app/components/Footer.tsx
import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full bg-[#c00000] text-white box-border mt-auto font-sans">
            {/* Main Footer Area */}
            <div className="flex flex-col md:flex-row justify-end items-center gap-7 px-[8%] py-[30px] md:text-right text-center">

                {/* Contact Us Title */}
                <div className="text-4xl md:text-[2.5rem] font-bold leading-[1.1]">
                    Contact<br className="hidden md:inline" /> Us
                </div>

                {/* Contact Details */}
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                    {/* Phone */}
                    <li className="flex flex-col md:flex-row items-center gap-2 md:gap-[15px] text-[0.95rem] font-bold">
                        <div className="flex items-center justify-center w-8 height-8 min-w-[32px] min-h-[32px] border-2 border-white rounded-full">
                            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                                <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                            </svg>
                        </div>
                        <span className="leading-[1.3]">091234556788</span>
                    </li>

                    {/* Email */}
                    <li className="flex flex-col md:flex-row items-center gap-2 md:gap-[15px] text-[0.95rem] font-bold">
                        <div className="flex items-center justify-center w-8 height-8 min-w-[32px] min-h-[32px] border-2 border-white rounded-full">
                            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                        </div>
                        <span className="leading-[1.3]">support@foodify.com</span>
                    </li>

                    {/* Address */}
                    <li className="flex flex-col md:flex-row items-center gap-2 md:gap-[15px] text-[0.95rem] font-bold">
                        <div className="flex items-center justify-center w-8 height-8 min-w-[32px] min-h-[32px] border-2 border-white rounded-full">
                            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        </div>
                        <span className="leading-[1.3]">
                            62 G. Lazaro Rd, Dalandanan,<br />Valenzuela City, 1444,
                        </span>
                    </li>
                </ul>

            </div>

            {/* Copyright Bar */}
            <div className="bg-[#c00000] border-t-4 border-white py-[15px] text-center text-[0.9rem] font-normal tracking-[0.5px]">
                &copy; 2026 Foodify. All Rights Resevered.
            </div>
        </footer>
    );
}