interface FileSystemItem {
    getSize(): number;
    getName(): string;
    print(indent?: string): void;
}

class FileItem implements FileSystemItem {
    private name: string;
    private size: number;

    constructor(name: string, size: number) {
        this.name = name;
        this.size = size;
    }

    getSize() {
        return this.size
    }

    getName() {
        return this.name;
    }

    print(indent = ""): void {
        console.log(`${indent}📄 ${this.name} (${this.size} KB)`);
    }
}

class Folder implements FileSystemItem {
    private children: FileSystemItem[] = [];

    private name: string;

    constructor(name: string) {
        this.name = name
    }

    add(item: FileSystemItem): this {
        this.children.push(item);
        return this;
    }

    remove(item: FileSystemItem): void {
        this.children = this.children.filter((c) => c !== item);
    }

    getName(): string {
        return this.name;
    }

    getSize(): number {
        return this.children.reduce((sum, c) => sum + c.getSize(), 0);
    }

    print(indent = ""): void {
        console.log(`${indent}📁 ${this.name} (${this.getSize()} KB)`);
        this.children.forEach((c) => {
            c.print(indent + " ");
        }) 
    }
}

//Tests
const root = new Folder("Project");
const src = new Folder("Src");
const docs = new Folder("Docs");

src.add(new FileItem("index.ts", 12)).add(new FileItem("utils.ts", 8));
docs.add(new FileItem("README.md", 3));
root.add(src).add(docs).add(new FileItem("package.json", 1));

root.print();
console.log("Całkowity rozmiar: " + root.getSize());
