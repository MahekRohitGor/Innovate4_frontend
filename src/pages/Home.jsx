import { Link } from "react-router-dom";
import Header from "../components/Header";
import homeContent from "../data/homeContent.json";

// images
// import heroImage from "../assets/leaf.jpg";
import uploadImg from "../assets/leaf.jpg";
import analyticsImg from "../assets/leaf.jpg";
import summaryImg from "../assets/leaf.jpg";
import feedbackImg from "../assets/leaf.jpg";

const imageMap = {
    "upload.png": uploadImg,
    "analytics.png": analyticsImg,
    "summary.png": summaryImg,
    "feedback.png": feedbackImg,
};

const Home = () => {
    const { hero, howItWorks, features, cta } = homeContent;

    return (
        <>
            <Header />
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-100 px-6 md:px-12 lg:px-20 pt-28 pb-32">
                <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-blue-400/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -right-40 w-[32rem] h-[32rem] bg-sky-400/20 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-tight">
                            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-sky-500 bg-clip-text text-transparent">
                                {hero.headlinePrimary}
                            </span>
                            <br />
                            <span className="text-slate-900">
                                {hero.headlineSecondary}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
                            {hero.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to={hero.ctaPrimary.route}
                                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-[1.04] transition-all"
                            >
                                {hero.ctaPrimary.text}
                            </Link>

                            <Link
                                to={hero.ctaSecondary.route}
                                className="px-8 py-4 rounded-2xl border border-blue-200 text-blue-700 font-bold hover:bg-blue-50 transition-all"
                            >
                                {hero.ctaSecondary.text}
                            </Link>
                        </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-100/50 p-8 lg:p-10 space-y-8 relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-sky-300/10 rounded-full blur-3xl" />
                        <div className="relative">
                            <h3 className="text-2xl font-black bg-gradient-to-r from-blue-900 to-sky-600 bg-clip-text text-transparent mb-2">
                                {hero.infoCard.title}
                            </h3>
                            <p className="text-sm text-slate-600">
                                Key signals S.A.I.L automatically detects from your meetings
                            </p>
                        </div>
                        <ul className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700 text-sm">
                            {hero.infoCard.points.map((point, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 hover:bg-blue-100/60 transition-all"
                                >
                                    <span className="mt-1 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 shrink-0" />
                                    <span className="leading-relaxed font-medium">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="bg-white py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-center text-slate-900 mb-20">
                        {howItWorks.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {howItWorks.steps.map((step) => (
                            <div
                                key={step.step}
                                className="group bg-blue-50/60 rounded-3xl p-8 border border-blue-100 hover:-translate-y-2 transition-all duration-300"
                            >
                                <img
                                    src={imageMap[step.image]}
                                    alt={step.title}
                                    className="h-20 mx-auto mb-6"
                                />
                                <span className="text-xs font-bold text-blue-600 tracking-widest">
                                    STEP {step.step}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-center text-slate-900 mb-16">
                        {features.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {features.list.map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-blue-100/50 p-8 hover:-translate-y-1 transition-all"
                            >
                                <p className="font-semibold text-slate-800">
                                    {feature}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-blue-900 py-24 px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                    {cta.title}
                </h2>
                <p className="text-blue-200 max-w-xl mx-auto mb-10">
                    {cta.description}
                </p>
                <Link
                    to={cta.route}
                    className="inline-block px-10 py-4 rounded-2xl bg-white text-blue-900 font-bold shadow-xl hover:scale-[1.05] transition-all"
                >
                    {cta.buttonText}
                </Link>
            </section>
        </>
    );
};

export default Home;