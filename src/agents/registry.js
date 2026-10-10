export const agents = [
 {id:'director',name:'Mission Director',keywords:[],instruction:'Koordinasikan seluruh misi, pilih spesialis, dan satukan hasil.'},
 {id:'research',name:'Research Agent',keywords:['riset','research','banding','cari','analisis'],instruction:'Lakukan riset terstruktur. Pisahkan fakta, asumsi, dan rekomendasi.'},
 {id:'writer',name:'Writing Agent',keywords:['tulis','artikel','sop','email','dokumen','laporan'],instruction:'Buat tulisan jelas, rapi, siap pakai, dan sesuai tujuan.'},
 {id:'it',name:'IT Support Agent',keywords:['windows','linux','server','mikrotik','printer','jaringan','error','troubleshoot'],instruction:'Diagnosis teknis secara aman, bertahap, dan dapat diverifikasi.'},
 {id:'automation',name:'Automation Agent',keywords:['otomasi','automation','workflow','api','power automate','n8n'],instruction:'Rancang pemicu, input, aturan, aksi, output, dan kegagalan.'},
 {id:'security',name:'Security Agent',keywords:['security','keamanan','akses','hardening','vulnerability'],instruction:'Tinjau risiko, hak akses minimum, rahasia, dan mitigasi.'},
 {id:'planner',name:'Planning Agent',keywords:['rencana','roadmap','proyek','implementasi'],instruction:'Pecah pekerjaan menjadi tahap, dependensi, prioritas, dan kriteria selesai.'},
 {id:'critic',name:'Critic Agent',keywords:['review','kritik','risiko','kelemahan'],instruction:'Cari kelemahan, kontradiksi, asumsi rapuh, dan perbaikan.'},
 {id:'qa',name:'QA Agent',keywords:[],instruction:'Periksa kelengkapan, akurasi, keamanan, dan konsistensi hasil.'},
 {id:'memory',name:'Memory Agent',keywords:['ingat','memory','preferensi'],instruction:'Ambil dan susun memori relevan tanpa mengarang.'},
 {id:'document',name:'Document Agent',keywords:['file','dokumen','arsip'],instruction:'Kelola keluaran sebagai dokumen terstruktur.'},
 {id:'monitor',name:'Monitoring Agent',keywords:['cpu','ram','disk','monitoring','status'],instruction:'Analisis telemetri dan identifikasi anomali operasional.'}
];
export const byId=id=>agents.find(a=>a.id===id);
