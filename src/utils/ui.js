import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for tailwind classes merging
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Common Spring Transition
 */
export const SPRING_TRANSITION = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
};
