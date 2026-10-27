class Target {
    public request(): string {
        return 'Normal request';
    }
}

class Control {
    public specificRequest(): string {
        return 'TSEUQER CIFICEPS';
    }
}

class Adapter extends Target {
    private control: Control;

    constructor(control: Control) {
        super();
        this.control = control
    }

    public request(): string {
        const result = this.control.specificRequest().split('').reverse().join('');
        return `Adapter (Reversed): ${result}`
    }
} 

function main(target: Target) {
    console.log(target.request());
}

//Tests

console.log("Code with Target: ");
const target = new Target();
main(target);


console.log("");

console.log("Code with Control: ");
const control = new Control();
console.log("Control message: " + control.specificRequest());

console.log("");

console.log("Code with adapter: ");
const adapter = new Adapter(control);
main(adapter);