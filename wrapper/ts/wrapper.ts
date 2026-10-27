//Interfejs, nie zmienia się
interface Coffee {
    getDescription(): string;
    getCost(): number;
}

//Klasa bazowa, podstawowa
class SimpleCoffee implements Coffee {
    getDescription(): string {
        return "Kawa"
    }

    getCost(): number {
        return 8;
    }
}

//Bazowy dekorator, klasa podstawowa "owinięta"
class CoffeeDecorator implements Coffee {
    protected wrapped: Coffee;

    constructor(wrapped: Coffee) {
        this.wrapped = wrapped
    }

    getDescription(): string {
        return this.wrapped.getDescription();
    }

    getCost(): number {
        return this.wrapped.getCost();
    }
}


//Konkretne dekoratory
class MilkDecorator extends CoffeeDecorator {
    getDescription(): string {
        return `${this.wrapped.getDescription()} + mleko`
    }

    getCost(): number {
        return this.wrapped.getCost() + 2;
    }
}

class SugarDecorator extends CoffeeDecorator {
    getDescription(): string {
        return `${this.wrapped.getDescription()} + cukier`
    }

    getCost(): number {
        return this.wrapped.getCost() + 1;
    }
}

class WhippedCreamDecorator extends CoffeeDecorator {
    getDescription(): string {
        return `${this.wrapped.getDescription()} + bita śmietana`
    }

    getCost(): number {
        return this.wrapped.getCost() + 3
    }
}

//Tests
const plain: Coffee = new SimpleCoffee()
console.log(`${plain.getDescription()} = ${plain.getCost()}zł`);

console.log("");

let order: Coffee = new SimpleCoffee()
order = new MilkDecorator(order);
order = new SugarDecorator(order);
console.log(`${order.getDescription()} = ${order.getCost()}zł`);

console.log("");


const fancy: Coffee = new WhippedCreamDecorator(new WhippedCreamDecorator(new MilkDecorator(new SimpleCoffee())));
console.log(`${fancy.getDescription()} = ${fancy.getCost()}zł`);
