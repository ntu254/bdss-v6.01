import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Users, MapPin, Shield } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 gradient-hero"></div>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-full blur-2xl animate-pulse animate-delay-200"></div>
                <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white rounded-full blur-xl animate-pulse animate-delay-400"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="animate-fadeInUp">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full glass text-white/90 text-sm font-medium mb-8">
                        <Heart className="w-4 h-4 mr-2 text-pink-200" />
                        Cứu sống là ý nghĩa cuộc đời
                    </div>

                    {/* Main heading */}
                    <h1 className="text-hero text-white mb-6 animate-delay-100">
                        Kết nối{' '}
                        <span className="relative">
                            <span className="text-gradient bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
                                Sự Sống
                            </span>
                            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 to-white rounded-full opacity-60"></div>
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-subtitle text-white/80 max-w-3xl mx-auto mb-12 animate-delay-200">
                        Hệ thống hiến máu thông minh, kết nối người hiến máu và người cần máu một cách nhanh chóng, 
                        an toàn và hiệu quả. Mỗi giọt máu là một món quà vô giá cho sự sống.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-delay-300">
                        <Link 
                            to="/register" 
                            className="group inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            <Heart className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                            Đăng ký hiến máu
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        
                        <Link 
                            to="/blood-requests" 
                            className="group inline-flex items-center px-8 py-4 glass text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                        >
                            <Users className="w-5 h-5 mr-2" />
                            Tìm kiếm máu
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-delay-400">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-white">
                                <div className="text-2xl font-bold">50,000+</div>
                                <div className="text-white/80">Người hiến máu</div>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-white">
                                <div className="text-2xl font-bold">100,000+</div>
                                <div className="text-white/80">Đơn vị máu</div>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-white">
                                <div className="text-2xl font-bold">99.9%</div>
                                <div className="text-white/80">An toàn</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating elements */}
            <div className="absolute bottom-10 left-10 hidden lg:block animate-bounce">
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
            </div>
            <div className="absolute top-1/3 right-10 hidden lg:block animate-bounce animate-delay-200">
                <div className="w-2 h-2 bg-white/20 rounded-full"></div>
            </div>
            <div className="absolute bottom-1/3 right-1/4 hidden lg:block animate-bounce animate-delay-400">
                <div className="w-4 h-4 bg-white/25 rounded-full"></div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
