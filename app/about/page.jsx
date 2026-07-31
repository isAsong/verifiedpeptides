// app/about/page.jsx
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'About Us | Veritas Bio Labs',
    description:
        'Veritas Bio Labs is a premier supplier of high-purity research peptides. Learn about our mission, quality standards, and commitment to scientific advancement.',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* 页面标题 */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    About Veritas Bio Labs
                </h1>
                <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full" />
            </div>

            {/* 公司简介 */}
            <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Veritas Bio Labs is a premier supplier of high-purity research peptides
                    for laboratory and scientific research. Founded with a commitment to
                    quality and transparency, we provide researchers with reliable
                    compounds that meet the highest standards of purity and consistency.
                </p>
                <p className="text-gray-700 leading-relaxed">
                    Our products undergo rigorous quality control testing, and each batch
                    is accompanied by a comprehensive Certificate of Analysis (COA)
                    detailing purity, weight, and other critical specifications. We believe
                    that researchers deserve full transparency, which is why we make all
                    COAS publicly available.
                </p>
            </div>

            {/* 使命与愿景 */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <h2 className="text-xl font-bold text-gray-800">Our Mission</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        To accelerate scientific discovery by providing researchers worldwide
                        with premium-quality peptides, backed by uncompromising quality
                        control and transparent documentation.
                    </p>
                </div>

                <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <h2 className="text-xl font-bold text-gray-800">Our Vision</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        To be the most trusted partner for research peptides, setting the
                        industry standard for purity, reliability, and customer support in
                        the life sciences community.
                    </p>
                </div>
            </div>

            {/* 核心价值 */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Why Choose Veritas Bio Labs?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800">Uncompromising Quality</h3>


                        <p className="text-sm text-gray-600 mt-1">
                            All products are tested for purity &gt;99% with full COAS disclosure.
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800">Global Reach</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Trusted by researchers across North America, Europe, and Asia.
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800">Expert Support</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Our scientific team is available to answer your research questions.
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800">Full Transparency</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            All COAS published online — no hidden data, no surprises.
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800">Quality Assurance</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Products tested for endotoxins, sterility, and TFA content.
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800">Fast Turnaround</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Quick shipping and responsive customer service for urgent needs.
                        </p>
                    </div>
                </div>
            </div>

            {/* 科研承诺 */}
            <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    Committed to Scientific Excellence
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    At Veritas Bio Labs, we understand the critical role that high-quality
                    research materials play in advancing scientific knowledge. Every
                    product we deliver is a promise — of purity, of consistency, and of our
                    unwavering commitment to the research community.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/products"
                        className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Browse Products
                    </Link>
                    <Link
                        href="/coas"
                        className="inline-flex items-center px-5 py-2.5 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        View COAS
                    </Link>
                </div>
            </div>

            {/* 联系区块 */}
            <div className="mt-8 text-center text-sm text-gray-500">
                <p>
                    Have questions?{' '}
                    <a
                        href="https://api.whatsapp.com/send?phone=85270460355&text=Hello%2C%20I%20have%20a%20question%20about%20Veritas%20Bio%20Labs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Contact us on WhatsApp
                    </a>
                </p>
            </div>
        </div>
    );
}