class Greeter {
	message: string;

	constructor(message: string) {
		this.message = message;
	}

	// Overload signatures
	greet(person: string): string;
	greet(persons: string[]): string[];

	// Implementation signature
	greet(person: unknown): unknown {
		if (typeof person === 'string') {
			return `${this.message}, ${person}!`;
		} else if (Array.isArray(person)) {
			return person.map((name) => `${this.message}, ${name}!`);
		}
		throw new Error('Unable to greet');
	}
}
