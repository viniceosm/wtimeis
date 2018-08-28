let minAn = undefined;
itIs();
setInterval(_ => itIs(), 950);

function itIs() {
	let dataAtual = new Date();
	let horaAtual = dataAtual.getHours();
	let minAtual = dataAtual.getMinutes();

	// horaAtual = 10;
	// minAtual = 00;

	let horaAtualWord = inWords(ampm(horaAtual));
	let minAtualWord = inWords(minAtual);

	let msg = `It is `;

	// 10:00 (ten o'clock)
	// 10:15 (quarter past ten)
	// 10:30 (half past ten)
	// 10:45 (quarter to eleven)

	// 10:20 (twenty past ten) [ min < 45 ]
	// 10:55 (five to eleven) [ min > 45 ]

	msg += msgPartial();

	console.log(`What time is it?`);

	if (minAn === undefined) {
		console.log(`${msg}`);
	} else if (minAn !== minAtual) {
		console.log(`${msg}`);
	}
	minAn = minAtual;

	document.getElementById('time').innerHTML = `${msg}`;

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
	return num - 12
}

function inWords (num) {
	var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
	var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

	n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
	if (!n) return; var str = '';
	// str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
	// str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
	// str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
	// str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
	str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + ' ' : '';
	return str.trim();
}