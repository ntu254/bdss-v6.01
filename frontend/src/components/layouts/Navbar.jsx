import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Droplet, LogOut, User, Menu, X, Home, BookOpen, CalendarPlus, AlertTriangle, LayoutDashboard, Newspaper } from 'lucide-react';
import { cn, flex, spacing, colors, typography, responsive } from '../../utils/ui-helpers';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const isAuthenticated = !!user;
    const isAdmin = user?.role === 'Admin';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Reusable nav link component
    const NavLink = ({ to, icon: Icon, children, onClick, className = "" }) => (
        <Link 
            to={to} 
            onClick={onClick}
            className={cn(
                flex.itemsCenter,
                colors.text.secondary,
                "hover:text-red-500 transition-colors",
                "px-3 py-2 rounded-md text-sm font-medium",
                className
            )}
        >
            <Icon className="w-4 h-4 mr-1.5" />
            {children}
        </Link>
    );

    // Auth button component
    const AuthButton = ({ variant = "primary", onClick, icon: Icon, children, className = "" }) => (
        <button 
            onClick={onClick}
            className={cn(
                flex.itemsCenter,
                variant === "primary" 
                    ? "bg-red-500 text-white hover:bg-red-600" 
                    : "text-gray-600 hover:text-red-500",
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                className
            )}
        >
            <Icon className="w-4 h-4 mr-1" />
            {children}
        </button>
    );

    const navigationLinks = [
        { to: "/", icon: Home, label: "Trang chủ" },
        { to: "/blood-compatibility", icon: BookOpen, label: "Cẩm nang" },
        { to: "/blog", icon: Newspaper, label: "Blog" },
        { to: "/blood-requests", icon: AlertTriangle, label: "Cần máu gấp" },
        ...(isAuthenticated ? [{ to: "/request-donation", icon: CalendarPlus, label: "Đặt lịch hiến máu" }] : []),
        ...(isAuthenticated && !isAdmin ? [{ to: "/dashboard", icon: LayoutDashboard, label: "Bảng điều khiển" }] : [])
    ];

    const navLinks = navigationLinks.map(link => (
        <NavLink key={link.to} to={link.to} icon={link.icon}>
            {link.label}
        </NavLink>
    ));

    const mobileNavLinks = navigationLinks.map(link => (
        <NavLink 
            key={link.to} 
            to={link.to} 
            icon={link.icon}
            onClick={() => setIsOpen(false)}
        >
            {link.label}
        </NavLink>
    ));

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full top-0 z-50">
            <div className={cn("max-w-7xl mx-auto", spacing.px4, responsive.sm.px6, responsive.lg.px8)}>
                <div className={cn(flex.itemsCenter, flex.justifyBetween, "h-16")}>
                    {/* Logo */}
                    <div className={flex.itemsCenter}>
                        <Link to="/" className={cn(flex.itemsCenter, "text-red-600")}>
                            <Droplet className="w-8 h-8" />
                            <span className={cn(spacing.ml2, typography.heading3)}>BloodConnect</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className={cn("ml-10", flex.itemsCenter, "space-x-1")}>{navLinks}</div>
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden md:block">
                        {isAuthenticated ? (
                            <div className={cn(flex.itemsCenter, "space-x-4")}>
                                <NavLink to="/profile" icon={User}>
                                    {user.fullName || 'Hồ sơ'}
                                </NavLink>
                                <AuthButton onClick={handleLogout} icon={LogOut}>
                                    Đăng xuất
                                </AuthButton>
                            </div>
                        ) : (
                            <div className={cn(flex.itemsCenter, "space-x-2")}>
                                <Link to="/login" className={cn(colors.text.secondary, "hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium")}>
                                    Đăng nhập
                                </Link>
                                <Link to="/register" className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600">
                                    Đăng ký
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className={cn(
                                "inline-flex items-center justify-center p-2 rounded-md",
                                "text-gray-500 hover:text-red-600 focus:outline-none"
                            )}
                        >
                            <span className="sr-only">Mở menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className={cn("px-2 pt-2 pb-3 space-y-1", responsive.sm.px3)} onClick={() => setIsOpen(false)}>
                        {mobileNavLinks}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        {isAuthenticated ? (
                            <div className="px-5">
                                <div className={cn(flex.itemsCenter, spacing.mb3)}>
                                    <User className="w-5 h-5 mr-2 text-gray-500" />
                                    <div className="text-base font-medium text-gray-800">{user.fullName}</div>
                                </div>
                                <Link 
                                    to="/profile" 
                                    onClick={() => setIsOpen(false)} 
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-red-600"
                                >
                                    Hồ sơ
                                </Link>
                                <button 
                                    onClick={() => { handleLogout(); setIsOpen(false); }} 
                                    className="block w-full text-left mt-1 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-red-600"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <div className="px-2 space-y-1">
                                <Link 
                                    to="/login" 
                                    onClick={() => setIsOpen(false)} 
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-red-600"
                                >
                                    Đăng nhập
                                </Link>
                                <Link 
                                    to="/register" 
                                    onClick={() => setIsOpen(false)} 
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-red-600"
                                >
                                    Đăng ký
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;