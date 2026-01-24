
import React from 'react'

export default function () {
  return (
    <div>
    <footer className="bg-gradient-to-r from-[#59168B] to-[#8200DB] text-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 py-12 sm:py-14 md:py-16 lg:py-20">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          
          {/* Brand Section */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2rem] font-bold mb-4 tracking-tight">
              SkillSync
            </h2>
            <p className="text-base sm:text-[15px] lg:text-[16px] leading-relaxed font-normal">
              Empowering careers through<br />
              meaningful mentorship connections
            </p>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg sm:text-[18px] font-semibold mb-5">
              About
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#about-us" 
                  className="text-base hover:underline transition-all"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-base hover:underline transition-all"
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="#careers" 
                  className="text-base hover:underline transition-all"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg sm:text-[18px] font-semibold mb-5">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#terms" 
                  className="text-base hover:underline transition-all"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#privacy" 
                  className="text-base hover:underline transition-all"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-lg sm:text-[18px] font-semibold mb-5">
              Social
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#twitter" 
                  className="text-base hover:underline transition-all"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="#linkedin" 
                  className="text-base hover:underline transition-all"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="#facebook" 
                  className="text-base hover:underline transition-all"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/20 text-center">
          <p className="text-sm">
            © 2024 SkillSync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </div>
  )
}
