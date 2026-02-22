import { column, defineDb, defineTable } from "astro:db";

const Category = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        name: column.text({ optional: false }),
    },
});

const Product = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        name: column.text({ optional: false }),
        description: column.text({ optional: false }),
        price: column.number({ optional: false }),
        stock: column.number({ default: 0, optional: false }),
        image: column.text({ optional: false }),
        categoryId: column.number({
            optional: false,
            references: () => Category.columns.id,
        }),
    },
});

export default defineDb({
    tables: { Category, Product },
});
