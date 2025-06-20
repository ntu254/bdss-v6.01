import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Users, Clock, Shield } from 'lucide-react';
import { Container, Section, Grid } from '../index';
import Card from '../ui/Card';
import { cn, spacing, typography, colors, animation, flex } from '../../utils/ui-helpers';

const CTASection = () => {
    const FeatureItem = ({ children }) => (
        <li className={flex.itemsCenter}>
            <div className="w-2 h-2 bg-white/60 rounded-full mr-3" />
            {children}
        </li>
    );

    const TrustBadge = ({ icon: Icon, text }) => (
        <div className={flex.itemsCenter}>
            <Icon className="w-5 h-5 mr-2" />
            <span className="text-sm">{text}</span>
        </div>
    );

    const ActionButton = ({ to, variant = "primary", icon: Icon, children }) => (
        <Link 
            to={to}
            className={cn(
                "group inline-flex items-center w-full justify-center",
                "px-6 py-4 rounded-xl font-semibold transition-all duration-300",
                variant === "primary" 
                    ? "bg-white text-primary-600 hover:bg-white/90"
                    : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
            )}
        >
            {Icon && <Icon className="w-5 h-5 mr-2" />}
            {children}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
    );

    const donorFeatures = [
        "Quy trình đơn giản, an toàn 100%",
        "Được khám sức khỏe miễn phí", 
        "Nhận chứng nhận tình nguyện viên",
        "Cảm giác hạnh phúc vô bờ bến"
    ];

    const recipientFeatures = [
        "Tìm kiếm nhanh chóng theo nhóm máu",
        "Kết nối trực tiếp với người hiến",
        "Hỗ trợ 24/7 từ đội ngũ y tế", 
        "Hoàn toàn miễn phí"
    ];

    const trustBadges = [
        { icon: Shield, text: "Được chứng nhận bởi Bộ Y tế" },
        { icon: Heart, text: "Đối tác của 100+ bệnh viện" },
        { icon: Users, text: "Tin tưởng bởi 50,000+ người dùng" }
    ];

    return (
        <Section className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 gradient-hero" />
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }} />
            </div>

            <Container className="relative z-10">
                <div className={cn("text-center", spacing.mb16)}>
                    <h2 className={cn(typography.hero, "text-white", spacing.mb6)}>
                        Bạn đã sẵn sàng{' '}
                        <span className="text-gradient bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
                            cứu sống
                        </span>{' '}
                        chưa?
                    </h2>
                    <p className={cn(typography.lead, "text-white/80 max-w-2xl mx-auto")}>
                        Chỉ cần 10 phút của bạn có thể cứu sống 3 người. Hãy trở thành người hùng trong câu chuyện của ai đó.
                    </p>
                </div>

                {/* Emergency Alert */}
                <Card 
                    variant="professional" 
                    className={cn(
                        "max-w-4xl mx-auto",
                        spacing.mb12,
                        "bg-gradient-to-r from-red-50 to-pink-50 border-red-200"
                    )}
                >
                    <div className={cn(spacing.p8, "text-center")}>
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                            <Heart className="w-8 h-8 text-red-600 animate-pulse" />
                        </div>
                        <h3 className={cn(typography.heading2, "text-red-800", spacing.mb2)}>
                            Cần gấp máu nhóm O-
                        </h3>
                        <p className={cn("text-red-600", spacing.mb4)}>
                            Hiện tại bệnh viện đang thiếu nghiêm trọng máu nhóm O-. Mọi sự giúp đỡ đều quý giá!
                        </p>
                        <ActionButton to="/blood-requests" icon={Clock}>
                            Xem yêu cầu khẩn cấp
                        </ActionButton>
                    </div>
                </Card>

                {/* Action Cards */}
                <Grid cols="1 md:2" gap="8" className={cn("max-w-5xl mx-auto", spacing.mb16)}>
                    {/* Donor Card */}
                    <Card variant="glass" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <div className={spacing.p8}>
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <h3 className={cn(typography.heading2, spacing.mb4)}>Trở thành người hiến máu</h3>
                            <ul className={cn("space-y-3", spacing.mb8, "text-white/80")}>
                                {donorFeatures.map(feature => (
                                    <FeatureItem key={feature}>{feature}</FeatureItem>
                                ))}
                            </ul>
                            <ActionButton to="/register">
                                Đăng ký ngay
                            </ActionButton>
                        </div>
                    </Card>

                    {/* Recipient Card */}
                    <Card variant="glass" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <div className={spacing.p8}>
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className={cn(typography.heading2, spacing.mb4)}>Tìm kiếm máu</h3>
                            <ul className={cn("space-y-3", spacing.mb8, "text-white/80")}>
                                {recipientFeatures.map(feature => (
                                    <FeatureItem key={feature}>{feature}</FeatureItem>
                                ))}
                            </ul>
                            <ActionButton to="/blood-requests" variant="secondary">
                                Tìm kiếm ngay
                            </ActionButton>
                        </div>
                    </Card>
                </Grid>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
                    {trustBadges.map(badge => (
                        <TrustBadge key={badge.text} icon={badge.icon} text={badge.text} />
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default CTASection;
