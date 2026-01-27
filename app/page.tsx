import {Button} from "@/components/ui/8bit/button";



export default function Home() {
    const texte = `Une commande arrive sur ton téléphone.

                        Un Tasty Crousty encore chaud à livrer.

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

                        . . .

                        La porte se referme brutalement derrière toi.
                        Tu te retournes.

                        La poignée ne bouge pas, un boîtier est fixé au centre de la porte.
                        Un écran rouge s’allume.

                        ce manoir ne te laissera pas sortir sans la combinaison.`;
    return (
        <div className="page">
            <div className="background">
                <div className="overlay" />
            </div>

            <div className="content">
                <h1>Introduction ...</h1>
                    <p style={{ whiteSpace: "pre-line" }}>
                        {texte}
                    </p>
            </div>
        </div>
    );
}
