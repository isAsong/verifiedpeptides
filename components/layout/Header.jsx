'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'peptide calculator', href: '/calculator' }, // ← 新增
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
    const pathname = usePathname(); // ✅ 获取当前路径

    // 判断当前链接是否激活
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

    const handleResultClick = (url) => {
        closeSearch();
        router.push(url);
    };

    return (
        <header className="relative">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-start border-b border-slate-200 bg-white px-4 py-3">
                <Link href="/" className="mr-4 flex items-center flex-none">
                    <img src="/images/logo.jpg" alt="Veritas" className="h-12 w-auto object-contain" />
                </Link>
                <div className="ml-auto flex items-center gap-3">
                    <button onClick={openSearch}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex flex-col gap-1 p-1">
                        <span className={`block w-6 h-0.5 bg-gray-800 transition ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-gray-800 transition ${isMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-gray-800 transition ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-b px-4 py-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`block py-2 text-sm border-b hover:text-blue-600 ${isActive(item.href) ? 'text-blue-600' : 'text-gray-700'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}

            {/* PC Header */}
            <div className="hidden md:block border-b border-slate-200 bg-white">
                <div className="container mx-auto flex items-center justify-start px-4 py-3">
                    <Link href="/" className="mr-6 flex-shrink-0">
                        <img src="/images/logo.jpg" alt="Veritas" className="h-16 w-auto object-contain" />
                    </Link>
                    <nav className="ml-auto flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`text-sm font-medium ${isActive(item.href) ? 'text-blue-600' : 'text-gray-700'
                                    } hover:text-blue-600`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <button onClick={openSearch} className="p-1 text-gray-600 hover:text-blue-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>

            {/* ===== 搜索弹窗（保持不变） ===== */}
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
                        {/* 搜索输入框 */}
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

                        {/* 搜索结果列表 */}
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