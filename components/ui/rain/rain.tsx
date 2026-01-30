"use client"

import React from "react"
import styles from "./rain.module.css"



export function Rain({}) {
    return (
        <div className={styles.rain}>
            <div className={styles.drops}>
                {Array.from({ length: 500 }).map((_, i) => (
                    <span key={i} className={styles.drop} />
                ))}
            </div>
            <div className={styles.drops}>
                {Array.from({ length: 500 }).map((_, i) => (
                    <span key={i} className={styles.drop2} />
                ))}
            </div>
        </div>
    )
}
