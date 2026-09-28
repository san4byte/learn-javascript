// ? loping
// const mhs = [
// 	{
// 		nama: "joko santoso",
// 		email: "joko@gmail.com",
// 	},
// 	{
// 		nama: "Sammsul",
// 		email: "samsul@gmail.com",
// 	},
// 	{
// 		nama: "roy",
// 		email: "roy@gmail.com",
// 	},
// ];

// const test = `<div class="mhs">
//                 ${mhs
// 									.map(
// 										(e) =>
// 											`<ul>
//                         <li>${e.nama}</li>
//                         <li>${e.email}</li>
//                       </ul>`
// 									)
// 									.join("")}
//               </div>`;

// ? condational

// const lagu = [
// 	{
// 		judul: "raja dangdut",
// 		penyanyi: "roma irama",
// 		feet: "marshel",
// 	},
// 	{
// 		judul: "contoh",
// 		penyanyi: "hayuk",
// 	},
// 	{
// 		judul: "palpalepalpale",
// 		penyanyi: "mursyid",
// 		feet: "cekidot",
// 	},
// ];

// const test2 = `<div class="mhs">
// ${lagu
// 	.map(
// 		(a) =>
// 			`<ul>
//         <li>${a.judul}</li>
//         <li>${a.penyanyi} ${a.feet ? `(feet. ${a.feet})` : ``}</li>
//       </ul>`
// 	)
// 	.join("")}
// </div>`;

// ? nested / HTML fragmen bersarang

const mhs = {
	nama: "Joko Santoso",
	semester: "5",
	matkul: ["Tafsir Tarbawi", "Fiqih Ibadah", "Bahasa Arab"],
};

function cetakMataKuliah(mataKuliah) {
	return /*html*/ `
  <ol>
    ${mataKuliah.map((e) => `<li>${e}</li>`).join("")}
  </ol>`;
}

const test3 =
	/*html*/
	`<div class="mhs">
    <h1 class="nama">${mhs.nama}</h1>
    <span class="semester">Semester: ${mhs.semester}</span>
    ${cetakMataKuliah(mhs.matkul)}
  </div>`;

// panggil
document.body.innerHTML = test3;
