export {};

declare global {
	namespace jest {
		interface Expect {
			<T = any>(actual: T, message: String): Matchers<T>;
		}
	}
}
