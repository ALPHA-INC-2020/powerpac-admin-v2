export default {
    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator4

        return !!pattern.test(str);

    },
    checkImageExistsOnServer(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status;
    },
    getPurchaseType(type) {
        let result;
        switch(type) {
            case 'Cash On Deli': 
                result = 'https://image.flaticon.com/icons/png/512/1554/1554401.png'
                break;
            case 'KBZ Pay':
                result = 'https://is2-ssl.mzstatic.com/image/thumb/Purple114/v4/fa/f1/f2/faf1f280-18d7-9b27-1309-6fd392f94b3a/AppIcon-1x_U007emarketing-0-5-0-0-85-220.png/1024x1024bb.png'
                break;
            case 'CB Pay':
                result = 'https://play-lh.googleusercontent.com/z-wRjDo9L-3c1-39ZH-VyKwofSHsmI79VH3T_pSqlj_fRhZSpc7zbDlFKS4hle0bLOk=s180-rw'
                break;
            case 'AYA Pay':
                result = 'https://play-lh.googleusercontent.com/t4ur8SEt6O2RgZCDC1l62lB6elFPxYySoh-bZqozC8O38xP9WQBhnXt-H0W4w9MyN2I'
                break;
            case 'Wave Money':
                result = 'https://play-lh.googleusercontent.com/rPq4GMCZy12WhwTlanEu7RzxihYCgYevQHVHLNha1VcY5SU1uLKHMd060b4VEV1r-OQ'
                break;
        }

        return result;
    }
}