export const getRealBackgroundColor = (elem: any): string => {
	const transparent = "rgba(0, 0, 0, 0)";
	const transparentIE11 = "transparent";
	if (!elem) return transparent;

	const bg = getComputedStyle(elem).backgroundColor;
	if (bg === transparent || bg === transparentIE11) {
		return getRealBackgroundColor(elem.parentElement);
	} else {
		return bg;
	}
};
