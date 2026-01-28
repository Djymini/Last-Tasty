import styles from "./page.module.css"
import {InfoBubble} from "@/components/ui/shared/InfoBubble";

export default function MaidRoomPage() {
    return (
        <main className={styles.main}>
            <div className={`group ${styles.bed}`}>
                <InfoBubble
                    title="Lit"
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
            <div className={`group ${styles.book}`}>
                <InfoBubble
                    title="Journal"
                    description="Journal de Bob le majordome"
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
        </main>
    );
}