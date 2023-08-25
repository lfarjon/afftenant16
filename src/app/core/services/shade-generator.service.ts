import { Injectable } from '@angular/core';
import tinycolor from 'tinycolor2';

@Injectable({
  providedIn: 'root',
})
export class ShadeGeneratorService {
  generateShades(hex: string): { [key: string]: string } {
    const baseColor = tinycolor(hex);
    console.log(baseColor.toString());
    const colors = tinycolor(hex).monochromatic();
    // You can modify these percentages to fit your needs
    const shades = {
      '50': baseColor.lighten(45).desaturate(10).toString(),
      '100': baseColor.lighten(40).desaturate(5).toString(),
      '200': baseColor.lighten(25).desaturate(5).toString(),
      '300': baseColor.lighten(15).desaturate(5).toString(),
      '400': baseColor.lighten(10).toString(),
      '500': baseColor.toString(),
      '600': baseColor.darken(10).saturate(5).toString(),
      '700': baseColor.darken(15).saturate(10).toString(),
      '800': baseColor.darken(20).saturate(10).toString(),
      '900': baseColor.darken(25).saturate(15).toString(),
      '950': baseColor.darken(30).saturate(20).toString(),
    };
    return shades;
  }

  getFontColorForBackground(hex: string): string {
    return tinycolor(hex).isLight() ? '#000' : '#FFF';
  }

  darkenShade(hex: string, shade?: number): string {
    const baseColor = tinycolor(hex);
    return baseColor
      .darken(shade ? shade : 15)
      .saturate(10)
      .toString();
  }

  isDark(hex: string): boolean {
    const baseColor = tinycolor(hex);
    return baseColor.isDark();
  }
}
