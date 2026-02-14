import React, { useState } from 'react';
import { Sparkles, Terminal, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAIRecommendation, PLAN_DATA } from '../lib/recommendationRules';

export const RecommendationTool: React.FC = () => {
    const navigate = useNavigate();
    const [goal, setGoal] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [recommendedPlan, setRecommendedPlan] = useState<'starter' | 'growth' | 'premium' | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getRecommendation = () => {
        if (!goal.trim()) return;

        setIsLoading(true);
        setResult(null);
        setRecommendedPlan(null);

        // Simulate processing delay for better UX
        setTimeout(() => {
            const recommendation = getAIRecommendation(goal);
            setResult(recommendation);

            // Detect which plan was recommended
            if (recommendation.includes('The Blueprint')) {
                setRecommendedPlan('starter');
            } else if (recommendation.includes('The Authority')) {
                setRecommendedPlan('growth');
            } else if (recommendation.includes('The Empire')) {
                setRecommendedPlan('premium');
            }

            setIsLoading(false);
        }, 800);
    };

    const handleInitializeProject = () => {
        navigate('/project-initiation');
    };

    return (
        <section className="py-24 px-6 border-t border-slate-800">
            <div className="max-w-3xl mx-auto bg-slate-900/50 p-8 md:p-12 rounded-[2.5rem] border border-blue-500/20 relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                <div className="text-center mb-10 relative z-10">
                    <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-flex items-center gap-2">
                        <Sparkles size={12} />
                        AI Strategy Assistant
                    </span>
                    <h2 className="text-3xl font-bold mb-4 text-white">Not sure which plan fits?</h2>
                    <p className="text-slate-400">Tell us your current digital challenge, and we'll suggest the best engagement model.</p>
                </div>

                <div className="space-y-6 relative z-10">
                    <div className="relative">
                        <div className="absolute top-4 left-4 text-slate-600">
                            <Terminal size={20} />
                        </div>
                        <textarea
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            placeholder="e.g. 'We need to migrate our legacy e-commerce system to a headless architecture by Q4...'"
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 pl-14 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none h-40 text-slate-200 placeholder:text-slate-600 font-mono text-sm leading-relaxed"
                        />
                    </div>

                    <button
                        onClick={getRecommendation}
                        disabled={isLoading || !goal.trim()}
                        className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-4 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                Processing Analysis...
                            </>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                Get Instant Recommendation
                            </>
                        )}
                    </button>
                </div>

                {result && (
                    <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {/* Recommendation Text */}
                        <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-transparent rounded-l-2xl" />
                            <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Recommendation</h4>
                            <p className="text-blue-100/90 leading-relaxed whitespace-pre-line">
                                {result}
                            </p>
                        </div>

                        {/* Recommended Plan Card */}
                        {recommendedPlan && (
                            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-blue-500/30 rounded-3xl p-8 relative overflow-hidden group hover:border-blue-500/50 transition-all">
                                {/* Decorative glow */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all" />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                {PLAN_DATA[recommendedPlan].name}
                                            </h3>
                                            <p className="text-slate-400 text-sm">
                                                {PLAN_DATA[recommendedPlan].description}
                                            </p>
                                        </div>
                                        <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            Recommended
                                        </span>
                                    </div>

                                    <button
                                        onClick={handleInitializeProject}
                                        className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                                    >
                                        Initialize Project
                                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};
