﻿import common = require("./drawingpad-common");
import { Color } from "color";

global.moduleMerge(common, exports);

declare var com: any;

export class DrawingPad extends common.DrawingPad {
    private _android: com.github.gcacace.signaturepad.views.SignaturePad;

    get android() {
        return this._android;
    }

    get _nativeView() {
        return this._android;
    }

    public _createUI() {

        this._android = new com.github.gcacace.signaturepad.views.SignaturePad(this._context, null);

        if (this.penColor) {
            this._android.setPenColor(new Color(this.penColor).android);
        }

        if (this.penWidth) {
            this._android.setMinWidth(this.penWidth);
        }

    }

    
    public getDrawing(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._android.isEmpty()) {
                    let data = this._android.getSignatureBitmap();
                    resolve(data);
                } else {
                    reject("DrawingPad is empty.");
                }
            } catch (err) {
                reject(err);
            }
        })
    }

    public getTransparentDrawing(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._android.isEmpty()) {
                    let data = this._android.getTransparentSignatureBitmap();
                    resolve(data);
                } else {
                    reject("DrawingPad is empty.");
                }
            } catch (err) {
                reject(err);
            }
        })
    }

    public getDrawingSvg(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._android.isEmpty()) {
                    let data = this._android.getSignatureSvg();
                    resolve(data);
                } else {
                    reject("DrawingPad is empty.");
                }
            } catch (err) {
                reject(err);
            }
        })
    }

    public clearDrawing(): any {
        try {
            this._android.clear();
        } catch (err) {
            console.log('Error in clearDrawing: ' + err);
        }
    }

}