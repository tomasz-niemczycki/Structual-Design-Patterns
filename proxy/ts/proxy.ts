interface ReportService {
    getReport(month: string): string;
}

class RealReportService implements ReportService {
    constructor() {
        console.log("[RealReportService] Łączę się z bazą danych (wolna operacja)...");
    }

    getReport(month: string): string {
        console.log(`[RealReportService] Generuje raport za miesiąc ${month} (wolna operacja)...`);
        return `Raport ze sprzedaży za ${month}`
    }
}

type Role = "Admin" | "Guest";

class ReportServiceProxy implements ReportService {
    private realService: RealReportService | null = null;
    private cache: Map<string, string> = new Map();
    private role: Role;

    constructor(role: Role) {
        this.role = role;
    }

    getReport(month: string): string {
        if(this.role !== "Admin") {
            throw new Error("Brak dostępu: tylko admin może pobierać raporty");
        }

        const cached = this.cache.get(month);
        if(cached !== undefined) {
            console.log(`[Proxy] Zwracam raport za ${month} z cache`);
            return cached;
        }

        if(this.realService === null) {
            this.realService = new RealReportService();
        }

        const report = this.realService.getReport(month);
        this.cache.set(month, report);
        return report;
    }
}

function printReport(service: ReportService, month: string): void {
    try {
        console.log(`Wynik: ${service.getReport(month)}`);
    } catch(error) {
        console.log(`Błąd: ${(error as Error).message}`);
    }
}

//Tests
console.log("===Admin===");
const adminService: ReportService = new ReportServiceProxy("Admin");
console.log("Proxy utworzone, prawdziwy serwis jeszcze nie");
printReport(adminService, "Styczeń");
printReport(adminService, "Styczeń");
printReport(adminService, "Luty");

console.log("");

console.log("===Guest===");
const guestService: ReportService = new ReportServiceProxy("Guest");
printReport(guestService, "Styczeń")