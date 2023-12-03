import background_1 from "../assets/img/backgrounds/background_1.png"
import background_2 from "../assets/img/backgrounds/background_2.png"
import background_3 from "../assets/img/backgrounds/background_3.png"
import background_4 from "../assets/img/backgrounds/background_4.png"
import pangui_1 from "../assets/img/panguis/pangui_1.png"
import pangui_2 from "../assets/img/panguis/pangui_2.png"

export function getBackgroundImg(id) {
    id = parseInt(id);
    if (id === 2) return background_2;
    if (id === 3) return background_3;
    if (id === 4) return background_4;
    return background_1;
}

export function getPanguiImg(id) {
    id = parseInt(id);
    if (id === 2) return pangui_2;
    return pangui_1;
}
