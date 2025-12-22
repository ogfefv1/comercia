import type { ReactNode } from "react";
import ButtonTypes from "./types/ButtonTypes";
import './ui/SiteButton.css';

export default function SiteButton({buttonType, text, action, children} : {
  buttonType?:ButtonTypes, 
  text?:string,
  action?: () => void,
  children?: ReactNode}) {

    const extraClass = 
      buttonType == ButtonTypes.White ? 'button-white'
    : "button-red";

    return <div role="button" className={"site-button " + extraClass} onClick={action}>
        {/* <svg width="100%" height="100%" viewBox="0 0 111 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100.734 1L110 12.1445V22.8623L100.785 34H10.2803L1 22.8789V12.1504L10.2715 1H100.734Z" 
                fill="red"
                stroke="white" 
                strokeWidth="0"></path>
        </svg> */}
        {text}
        {children}
    </div>;
}