import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Save, Shuffle, Timer, Users, ChevronRight, Edit3 } from 'lucide-react';
import { cn } from '../utils/ui';

export function ConfigCenter({ isOpen, onClose, library, activeList, settings, onSave }) {
    const [localLibrary, setLocalLibrary] = useState(library);
    const [localActiveList, setLocalActiveList] = useState(activeList);
    const [localSettings, setLocalSettings] = useState(settings);
    const [editingIndex, setEditingIndex] = useState(null);
    const [newFood, setNewFood] = useState({ name: '', image: '🍔', color: '#8b5cf6' });

    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

    const colors = ['#8b5cf6', '#06b6d4', '#f472b6', '#10b981', '#f59e0b', '#ef4444'];
    const emojis = [
        '🍔', '🍕', '🍣', '🍜', '🍲', '🍗', '🥩', '🥗', '🥘', '🥟', '🥪', '🌮', '🍖', '🍤', '🥯', '🥞', '🥐', '🥨', '🥖', '🥙', '🍳', '🥘', '🍲', '🥣', '🥗', '🍿', '🧈', '🧂', '🥫', '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥟', '🥠', '🥡', '🦀', '🦞', '🦐', '🦑', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫', '🍬', '🍭', '🍮', '🍯', '🍼', '🥛', '☕', '🍵', '🍶', '🍾', '🍷', '🍸', '🍹', '🍺', '🍻', '🥂', '🥃'
    ];

    // Ensure active list matches size setting
    useEffect(() => {
        if (localActiveList.length !== localSettings.size) {
            handleRandomize(localSettings.size);
        }
    }, [localSettings.size]);

    const handleRandomize = (size = localSettings.size) => {
        const shuffled = [...localLibrary].sort(() => 0.5 - Math.random());
        setLocalActiveList(shuffled.slice(0, size));
    };

    const handleAddCustom = () => {
        if (!newFood.name.trim()) return;
        const foodToAdd = { ...newFood, id: Date.now().toString() };
        setLocalLibrary([foodToAdd, ...localLibrary]);
        setNewFood({ name: '', image: '🍔', color: '#8b5cf6' });
        setIsEmojiPickerOpen(false);
    };

    const handleRemoveFromLibrary = (id) => {
        setLocalLibrary(localLibrary.filter(f => f.id !== id));
        setLocalActiveList(localActiveList.filter(f => f.id !== id));
    };

    const handleReplaceActive = (index, food) => {
        const newList = [...localActiveList];
        newList[index] = food;
        setLocalActiveList(newList);
        setEditingIndex(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        className="w-full max-w-5xl bg-[#0b0f1a] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col h-[85vh]"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-md sticky top-0 z-10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/20 rounded-2xl border border-primary/20">
                                    <Edit3 className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="text-3xl font-black italic neon-text uppercase leading-none">
                                    决策 <span className="text-accent">中心</span>
                                </h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                <X className="w-8 h-8 text-white/30" />
                            </button>
                        </div>

                        {/* Layout: Sidebar Settings | Main Workbench */}
                        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                            {/* Left: Global Config */}
                            <div className="w-full md:w-80 border-r border-white/5 p-8 space-y-10 overflow-y-auto bg-white/[0.02]">
                                <section className="space-y-6">
                                    <h3 className="text-xs font-black uppercase text-white/30 tracking-[0.3em] flex items-center gap-2">
                                        <Users className="w-4 h-4" /> 对决规模
                                    </h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[4, 8, 16].map(s => (
                                            <button
                                                key={s}
                                                onClick={() => setLocalSettings(prev => ({ ...prev, size: s }))}
                                                className={cn(
                                                    "py-4 rounded-xl font-black transition-all border",
                                                    localSettings.size === s
                                                        ? "bg-primary border-primary shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-105"
                                                        : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                                                )}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xs font-black uppercase text-white/30 tracking-[0.3em] flex items-center gap-2">
                                            <Timer className="w-4 h-4" /> 决策速度
                                        </h3>
                                        <span className="text-primary font-black italic">{localSettings.duration} 秒</span>
                                    </div>
                                    <input
                                        type="range" min="3" max="10"
                                        value={localSettings.duration}
                                        onChange={(e) => setLocalSettings(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                                        className="w-full accent-primary bg-white/5 h-2 rounded-lg"
                                    />
                                    <div className="flex justify-between text-[10px] uppercase font-bold text-white/20">
                                        <span>3s (激进)</span>
                                        <span>10s (佛系)</span>
                                    </div>
                                </section>

                                <button
                                    onClick={() => handleRandomize()}
                                    className="w-full py-5 bg-accent/20 border border-accent/30 text-accent rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-accent/30 transition-all group"
                                >
                                    <Shuffle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                                    随机抽取
                                </button>
                            </div>

                            {/* Center/Right: Workbench */}
                            <div className="flex-1 flex flex-col overflow-hidden">
                                {/* Workbench Header: Active List grid */}
                                <div className="p-8 space-y-4 bg-white/[0.01]">
                                    <h3 className="text-xs font-black uppercase text-white/30 tracking-[0.3em]">
                                        当前对阵名单 ({localActiveList.length}/{localSettings.size})
                                    </h3>
                                    <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                                        {Array.from({ length: localSettings.size }).map((_, i) => {
                                            const food = localActiveList[i];
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => setEditingIndex(i)}
                                                    className={cn(
                                                        "h-12 rounded-xl flex items-center gap-2 px-2 transition-all border relative group overflow-hidden",
                                                        editingIndex === i ? "border-primary bg-primary/20 scale-[1.02]" : "border-white/10 hover:border-white/30 bg-white/5"
                                                    )}
                                                >
                                                    {food ? (
                                                        <>
                                                            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: food.color }} />
                                                            <span className="text-[11px] font-black uppercase truncate relative z-10 text-white/80 w-full text-center">{food.name}</span>
                                                            <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-primary/50" />
                                                        </>
                                                    ) : (
                                                        <Plus className="w-3 h-3 text-white/20 mx-auto" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Main Library Section */}
                                <div className="flex-1 overflow-y-auto p-8 border-t border-white/5">
                                    {editingIndex !== null ? (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center bg-primary/5 p-4 rounded-2xl border border-primary/10">
                                                <h3 className="text-primary font-black uppercase text-sm tracking-widest italic">
                                                    槽位替换 #{editingIndex + 1}
                                                </h3>
                                                <button onClick={() => setEditingIndex(null)} className="px-4 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase text-white/50 hover:bg-white/20 transition-colors">取消</button>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                                                {localLibrary.map(f => (
                                                    <button
                                                        key={f.id}
                                                        onClick={() => handleReplaceActive(editingIndex, f)}
                                                        className="h-12 flex items-center justify-center px-3 glass rounded-xl border border-transparent hover:border-primary transition-all group active:scale-95 relative overflow-hidden"
                                                    >
                                                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: f.color }} />
                                                        <span className="font-black text-[11px] uppercase truncate relative z-10 text-white/80 w-full text-center">{f.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-12">
                                            {/* Add New */}
                                            <div className={cn("glass p-6 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent shadow-inner relative transition-all", isEmojiPickerOpen && "z-30")}>
                                                <h3 className="text-xs font-black uppercase text-white/30 tracking-[0.3em] mb-4">添加食物</h3>
                                                <div className="flex flex-col md:flex-row gap-6 relative">
                                                    {/* Custom Dropdown Emoji Picker */}
                                                    <div className="relative w-full md:w-32">
                                                        <button
                                                            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                                                            className="w-full h-full min-h-[64px] bg-black/40 rounded-2xl border border-white/10 flex items-center justify-center text-3xl hover:bg-black/60 transition-all relative group"
                                                        >
                                                            {newFood.image}
                                                            <div className="absolute bottom-2 right-2">
                                                                <ChevronRight className={cn("w-3 h-3 text-white/20 transition-transform", isEmojiPickerOpen ? "rotate-90" : "rotate-0")} />
                                                            </div>
                                                        </button>

                                                        {/* Popup Panel */}
                                                        <AnimatePresence>
                                                            {isEmojiPickerOpen && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                                                    className="absolute top-full left-0 mt-2 w-64 h-64 bg-[#1a1f2e] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 p-3 overflow-hidden flex flex-col"
                                                                >
                                                                    <div className="flex justify-between items-center mb-2 px-1 text-white">
                                                                        <span className="text-[10px] font-black uppercase text-white/30">选择图标</span>
                                                                        <button onClick={() => setIsEmojiPickerOpen(false)}><X className="w-3 h-3 text-white/20" /></button>
                                                                    </div>
                                                                    <div className="flex-1 overflow-y-auto custom-scrollbar grid grid-cols-5 gap-1 text-white">
                                                                        {emojis.map(e => (
                                                                            <button
                                                                                key={e}
                                                                                onClick={() => {
                                                                                    setNewFood(p => ({ ...p, image: e }));
                                                                                    setIsEmojiPickerOpen(false);
                                                                                }}
                                                                                className={cn(
                                                                                    "aspect-square rounded-lg flex items-center justify-center text-xl transition-all",
                                                                                    newFood.image === e ? "bg-primary shadow-lg" : "hover:bg-white/10"
                                                                                )}
                                                                            >{e}</button>
                                                                        ))}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>

                                                    <div className="flex-1 flex flex-col gap-3">
                                                        <input
                                                            type="text" value={newFood.name}
                                                            onChange={(e) => setNewFood(p => ({ ...p, name: e.target.value }))}
                                                            placeholder="输入食物名称..."
                                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-black text-lg focus:outline-none focus:border-primary transition-all placeholder:text-white/10 text-white"
                                                        />
                                                        <button
                                                            onClick={handleAddCustom}
                                                            className="w-full bg-primary hover:bg-primary/80 py-4 rounded-2xl font-black italic uppercase shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                                                        >
                                                            <Plus className="w-5 h-5" /> 添加
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Master Inventory */}
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-end">
                                                    <h3 className="text-xs font-black uppercase text-white/30 tracking-[0.3em]">我的食物库 ({localLibrary.length})</h3>
                                                </div>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pb-8">
                                                    {localLibrary.map(f => (
                                                        <div key={f.id} className="h-12 flex items-center justify-center px-3 glass rounded-xl group border border-white/5 bg-white/5 hover:bg-white/[0.08] transition-all relative overflow-hidden">
                                                            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: f.color }} />
                                                            <span className="font-black text-[11px] uppercase truncate relative z-10 text-white/80 w-full text-center">{f.name}</span>
                                                            <button
                                                                onClick={() => handleRemoveFromLibrary(f.id)}
                                                                className="absolute top-1 right-1 p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-red-500 rounded-lg transition-all z-20"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t border-white/5 bg-white/5 flex gap-6">
                            <button
                                onClick={() => onSave({ library: localLibrary, activeList: localActiveList, settings: localSettings })}
                                className="flex-1 bg-primary hover:bg-primary/80 py-6 rounded-[2rem] font-black text-2xl flex items-center justify-center gap-4 transition-all active:scale-95 shadow-[0_0_50px_rgba(139,92,246,0.3)] shadow-primary/20 animate-pulse-slow"
                            >
                                开始PK！ <ChevronRight className="w-8 h-8" />
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
