interface Device {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    getVolume(): number;
    setVolume(percent: number): void;
}

class Tv implements Device {
    private on = true;
    private volume = 50;

    isEnabled() {
        return this.on;
    }

    enable() {
        this.on = true;
    }

    disable() {
        this.on = false;
    }

    getVolume() {
        return this.volume;
    }

    setVolume(percent: number) {
       this.volume = Math.max(0, Math.min(100, percent));
    }
}

class Radio implements Device {
    private on = false;
    private volume = 30;

    isEnabled() {
        return this.on;
    }

    enable() {
        this.on = true
    }

    disable() {
        this.on = false
    }

    getVolume() {
        return this.volume
    }

    setVolume(percent: number) {
       this.volume = Math.max(0, Math.min(100, percent));
    }
}

class RemoteControl {
    protected device: Device;

    constructor( device: Device) {
        this.device = device
    }

    tooglePower(): void {
        if(this.device.isEnabled() === true) {
            this.device.disable();
        }

        else if(this.device.isEnabled() === false) {
            this.device.enable()
        }
    }

    volumeUp(): void {
        this.device.setVolume(this.device.getVolume() + 10);
    }

    volumeDown(): void {
        this.device.setVolume(this.device.getVolume() - 10);
    }
}

class AdvancedRemoteControl extends RemoteControl {
    mute(): void {
        this.device.setVolume(0);
    }
}

//Tests

const tv = new Tv();
const radio = new Radio();

const remote = new RemoteControl(tv)
remote.tooglePower()
remote.volumeDown()
console.log(`TV After toogle: ${tv.isEnabled()}, ${tv.getVolume()}`);

console.log("");

const advanced = new AdvancedRemoteControl(radio)
advanced.mute()
advanced.tooglePower()
console.log(`Radio after toogle: ${radio.isEnabled()}, ${radio.getVolume()}`);