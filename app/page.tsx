"use client"


import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/8bit/button";
import {
    Card,
    CardContent,
    CardDescription, CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/8bit/card";
import styles from "./app.module.css"
import {Input} from "@/components/ui/8bit/input";
import {Rain} from "@/components/ui/rain/rain";



export default function Home() {
    const [isReady, setReady] = useState(false);
    const router = useRouter()
    const [code, setCode] = useState("")
    const [isBeginning, setBeginning] = useState(false)
    const [isContinue, setContinue] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        console.log(e)
        router.push(`/hall`)
    }

    const goIntro = async () => {
        const res = await fetch("/api/party", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        });

        if (!res.ok) {
            console.error("Erreur création party");
            return;
        }

        const party = await res.json();

        setCode(party.sessionNumber);
        setBeginning(true);
    };

    const continueParty = async () => {
        if (!code) return;

        const res = await fetch(
            `/api/party?sessionNumber=${encodeURIComponent(code)}`,
            {
                method: "GET",
            }
        );

        if (!res.ok) {
            console.error("Partie introuvable");
            return;
        }

        const party = await res.json();
        console.log("Party récupérée :", party);

        router.push(`/${party.location}`);
    };

    const menuItems = [
        {
            label: "Nouvelle partie",
            action: () => goIntro(),
        },
        {
            label: "Continuer",
            action: () => {setContinue(true); setBeginning(false)},
        },
    ];

    return (
        <main className={styles.bg}>
            <Rain></Rain>
            {isReady
                ? <Card>
                    {!isBeginning && !isContinue && (
                        <>
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    {menuItems.map((item) => (
                                        <Button key={item.label} className="flex items-center gap-2" onClick={item.action}>
                                            <span>{item.label}</span>
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </>
                    )}
                    {isBeginning && !isContinue && (
                        <>
                            <CardHeader>
                                <CardTitle>Voici votre code</CardTitle>
                                <CardDescription>{code}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => router.push(`/introduction`)}>Jouer</Button>
                            </CardContent>
                        </>
                    )}
                    {!isBeginning && isContinue && (
                        <>
                            <CardHeader>
                                <CardTitle>Entrez votre code</CardTitle>
                                <button
                                    onClick={() => setContinue(false)}
                                    className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                                    aria-label="Fermer"
                                >
                                    ✕
                                </button>
                            </CardHeader>
                            <CardContent className="flex flex-col justify-center gap-4">
                                <Input placeholder="Code de session" value={code} onChange={(e) => setCode(e.target.value)}/>
                                <Button onClick={continueParty}>Jouer</Button>
                            </CardContent>
                        </>
                    )}
                </Card>
                : <h2 className={styles.fadeLoop} onClick={() => setReady(true)}>Commencer</h2>}
        </main>
    )
}
