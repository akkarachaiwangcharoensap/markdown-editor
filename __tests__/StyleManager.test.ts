import { StyleManager } from '../src/utils/styleManager';
import { defaultStyles } from '../src/config/defaultStyles';

describe('StyleManager', () => {
	let styleManager: StyleManager;

	beforeEach(() => {
		styleManager = StyleManager.getInstance();
		styleManager.clearCache();
	});

	test('should return singleton instance', () => {
		const instance1 = StyleManager.getInstance();
		const instance2 = StyleManager.getInstance();
		expect(instance1).toBe(instance2);
	});

	test('should return default styles when no custom styles provided', () => {
		const styles = styleManager.mergeStyles();
		expect(styles).toEqual(defaultStyles);
	});

	test('should merge custom styles with defaults', () => {
		const customStyles = { h1: 'custom-h1-class' };
		const merged = styleManager.mergeStyles(customStyles);
		expect(merged.h1).toBe('custom-h1-class');
		expect(merged.p).toBe(defaultStyles.p);
	});

	test('should cache merged styles', () => {
		const customStyles = { h1: 'custom-h1-class' };
		const merged1 = styleManager.mergeStyles(customStyles);
		const merged2 = styleManager.mergeStyles(customStyles);
		expect(merged1).toBe(merged2);
	});

	test('should clear cache', () => {
		const customStyles = { h1: 'custom-h1-class' };
		styleManager.mergeStyles(customStyles);
		styleManager.clearCache();
		const merged = styleManager.mergeStyles(customStyles);
		expect(merged).toBeDefined();
	});

	test('should handle multiple custom properties', () => {
		const customStyles = {
			h1: 'custom-h1',
			h2: 'custom-h2',
			p: 'custom-p'
		};
		const merged = styleManager.mergeStyles(customStyles);
		expect(merged.h1).toBe('custom-h1');
		expect(merged.h2).toBe('custom-h2');
		expect(merged.p).toBe('custom-p');
		expect(merged.code).toBe(defaultStyles.code);
	});
});
