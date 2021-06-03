/**
 * VT100-Terminal für Calliope mini
 * Thorsten Kimmeskamp, 29.05.2021
 */

//% weight=100 color=#0fbc11 icon="\uf26c"
namespace VT100 {
    
	export enum farben {
        //% block="Schwarz"
        schwarz = 0,
        //% block="Rot"
        rot = 1,
        //% block="Grün"
        gruen = 2,
        //% block="Gelb"
        gelb = 3,
        //% block="Blau"
        blau = 4,
        //% block="Magenta"
        magenta = 5,
        //% block="Cyan"
        cyan = 6,
        //% block="Hellgrau"
        hellgrau = 7,
        //% block="Dunkelgrau"
        dunkelgrau = 8,
        //% block="Hellrot"
        hellrot = 9,
        //% block="Hellgrün"
        hellgruen = 10,
        //% block="Hellgelb"
        hellgelb = 11,
        //% block="Hellblau"
        hellblau = 12,
        //% block="Hellmagenta"
        hellmagenta = 13,
        //% block="Hellcyan"
        hellcyan = 14,
        //% block="Weiß"
        weiss = 15,
    }

    export enum schriftstile {
        //% block="normal"
        normal = 0,
        //% block="fett"
        fett = 1,
        //% block="unterstrichen"
        unterstrichen = 4,
        //% block="invers"
        invers = 7,
    }

    /**
     * Konvertiert einen Farbnamen in eine Zahl.
     */
    //% blockId=farbe block="%color"
    export function farbe(color: farben): number {
        return color;
    }

    /**
     * Versteckt den Cursor.
     */
    //% blockId="versteckeCursor" block="verstecke Cursor"
    export function versteckeCursor(): void {
        serial.writeString("\x1B[?25l");
    }

    /**
     * Zeigt den Cursor an.
     */
	//% blockId="zeigeCursor" block="zeige Cursor"
    export function zeigeCursor(): void {
        serial.writeString("\x1B[?25h");
    }

    /**
     * Löscht die Zeile, in der sich der Cursor befindet.
     */
    //% blockId="loescheZeile" block="lösche Zeile"
    export function loescheZeile(): void {
        serial.writeString("\x1B[2K");
    }    

    /**
     * Löscht den gesamten Bildschirm.
     */
    //% blockId="loescheBildschirm" block="lösche Bildschirm"
    export function loescheBildschirm(): void {
        serial.writeString("\x1B[2J");
    }
	
    /**
     * Wählt einen Schriftstil bzw. setzt ihn zurück.
     */
    //% blockId="waehleSchriftstil" block="wähle Schriftstil %style"	
    export function waehleStriftstil(style: schriftstile): void {
        serial.writeString("\x1B[" + style + "m");
    }

    /**
     * Wählt eine Hintergrundfarbe mit den angegebenen RGB-Werten.
     */
    //% blockId="waehleHintergrundRGB" block="wähle Hintergrund Rot %r | Grün %g | Blau %b"	
    export function waehleHintergrundRGB(r: number, g: number, b: number): void {
        serial.writeString("\x1B[48;2;" + r + ";" + g + ";" + b + "m");
    }
	
    /**
     * Wählt eine Hintergrundfarbe gemäß Farbtabelle im ANSI-Standard.
     */
    //% blockId="waehleHintergrundNr" block="wähle Hintergrund %value"	
    export function waehleHintergrundNr(value: number): void {
        serial.writeString("\x1B[48;5;" + value + "m");
    }

    /**
     * Wählt eine Vordergrundfarbe mit den angegebenen RGB-Werten.
     */
	//% blockId="waehleVordergrundRGB" block="wähle Vordergrund Rot %r | Grün %g | Blau %b"	
    export function waehleVordergrundRGB(r: number, g: number, b: number): void {
        serial.writeString("\x1B[38;2;" + r + ";" + g + ";" + b + "m");
    }
	
    /**
     * Wählt eine Vordergrundfarbe gemäß Farbtabelle im ANSI-Standard.
     */
    //% blockId="waehleVordergrundNr" block="wähle Vordergrund %value"	
    export function waehleVordergrundNr(value: number): void {
        serial.writeString("\x1B[38;5;" + value + "m");
    }
    
    /**
     * Schreibt einen Text auf den Bildschirm und bewegt den Cursor zum Anfang der nächsten Zeile.
     */
    //% blockId="schreibeZeile" block="schreibe Zeile %text"
    export function schreibeZeile(text: string): void {
        serial.writeString(text);
        schreibeZeichen(0x0D)
        schreibeZeichen(0x0A)
    }

    /**
     * Schreibt ein Zeichen an die aktuelle Cursor-Position. Parameter ist die Nummer des Zeichens.
     */
    //% blockId="schreibe Zeichen" block="schreibe Zeichen %value"
    export function schreibeZeichen(value: number): void {
        serial.writeString(String.fromCharCode(value));
    }

    /**
     * Schreibt eine Zahl an die aktuelle Cursor-Position.
     */
    //% blockId="schreibeZahl" block="schreibe Zahl %value"
    export function schreibeZahl(value: number): void {
        serial.writeString(value.toString());
    }

    /**
     * Schreibt einen Text an die aktuelle Cursor-Position.
     */
	//% blockId="schreibeText" block="schreibe Text %text"
    export function schreibeText(text: string): void {
        serial.writeString(text);
    }

    /**
     * Bewegt den Cursor zur angegebenen Position. Die linke obere Bildschirmecke hat die Koordinaten (1|1).
     */
    //% blockId="geheZu" block="gehe zu x %x | y %y"
    export function geheZu(x: number, y: number): void {
        serial.writeString("\x1B[" + y + ";" + x + "H");
    }
}