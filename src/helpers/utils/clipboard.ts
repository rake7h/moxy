const copyToClipBoard = (content:string) => {
    if (navigator?.clipboard?.writeText) {
		return navigator.clipboard.writeText(content);
	} 
}

export {copyToClipBoard}