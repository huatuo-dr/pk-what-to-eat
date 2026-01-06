import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Save, Utensils } from 'lucide-react';
import { cn } from '../utils/ui';

export function FoodManager({ isOpen, onClose, foods, onSave }) {
    const [localFoods, setLocalFoods] = useState(foods);
    const [newFood, setNewFood] = useState({ name: '', image: '🍔', color: '#8b5cf6' });

    const colors = ['#8b5cf6', '#06b6d4', '#f472b6', '#10b981', '#f59e0b', '#ef4444'];
    const emojis = ['🍔', '🍕', '🍣', '🍜', '🍲', '🍗', '🥩', '🥗', '🥘', '🥟', '🥪', '🌮'];

    const handleAdd = () => {
        if (!newFood.name.trim()) return;
        const foodToAdd = {
            ...newFood,
            id: Date.now().toString(),
        };
        const updated = [foodToAdd, ...localFoods];
        setLocalFoods(updated);
        setNewFood({ name: '', image: '🍔', color: '#8b5cf6' });
    };

    const handleRemove = (id) => {
        setLocalFoods(localFoods.filter(f => f.id !== id));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="w-full max-w-2xl bg-bg-dark border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                            <div>
                                <h2 className="text-3xl font-black italic neon-text uppercase leading-none mb-2">
                                    Food Library
                                </h2>
                                <p className="text-white/40 text-sm font-bold uppercase tracking-widest">
                                    Manage your battle candidates
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 hover:bg-white/10 rounded-2xl transition-colors"
                            >
                                <X className="w-8 h-8 text-white/50" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-10">
                            {/* Add New Section */}
                            <div className="glass p-6 rounded-3xl space-y-6">
                                <h3 className="text-primary font-black uppercase text-sm tracking-widest flex items-center gap-2">
                                    <Plus className="w-4 h-4" /> Add New Specimen
                                </h3>
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Emoji Pick */}
                                    <div className="grid grid-cols-6 gap-2 shrink-0">
                                        {emojis.map(e => (
                                            <button
                                                key={e}
                                                onClick={() => setNewFood(prev => ({ ...prev, image: e }))}
                                                className={cn(
                                                    "w-10 h-10 flex items-center justify-center rounded-lg text-xl transition-all",
                                                    newFood.image === e ? "bg-primary scale-110 shadow-lg" : "bg-white/5 hover:bg-white/10"
                                                )}
                                            >
                                                {e}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Enter food name..."
                                            value={newFood.name}
                                            onChange={(e) => setNewFood(prev => ({ ...prev, name: e.target.value }))}
                                            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-primary transition-colors text-lg font-bold"
                                        />
                                        <div className="flex gap-2">
                                            {colors.map(c => (
                                                <button
                                                    key={c}
                                                    onClick={() => setNewFood(prev => ({ ...prev, color: c }))}
                                                    className={cn(
                                                        "w-8 h-8 rounded-full transition-transform",
                                                        newFood.color === c ? "scale-125 ring-2 ring-white" : "hover:scale-110"
                                                    )}
                                                    style={{ backgroundColor: c }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleAdd}
                                        className="md:w-32 bg-primary hover:bg-primary/80 p-4 rounded-xl flex items-center justify-center gap-2 font-black transition-all active:scale-95 shadow-lg"
                                    >
                                        ADD <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* List Section */}
                            <div className="space-y-4">
                                <h3 className="text-white/40 font-black uppercase text-sm tracking-widest">
                                    Active Library ({localFoods.length})
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-8">
                                    {localFoods.map(food => (
                                        <div
                                            key={food.id}
                                            className="flex items-center gap-4 p-4 glass rounded-2xl group border border-transparent hover:border-white/10 transition-all"
                                        >
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg border border-white/10 shrink-0"
                                                style={{ background: food.color }}
                                            >
                                                {food.image}
                                            </div>
                                            <div className="flex-1 font-bold text-lg truncate">
                                                {food.name}
                                            </div>
                                            <button
                                                onClick={() => handleRemove(food.id)}
                                                className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded-lg transition-all text-red-400"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-8 border-t border-white/5 bg-white/5 flex gap-4">
                            <button
                                onClick={() => onSave(localFoods)}
                                className="flex-1 bg-success hover:bg-success/80 p-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                            >
                                <Save className="w-6 h-6" /> SAVE LIBRARY
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
