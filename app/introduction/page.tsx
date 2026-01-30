"use client";

import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/8bit/button";
import styles from "./page.module.css";

export default function Home() {
    const router = useRouter();

    const texte = `Une commande arrive sur ton téléphone.

                        Un Tasty Crousty encore chaud à livrer au nom de René.

                        Adresse indiquée :
                            - Manoir de Valombre.

                        Tu arrives devant une immense porte en bois sombre.
                        Le manoir est silencieux.

                        Tu lèves la main pour frapper.
                        La porte s’ouvre toute seule.

                        Avant même que tu puisses reculer, une force invisible t’aspire à l’intérieur.
                        Tu perds l’équilibre.
                        Le sac tombe au sol.

                        BOUM.

                        La porte se referme brutalement derrière toi.
                        
                        
                        . . .
                        
                        
                        Tu te retournes.

                        La poignée ne bouge pas, un boîtier est fixé au centre de la porte.
                        Un écran rouge s’allume.

                        ce manoir ne te laissera pas sortir sans la combinaison.`;
    return (
        <div className={styles.page}>
            <div className={styles.background}>
                <div className={styles.overlay}/>
            </div>
            <div className={styles.content}>
                <h1>Introduction ...</h1>
                <p style={{whiteSpace: "pre-line"}}>
                    {texte}
                </p>

                <Button variant={"outline"} onClick={() => router.push("/hall")}>Commencer</Button>
            </div>
        </div>
    );
}
