// app/about/page.jsx
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'About Us | verifiedpeptides',
    description:
        'verifiedpeptides is a premier supplier of high-purity research peptides. Learn about our mission, quality standards, and commitment to scientific advancement.',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <section className="overflow-hidden rounded-[2rem] shadow-2xl mb-12">
                <div className="relative h-72 md:h-[30rem]">
                    <Image
                        src="/images/home/logo.svg"
                        alt="verifiedpeptides research lab"
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-slate-900/65" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                        <span className="text-sm uppercase tracking-[0.35em] text-cyan-200 mb-4">
                            High-purity research peptides
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                            Trusted peptide quality for scientific research
                        </h1>
                        <p className="mt-4 max-w-3xl text-sm md:text-base text-slate-200">
                            We support research labs with premium peptides, full Certificates of Analysis,
                            and responsive scientific support for every order.
                        </p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
                            >
                                Browse Products
                            </Link>
                            <Link
                                href="/coas"
                                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                            >
                                View COAs
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] items-start">
                <div>
                    <div className="mb-6 inline-flex rounded-full bg-slate-100 px-4 py-1 text-sm font-semibold text-slate-700">
                        About verifiedpeptides
                    </div>
                    <div className="space-y-6 text-gray-700">
                        <p className="text-lg leading-relaxed">
                            verifiedpeptides is a laboratory-focused supplier of high-purity research peptides for academic,
                            biotech, and pharmaceutical research. Every batch is produced and tested to support scientific
                            discovery with confidence.
                        </p>
                        <p className="leading-relaxed">
                            We combine rigorous manufacturing standards with transparent documentation. Each peptide is
                            accompanied by a full Certificate of Analysis (COA) that details purity, identity, and product
                            specifications so researchers can evaluate materials quickly and reliably.
                        </p>
                    </div>
                </div>

                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">What sets us apart</h2>
                    <ul className="space-y-4 text-gray-600">
                        <li className="flex gap-3">
                            <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                                ✓
                            </span>
                            <span>Purity guaranteed above 99% with batch-level COA reporting.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                                ✓
                            </span>
                            <span>Traceable sourcing and consistent quality across every shipment.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                                ✓
                            </span>
                            <span>Dedicated scientific support for product selection and application guidance.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                                ✓
                            </span>
                            <span>Full transparency with online COA access and clear product documentation.</span>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mt-12 space-y-10">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex rounded-full bg-slate-100 px-4 py-1 text-sm font-semibold text-slate-700">
                        Our mission & vision
                    </div>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 text-lg font-semibold">
                                M
                            </div>
                            <h2 className="text-xl font-semibold text-slate-900 mb-2">Our Mission</h2>
                            <p className="text-sm leading-7 text-slate-600">
                                Power scientific progress with premium peptides, meticulous quality checks, and crystal-clear analytical documentation.
                            </p>
                        </div>
                        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 text-lg font-semibold">
                                V
                            </div>
                            <h2 className="text-xl font-semibold text-slate-900 mb-2">Our Vision</h2>
                            <p className="text-sm leading-7 text-slate-600">
                                Be the peptide partner researchers trust most for purity, transparency, and reliable scientific support.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-slate-50 p-10 shadow-xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Why researchers choose verifiedpeptides</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
                            Premium peptides with trusted COA transparency, dependable support, and fast delivery for every research need.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 text-xl">
                                ✔️
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">Verified purity</h3>
                            <p className="text-sm text-slate-600">Every batch meets strict purity standards and includes a full COA.</p>
                        </div>
                        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 text-xl">
                                🧪
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">Scientific support</h3>
                            <p className="text-sm text-slate-600">Practical guidance from specialists to help you choose the right peptide.</p>
                        </div>
                        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 text-xl">
                                📄
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">Transparent COAs</h3>
                            <p className="text-sm text-slate-600">Full analytics are available online so every result is traceable.</p>
                        </div>
                        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 text-xl">
                                🚚
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">Reliable delivery</h3>
                            <p className="text-sm text-slate-600">Consistent shipping to labs across key research regions.</p>
                        </div>
                        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 text-xl">
                                📘
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">Clear documentation</h3>
                            <p className="text-sm text-slate-600">Easy-to-read product details make planning experiments faster.</p>
                        </div>
                        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 text-xl">
                                ⚡
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">Fast response</h3>
                            <p className="text-sm text-slate-600">Quick answers and order handling for urgent research timelines.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-12 rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-blue-700 p-10 text-white shadow-2xl">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Committed to scientific excellence</h2>
                    <p className="mx-auto max-w-3xl text-sm md:text-base leading-relaxed text-slate-200">
                        verifiedpeptides delivers reliable research materials through strict quality control,
                        consistent manufacturing standards, and transparent product information. Our goal is to
                        give researchers confidence in every experiment.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                        >
                            Browse Products
                        </Link>
                        <Link
                            href="/coas"
                            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                        >
                            View COAs
                        </Link>
                    </div>
                </div>
            </section>

            <div className="mt-8 text-center text-sm text-slate-500">
                <p>
                    Have questions?{' '}
                    <a
                        href="https://api.whatsapp.com/send?phone=85251933716&text=Hello%2C%20I%20have%20a%20question%20about%20Veritas%20Bio%20Labs"
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