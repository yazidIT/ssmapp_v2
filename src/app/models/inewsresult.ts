export interface INewsResultData {
    channel: Array<IChannelItem>
}

export interface IChannelItem {
    title: string
    link: string
    description: string
    author: string
    pubDate: string
    guid: string
    id: string
    link_id: string
    // "title":"SSM Gesa Orang Ramai Supaya Berhati-Hati Dalam Berurusan Dengan Entiti Perniagaan Pinjaman Wang Yang Mengaitkan SSM Sebagai Pemberi Pinjaman Untuk Perniagaan",
    // "link":"https://www.ssm.com.my/Lists/Announcement/AnnouncementDetails.aspx?ID=180",
    // "description":"Pelanggan yang dihormati,Suruhanjaya Syarikat Malaysia (SSM) telah menerima laporan berkenaan sebuah entiti perniagaan pinjaman wang yang mengunakan nama SSM untuk mempromosikan perkhidmatan dan produk mereka.SSM menafikan mempunyai sebarang kaitan dengan mana-mana entiti pinjaman wang dan memberi amaran bahawa tindakan undang-undang akan diambil ke atas mana-mana pihak yang menggunakan nama serta...",
    // "author":"FAKHRUR RAZI MOHD FADZIL",
    // "pubDate":"Wed, 05 Aug 2020 08:41:30 GMT",
    // "guid":"https://www.ssm.com.my/Lists/Announcement/AnnouncementDetails.aspx?ID=180",
    // "id":"180",
    // "link_id":"https://m.ssm.com.my/apiv2/index.php/rss/180"
}
