let minAn = undefined;
itIs(true);
setInterval(_ => itIs(), 950);

function itIs(firstTime) {
	let dataAtual = new Date();
	let horaAtual = dataAtual.getHours();
	let minAtual = dataAtual.getMinutes();

	let horaAtualWord = inWords(ampm(horaAtual));
	let minAtualWord = inWords(minAtual);

	let msg = `It is `;

	msg += msgPartial();

	if (firstTime) {
		document.getElementById('time').innerHTML = msg;
	}

	if (minAn === undefined) {
		console.log(msg);
	} else if (minAn !== minAtual) {
		console.log(`What time is it?`);
		console.log(msg);
		document.getElementById('time').innerHTML = msg;
	}
  
	minAn = minAtual;

	function msgPartial() {
		let o = {
			0: () => `${horaAtualWord} o'clock`,
			15: () => `quarter past ${horaAtualWord}`,
			30: () => `half past ${horaAtualWord}`,
			45: () => `quarter to ${inWords(ampm(horaAtual + 1))}`,
			minor: () => `${minAtualWord} past ${horaAtualWord}`,
			else: () => `${inWords(60 - minAtual)} to ${inWords(ampm(horaAtual + 1))}`
		}

		try {
			return o[minAtual]();
		} catch (e) {
			return (minAtual < 45) ? o.minor() : o.else();
		}
	}
}

function ampm (num) {
	if (num <= 12)
		return num;
	return num - 12;
}

function inWords (num) {
	var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
	var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

	n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
	if (!n) return; var str = '';
	str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + ' ' : '';
	return str.trim();
}
