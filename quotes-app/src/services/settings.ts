
// Don't forget to inject into providers!!

export class SettingsService {

    private altBackground = false;

    setBackground(isAlt: boolean) {
        this.altBackground = isAlt;
    }

    // check true or fasle
    isAltBackground() {
        return this.altBackground;
    }

}

// Don't forget to inject into providers!!