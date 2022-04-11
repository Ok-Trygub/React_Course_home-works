class MenuComponent extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });

		this.getVideoLayout()
			.then(r => {
				shadow.appendChild(this.parseHTML(r));
			});
	}

	async getVideoLayout() {
		let layout = await fetch('components/video/video.html');
		return layout.text();
	}

	getAttrValue(attr) {
		const value = this.getAttribute(attr);
		return value;
	}

	setAttrsValues(elem) {
		if (!elem.hasAttribute('width')) throw new Error('Element does not have "width" attribute!');
		elem.setAttribute('width', this.getAttrValue('data-width'));

		if (!elem.hasAttribute('height')) throw new Error('Element does not have "height" attribute!');
		elem.setAttribute('height', this.getAttrValue('data-height'));
	
		if (!elem.hasAttribute('src')) throw new Error('Element does not have "src" attribute!');

		const src = elem.getAttribute('src');
		elem.setAttribute('src', `${src}${this.getAttrValue('data-video-id')}`);
	}

	parseHTML(str) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(str, "text/html");

		const elem = doc.body.firstChild;

		this.setAttrsValues(elem);
		return doc.body.firstChild;
	}
}

customElements.define('yt-video', MenuComponent);