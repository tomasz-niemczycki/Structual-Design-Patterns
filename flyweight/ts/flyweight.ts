class TreeType {
    readonly name: string;
    readonly color: string;
    readonly texture: string;

    constructor(name: string, color: string, texture: string) {
        this.name = name;
        this.color = color;
        this.texture = texture;
    }

    draw(x: number, y: number): void {
        console.log(`Rysuję ${this.name} (${this.color}), ${this.texture} na pozycji (${x}, ${y})`);
    }
}

class TreeTypeFactory {
    private static types: Map<string, TreeType> = new Map();

    static getTreeType(name: string, color: string, texture: string): TreeType {
        const key = `${name}-${color}-${texture}`;
        let type = TreeTypeFactory.types.get(key);

        if(!type) {
            type = new TreeType(name, color, texture);
            TreeTypeFactory.types.set(key, type);
        }

        return type;

    }
    static countTypes(): number {
        return TreeTypeFactory.types.size;
    }
}

class Tree {
    private x: number;
    private y: number;
    private type: TreeType;

    constructor(x: number, y: number, type: TreeType) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    draw(): void {
        this.type.draw(this.x, this.y);
    }
}

class Forest {
    private trees: Tree[] = [];

    plantTree(
        x: number, 
        y: number,
        name: string, 
        color: string,
        texture: string
    ): void {
        const type = TreeTypeFactory.getTreeType(name, color, texture);
        this.trees.push(new Tree(x, y, type));
    }

    draw(limit: number = this.trees.length): void {
        for(const tree of this.trees.slice(0, limit)) {
            tree.draw();
        }
    }

    countTrees(): number {
        return this.trees.length;
    }
}

//Tests
const forest = new Forest();

for(let i = 0; i < 500; i++) {
    forest.plantTree(i, i * 2, "Sosna", "Zielony", "Igły")
    forest.plantTree(i *3, i, "Dąb", "Ciemnozielony", "Liście")
}

forest.draw(4);

console.log("---");
console.log(`Liczba drzew: ${forest.countTrees()}`);
console.log(`Liczba obiektów TreeType: ${TreeTypeFactory.countTypes()}`);
