"use client";

import { useRouter } from "next/navigation";
import {InfoBubble} from "../../components/ui/InfoBubble";

export default function LivingRoomPage() {
    const router = useRouter();

    return (
        <main
            style={{
                position: "relative",
                height: "100vh",
                backgroundImage: "url('/living-room.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                overflow: "hidden",
            }}
        >
            <div
                className="group fireplace"
                style={{
                    position: "absolute",
                    top: "24%",
                    left: "33%",
                    width: "34%",
                    height: "34%",
                    zIndex: 10,
                    cursor: "pointer",
                }}
                onClick={() => router.push("/hall")}
            >
                <InfoBubble
                    title="Cheminée"
                    description="Il doit bien y avoir quelqu'un dans les parages..."
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

            <div
                className="group blueprint"
                style={{
                    position: "absolute",
                    top: "66%",
                    left: "38%",
                    width: "24%",
                    height: "18%",
                    zIndex: 10,
                    cursor: "pointer",
                }}
            >
                <InfoBubble
                    title="Plan"
                    description="On dirait les plans du manoir."
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

            <div
                className="group portrait"
                style={{
                    position: "absolute",
                    top: "0%",
                    left: "38%",
                    width: "24%",
                    height: "20%",
                    zIndex: 10,
                    cursor: "pointer",
                }}
            >
                <InfoBubble
                    title="Portrait"
                    description="Voici donc les propriétaires."
                    className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%) translateY(8px)",
                        width: "240px",
                        pointerEvents: "none",
                    }}
                />
            </div>

            <div
                onClick={() => router.push("/hall")}
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "25%",
                    cursor: "pointer",
                }}
            />
        </main>
    );
}
