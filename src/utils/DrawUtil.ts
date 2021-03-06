
import {IPoint} from "../interfaces/IPoint";
import {IRect} from "../interfaces/IRect";
import {UnitUtil} from "./UnitUtil";

export class DrawUtil {

    public static clearCanvas(canvas:HTMLCanvasElement): void {
        let ctx:CanvasRenderingContext2D = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    public static drawLine(canvas:HTMLCanvasElement, startPoint:IPoint, endPoint:IPoint, color:string = "#111111", thickness:number = 25): void {
        let ctx:CanvasRenderingContext2D = canvas.getContext('2d');
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x + 1, endPoint.y + 1);
        ctx.stroke();
        ctx.restore();
    }

    public static drawRect(canvas:HTMLCanvasElement, rect:IRect, color:string = "#fff", thickness:number = 1): void {
        let ctx:CanvasRenderingContext2D = canvas.getContext('2d');
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        ctx.beginPath();
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.stroke();
        ctx.restore();
    }

    public static drawRectWithFill(canvas:HTMLCanvasElement, rect:IRect, color:string = "#fff"): void {
        let ctx:CanvasRenderingContext2D = canvas.getContext('2d');
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.fill();
        ctx.restore();
    }

    public static shadeEverythingButRect(canvas:HTMLCanvasElement, rect:IRect, color:string = "rgba(0, 0, 0, 0.7)"): void {
        let ctx:CanvasRenderingContext2D = canvas.getContext('2d');
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        ctx.restore();
    }

    public static drawCircleWithFill(canvas:HTMLCanvasElement, anchorPoint:IPoint, radius:number, color:string = "#ffffff"):void {
        const ctx:CanvasRenderingContext2D = canvas.getContext('2d');
        ctx.save();
        const startAngleRad = UnitUtil.deg2rad(0);
        const endAngleRad = UnitUtil.deg2rad(360);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(anchorPoint.x, anchorPoint.y, radius, startAngleRad, endAngleRad, false);
        ctx.fill();
        ctx.restore();
    }

    public static drawCircle(canvas:HTMLCanvasElement, anchorPoint:IPoint, radius:number, startAngleDeg:number, endAngleDeg:number, thickness:number = 20, color:string = "#ffffff"): void {
        let ctx:CanvasRenderingContext2D = canvas.getContext('2d');
        let startAngleRad = UnitUtil.deg2rad(startAngleDeg);
        let endAngleRad = UnitUtil.deg2rad(endAngleDeg);
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        ctx.beginPath();
        ctx.arc(anchorPoint.x, anchorPoint.y, radius, startAngleRad, endAngleRad, false);
        ctx.stroke();
        ctx.restore();
    }

    public static drawText(canvas:HTMLCanvasElement, text:string, textSize:number, anchorPoint:IPoint, color:string = "#ffffff", bold:boolean = false, align:string = "center"):void {
        let ctx:CanvasRenderingContext2D = canvas.getContext('2d');
        ctx.save();
        ctx.fillStyle = color;
        ctx.textAlign = align as CanvasTextAlign;
        ctx.textBaseline="middle";
        ctx.font = (bold ? "bold " : "") + textSize + "px Arial";
        ctx.fillText(text, anchorPoint.x, anchorPoint.y);
        ctx.restore();
    }

    public static getRandomRGBColor():string {
        return "rgb(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ")";
    }

    public static setValueBetweenPixels(value: number): number {
        return Math.floor(value) + 0.5;
    }

    public static setPointBetweenPixels(point: IPoint): IPoint {
        return {
            x: DrawUtil.setValueBetweenPixels(point.x),
            y: DrawUtil.setValueBetweenPixels(point.y)
        }
    }

    public static setRectBetweenPixels(rect: IRect): IRect {
        const topLeft: IPoint = {
            x: rect.x,
            y: rect.y
        };
        const bottomRight: IPoint = {
            x: rect.x + rect.width,
            y: rect.y + rect.height
        };
        const topLeftBetweenPixels = DrawUtil.setPointBetweenPixels(topLeft);
        const bottomRightBetweenPixels = DrawUtil.setPointBetweenPixels(bottomRight);
        return {
            x: topLeftBetweenPixels.x,
            y: topLeftBetweenPixels.y,
            width: bottomRightBetweenPixels.x - topLeftBetweenPixels.x,
            height: bottomRightBetweenPixels.y - topLeftBetweenPixels.y
        }
    }
}