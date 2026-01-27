export default function HallPage() {
    return (
        <main
            style={{
                height: "100vh",
                width: "100vw",
                backgroundImage: "url('/rooms/hall.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
            }}
        >

            <div
                className="kitchen-nav"
                style={{
                    position: "absolute",
                    left: "80%",
                    width: "20%",
                    height: "40%",
                    bottom: 0,

                    zIndex: 10,
                    cursor: "pointer",

                }}>

        </div>


        </main>
    );
}
