import { MarkdownStyles } from '../types';
import { defaultStyles } from '../config/defaultStyles';

/**
 * Style Manager - Singleton Pattern
 * Manages style merging and caching for performance
 */
export class StyleManager {
    private static instance: StyleManager;
    private styleCache: Map<string, MarkdownStyles> = new Map();

    private constructor() { }

    static getInstance(): StyleManager {
        if (!StyleManager.instance) {
            StyleManager.instance = new StyleManager();
        }
        return StyleManager.instance;
    }

    mergeStyles(customStyles?: MarkdownStyles): MarkdownStyles {
        if (!customStyles) return defaultStyles;

        const cacheKey = JSON.stringify(customStyles);
        if (this.styleCache.has(cacheKey)) {
            return this.styleCache.get(cacheKey)!;
        }

        const merged = { ...defaultStyles, ...customStyles };
        this.styleCache.set(cacheKey, merged);
        return merged;
    }

    clearCache(): void {
        this.styleCache.clear();
    }
}