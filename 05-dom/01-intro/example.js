// 01 - Pengenalan DOM (Document Object Model) & DOM Tree
// File ini dirancang untuk dapat dijalankan langsung di Node.js maupun di Browser.

const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

if (!isBrowser) {
  console.log('========================================================');
  console.log('📌 SIMULASI KONSEP DOM DI LINGKUNGAN NODE.JS');
  console.log('========================================================');
  console.log('Catatan: Objek DOM asli (document) hanya tersedia di browser.');
  console.log(
    'Berikut adalah demonstrasi representasi objek & struktur DOM:\n',
  );

  // 1. Konstanta Node Type standar W3C
  const NodeConstants = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
  };

  console.log('--- 1. Nilai Standar W3C Node.nodeType ---');
  Object.entries(NodeConstants).forEach(([key, val]) => {
    console.log(`- Node.${key.padEnd(28)} = ${val}`);
  });

  // 2. Simulasi DOM Tree di memori
  const mockDOMTree = {
    nodeType: NodeConstants.DOCUMENT_NODE,
    nodeName: '#document',
    title: '01 - Pengenalan DOM & DOM Tree',
    URL: 'https://example.com/learn-dom/01-intro.html',
    characterSet: 'UTF-8',
    contentType: 'text/html',
    readyState: 'complete',
    documentElement: {
      nodeType: NodeConstants.ELEMENT_NODE,
      nodeName: 'HTML',
      childNodes: [
        {
          nodeType: NodeConstants.ELEMENT_NODE,
          nodeName: 'HEAD',
          childNodes: [
            {
              nodeType: NodeConstants.ELEMENT_NODE,
              nodeName: 'TITLE',
              childNodes: [
                {
                  nodeType: NodeConstants.TEXT_NODE,
                  nodeName: '#text',
                  nodeValue: '01 - Pengenalan DOM',
                },
              ],
            },
          ],
        },
        {
          nodeType: NodeConstants.ELEMENT_NODE,
          nodeName: 'BODY',
          childNodes: [
            {
              nodeType: NodeConstants.ELEMENT_NODE,
              nodeName: 'H1',
              id: 'judul-halaman',
              childNodes: [
                {
                  nodeType: NodeConstants.TEXT_NODE,
                  nodeName: '#text',
                  nodeValue: 'Belajar JavaScript DOM',
                },
              ],
            },
          ],
        },
      ],
    },
  };

  console.log('\n--- 2. Membaca Properti Global Objek Document ---');
  console.log('document.title       :', mockDOMTree.title);
  console.log('document.URL         :', mockDOMTree.URL);
  console.log('document.characterSet:', mockDOMTree.characterSet);
  console.log('document.contentType :', mockDOMTree.contentType);
  console.log('document.readyState  :', mockDOMTree.readyState);

  console.log('\n--- 3. Inspeksi Hierarki Simpul (Node Inspection) ---');
  const rootElement = mockDOMTree.documentElement;
  console.log(
    `Root Element : <${rootElement.nodeName}> (nodeType: ${rootElement.nodeType})`,
  );
  const bodyElement = rootElement.childNodes[1];
  console.log(
    `Child Element: <${bodyElement.nodeName}> (nodeType: ${bodyElement.nodeType})`,
  );
  const heading = bodyElement.childNodes[0];
  console.log(
    `Heading Tag  : <${heading.nodeName} id="${heading.id}"> (nodeType: ${heading.nodeType})`,
  );
  const textContent = heading.childNodes[0];
  console.log(
    `Teks Isi     : "${textContent.nodeValue}" (nodeName: ${textContent.nodeName}, nodeType: ${textContent.nodeType})`,
  );

  console.log(
    '\n💡 Tip: Buka file "index.html" di browser untuk mengeksekusi langsung pada mesin render browser!',
  );
} else {
  // LINGKUNGAN BROWSER
  console.log('========================================================');
  console.log('🌐 EKSEKUSI DI BROWSER DENGAN LIVE DOM TREE');
  console.log('========================================================');

  // 1. Memeriksa properti dasar objek document
  console.log('document.title       :', document.title);
  console.log('document.URL         :', document.URL);
  console.log('document.characterSet:', document.characterSet);
  console.log('document.contentType :', document.contentType);
  console.log('document.readyState  :', document.readyState);

  // 2. Akses simpul utama pohon DOM
  console.log('Doctype              :', document.doctype?.name);
  console.log('Document Element     :', document.documentElement.tagName);
  console.log('Head Element         :', document.head.tagName);
  console.log('Body Element         :', document.body.tagName);

  // 3. Inspeksi nodeType dari elemen yang ada
  const judul = document.getElementById('judul-halaman');
  if (judul) {
    console.log('Elemen Judul:');
    console.log('- nodeName :', judul.nodeName);
    console.log('- nodeType :', judul.nodeType, '(Node.ELEMENT_NODE)');
    console.log(
      '- firstChild nodeType:',
      judul.firstChild?.nodeType,
      '(Node.TEXT_NODE)',
    );
    console.log('- firstChild nodeValue:', judul.firstChild?.nodeValue);

    // Mengubah judul tab halaman secara dinamis melalui DOM
    document.title = 'DOM Diperbarui oleh example.js';
    console.log('Judul tab berhasil diubah menjadi:', document.title);
  }
}
