// components/home/StatsSection.jsx
import React from 'react';
import { Users, Droplet, Heart } from 'lucide-react';
import { Container, Section, Grid } from '../index';
import { cn, spacing, typography, colors, animation } from '../../utils/ui-helpers';

export default function StatsSection() {
    const stats = [
        { number: "10,000+", label: "Người hiến máu", icon: Users },
        { number: "5,000+", label: "Lượt hiến máu thành công", icon: Droplet },
        { number: "50+", label: "Bệnh viện & Đối tác", icon: Heart }
    ];

    const StatItem = ({ stat, index }) => (
        <div className={cn(
            "text-center",
            animation.fadeInUp
        )} style={{ animationDelay: `${index * 0.2}s` }}>
            <div className={spacing.mb4}>
                <stat.icon className="w-12 h-12 mx-auto mb-2 text-red-200" />
            </div>
            <div className={cn(
                "text-4xl lg:text-5xl font-bold",
                spacing.mb2,
                "animate-pulse-soft"
            )}>
                {stat.number}
            </div>
            <div className="text-red-100 text-lg">{stat.label}</div>
        </div>
    );

    return (
        <Section 
            className="bg-red-600 text-white relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-red-700/20 to-pink-600/20" />
            <Container className="relative">
                <Grid cols="1 md:3" gap="8">
                    {stats.map((stat, index) => (
                        <StatItem key={stat.label} stat={stat} index={index} />
                    ))}
                </Grid>
            </Container>
        </Section>
    );
}
