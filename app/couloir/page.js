"use client";

import {InfoBubble} from "@/components/ui/InfoBubble";

export default function couloir() {
    return (
        <div className="page"
             style={{
                 height: "100vh",
                 overflow: "hidden",
             }}>

            <div className="background"
            style={{
                position: "fixed",
                inset: "0",
                zIndex: "0",
                backgroundImage: `url("../../public/couloir.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
            }}>

                <section className="doors"
                style={{
                    top: "5vh",
                    position: "absolute",
                    width: "100vw",
                    height: "80vh",
                }}>

                    <div className="door1"
                         style={{
                             cursor: "pointer",
                             top: "7vh",
                             left: "12vw",
                             width: "9vw",
                             height: "75vh"

                         }}>
                        <InfoBubble
                            title="Porte"
                            description="Cette porte est fermée"
                            className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                            style={{
                                position: "absolute",
                                top: "12px",
                                left: "12px",
                                width: "220px",
                                pointerEvents: "none",
                            }}
                        />
                    </div>

                    <div className="door2"
                         style={{
                             cursor: "pointer",
                             top: "18vh",
                             left: "28vw",
                             width: "6vw",
                             height: "51vh"

                         }}>
                        <InfoBubble
                            title="Porte"
                            description="Cette porte doit menée à la chambre d'un domestique"
                            className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                            style={{
                                position: "absolute",
                                top: "12px",
                                left: "12px",
                                width: "220px",
                                pointerEvents: "none",
                            }}
                        />
                    </div>

                    <div className="door3"
                         style={{
                             cursor: "pointer",
                             top: "24vh",
                             left: "43vw",
                             width: "14vw",
                             height: "37vh"

                         }}>
                        <InfoBubble
                            title="Porte"
                            description="Cette porte doit menée au bureau"
                            className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                            style={{
                                position: "absolute",
                                top: "12px",
                                left: "12px",
                                width: "220px",
                                pointerEvents: "none",
                            }}
                        />
                    </div>

                    <div className="door4"
                         style={{
                             cursor: "pointer",
                             top: "18vh",
                             right: "28vw",
                             width: "6vw",
                             height: "51vh"

                         }}>
                        <InfoBubble
                            title="Porte"
                            description="Cette porte doit menée au rez de chaussé"
                            className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                            style={{
                                position: "absolute",
                                top: "12px",
                                left: "12px",
                                width: "220px",
                                pointerEvents: "none",
                            }}
                        />
                    </div>
                    <div className="door1"
                         style={{
                             cursor: "pointer",
                             top: "7vh",
                             right: "12vw",
                             width: "9vw",
                             height: "75vh"

                         }}>
                        <InfoBubble
                            title="Porte"
                            description="Cette porte doit menée à la chambre principal"
                            className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                            style={{
                                position: "absolute",
                                top: "12px",
                                left: "12px",
                                width: "220px",
                                pointerEvents: "none",
                            }}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}