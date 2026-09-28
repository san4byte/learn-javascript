// function pengelolaan angkot
function Angkot(sopir, trayek, p, kas) {
	this.sopir = sopir;
	this.trayek = trayek;
	this.p = p;
	this.kas = kas;
		
	// membuat method penumpang naik
	this.pNaik = function (namaP) {
		if (this.p.length === 0) {
			this.p.push(namaP);
			return this.p;
		} else {
			if (this.p.includes(namaP)) {
				alert("nama penumpang sudah ada");
				return false;
			}
			for (let index = 0; index < this.p.length; index++) {
				if (this.p[index] === undefined) {
					this.p[index] = namaP;
					return this.p;
				} else if (index === this.p.length - 1) {
					this.p.push(namaP);
					return this.p;
				}
			}
		}
	};

	// membuat method penumpang turun
	this.pTurun = function (namaP, bayar) {
		if (this.p.length === 0) {
			alert("angkot masih kosong");
			return false;
		}
		for (let index = 0; index < this.p.length; index++) {
			if (this.p[index] === namaP) {
				this.p[index] = undefined;
				this.kas += bayar;
				return this.p;
			}
		}
	};
}
let angkot1 = new Angkot("joko santoso", ["dayun", "siak"], [], 0);
let angkot2 = new Angkot("adi pratama", ["bungaraya", "mempura"], [], 0);
