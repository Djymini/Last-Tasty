"use client"

import Image from "next/image";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/8bit/button"
import { Input } from "@/components/ui/8bit/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/8bit/dialog"
import styles from "./app.module.css"



export default function Home() {
    const router = useRouter()
    const [code, setCode] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        console.log(e)
        router.push(`/hall`)
    }

    const goIntro = () => {
        router.push(`/introduction`)
    }

    return (
        <main className={styles.bg}>
            <h1 className={styles.title}>Last Tasty</h1>
            <div className={styles.container}>
                <Button className="bg-opacity-0" onClick={goIntro}>Nouvelle partie</Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-opacity-0">Charger une partie</Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Rejoindre une session</DialogTitle>
                            <DialogDescription>
                                Entre ton code de session pour rejoindre la partie
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-6 py-4">
                            <Input
                                id="code"
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="CODE SESSION"
                                className="retro rounded-none border-4 border-foreground text-xs h-12"
                                required
                            />

                            <Button type="submit" className="w-full">
                                Rejoindre
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </main>
    )
}
