import { db, Category, Product } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
    await Promise.allSettled([db.delete(Category), db.delete(Product)]);

    await db.insert(Category).values([
        {
            id: 1,
            name: "Camisetas y Tops",
        },
        {
            id: 2,
            name: "Pantalones y Jeans",
        },
        {
            id: 3,
            name: "Sudaderas y Hoodies",
        },
        {
            id: 4,
            name: "Calzado",
        },
        {
            id: 5,
            name: "Accesorios",
        },
        {
            id: 6,
            name: "Ediciones Especiales",
        },
    ]);

    await db.insert(Product).values([
        {
            id: 1,
            name: "Camiseta HTML5 Blanca",
            description:
                "Camiseta de algodón 100% con diseño minimalista HTML5. Perfecta para desarrolladores web.",
            price: 29.99,
            stock: 50,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771636404/exij6hzdoufayd8v4pj9.png",
            categoryId: 1,
        },
        {
            id: 2,
            name: "Camiseta Stack Vintage",
            description:
                "Camiseta con estampado vintage sobre full stack development. Diseño nostálgico para devs retro.",
            price: 34.99,
            stock: 35,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771704116/image_2026-02-21_140153279_gwlrci.png",
            categoryId: 1,
        },
        {
            id: 3,
            name: "Tank Top Debug Mode",
            description:
                "Tank top de secado rápido con mensaje 'Debug Mode ON'. Perfecto para hackathons y maratones de código.",
            price: 24.99,
            stock: 60,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771704130/image_2026-02-21_140207515_bihrh0.png",
            categoryId: 1,
        },
        {
            id: 4,
            name: "Camiseta Oversized JS",
            description:
                "Camiseta oversized en gris oscuro con logo JavaScript. Diseño relajado para el home office.",
            price: 39.99,
            stock: 40,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771704620/image_2026-02-21_141017280_eq6bcw.png",
            categoryId: 1,
        },
        {
            id: 5,
            name: "Jeans Dev Azul Marino",
            description:
                "Jeans azul marino con bolsillos reforzados para portátil. Cintura cómoda para largas sesiones de código.",
            price: 59.99,
            stock: 45,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771704442/image_2026-02-21_140719275_lnbl48.png",
            categoryId: 2,
        },
        {
            id: 6,
            name: "Pantalones Chinos Tech",
            description:
                "Pantalones chinos elegantes en beige. Perfectos para standups y presentaciones de proyectos.",
            price: 54.99,
            stock: 30,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771704551/image_2026-02-21_140907738_sbhcgr.png",
            categoryId: 2,
        },
        {
            id: 7,
            name: "Jeans Hacker Negro",
            description:
                "Jeans negro con rotos edgy. El outfit perfecto para un verdadero tech rebel.",
            price: 64.99,
            stock: 25,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771704572/image_2026-02-21_140929477_mibhsf.png",
            categoryId: 2,
        },
        {
            id: 8,
            name: "Hoodie Coder Gris",
            description:
                "Hoodie cómodo en gris melange. El atuendo perfecto para sessions de desarrollo nocturno.",
            price: 69.99,
            stock: 35,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771704766/image_2026-02-21_141242472_s7ld5i.png",
            categoryId: 3,
        },
        {
            id: 9,
            name: "Sudadera DevOps Azul",
            description:
                "Sudadera con tecnología transpirable y bolsillos reforzados. Ideal para deployment parties.",
            price: 59.99,
            stock: 40,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771704829/image_2026-02-21_141345110_rdarvp.png",
            categoryId: 3,
        },
        {
            id: 10,
            name: "Hoodie Premium Black",
            description:
                "Hoodie premium con cierre completo. El favorito de los developers en conferencias tech.",
            price: 79.99,
            stock: 20,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771704868/image_2026-02-21_141424741_vpuyor.png",
            categoryId: 3,
        },
        {
            id: 11,
            name: "Sneakers Dev Blancas",
            description:
                "Zapatillas deportivas blancas con amortiguación premium. Cómodas para maratones de coding.",
            price: 119.99,
            stock: 30,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771705378/image_2026-02-21_142253509_z6kb8b.png",
            categoryId: 4,
        },
        {
            id: 12,
            name: "Botas Tech Negro",
            description:
                "Botas urbanas de cuero sintético con suela reforzada. Versátiles para cualquier evento tech.",
            price: 99.99,
            stock: 25,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771705396/image_2026-02-21_142311932_yditb5.png",
            categoryId: 4,
        },
        {
            id: 13,
            name: "Sneakers Daily Gris",
            description:
                "Tenis casuales en gris. Cómodos para el home office o paseos entre sprints.",
            price: 79.99,
            stock: 40,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771705410/image_2026-02-21_142326053_ciyxvm.png",
            categoryId: 4,
        },
        {
            id: 14,
            name: "Sandalias Coder Azul",
            description:
                "Sandalias deportivas azul con tiras ajustables. Perfectas para retiros de desarrollo.",
            price: 49.99,
            stock: 50,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771705435/image_2026-02-21_142352255_rehq8r.png",
            categoryId: 4,
        },
        {
            id: 15,
            name: "Gorro Hackathon Rojo",
            description:
                "Gorro de lana rojo vibrante. El accesorio esencial para competencias de código en invierno.",
            price: 24.99,
            stock: 55,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771705464/image_2026-02-21_142420588_xps8dt.png",
            categoryId: 5,
        },
        {
            id: 16,
            name: "Cinturón Dev Negro",
            description:
                "Cinturón de cuero genuino negro. Perfecto para eventos corporativos y tech talks.",
            price: 39.99,
            stock: 60,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771705485/image_2026-02-21_142441892_ht4pxl.png",
            categoryId: 5,
        },
        {
            id: 17,
            name: "Mochila Laptop Gris",
            description:
                "Mochila con compartimientos organizados y protección para laptop. Ideal para developers nómadas.",
            price: 89.99,
            stock: 35,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771705511/image_2026-02-21_142507231_judxsm.png",
            categoryId: 5,
        },
        {
            id: 18,
            name: "Camiseta Open Source Gold",
            description:
                "Camiseta edición limitada con estampado dorado de Open Source. Solo 200 unidades para los verdaderos believers del código libre.",
            price: 89.99,
            stock: 15,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771705644/image_2026-02-21_142702077_cuxqkp.png",
            categoryId: 6,
        },
        {
            id: 19,
            name: "Jacket Tech Elite",
            description:
                "Jacket premium de cuero auténtico. Pieza de colección para tech pioneers. Status symbol del mundo dev.",
            price: 249.99,
            stock: 8,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771705652/image_2026-02-21_142728061_lijaje.png",
            categoryId: 6,
        },
        {
            id: 20,
            name: "Sneakers Founder Edition",
            description:
                "Zapatillas limitadas Founder Edition. Número de serie único. Para los que creyeron desde el primer commit.",
            price: 199.99,
            stock: 12,
            image: "https://res.cloudinary.com/dubatehss/image/upload/v1771705538/image_2026-02-21_142533823_cc3tmo.png",
            categoryId: 6,
        },
    ]);

    console.log("Seed completed successfully!");
}
