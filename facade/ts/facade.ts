//Skomplikowany system, po utworzeniu fasady nie jest on istotny dla klienta
class InventoryService {
    isAvailable(productId: string, qty: number): boolean {
        console.log(`Sprawdzam magazyn: ${productId} x${qty}`);
        return true;
    }

    reserve(productId: string, qty: number): void {
        console.log(`Rezerwuję ${qty} szt. produktu ${productId}`);
    }
}

class PaymentService {
    charge(userId: string, amount: number): boolean {
        console.log(`Pobieram ${amount} zł od użytkownika ${userId}`);
        return true
    }
}

class ShippingService {
    createShipping(userId: string, productId: string): string {
        console.log(`Tworzę przesyłkę dla ${userId} (produkt: ${productId})`);
        return "TRACK-12345"
    }
}

class NotificationService {
    sendEmail(userId: string, message: string): void {
        console.log(`Email do ${userId}: ${message}`);
    }
}

//Fasada, prosty interfejs do którego odwołuje się klient bez konieczności znania skomplikowanego systemu
class OrderFacade {
    private inventory: InventoryService;
    private payment: PaymentService;
    private shipping: ShippingService;
    private notification: NotificationService;

    constructor(
        inventory: InventoryService = new InventoryService(),
        payment: PaymentService = new PaymentService(), 
        shipping: ShippingService = new ShippingService(), 
        notification: NotificationService = new NotificationService()
    ) {
        this.inventory = inventory;
        this.payment = payment;
        this.shipping = shipping;
        this.notification = notification;
    }

    placeOrder(
        userId: string,
        productId: string,
        qty: number,
        price: number
    ): string {
        if(!this.inventory.isAvailable(productId, qty)) {
            throw new Error("Product is not available")
        }

        if(!this.payment.charge(userId, price * qty)) {
            throw new Error("Payment failed")
        }

        this.inventory.reserve(productId, qty);
        const trackingId = this.shipping.createShipping(userId, productId);
        this.notification.sendEmail(userId, `Zamówienie wysłane: ${trackingId}`)

        return trackingId;
    }
}

//Tests
const shop = new OrderFacade();
const tracking = shop.placeOrder("user-01", "laptop-lenovo", 1, 3499);
console.log(`Numer przesyłki: ${tracking}`);
