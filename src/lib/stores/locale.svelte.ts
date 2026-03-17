let current = $state<'en' | 'ro'>('en');

export const locale = {
	get value() { return current; },
	set value(v: 'en' | 'ro') { current = v; }
};
