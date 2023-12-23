import _ from "lodash";

const mhs = [
	{
		nama: "joko santoso",
		email: "joko@gmail.com",
		jurusan: "teknik informatika",
	},
	{
		nama: "adi",
		email: "adi@gmail.com",
		jurusan: "teknik mesin",
	},
	{
		nama: "samsul",
		email: "samsul@gmail.com",
		jurusan: "sistem informasi",
	},
];

const mahasiswa = _.find(mhs, { nama: "joko santoso" });
console.log(mahasiswa);
