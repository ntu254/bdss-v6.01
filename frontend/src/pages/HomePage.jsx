import React from 'react';
import SEO from '../components/common/SEO';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import StatsSection from '../components/home/StatsSection';
import CTASection from '../components/home/CTASection';

const HomePage = () => {
    return (
        <>
            <SEO 
                title="BloodConnect - Kết nối sự sống"
                description="Hệ thống quản lý hiến máu chuyên nghiệp. Kết nối người hiến máu và người cần máu một cách nhanh chóng, an toàn. Hãy trở thành người hùng cứu sống!"
            />
            <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
                <main className="pt-16">
                    <HeroSection />
                    <FeaturesSection />
                    <StatsSection />
                    <CTASection />
                </main>
            </div>
        </>
    );
};

export default HomePage;