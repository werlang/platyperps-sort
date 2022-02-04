// just add this function on dev console (F12)
// this code will add a new table to the page, showing the relevant information

(() => {
    const update = () => {
        const table = document.querySelector('#funding_table')
        let info = Array.from(table.querySelectorAll('tr')).filter((e,i) => i != 1).map(e => Array.from(e.querySelectorAll('th .column-header-name, td div')).map(e => e.innerHTML))
        info = info.map((r,i) => r.filter((r,j) => j > 0).map(c => i == 0 ? c : parseFloat(c.slice(0,-1))))
        info.push(info[0].map((e,i) => Math.abs(info[1][i] - info[2][i])))
        let pairs = Object.fromEntries(info[0].map(e => [e, []]))
        Object.keys(pairs).forEach((e,i) => pairs[e] = info[3][i]);
        pairs = Object.fromEntries(Object.entries(pairs).filter(([k,v]) => v))
        pairs = Object.entries(pairs).sort((a,b) => b[1] - a[1])
        pairs.forEach(e => e.push((Math.pow(e[1] / 100 + 1, 24) - 1) * 100, (Math.pow(e[1] / 100 + 1, 24*365) - 1) * 100))
        pairs = pairs.map(e => { return { token: e[0], rate1h: e[1].toFixed(6), APRD: e[2].toFixed(4), APY: e[3].toFixed(2) } })
        const dom = `<table id="funding-info"><thead><th>Token</th><th>Rate 1h</th><th>APRD (%)</th><th>APY (%)</th></thead><tbody>${ pairs.map(e => `<tr><td>${e.token}</td><td>${e.rate1h}</td><td>${e.APRD}</td><td>${e.APY}</td></tr>`) }</tbody></table>`
        table.insertAdjacentHTML('afterend', dom);
        newTable = document.querySelector('#funding-info');
        newTable.querySelectorAll('th,td').forEach(e => {
            e.style.width = '100px'
            e.style.border = '1px solid black'
        })
        return pairs
    }
    update();
    setTimeout(() => {
        document.querySelector('#funding-info').delete();
        update();
    }, 5000);
})()
