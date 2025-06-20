// Professional Features Section - Refactored
import React from 'react';
import { Heart, Users, MapPin, Shield, Clock, Award, Phone, Globe } from 'lucide-react';
import { Container, Section, Grid } from '../index';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { cn, spacing, typography, colors, animation } from '../../utils/ui-helpers';

export default function FeaturesSection() {
    const mainFeatures = [
        { 
            icon: Heart, 
            title: "Hiến máu thông minh", 
            description: "Quy trình hiến máu được số hóa hoàn toàn với AI hỗ trợ matching tự động theo nhóm máu và vị trí địa lý.",
            gradient: "from-red-500 to-pink-600"
        },
        { 
            icon: Users, 
            title: "Cộng đồng toàn cầu", 
            description: "Kết nối với hơn 50,000 người hiến máu tình nguyện và 200+ bệnh viện trên toàn quốc trong hệ thống.",
            gradient: "from-blue-500 to-indigo-600"
        },
        { 
            icon: MapPin, 
            title: "Định vị thông minh", 
            description: "Công nghệ GPS tích hợp giúp tìm kiếm địa điểm hiến máu hoặc người cần máu gần nhất trong vòng 5km.",
            gradient: "from-green-500 to-emerald-600"
        },
        { 
            icon: Shield, 
            title: "Bảo mật chuẩn y tế", 
            description: "Tuân thủ nghiêm ngặt tiêu chuẩn HIPAA và ISO 27001 để bảo vệ thông tin sức khỏe cá nhân.",
            gradient: "from-purple-500 to-violet-600"
        }
    ];

    const additionalFeatures = [
        { icon: Clock, title: "Phản hồi nhanh 24/7", description: "Hệ thống thông báo real-time khi có yêu cầu máu khẩn cấp" },
        { icon: Award, title: "Chứng nhận quốc tế", description: "Được công nhận bởi WHO và Bộ Y tế Việt Nam" },
        { icon: Phone, title: "Hỗ trợ đa kênh", description: "Chat, email, hotline 24/7 với đội ngũ y tế chuyên nghiệp" },
        { icon: Globe, title: "Tích hợp đa nền tảng", description: "Đồng bộ với các hệ thống bệnh viện và ngân hàng máu" }
    ];

    const FeatureIcon = ({ icon: Icon, gradient, index }) => (
        <div className={cn(
            "w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0",
            `bg-gradient-to-br ${gradient}`,
            "group-hover:scale-110 transition-transform duration-300"
        )}>
            <Icon className="w-8 h-8 text-white" />
        </div>
    );

    const MainFeatureCard = ({ feature, index }) => (
        <Card 
            variant="professional" 
            className={cn("group", animation.fadeInUp, `animate-delay-${(index + 1) * 100}`)}
        >
            <div className={spacing.p8}>
                <div className="flex items-start space-x-6">
                    <FeatureIcon icon={feature.icon} gradient={feature.gradient} index={index} />
                    <div className="flex-1">
                        <h3 className={cn(typography.heading2, colors.text.primary, spacing.mb3)}>
                            {feature.title}
                        </h3>
                        <p className={cn(colors.text.secondary, "leading-relaxed")}>
                            {feature.description}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );

    const AdditionalFeatureItem = ({ feature, index }) => (
        <div className={cn(
            "text-center group",
            animation.fadeInUp, 
            `animate-delay-${(index + 5) * 100}`
        )}>
            <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center mx-auto",
                "bg-gradient-to-br from-neutral-100 to-neutral-200",
                "group-hover:from-primary-50 group-hover:to-primary-100",
                "transition-all duration-300",
                spacing.mb4
            )}>
                <feature.icon className={cn(
                    "w-7 h-7",
                    "text-neutral-600 group-hover:text-primary-600",
                    "transition-colors"
                )} />
            </div>
            <h4 className={cn(typography.heading4, colors.text.primary, spacing.mb2)}>
                {feature.title}
            </h4>
            <p className={cn(colors.text.secondary, "text-sm leading-relaxed")}>
                {feature.description}
            </p>
        </div>
    );

    return (
        <Section gradient="from-neutral-50 via-white to-neutral-50">
            <Container>
                {/* Section Header */}
                <div className={cn("text-center", spacing.mb20, animation.fadeInUp)}>
                    <Badge variant="secondary" className={spacing.mb6}>
                        <Award className="w-4 h-4 mr-2" />
                        Công nghệ hàng đầu trong lĩnh vực y tế
                    </Badge>
                    <h2 className={cn(typography.hero, colors.text.primary, spacing.mb6)}>
                        Tại sao chọn{' '}
                        <span className="text-gradient">BloodConnect</span>?
                    </h2>
                    <p className={cn(
                        typography.lead,
                        colors.text.secondary,
                        "max-w-3xl mx-auto leading-relaxed"
                    )}>
                        Chúng tôi kết hợp công nghệ tiên tiến với sứ mệnh nhân văn, 
                        tạo ra nền tảng hiến máu thông minh và đáng tin cậy nhất Việt Nam.
                    </p>
                </div>

                {/* Main Features Grid */}
                <Grid cols="1 lg:2" gap="8" className={spacing.mb20}>
                    {mainFeatures.map((feature, index) => (
                        <MainFeatureCard key={feature.title} feature={feature} index={index} />
                    ))}
                </Grid>

                {/* Additional Features */}
                <Card variant="glass" className={cn(spacing.p8, animation.fadeInUp, "animate-delay-400")}>
                    <div className={cn("text-center", spacing.mb12)}>
                        <h3 className={cn(typography.heading1, colors.text.primary, spacing.mb4)}>
                            Tính năng nổi bật khác
                        </h3>
                        <p className={cn(colors.text.secondary, "max-w-2xl mx-auto")}>
                            Những tiện ích bổ sung giúp trải nghiệm hiến máu của bạn trở nên hoàn hảo hơn
                        </p>
                    </div>

                    <Grid cols="1 md:2 lg:4" gap="8">
                        {additionalFeatures.map((feature, index) => (
                            <AdditionalFeatureItem key={feature.title} feature={feature} index={index} />
                        ))}
                    </Grid>
                </Card>

                {/* Trust Indicators */}
                <div className={cn("text-center", spacing.mt20, animation.fadeInUp, "animate-delay-600")}>
                    <p className={cn(colors.text.muted, spacing.mb8)}>Được tin tưởng bởi các tổ chức hàng đầu</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
                        {['WHO', 'Bộ Y Tế', 'Hội Chữ Thập Đỏ', 'Bộ Khoa Học', 'ISO 27001'].map(org => (
                            <div key={org} className="text-2xl font-bold text-neutral-400">{org}</div>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
