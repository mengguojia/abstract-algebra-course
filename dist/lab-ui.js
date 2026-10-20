export const htmlText = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export const bi = (zh,en) => `<span class="bi"><span class="zh" lang="zh-CN">${htmlText(zh)}</span><span class="en" lang="en">${htmlText(en)}</span></span>`;
