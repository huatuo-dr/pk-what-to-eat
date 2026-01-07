import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Share2, Download, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/ui';

export function ResultShare({ winner, history, onBack }) {
    const shareRef = useRef(null);

    const handleDownload = async () => {
        if (shareRef.current === null) return;
        try {
            const dataUrl = await toPng(shareRef.current, { cacheBust: true, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `pk-winner-${winner.name}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('oops, something went wrong!', err);
        }
    };

    // Helper to render a bracket round
    const renderRound = (roundFoods, startIndex, count, roundIndex, isRight = false) => {
        // Safety check for array existence and length
        const sourceArr = Array.isArray(roundFoods) ? roundFoods : [];
        const items = sourceArr.slice(startIndex, startIndex + count);

        // Fill up to 'count' with placeholders if items are missing
        const displayItems = [...items];
        while (displayItems.length < count) {
            displayItems.push(null);
        }

        return (
            <div key={`${roundIndex}-${isRight}`} className="flex flex-col justify-around gap-2 h-full py-2">
                {displayItems.map((food, i) => (
                    <div
                        key={`${roundIndex}-${food?.id || i}`}
                        className={cn(
                            "flex items-center gap-2 p-1.5 glass rounded-xl border border-white/5 min-w-[95px]",
                            isRight && "flex-row-reverse text-right"
                        )}
                    >
                        <span className="text-xl shrink-0">{food?.image || '?'}</span>
                        <span className="text-[10px] font-black uppercase truncate max-w-[60px] opacity-70">
                            {food?.name || '---'}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    if (!winner || !history || history.length < 1) {
        return (
            <div className="p-8 text-center glass rounded-3xl">
                <p>Loading share data...</p>
                <button onClick={onBack} className="mt-4 px-6 py-2 bg-primary rounded-xl">Back</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-[95vw] mx-auto pb-12 overflow-x-auto">
            {/* Poster Container - Use scale to fit onto smaller screens in preview */}
            <div className="relative p-3 rounded-[3rem] bg-gradient-to-br from-primary/30 to-accent/30 shadow-2xl origin-top sm:scale-75 md:scale-90 lg:scale-100">
                <div
                    ref={shareRef}
                    className="w-[1200px] h-[675px] bg-[#0b0f1a] p-12 flex flex-col items-center relative overflow-hidden text-white"
                >
                    {/* Background FX */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,transparent_70%)]" />

                    <div className="relative z-10 w-full h-full flex flex-col">
                        {/* Poster Header */}
                        <div className="text-center mb-8">
                            <div className="inline-block px-4 py-1.5 bg-primary/20 rounded-full text-[10px] font-black tracking-[0.5em] uppercase text-primary border border-primary/20 mb-3">
                                Battle Report
                            </div>
                            <h1 className="text-6xl font-black italic neon-text uppercase leading-none tracking-tighter">
                                Divine <span className="text-accent">Decision</span>
                            </h1>
                        </div>

                        {/* Symmetrical Bracket Map */}
                        <div className="flex-1 flex items-center justify-between w-full h-full gap-3 px-2">
                            {/* Left Tree */}
                            <div className="flex gap-3 h-full items-center">
                                {history.slice(0, -1).map((roundFoods, idx) => (
                                    renderRound(roundFoods, 0, roundFoods.length / 2, idx)
                                ))}
                            </div>

                            {/* Center: Champion */}
                            <div className="flex flex-col items-center justify-center z-20 shrink-0">
                                <div className="relative mb-6 group">
                                    <div className="absolute inset-0 bg-primary/40 blur-3xl group-hover:bg-primary/60 transition-colors" />
                                    <div className="relative w-44 h-44 rounded-[3.5rem] bg-gradient-to-br from-primary via-accent to-secondary p-1 rotate-6">
                                        <div className="w-full h-full bg-[#0b0f1a] rounded-[3.2rem] flex items-center justify-center text-8xl">
                                            {winner.image}
                                        </div>
                                    </div>
                                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-warning rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white animate-bounce-custom">
                                        🏆
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2">天选之食</div>
                                    <div className="text-5xl font-black italic neon-text leading-tight uppercase">
                                        {winner.name}
                                    </div>
                                </div>
                            </div>

                            {/* Right Tree (Mirror) */}
                            <div className="flex gap-3 h-full items-center flex-row-reverse">
                                {history.slice(0, -1).map((roundFoods, idx) => (
                                    renderRound(roundFoods, roundFoods.length / 2, roundFoods.length / 2, idx, true)
                                ))}
                            </div>
                        </div>

                        {/* Footer / QR Style */}
                        <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-end">
                            <div className="space-y-1.5">
                                <div className="text-sm font-black italic text-secondary tracking-[0.2em] uppercase">PK WHAT TO EATER</div>
                                <div className="text-[8px] text-white/30 font-bold">BY DOPAMINE DECISION ENGINE // VERSION 2.0</div>
                            </div>
                            <div className="text-[8px] text-white/20 text-right uppercase font-mono italic">
                                SESSION IDENTIFIER // {Math.random().toString(36).substring(7).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-10 py-5 bg-primary rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
                >
                    <Download className="w-6 h-6" /> SAVE TO PHOTO
                </button>
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-10 py-5 glass rounded-2xl font-bold text-xl hover:bg-white/10 transition-all uppercase italic"
                >
                    BACK
                </button>
            </div>
        </div>
    );
}
