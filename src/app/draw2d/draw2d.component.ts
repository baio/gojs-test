import { Component, OnInit } from '@angular/core';

// declare var require;

// require('draw2d-wrapper');

let draw2d = (<any>window).draw2d;

const settings = {
  height: 500,
  columnWeight: 100,
  rowHeight: 50,
  rowAlpha: 0.8
}

export interface Canvas {
  add(fig: any, x: number, y: number);
}

export interface Rect {

  setDimension(w: number, h: number);

  setAlpha(percent: number);

  add(figure: any, locator: any);
}

const addColumn = (canvas: Canvas, index: number) : Rect =>  {

  const rect: Rect = new draw2d.shape.basic.Rectangle();

  rect.setDimension(settings.columnWeight, settings.height);

  canvas.add(rect, index * settings.columnWeight, 0);

  return rect;
}

const addRow = (canvas: Canvas, index: number, units: number, from: number, to: number) : Rect => {

  const rect: Rect = new draw2d.shape.basic.Rectangle();

  rect.setDimension((to - from) * settings.columnWeight, settings.rowHeight * units);

  rect.setAlpha(settings.rowAlpha);

  canvas.add(rect, from * settings.columnWeight, index * settings.rowHeight);

  return rect;
}

const addChildRow = (row: Rect, index: number, units: number, from: number, to: number) : Rect => {

  const rect: Rect = new draw2d.shape.basic.Rectangle();

  rect.setDimension((to - from) * settings.columnWeight, settings.rowHeight * units);

  rect.setAlpha(settings.rowAlpha);

  row.add(rect, new draw2d.layout.locator.XYAbsPortLocator(from * settings.columnWeight, index * settings.rowHeight));

  return rect;
}


@Component({
  selector: 'app-draw2d',
  templateUrl: './draw2d.component.html',
  styleUrls: ['./draw2d.component.css']
})
export class Draw2dComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      var canvas: Canvas = new draw2d.Canvas("gfx_holder");

      addColumn(canvas, 0);
      addColumn(canvas, 1);
      addColumn(canvas, 2);
      addColumn(canvas, 3);

      const row1 = addRow(canvas, 0, 2, 0, 3);
      const row2 = addRow(canvas, 2, 3, 2, 4);

      const row3 = addChildRow(row1, 0, 1, 0, 2);
      addChildRow(row1, 1, 1, 1, 3);

      addChildRow(row3, 0, 1, 0, 1);
      //canvas.add(new draw2d.shape.basic.Rectangle(), 100, 150);
      //canvas.add(new draw2d.shape.basic.Rectangle(), 200, 150);
  }

}
