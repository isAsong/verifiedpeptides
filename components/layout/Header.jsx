'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { WHATSAPP_NUMBER, getWhatsAppLink, WHATSAPP_MESSAGES } from '@/lib/config';
const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Peptide Calculator', href: '/calculator' },
    { label: 'Blog', href: '/blog' },
    { label: 'COAS', href: '/coas' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (href) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    // 加载可搜索数据
    useEffect(() => {
        if (isSearchOpen && allData.length === 0) {
            setIsLoading(true);
            fetch('/api/search')
                .then((res) => res.json())
                .then((data) => {
                    setAllData(data);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        }
    }, [isSearchOpen, allData.length]);

    // 搜索过滤
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        const q = searchQuery.toLowerCase().trim();
        const filtered = allData.filter((item) => {
            return (
                item.title.toLowerCase().includes(q) ||
                item.excerpt.toLowerCase().includes(q) ||
                (item.category && item.category.toLowerCase().includes(q))
            );
        });
        setSearchResults(filtered);
    }, [searchQuery, allData]);

    // 点击外部关闭搜索
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                closeSearch();
            }
        }
        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchOpen]);

    // ESC 关闭搜索
    useEffect(() => {
        function handleEsc(event) {
            if (event.key === 'Escape') closeSearch();
        }
        if (isSearchOpen) {
            document.addEventListener('keydown', handleEsc);
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isSearchOpen]);

    // 阻止滚动穿透
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const openSearch = () => {
        console.log('Search icon clicked');
        setIsSearchOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleResultClick = (url) => {
        closeSearch();
        router.push(url);
    };

    return (
        <header className="relative">
            {/* ===== Mobile Header ===== */}
            <div className="md:hidden flex items-center justify-between border-b border-slate-200 bg-white/90 backdrop-blur-sm px-4 py-2.5 sticky top-0 z-30">
                <Link href="/" className="flex items-center flex-none">
                    <img
                        src="/images/logo.jpg"
                        alt="Veritas"
                        className="h-12 w-auto object-contain"
                    />
                </Link>
                <div className="flex items-center gap-3">
                    <button
                        onClick={openSearch}
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Search"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    {/* 精致汉堡按钮 */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-gray-100 transition-colors group"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`block w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ease-out origin-center ${isMenuOpen ? 'rotate-45 translate-y-[5px] bg-blue-600' : ''
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-0 scale-0' : ''
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ease-out origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[5px] bg-blue-600' : ''
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* ===== Mobile Menu Overlay ===== */}
            <div
                className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* 遮罩层 */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={closeMenu}
                />

                {/* 菜单面板 - 从右侧滑入 */}
                <div
                    className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    {/* 菜单头部 */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <span className="font-semibold text-gray-800 text-lg">Menu</span>
                        <button
                            onClick={closeMenu}
                            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* 导航链接 - 带交错动画 */}
                    <nav className="px-4 py-4 overflow-y-auto h-[calc(100%-64px)]">
                        {navItems.map((item, index) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={closeMenu}
                                    className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 mb-1 ${active
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    style={{
                                        opacity: isMenuOpen ? 1 : 0,
                                        transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                                        transitionDelay: isMenuOpen ? `${100 + index * 50}ms` : '0ms',
                                    }}
                                >
                                    {/* 活动指示点 */}
                                    {active && (
                                        <span className="w-1.5 h-6 bg-blue-600 rounded-full flex-shrink-0" />
                                    )}
                                    {!active && (
                                        <span className="w-1.5 h-6 bg-transparent flex-shrink-0" />
                                    )}
                                    <span className={`text-sm font-medium ${active ? 'text-blue-600' : 'text-gray-700'}`}>
                                        {item.label}
                                    </span>
                                    {active && (
                                        <span className="ml-auto text-xs text-blue-600 font-medium">·</span>
                                    )}
                                </Link>
                            );
                        })}

                        {/* 底部联系卡片 */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-100/50">
                            <p className="text-xs text-gray-500 mb-2">Need help?</p>
                            <a
                                href={getWhatsAppLink(WHATSAPP_MESSAGES.default)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Chat on WhatsApp
                            </a>
                        </div>
                    </nav>
                </div>
            </div>

            {/* ===== PC Header ===== */}
            <div className="hidden md:block border-b border-slate-200 bg-white">
                <div className="container mx-auto flex items-center justify-between px-4 py-3">
                    <Link href="/" className="flex-shrink-0">
                        <img
                            src="/images/logo.jpg"
                            alt="Veritas"
                            className="h-16 w-auto object-contain"
                        />
                    </Link>
                    <nav className="flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`text-sm font-medium transition-colors ${isActive(item.href) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <button onClick={openSearch} className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>

            {/* ===== 搜索弹窗 ===== */}
            {isSearchOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20 md:pt-32"
                    onClick={closeSearch}
                >
                    <div
                        ref={searchRef}
                        className="bg-white w-full max-w-2xl mx-4 rounded-xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center border-b border-gray-200 px-4 py-2">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search products, articles, COAS..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 py-3 outline-none text-gray-700 placeholder-gray-400"
                                autoFocus
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="text-gray-400 hover:text-gray-600 p-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                            <button onClick={closeSearch} className="ml-3 text-gray-400 hover:text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                            {isLoading && (
                                <div className="p-4 text-center text-gray-500 text-sm">Loading...</div>
                            )}
                            {!isLoading && searchQuery && searchResults.length === 0 && (
                                <div className="p-4 text-center text-gray-500 text-sm">
                                    No results found for &ldquo;{searchQuery}&rdquo;
                                </div>
                            )}
                            {searchResults.length > 0 && (
                                <ul className="divide-y divide-gray-100">
                                    {searchResults.map((item) => (
                                        <li
                                            key={item.id}
                                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                                            onClick={() => handleResultClick(item.url)}
                                        >
                                            <div className="flex items-start gap-3">
                                                <span
                                                    className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${item.type === 'Product'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : item.type === 'Article'
                                                                ? 'bg-purple-100 text-purple-700'
                                                                : 'bg-green-100 text-green-700'
                                                        }`}
                                                >
                                                    {item.type}
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <div className="font-medium text-gray-800 truncate">{item.title}</div>
                                                    {item.excerpt && (
                                                        <div className="text-sm text-gray-500 truncate mt-0.5">{item.excerpt}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="px-4 py-2 bg-gray-50 text-xs text-gray-400 border-t border-gray-100 flex justify-between">
                            <span>Type to search</span>
                            <span>ESC to close</span>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}