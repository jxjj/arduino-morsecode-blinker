const Five = require("johnny-five");

class MorseLED {
	constructor(pinNumber = 13) {
		this.led = new Five.Led(pinNumber);
		this.dotLength = 50;
	}

	on(ms) {
		return new Promise(resolve => {
			this.led.on();
			if (!ms) return resolve();
			setTimeout(() => {
				this.led.stop().off();
				resolve();
			}, ms);
		});
	}

	off(ms) {
		return new Promise(resolve => {
			this.led.stop().off();
			if (!ms) return resolve();
			setTimeout(resolve, ms);
		});
	}

	async dot() {
		process.stdout.write(".");
		await this.on(this.dotLength);
		await this.off(this.dotLength);
		return this;
	}

	async dash() {
		process.stdout.write("-");
		await this.on(this.dotLength * 3);
		await this.off(this.dotLength);
		return this;
	}

	async space() {
		process.stdout.write(" ");

		await this.off(this.dotLength * 3);
		return this;
	}

	getLED() {
		return this.led;
	}
}

module.exports = MorseLED;
