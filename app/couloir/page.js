"use client";

import {InfoBubble} from "@/components/ui/InfoBubble";

export default function couloir() {
    return (
        <main className="page"
             style={{
                 position: "relative",
                 height: "100vh",
                 backgroundImage: `url("/couloir.png")`,
                 backgroundSize: "cover",
                 backgroundPosition: "center",
                 overflow: "hidden",
             }}>

            <section className="doors"
            style={{
                top: "7vh",
                position: "absolute",
                width: "100vw",
                height: "80vh",
            }}>

                <div className="door1"
                     style={{
                         position: "absolute",
                         cursor: "pointer",
                         top: "5vh",
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
                            zIndex: "1",
                            top: "40vh",
                            left: "40vw",
                            width: "40vw",
                            pointerEvents: "none",
                        }}
                    />
                </div>

                <div className="door2"
                     style={{
                         position: "absolute",
                         cursor: "pointer",
                         top: "16vh",
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
                            zIndex: "1",
                            top: "40vh",
                            left: "40vw",
                            width: "40vw",
                            pointerEvents: "none",
                        }}
                    />
                </div>

                <div className="door3"
                     style={{
                         position: "absolute",
                         cursor: "pointer",
                         top: "22vh",
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
                            zIndex: "1",
                            top: "40vh",
                            left: "40vw",
                            width: "40vw",
                            pointerEvents: "none",
                        }}
                    />
                </div>

                <div className="door4"
                     style={{
                         position: "absolute",
                         cursor: "pointer",
                         top: "16vh",
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
                            zIndex: "1",
                            top: "40vh",
                            left: "40vw",
                            width: "40vw",
                            pointerEvents: "none",
                        }}
                    />
                </div>
                <div className="door5"
                     style={{
                         position: "absolute",
                         cursor: "pointer",
                         top: "5vh",
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
                            zIndex: "1",
                            top: "40vh",
                            left: "40vw",
                            width: "40vw",
                            pointerEvents: "none",
                        }}
                    />
                </div>
            </section>
        </main>
    );
}