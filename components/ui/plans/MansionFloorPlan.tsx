"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export interface FloorPlanImage {
    src: string;
    alt?: string;
}

interface MansionFloorPlanProps {
    floor: number;
    className?: string;
    customImages?: FloorPlanImage[];
    width?: number;
    height?: number;
}

export function MansionFloorPlan({
                                     floor,
                                     className,
                                     customImages,
                                     width = 280,
                                     height = 200,
                                 }: MansionFloorPlanProps) {
    if (customImages && customImages[floor]) {
        return (
            <div className={cn("relative w-full h-full", className)}>
                <Image
                    src={customImages[floor].src || "/placeholder.svg"}
                    alt={customImages[floor].alt || `Plan étage ${floor}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 90vw, 1200px"
                    priority
                />
            </div>
        );
    }

    return (
        <div className={cn("relative w-full h-full", className)}>
            <svg
                viewBox="0 0 280 200"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="pixelated block w-full h-full"
                style={{ imageRendering: "pixelated" }}
            >
                <rect width="280" height="200" fill="#1a1a2e" />
                <rect x="20" y="20" width="240" height="160" fill="none" stroke="#4a9c6d" strokeWidth="4" />

                {floor === 0 && <GroundFloor />}
                {floor === 1 && <FirstFloor />}
                {floor === 2 && <SecondFloor />}
                {floor === 3 && <Attic />}
            </svg>
        </div>
    );
}



function GroundFloor() {
    return (
        <g>
            {/* Hall d'entree */}
            <rect x="100" y="140" width="80" height="40" fill="none" stroke="#4a9c6d" strokeWidth="2" />
            <rect x="130" y="176" width="20" height="8" fill="#8b4513" /> {/* Porte */}

            {/* Salon */}
            <rect x="20" y="80" width="80" height="100" fill="none" stroke="#4a9c6d" strokeWidth="2" />
            <rect x="96" y="110" width="8" height="20" fill="#2d5a3d" /> {/* Porte */}

            {/* Cuisine */}
            <rect x="180" y="80" width="80" height="100" fill="none" stroke="#4a9c6d" strokeWidth="2" />
            <rect x="176" y="110" width="8" height="20" fill="#2d5a3d" /> {/* Porte */}

            {/* Salle a manger */}
            <rect x="100" y="20" width="80" height="60" fill="none" stroke="#4a9c6d" strokeWidth="2" />
            <rect x="130" y="76" width="20" height="8" fill="#2d5a3d" /> {/* Porte */}

            {/* Bibliotheque */}
            <rect x="20" y="20" width="80" height="60" fill="none" stroke="#4a9c6d" strokeWidth="2" />
            <rect x="96" y="40" width="8" height="20" fill="#2d5a3d" /> {/* Porte */}

            {/* Bureau */}
            <rect x="180" y="20" width="80" height="60" fill="none" stroke="#4a9c6d" strokeWidth="2" />
            <rect x="176" y="40" width="8" height="20" fill="#2d5a3d" /> {/* Porte */}

            {/* Escalier */}
            <rect x="120" y="90" width="40" height="40" fill="#3d2914" stroke="#8b4513" strokeWidth="2" />
            <line x1="120" y1="100" x2="160" y2="100" stroke="#8b4513" strokeWidth="2" />
            <line x1="120" y1="110" x2="160" y2="110" stroke="#8b4513" strokeWidth="2" />
            <line x1="120" y1="120" x2="160" y2="120" stroke="#8b4513" strokeWidth="2" />

            {/* Labels */}
            <text x="60" y="135" fill="#7ec8a3" fontSize="8" fontFamily="monospace" textAnchor="middle">SALON</text>
            <text x="220" y="135" fill="#7ec8a3" fontSize="8" fontFamily="monospace" textAnchor="middle">CUISINE</text>
            <text x="140" y="55" fill="#7ec8a3" fontSize="7" fontFamily="monospace" textAnchor="middle">SALLE A</text>
            <text x="140" y="65" fill="#7ec8a3" fontSize="7" fontFamily="monospace" textAnchor="middle">MANGER</text>
            <text x="60" y="55" fill="#7ec8a3" fontSize="7" fontFamily="monospace" textAnchor="middle">BIBLIO</text>
            <text x="220" y="55" fill="#7ec8a3" fontSize="8" fontFamily="monospace" textAnchor="middle">BUREAU</text>
            <text x="140" y="170" fill="#7ec8a3" fontSize="8" fontFamily="monospace" textAnchor="middle">HALL</text>
        </g>
    );
}

function FirstFloor() {
    return (
        <g>
            {/* Couloir */}
            <rect x="100" y="80" width="80" height="100" fill="none" stroke="#4a9c6d" strokeWidth="2" />

            {/* Chambre principale */}
            <rect x="20" y="20" width="80" height="80" fill="none" stroke="#4a9c6d" strokeWidth="2" />
            <rect x="96" y="50" width="8" height="20" fill="#2d5a3d" />

            {/* Salle de bain principale */}
            <rect x="20" y="100" width="80" height="80" fill="none" stroke="#4a9c6d" strokeWidth="2" />
            <rect x="96" y="130" width="8" height="20" fill="#2d5a3d" />

            {/* Chambre 2 */}
            <rect x="180" y="20" width="80" height="80" fill="none" stroke="#4a9c6d" strokeWidth="2" />
            <rect x="176" y="50" width="8" height="20" fill="#2d5a3d" />

            {/* Chambre 3 */}
            <rect x="180" y="100" width="80" height="80" fill="none" stroke="#4a9c6d" strokeWidth="2" />
            <rect x="176" y="130" width="8" height="20" fill="#2d5a3d" />

            {/* Chambre 4 */}
            <rect x="100" y="20" width="80" height="60" fill="none" stroke="#4a9c6d" strokeWidth="2" />
            <rect x="130" y="76" width="20" height="8" fill="#2d5a3d" />

            {/* Escalier */}
            <rect x="120" y="100" width="40" height="40" fill="#3d2914" stroke="#8b4513" strokeWidth="2" />
            <line x1="120" y1="110" x2="160" y2="110" stroke="#8b4513" strokeWidth="2" />
            <line x1="120" y1="120" x2="160" y2="120" stroke="#8b4513" strokeWidth="2" />
            <line x1="120" y1="130" x2="160" y2="130" stroke="#8b4513" strokeWidth="2" />

            {/* Labels */}
            <text x="60" y="55" fill="#7ec8a3" fontSize="7" fontFamily="monospace" textAnchor="middle">CHAMBRE</text>
            <text x="60" y="65" fill="#7ec8a3" fontSize="7" fontFamily="monospace" textAnchor="middle">MAITRE</text>
            <text x="60" y="145" fill="#7ec8a3" fontSize="7" fontFamily="monospace" textAnchor="middle">SALLE DE</text>
            <text x="60" y="155" fill="#7ec8a3" fontSize="7" fontFamily="monospace" textAnchor="middle">BAIN</text>
            <text x="220" y="60" fill="#7ec8a3" fontSize="8" fontFamily="monospace" textAnchor="middle">CH. 2</text>
            <text x="220" y="145" fill="#7ec8a3" fontSize="8" fontFamily="monospace" textAnchor="middle">CH. 3</text>
            <text x="140" y="55" fill="#7ec8a3" fontSize="8" fontFamily="monospace" textAnchor="middle">CH. 4</text>
            <text x="140" y="165" fill="#7ec8a3" fontSize="8" fontFamily="monospace" textAnchor="middle">COULOIR</text>
        </g>
    );
}

function SecondFloor() {
    return (
        <g>
            {/* Couloir central */}
            <rect x="100" y="80" width="80" height="100" fill="none" stroke="#4a9c6d" strokeWidth="2" />

            {/* Grenier amenage gauche */}
            <rect x="20" y="20" width="80" height="160" fill="none" stroke="#4a9c6d" strokeWidth="2" />
            <rect x="96" y="90" width="8" height="20" fill="#2d5a3d" />

            {/* Grenier amenage droit */}
            <rect x="180" y="20" width="80" height="160" fill="none" stroke="#4a9c6d" strokeWidth="2" />
            <rect x="176" y="90" width="8" height="20" fill="#2d5a3d" />

            {/* Salle de jeux */}
            <rect x="100" y="20" width="80" height="60" fill="none" stroke="#4a9c6d" strokeWidth="2" />
            <rect x="130" y="76" width="20" height="8" fill="#2d5a3d" />

            {/* Escalier */}
            <rect x="120" y="100" width="40" height="40" fill="#3d2914" stroke="#8b4513" strokeWidth="2" />
            <line x1="120" y1="110" x2="160" y2="110" stroke="#8b4513" strokeWidth="2" />
            <line x1="120" y1="120" x2="160" y2="120" stroke="#8b4513" strokeWidth="2" />
            <line x1="120" y1="130" x2="160" y2="130" stroke="#8b4513" strokeWidth="2" />

            {/* Labels */}
            <text x="60" y="95" fill="#7ec8a3" fontSize="7" fontFamily="monospace" textAnchor="middle">SUITE</text>
            <text x="60" y="105" fill="#7ec8a3" fontSize="7" fontFamily="monospace" textAnchor="middle">INVITES</text>
            <text x="220" y="100" fill="#7ec8a3" fontSize="7" fontFamily="monospace" textAnchor="middle">STUDIO</text>
            <text x="140" y="50" fill="#7ec8a3" fontSize="7" fontFamily="monospace" textAnchor="middle">SALLE DE</text>
            <text x="140" y="60" fill="#7ec8a3" fontSize="7" fontFamily="monospace" textAnchor="middle">JEUX</text>
            <text x="140" y="165" fill="#7ec8a3" fontSize="8" fontFamily="monospace" textAnchor="middle">COULOIR</text>
        </g>
    );
}

function Attic() {
    return (
        <g>
            {/* Toit - forme triangulaire stylisee */}
            <polygon points="140,30 40,100 240,100" fill="none" stroke="#4a9c6d" strokeWidth="2" />

            {/* Zone de stockage centrale */}
            <rect x="80" y="100" width="120" height="80" fill="none" stroke="#4a9c6d" strokeWidth="2" />

            {/* Poutres */}
            <line x1="80" y1="100" x2="140" y2="50" stroke="#8b4513" strokeWidth="3" />
            <line x1="200" y1="100" x2="140" y2="50" stroke="#8b4513" strokeWidth="3" />
            <line x1="100" y1="100" x2="100" y2="180" stroke="#8b4513" strokeWidth="2" />
            <line x1="180" y1="100" x2="180" y2="180" stroke="#8b4513" strokeWidth="2" />

            {/* Lucarne */}
            <rect x="125" y="45" width="30" height="25" fill="#1a1a2e" stroke="#4a9c6d" strokeWidth="2" />
            <line x1="140" y1="45" x2="140" y2="70" stroke="#4a9c6d" strokeWidth="1" />
            <line x1="125" y1="57" x2="155" y2="57" stroke="#4a9c6d" strokeWidth="1" />

            {/* Objets mysterieux */}
            <rect x="90" y="150" width="20" height="20" fill="#3d2914" stroke="#6b4423" strokeWidth="2" />
            <rect x="170" y="150" width="20" height="20" fill="#3d2914" stroke="#6b4423" strokeWidth="2" />
            <circle cx="140" cy="140" r="10" fill="none" stroke="#c41e3a" strokeWidth="2" strokeDasharray="3" />

            {/* Trappe */}
            <rect x="120" y="160" width="40" height="20" fill="#3d2914" stroke="#8b4513" strokeWidth="2" />
            <circle cx="140" cy="170" r="3" fill="#8b4513" />

            {/* Labels */}
            <text x="140" y="130" fill="#7ec8a3" fontSize="8" fontFamily="monospace" textAnchor="middle">GRENIER</text>
            <text x="140" y="195" fill="#c41e3a" fontSize="6" fontFamily="monospace" textAnchor="middle">??? SECRET ???</text>
        </g>
    );
}
