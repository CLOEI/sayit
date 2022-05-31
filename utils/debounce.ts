const debounce = (cb: Function, ms = 300) => {
	let timer: ReturnType<typeof setTimeout>;
	return function (this: any, ...args: any[]) {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			cb.apply(this, args);
		}, ms);
	};
};

export default debounce;
