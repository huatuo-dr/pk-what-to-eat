import { motion } from 'framer-motion';
import { SPRING_TRANSITION, cn } from '../utils/ui';

export function PKCard({ food, onClick, isWinner, isLoser, side }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: side === 'left' ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={SPRING_TRANSITION}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={cn(
                "relative flex flex-col items-center justify-center p-8 rounded-[2rem] cursor-pointer transition-all duration-500",
                "glass hover:bg-white/10 active:bg-white/20",
                isWinner && "ring-8 ring-success shadow-[0_0_50px_rgba(16,185,129,0.5)] z-20 scale-110",
                isLoser && "opacity-30 grayscale scale-90"
            )}
        >
            <div
                className="w-32 h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center text-6xl md:text-8xl shadow-inner mb-6"
                style={{
                    background: `radial-gradient(circle at 30% 30%, white 0%, ${food.color}33 20%, ${food.color} 100%)`,
                    boxShadow: `0 0 30px ${food.color}66`
                }}
            >
                <span className="drop-shadow-2xl">{food.image}</span>
            </div>

            <h3 className="text-2xl md:text-4xl font-black text-center tracking-tight">
                {food.name}
            </h3>

            {isWinner && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5, rotate: [0, 10, -10, 0] }}
                    className="absolute -top-6 -right-6 text-4xl"
                >
                    👑
                </motion.div>
            )}
        </motion.div>
    );
}
