import { useContext, useEffect, useState } from "react";
import SiteButton from "../../features/buttons/SiteButton";
import ButtonTypes from "../../features/buttons/types/ButtonTypes";
import type { HomePageSection } from "../../features/section_card/types/section";
import SectionCard from "../../features/section_card/SectionCard";
import "./ui/Home.css";
import SectionDao from "../../entities/section/api/SectionDao";
import { AppContext } from "../../features/app_context/AppContext";
import { ModalIcon } from "../../features/modal/ModalIcon";

export default function Home() {
    const [homePageContent, setHomePageContent] = useState<HomePageContent|null>(null);
    const {showModal} = useContext(AppContext);

    useEffect(() => {
        SectionDao.getSections().then(s => 
            setHomePageContent({
                sections: s
            }));
    }, []);

    return <>
    <h1 className="display-4"><i className="bi bi-house-heart"></i> Home, sweet home</h1>
    <SiteButton 
        action={() => showModal({
            title: "The Title", 
            message: "The message",
            onCancel: () => console.log("Cancelled"),
            icon: ModalIcon.danger,
        })} 
        buttonType={ButtonTypes.Red} 
        text="Red Button"/>
    <SiteButton 
        action={() => showModal({
            title: "The Title", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            buttons: [
                {title: "Cancel"},
            ],
            icon: ModalIcon.warning,
        })}
        buttonType={ButtonTypes.White} text="White Button"/>
    <SiteButton 
        action={() => showModal({
            title: "The Title", 
            message: "The message",
            buttons: [
                {title: "Ok", callback: () => console.log("Ok")},
                {title: "Cancel", type: ButtonTypes.White},
            ],
            isCancellable: true,
            onCancel: () => console.log("Cancelled"),
            icon: ModalIcon.information,
        })} 
        buttonType={ButtonTypes.Red} 
        text="Red Button"/>
    
    <div className="content-container">
        {homePageContent?.sections.map(sec => 
            <SectionCard section={sec} key={sec.title} />)}
    </div>

    </>;
}

type HomePageContent = {
    sections: Array<HomePageSection>,
}