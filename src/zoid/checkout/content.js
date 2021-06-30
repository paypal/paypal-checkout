/* @flow */
/* eslint max-lines: 0 */

import { LANG } from '@paypal/sdk-constants/src';

type ContentMap = {
    [ $Values<typeof LANG> ] : {|
        windowMessage? : string,
        continueMessage? : string
    |}
};

export const containerContent : ContentMap = {
    ar: {
        windowMessage:   'لا ترى متصفح PayPal الآمن؟ سنساعدك في إعادة فتح النافذة لاستكمال مشترياتك',
        continueMessage: 'متابعة'
    },
    bg: {
        windowMessage:   'Не виждате защитения браузър на PayPal? Ще ви помогнем да отворите отново прозореца, за да завършите покупката си',
        continueMessage: 'Щракнете, за да продължите'
    },
    cs: {
        windowMessage:   'Nezobrazuje se vám bezpečný prohlížeč PayPal? Pomůžeme vám okno znovu otevřít, abyste mohli nákup dokončit',
        continueMessage: 'Pokračovat'
    },
    da: {
        windowMessage:   'Kan du ikke se PayPals sikre browser? Vi hjælper dig med at genstarte vinduet, så du kan betale',
        continueMessage: 'Fortsæt'
    },
    de: {
        windowMessage:   'Sie sehen das sichere Browserfenster von PayPal nicht? Hier können Sie es wieder öffnen und Ihren Einkauf abschließen',
        continueMessage: 'Weiter'
    },
    el: {
        windowMessage:   'Δεν βλέπετε το ασφαλές πρόγραμμα περιήγησης PayPal; Θα σας βοηθήσουμε να επανεκκινήσετε το παράθυρο για να ολοκληρώσετε την αγορά σας',
        continueMessage: 'Συνέχεια'
    },
    en: {
        windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase',
        continueMessage: 'Click to Continue'
    },
    es: {
        windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra',
        continueMessage: 'Continuar'
    },
    et: {
        windowMessage:   'Kas te ei näe turvalist PayPali lehitsejat? Aitame teil ostu lõpuleviimiseks akna uuesti avada.',
        continueMessage: 'Jätkamiseks klõpsake'
    },
    fi: {
        windowMessage:   'Eikö suojattua PayPal-selainta näy? Autamme avaamaan ikkunan uudelleen oston viimeistelyä varten',
        continueMessage: 'Jatka'
    },
    fr: {
        windowMessage:   'Le navigateur sécurisé de PayPal n’apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat',
        continueMessage: 'Continuer'
    },
    he: {
        windowMessage:   'לא רואה את דפדפן PayPal המאובטח? נעזור לך לפתוח מחדש את החלון כדי להשלים את הקנייה שלך',
        continueMessage: 'המשך'
    },
    hu: {
        windowMessage:   'Nem látja a biztonságos PayPal-böngészőt? Segítünk újra betölteni az ablakot, hogy befejezhesse a vásárlást',
        continueMessage: 'Folytatás'
    },
    id: {
        windowMessage:   'Browser PayPal yang aman tidak terlihat? Kami akan membantu menampilkan ulang jendela untuk menyelesaikan pembayaran Anda',
        continueMessage: 'Lanjutkan'
    },
    it: {
        windowMessage:   'Non vedi la pagina sicura di PayPal? Ti aiuteremo a riaprire la finestra per completare l’acquisto',
        continueMessage: 'Continua'
    },
    ja: {
        windowMessage:   'セキュアなブラウザが表示されない場合は、ウィンドウを再起動して、支払いを完了できるようお手伝いいたします',
        continueMessage: '続行'
    },
    ko: {
        windowMessage:   '보안 PayPal 브라우저가 보이지 않으신가요? 창을 다시 실행하여 결제를 완료할 수 있도록 도와드리겠습니다',
        continueMessage: '계속'
    },
    lt: {
        windowMessage:   'Nematote saugios „PayPal“ naršyklės? Padėsime iš naujo paleisti langą, kad užbaigtumėte pirkimą',
        continueMessage: 'Paspauskite, jei norite tęsti'
    },
    lv: {
        windowMessage:   'Vai neredzat drošo PayPal pārlūkprogrammu? Mēs palīdzēsim jums atkārtoti palaist logu, lai pabeigtu pirkumu.',
        continueMessage: 'Noklikšķiniet, lai turpinātu'
    },
    ms: {
        windowMessage:   'Tidak melihat pelayar PayPal yang selamat? Kami akan membantu anda melancarkan semula tetingkap untuk melengkapkan pembelian anda',
        continueMessage: 'Klik untuk Meneruskan'
    },
    no: {
        windowMessage:   'Ser du ikke den sikre PayPal-nettleseren? Vi hjelper deg med å starte vinduet på nytt så du kan fullføre kjøpet',
        continueMessage: 'Fortsett'
    },
    nl: {
        windowMessage:   'Ziet u de beveiligde PayPal-browser niet? We helpen u het venster opnieuw te openen om uw aankoop te voltooien',
        continueMessage: 'Doorgaan'
    },
    pl: {
        windowMessage:   'Nie widzisz bezpiecznej przeglądarki PayPal? Pomożemy Ci ponownie uruchomić to okno w celu dokonania zakupu',
        continueMessage: 'Kontynuuj'
    },
    pt: {
        windowMessage:   'Não está vendo o navegador seguro do PayPal? Ajudaremos você a reabrir a janela para concluir a compra',
        continueMessage: 'Continuar'
    },
    ro: {
        windowMessage:   'Nu vezi browser-ul securizat PayPal? Te vom ajuta să lansezi din nou fereastra pentru a finaliza achiziția',
        continueMessage: 'Dă clic pentru a continua'
    },
    ru: {
        windowMessage:   'Не отображается безопасная страница PayPal в браузере? Мы поможем вам повторно загрузить окно, чтобы завершить покупку',
        continueMessage: 'Продолжить'
    },
    si: {
        windowMessage:   'ආරක්ෂිත PayPal බ්‍රව්සරය නොපෙනේ ද? ඔබේ මිල දී ගැනීම සම්පූර්ණ කිරීම සඳහා අපි ඔබට කවුළුව නැවත දියත් කිරීමට උපකාර කරන්නෙමු',
        continueMessage: 'ඉදිරියට යාමට ක්ලික් කරන්න'
    },
    sk: {
        windowMessage:   'Nezobrazuje sa vám zabezpečený prehliadač PayPal? Pomôžeme vám znova otvoriť okno, aby ste mohli nákup dokončiť',
        continueMessage: 'Pokračovať'
    },
    sl: {
        windowMessage:   'Ne vidite PayPalovega varnega brskalnika? Pomagali vam bomo ponovno zagnati okno za dokončanje nakupa',
        continueMessage: 'Kliknite za nadaljevanje'
    },
    sq: {
        windowMessage:   'Nuk e shikon shfletuesin e sigurt të PayPal? Do të të ndihmojmë të rihapësh dritaren për të përfunduar blerjen',
        continueMessage: 'Kliko për të vazhduar'
    },
    sv: {
        windowMessage:   'Ser du inte den säkra PayPal-webbläsaren? Vi hjälper dig att starta om fönstret för att slutföra ditt köp',
        continueMessage: 'Fortsätt'
    },
    th: {
        windowMessage:   'ถ้าคุณไม่เห็นเบราว์เซอร์ที่มีระบบความปลอดภัยของ PayPal เราจะช่วยคุณเปิดหน้าต่างอีกครั้งเพื่อชำระเงินให้เรียบร้อย',
        continueMessage: 'ดำเนินการต่อ'
    },
    tl: {
        windowMessage:   'Hindi nakikita ang secure na PayPal browser? Tutulungan ka naming i-launch ulit ang window para makumpleto ang pagbili mo.',
        continueMessage: 'I-click para Magpatuloy'
    },
    tr: {
        windowMessage:   'Güvenli PayPal tarayıcısını görmüyor musunuz? Alışverişinizi tamamlamak için pencereyi yeniden başlatmanıza yardımcı olacağız',
        continueMessage: 'Devam'
    },
    vi: {
        windowMessage:   'Bạn không thấy trình duyệt PayPal bảo mật? Chúng tôi sẽ giúp bạn mở lại cửa sổ để hoàn tất giao dịch mua hàng',
        continueMessage: 'Nhấp để tiếp tục'
    },
    zh: {
        windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成付款',
        continueMessage: '继续'
    },
    zh_Hant: {
        windowMessage:   '看不到安全 PayPal 瀏覽器？我們會協助你重新啟動視窗，以完成購物程序',
        continueMessage: '按一下並繼續'
    }
};
