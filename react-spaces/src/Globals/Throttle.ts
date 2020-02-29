export function throttle<F extends (...args: any) => any>(callback: F, limit: number) {
	var wait = false; // Initially, we're not waiting
	return function(...args: any) {
		// We return a throttled function
		if (!wait) {
			// If we're not waiting
			callback(...args); // Execute users function
			wait = true; // Prevent future invocations
			setTimeout(function() {
				// After a period of time
				wait = false; // And allow future invocations
			}, limit);
		}
	};
}
