import type { CartItem } from "@/types";
import Dexie, { type Table } from "dexie";

export class ModaTechDB extends Dexie {
    cart!: Table<CartItem>;

    constructor() {
        super("moda-tech");
        this.version(1).stores({
            cart: "id",
        });
    }
}

export const dexie = new ModaTechDB();
