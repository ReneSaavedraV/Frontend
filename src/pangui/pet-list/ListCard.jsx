import {getBackgroundImg, getPanguiImg} from "./image-loader"
import levelIcon from "./assets/img/level-icon.png"
import ImageMerger from "../ImageMerger"


export default function ListCard({ panguiName, panguiNumber, backgroundNumber, energy, food, health, panguiId, ownsTheList }) {
    const getPanguiImageSource = () => {
        return "/src/common/assets/img/panguis/pangui_1.png";
    };
    
    const getPanguiClothesImageSource = () => {
        return `/src/common/assets/img/panguis/ropa_${panguiNumber}_1.png`;
    };
    
    const getBackgroundImageSource = () => {
        return `/src/pangui/assets/img/backgrounds/background_${backgroundNumber}.png`;
    };

    return (
        <>
            <div className="box">
                {ownsTheList && (
                    <a href={`/panguipet/${panguiId}`}>
                        <img className="box-background" src={getBackgroundImageSource()}/>
                        <ImageMerger
                            imageUrl1={getPanguiImageSource()}
                            imageUrl2={getPanguiClothesImageSource()}
                            alt="pangui" className="box-pangui"
                            list={true}
                        />
                    </a>
                )}
                {!ownsTheList && (
                    <>
                        <img className="box-background" src={getBackgroundImageSource()}/>
                        <ImageMerger
                            imageUrl1={getPanguiImageSource()}
                            imageUrl2={getPanguiClothesImageSource()}
                            alt="pangui" className="box-pangui"
                            list={true}/>
                    </>
                                
                )}

                <div className="box-name">{panguiName}</div>
            </div>
        </>
    )
}

