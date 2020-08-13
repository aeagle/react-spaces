export {};

declare global {
	namespace jest {
		interface Expect {
			<T = any, R = any>(actual: T, message: String): Matchers<T, R>;
		}
	}
}
