const avatarUrls = [
    "https://i.ibb.co/Gvxr58n/default.png",
    "https://i.ibb.co/t3ZyJM0/1.png",
    "https://i.ibb.co/bFFw1zg/2.png",
    "https://i.ibb.co/YRfKk9x/3.png",
    "https://i.ibb.co/QvFWmDS/4.png",
    "https://i.ibb.co/KmqJCbc/5.png",
    "https://i.ibb.co/S6X4f1B/6.png",
    "https://i.ibb.co/zhwfw4H/7.png",
    "https://i.ibb.co/P9TWc5H/8.png",
    "https://i.ibb.co/yydRwnK/9.png",
    "https://i.ibb.co/LYQKm0d/10.png",
    "https://i.ibb.co/bNV9r5w/11.png",
    "https://i.ibb.co/J2YpR10/12.png",
    "https://i.ibb.co/zZhmgsz/13.png",
    "https://i.ibb.co/xJmY6b9/14.png",
    "https://i.ibb.co/M7H8krg/15.png",
    "https://i.ibb.co/BwsXTYk/16.png",
    "https://i.ibb.co/tcCknYN/17.png",
    "https://i.ibb.co/02B7Fx1/18.png",
    "https://i.ibb.co/M2FsQpX/19.png",
    "https://i.ibb.co/DQ8PK9d/20.png",
    "https://i.ibb.co/mSFXSr1/21.png",
    "https://i.ibb.co/rG4Tb1r/22.png",
    "https://i.ibb.co/Ns8x5Cv/23.png",
    "https://i.ibb.co/SNMTxr9/24.png",
    "https://i.ibb.co/pySYpdK/25.png",
    "https://i.ibb.co/c1WWjBv/26.png",
    "https://i.ibb.co/TW3gKSB/27.png",
    "https://i.ibb.co/hX5yB6Q/28.png",
    "https://i.ibb.co/cbf0vbv/29.png",
];

const backgroundUrls = [
    "/src/pangui/assets/img/backgrounds/background_0.png",
    "/src/pangui/assets/img/backgrounds/background_1.png",
    "/src/pangui/assets/img/backgrounds/background_2.png",
    "/src/pangui/assets/img/backgrounds/background_3.png",
    "/src/pangui/assets/img/backgrounds/background_4.png",
    "/src/pangui/assets/img/backgrounds/background_5.png",
    "/src/pangui/assets/img/backgrounds/background_6.png",
    "/src/pangui/assets/img/backgrounds/background_7.png",
]

const avatarLoader = (id) => {
    if (id < 0 || id >= avatarUrls.length) {
        return avatarUrls[0];
    }
    return avatarUrls[id];
}

const backgroundLoader = (id) => {
    if (id < 0 || id >= backgroundUrls.length) {
        return backgroundUrls[0];
    }
    return backgroundUrls[id];
}

export { avatarUrls, backgroundUrls, avatarLoader, backgroundLoader };
