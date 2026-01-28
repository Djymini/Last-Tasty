"use client";


import {InfoBubble} from "../../components/ui/shared/InfoBubble";

export default function EastCorridorPage() {
    return (
        <main style={{
                 position: "relative",
                 height: "100vh",
                 backgroundImage: `url("/couloir.png")`,
                 backgroundSize: "cover",
                 backgroundPosition: "center",
                 overflow: "hidden",
             }}>

            <div className="group door1"
                 style={{
                     position: "absolute",
                     cursor: "pointer",
                     top: "13vh",
                     left: "12vw",
                     width: "9vw",
                     height: "75vh",
                     zIndex: "10",

                 }}>
                <InfoBubble
                    title="Porte"
                    description="Cette porte est condamnée"
                    className="opacity-0 transition-all duration-150 group-hover:opacity-100"
                    style={{
                        position: "absolute",

                        top: "40%",

                        width: "15vw",
                        pointerEvents: "none",
                    }}
                />
            </div>

            <div className="group door2"
                 style={{
                     position: "absolute",
                     cursor: "pointer",
                     top: "24vh",
                     left: "28vw",
                     width: "6vw",
                     height: "51vh",
                     zIndex: "10",

                 }}>
                <InfoBubble
                    title="Porte"
                    description="Cette porte doit menée à la chambre d'un domestique"
                    className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                        position: "absolute",

                        top: "37%",

                        width: "15vw",
                        pointerEvents: "none",
                    }}
                />
            </div>

            <div className="group door3"
                 style={{
                     position: "absolute",
                     cursor: "pointer",
                     top: "28vh",
                     left: "43vw",
                     width: "14vw",
                     height: "37vh",
                     zIndex: "10",

                 }}>
                <InfoBubble
                    title="Porte"
                    description="Cette porte doit menée à la chambre principal"
                    className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                        position: "absolute",

                        top: "35%",

                        width: "15vw",
                        pointerEvents: "none",
                    }}
                />
            </div>

            <div className="group door4"
                 style={{
                     position: "absolute",
                     cursor: "pointer",
                     top: "24vh",
                     right: "28vw",
                     width: "6vw",
                     height: "51vh",
                     zIndex: "10",

                 }}>
                <InfoBubble
                    title="Porte"
                    description="Cette porte est condamnée"
                    className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                        position: "absolute",

                        top: "37%",

                        width: "15vw",
                        pointerEvents: "none",
                    }}
                />
            </div>
            <div className="group door5"
                 style={{
                     position: "absolute",
                     cursor: "pointer",
                     top: "13vh",
                     right: "12vw",
                     width: "9vw",
                     height: "75vh",
                     zIndex: "10",

                 }}>
                <InfoBubble
                    title="Porte"
                    description="Cette porte est condamnée"
                    className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                        position: "absolute",

                        top: "40%",

                        width: "15vw",
                        pointerEvents: "none",
                    }}
                />
            </div>
        </main>
    );
}