import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PKCard } from './PKCard';
import { Timer } from 'lucide-react';
import { cn } from '../utils/ui';

// Utility: Particle Burst Component
const ParticleBurst = ({ color }) => {
    const particles = Array.from({ length: 12 });
    return (
        <div className="absolute inset-0 pointer-events-none z-50">
            {particles.map((_, i) => (
                <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full animate-particle"
                    style={{
                        backgroundColor: color,
                        '--tw-translate-x': `${(Math.random() - 0.5) * 400}px`,
                        '--tw-translate-y': `${(Math.random() - 0.5) * 400}px`,
                    }}
                />
            ))}
        </div>
    );
};

export function PKArena({ roundData, onSelect, countdownProgress, selectedFoodId }) {
    if (!roundData) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="text-2xl font-black italic animate-pulse text-white/20 uppercase tracking-widest">
                    准备下一场...
                </div>
            </div>
        );
    }

    const { left, right, currentPairIndex, totalPairs, currentRoundName } = roundData;

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-6xl mx-auto px-4 transition-all duration-300 relative">
            {/* Progress & Round Info */}
            <div className="flex justify-between items-end w-full px-4">
                <div>
                    <span className="text-primary font-bold uppercase tracking-widest text-sm">
                        {currentRoundName}
                    </span>
                    <h2 className="text-2xl font-black italic">
                        第 {currentPairIndex + 1} / {totalPairs} 场
                    </h2>
                </div>

                {/* Countdown Visual */}
                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 text-accent font-black italic">
                        <Timer className="w-5 h-5 animate-pulse" />
                        立即选择！
                    </div>
                    <div className="w-48 h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: `${countdownProgress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Battle Field */}
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full min-h-[500px]">
                {/* VS Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className={cn(
                            "w-24 h-24 bg-accent rounded-2xl flex items-center justify-center text-4xl font-black italic shadow-[0_0_30px_rgba(244,114,182,0.5)] border-4 border-white transition-all",
                            selectedFoodId && "scale-0 opacity-0"
                        )}
                    >
                        VS
                    </motion.div>
                </div>

                <AnimatePresence mode="wait">
                    <div className="relative">
                        <PKCard
                            key={left.id}
                            food={left}
                            side="left"
                            onClick={() => onSelect(left)}
                            isWinner={selectedFoodId === left.id}
                            isLoser={selectedFoodId !== null && selectedFoodId !== left.id}
                        />
                        {selectedFoodId === left.id && <ParticleBurst color={left.color} />}
                    </div>
                </AnimatePresence>

                <div className="md:hidden flex items-center justify-center py-4">
                    <div className={cn(
                        "px-6 py-2 bg-accent rounded-lg font-black italic shadow-lg transition-all",
                        selectedFoodId && "scale-0 opacity-0"
                    )}>VS</div>
                </div>

                <AnimatePresence mode="wait">
                    <div className="relative">
                        <PKCard
                            key={right.id}
                            food={right}
                            side="right"
                            onClick={() => onSelect(right)}
                            isWinner={selectedFoodId === right.id}
                            isLoser={selectedFoodId !== null && selectedFoodId !== right.id}
                        />
                        {selectedFoodId === right.id && <ParticleBurst color={right.color} />}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
}
