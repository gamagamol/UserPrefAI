


export default function Languanges(lang) {
    
    const languange = {
        "japan": {
            "greetings": "おかえりなさい",
            "notification": "通知",
            "theme": "ダークテーマ",
            "preferencesTitle":"ユーザー設定"
        },
        "english": {
            "greetings": "Welcome Back",
            "notification": "Notification",
            "theme": "Dark Theme",
            "languanges": "Languanges",
            "preferencesTitle":"User Preferences"
            
        },
        "indonesia": {
            "greetings": "Selamat Datang Kembali",
            "notification": "Pemberitahuan",
            "theme": "Mode Gelap",
            "languanges": "Bahasa",

            "preferencesTitle":"Preferensi Pengguna"
        }
    }

    return languange[lang]

}


